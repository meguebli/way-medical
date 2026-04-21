param(
  [switch]$WhatIf,
  [string[]]$EpicNames = @(
    "Backend Spring Boot",
    "Frontend Angular",
    "Mobile React",
    "Database PostgreSQL",
    "Data Platform and Governance",
    "DevOps Platform",
    "n8n Orchestrator",
    "Security and Compliance",
    "Product and Functional Setup"
  )
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RequiredEnvVar {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Name
  )

  $value = [Environment]::GetEnvironmentVariable($Name)
  if ([string]::IsNullOrWhiteSpace($value)) {
    throw "Missing environment variable: $Name"
  }

  return $value
}

function Get-JiraHeaders {
  $email = Get-RequiredEnvVar -Name "JIRA_EMAIL"
  $token = Get-RequiredEnvVar -Name "JIRA_API_TOKEN"
  $pair = "{0}:{1}" -f $email, $token
  $encoded = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))

  return @{
    Authorization = "Basic $encoded"
    Accept = "application/json"
    "Content-Type" = "application/json"
  }
}

function Invoke-JiraGet {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $baseUrl = Get-RequiredEnvVar -Name "JIRA_BASE_URL"
  $uri = "{0}{1}" -f $baseUrl.TrimEnd("/"), $Path
  return Invoke-RestMethod -Method Get -Uri $uri -Headers (Get-JiraHeaders)
}

function Invoke-JiraPost {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,
    [Parameter(Mandatory = $true)]
    [hashtable]$Body
  )

  $baseUrl = Get-RequiredEnvVar -Name "JIRA_BASE_URL"
  $uri = "{0}{1}" -f $baseUrl.TrimEnd("/"), $Path
  $jsonBody = $Body | ConvertTo-Json -Depth 10
  return Invoke-RestMethod -Method Post -Uri $uri -Headers (Get-JiraHeaders) -Body $jsonBody
}

function Get-JiraProjectKey {
  return Get-RequiredEnvVar -Name "JIRA_PROJECT_KEY"
}

function ConvertTo-UrlEncoded {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  return [System.Uri]::EscapeDataString($Value)
}

function Find-IssueBySummaryAndType {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Summary,
    [Parameter(Mandatory = $true)]
    [string]$IssueTypeName
  )

  $projectKey = Get-JiraProjectKey
  $escapedSummary = $Summary.Replace("\", "\\").Replace('"', '\"')
  $jql = 'project = "{0}" AND issuetype = "{1}" AND summary ~ "\"{2}\"" ORDER BY created DESC' -f $projectKey, $IssueTypeName, $escapedSummary
  $encodedJql = ConvertTo-UrlEncoded -Value $jql
  $result = Invoke-JiraGet -Path "/rest/api/3/search/jql?jql=$encodedJql&maxResults=10&fields=summary"

  $matches = @($result.issues | Where-Object { $_.fields.summary -eq $Summary })
  if ($matches.Count -eq 0) {
    return $null
  }

  return $matches[0]
}

function Get-EpicIssueType {
  $projectKey = Get-JiraProjectKey
  $metadata = Invoke-JiraGet -Path "/rest/api/3/issue/createmeta?projectKeys=$projectKey"
  $project = $metadata.projects | Select-Object -First 1

  if (-not $project) {
    throw "Unable to load Jira create metadata for project '$projectKey'."
  }

  $epicIssueType = $project.issuetypes | Where-Object { $_.name -eq "Epic" } | Select-Object -First 1

  if (-not $epicIssueType) {
    $availableTypes = ($project.issuetypes | Select-Object -ExpandProperty name) -join ", "
    throw "Epic issue type not found in project '$projectKey'. Available types: $availableTypes"
  }

  return $epicIssueType
}

function Get-ProjectSummary {
  $projectKey = Get-JiraProjectKey
  return Invoke-JiraGet -Path "/rest/api/3/project/$projectKey"
}

function New-EpicPayload {
  param(
    [Parameter(Mandatory = $true)]
    [string]$EpicName,
    [Parameter(Mandatory = $true)]
    [string]$IssueTypeId
  )

  $projectKey = Get-JiraProjectKey
  return @{
    fields = @{
      project = @{
        key = $projectKey
      }
      summary = $EpicName
      description = @{
        type = "doc"
        version = 1
        content = @(
          @{
            type = "paragraph"
            content = @(
              @{
                type = "text"
                text = "Epic created automatically from the WAY-MEDICAL repository bootstrap script."
              }
            )
          }
        )
      }
      issuetype = @{
        id = $IssueTypeId
      }
    }
  }
}

Write-Host "Checking Jira configuration..." -ForegroundColor Cyan
$project = Get-ProjectSummary
$epicIssueType = Get-EpicIssueType

Write-Host ("Connected to project: {0} ({1})" -f $project.name, $project.key) -ForegroundColor Green
Write-Host ("Epic issue type detected: {0} (id: {1})" -f $epicIssueType.name, $epicIssueType.id) -ForegroundColor Green

foreach ($epicName in $EpicNames) {
  $existingEpic = Find-IssueBySummaryAndType -Summary $epicName -IssueTypeName "Epic"
  if ($existingEpic) {
    Write-Host ("Skipping Epic already present: {0} -> {1}" -f $epicName, $existingEpic.key) -ForegroundColor DarkYellow
    continue
  }

  if ($WhatIf) {
    Write-Host ("[WhatIf] Would create Epic: {0}" -f $epicName) -ForegroundColor Yellow
    continue
  }

  $payload = New-EpicPayload -EpicName $epicName -IssueTypeId $epicIssueType.id
  $result = Invoke-JiraPost -Path "/rest/api/3/issue" -Body $payload
  Write-Host ("Created Epic: {0} -> {1}" -f $epicName, $result.key) -ForegroundColor Green
}
