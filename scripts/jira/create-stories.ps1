param(
  [switch]$WhatIf
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
  $jsonBody = $Body | ConvertTo-Json -Depth 20
  return Invoke-RestMethod -Method Post -Uri $uri -Headers (Get-JiraHeaders) -Body $jsonBody
}

function Get-JiraProjectKey {
  return Get-RequiredEnvVar -Name "JIRA_PROJECT_KEY"
}

function Get-ProjectSummary {
  $projectKey = Get-JiraProjectKey
  return Invoke-JiraGet -Path "/rest/api/3/project/$projectKey"
}

function Get-IssueTypeByName {
  param(
    [Parameter(Mandatory = $true)]
    [string]$IssueTypeName
  )

  $projectKey = Get-JiraProjectKey
  $metadata = Invoke-JiraGet -Path "/rest/api/3/issue/createmeta?projectKeys=$projectKey"
  $project = $metadata.projects | Select-Object -First 1

  if (-not $project) {
    throw "Unable to load Jira create metadata for project '$projectKey'."
  }

  $issueType = $project.issuetypes | Where-Object { $_.name -eq $IssueTypeName } | Select-Object -First 1
  if (-not $issueType) {
    $availableTypes = ($project.issuetypes | Select-Object -ExpandProperty name) -join ", "
    throw "$IssueTypeName issue type not found in project '$projectKey'. Available types: $availableTypes"
  }

  return $issueType
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

function New-AdfParagraph {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text
  )

  return @{
    type = "paragraph"
    content = @(
      @{
        type = "text"
        text = $Text
      }
    )
  }
}

function New-StoryPayload {
  param(
    [Parameter(Mandatory = $true)]
    [hashtable]$Story,
    [Parameter(Mandatory = $true)]
    [string]$IssueTypeId,
    [Parameter(Mandatory = $true)]
    [string]$EpicKey
  )

  $projectKey = Get-JiraProjectKey
  return @{
    fields = @{
      project = @{
        key = $projectKey
      }
      summary = $Story.summary
      description = @{
        type = "doc"
        version = 1
        content = @(
          (New-AdfParagraph -Text $Story.description),
          (New-AdfParagraph -Text ("Epic parent: {0}" -f $EpicKey))
        )
      }
      issuetype = @{
        id = $IssueTypeId
      }
      parent = @{
        key = $EpicKey
      }
    }
  }
}

$stories = @(
  @{
    epic = "Backend Spring Boot"
    summary = "Initialize Spring Boot backend architecture"
    description = "Set up the backend project structure, package conventions, configuration profiles and technical baseline for the medical platform."
  },
  @{
    epic = "Backend Spring Boot"
    summary = "Implement authentication and authorization foundation"
    description = "Prepare the security baseline with authentication, authorization roles and protected API access patterns."
  },
  @{
    epic = "Backend Spring Boot"
    summary = "Define initial domain modules and REST contracts"
    description = "Create the first domain boundaries and the initial API contract strategy for frontend and mobile consumption."
  },
  @{
    epic = "Frontend Angular"
    summary = "Initialize Angular application structure"
    description = "Set up the Angular application, module organization, environment configuration and shared technical baseline."
  },
  @{
    epic = "Frontend Angular"
    summary = "Implement authentication flow on web"
    description = "Create the first web authentication flow, route protection and session management standards."
  },
  @{
    epic = "Frontend Angular"
    summary = "Prepare core layout and navigation shell"
    description = "Build the main application shell with navigation, layout zones and reusable page structure."
  },
  @{
    epic = "Mobile React"
    summary = "Initialize React mobile application"
    description = "Set up the mobile codebase, base navigation, environment management and project conventions."
  },
  @{
    epic = "Mobile React"
    summary = "Implement secure mobile authentication flow"
    description = "Prepare the mobile login flow and secure session handling aligned with backend APIs."
  },
  @{
    epic = "Mobile React"
    summary = "Define mobile feature module structure"
    description = "Organize the mobile app by feature modules and shared services for scalable delivery."
  },
  @{
    epic = "Database PostgreSQL"
    summary = "Design initial PostgreSQL schema baseline"
    description = "Define the first database structure, naming conventions and environment separation strategy."
  },
  @{
    epic = "Database PostgreSQL"
    summary = "Set up database migration strategy"
    description = "Choose and implement the migration approach for schema evolution across RCT, PPR and PROD."
  },
  @{
    epic = "Database PostgreSQL"
    summary = "Prepare synthetic non-production datasets"
    description = "Create safe synthetic data principles and seed strategy for development and test environments."
  },
  @{
    epic = "Data Platform and Governance"
    summary = "Define data platform architecture and ownership"
    description = "Clarify data domains, ownership, storage responsibilities and operating model for the platform."
  },
  @{
    epic = "Data Platform and Governance"
    summary = "Establish environment data segregation strategy"
    description = "Define how data is isolated between RCT, PPR and PROD and how non-production datasets are governed."
  },
  @{
    epic = "Data Platform and Governance"
    summary = "Define CNIL compliance baseline for data handling"
    description = "Prepare the initial CNIL-oriented rules for personal data handling, retention and lawful processing."
  },
  @{
    epic = "Data Platform and Governance"
    summary = "Define hashing and pseudonymization strategy"
    description = "Select the approach for hashing, pseudonymization and protection of sensitive identifiers."
  },
  @{
    epic = "DevOps Platform"
    summary = "Set up CI pipeline for monorepo"
    description = "Prepare automated quality checks and build validation for backend, frontend and mobile repositories."
  },
  @{
    epic = "DevOps Platform"
    summary = "Define deployment pipeline for RCT PPR PROD"
    description = "Design the deployment promotion flow and environment-specific controls for each target environment."
  },
  @{
    epic = "DevOps Platform"
    summary = "Prepare observability and monitoring baseline"
    description = "Define logging, monitoring and alerting standards for the platform."
  },
  @{
    epic = "n8n Orchestrator"
    summary = "Define n8n orchestration use cases and boundaries"
    description = "Identify the business and technical workflows that should be orchestrated with n8n and define integration boundaries."
  },
  @{
    epic = "n8n Orchestrator"
    summary = "Design secure n8n platform architecture"
    description = "Prepare the hosting, security, connectivity and operational model for n8n in the platform."
  },
  @{
    epic = "n8n Orchestrator"
    summary = "Prepare first medical workflow automation blueprint"
    description = "Define the first target automation flow, inputs, outputs and traceability requirements."
  },
  @{
    epic = "Security and Compliance"
    summary = "Define medical security baseline"
    description = "Document the initial security requirements, sensitive data handling rules and access principles."
  },
  @{
    epic = "Security and Compliance"
    summary = "Set up secrets management and access control"
    description = "Prepare secret storage, least-privilege access model and operational access rules."
  },
  @{
    epic = "Security and Compliance"
    summary = "Define audit and traceability requirements"
    description = "Establish traceability expectations for changes, access and sensitive operations."
  },
  @{
    epic = "Product and Functional Setup"
    summary = "Define MVP scope and release roadmap"
    description = "Clarify the first product scope, target milestones and release sequencing across environments."
  },
  @{
    epic = "Product and Functional Setup"
    summary = "Prepare backlog structure in Jira"
    description = "Organize epics, stories, priorities and workflow conventions for the delivery team."
  },
  @{
    epic = "Product and Functional Setup"
    summary = "Document functional and technical knowledge in Confluence"
    description = "Set up the first documentation spaces for product, architecture and operations."
  }
)

Write-Host "Checking Jira configuration..." -ForegroundColor Cyan
$project = Get-ProjectSummary
$storyIssueType = Get-IssueTypeByName -IssueTypeName "Story"

Write-Host ("Connected to project: {0} ({1})" -f $project.name, $project.key) -ForegroundColor Green
Write-Host ("Story issue type detected: {0} (id: {1})" -f $storyIssueType.name, $storyIssueType.id) -ForegroundColor Green

$epicCache = @{}

foreach ($story in $stories) {
  $existingStory = Find-IssueBySummaryAndType -Summary $story.summary -IssueTypeName "Story"
  if ($existingStory) {
    Write-Host ("Skipping Story already present: {0} -> {1}" -f $story.summary, $existingStory.key) -ForegroundColor DarkYellow
    continue
  }

  if (-not $epicCache.ContainsKey($story.epic)) {
    $epicIssue = Find-IssueBySummaryAndType -Summary $story.epic -IssueTypeName "Epic"
    if (-not $epicIssue) {
      throw "Epic not found with summary '$($story.epic)' in project '$($project.key)'. Create epics first."
    }
    $epicCache[$story.epic] = $epicIssue.key
    Write-Host ("Resolved Epic: {0} -> {1}" -f $story.epic, $epicIssue.key) -ForegroundColor DarkCyan
  }

  $epicKey = $epicCache[$story.epic]

  if ($WhatIf) {
    Write-Host ("[WhatIf] Would create Story: {0} -> parent {1}" -f $story.summary, $epicKey) -ForegroundColor Yellow
    continue
  }

  $payload = New-StoryPayload -Story $story -IssueTypeId $storyIssueType.id -EpicKey $epicKey
  $result = Invoke-JiraPost -Path "/rest/api/3/issue" -Body $payload
  Write-Host ("Created Story: {0} -> {1}" -f $story.summary, $result.key) -ForegroundColor Green
}
