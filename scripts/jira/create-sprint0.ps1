param(
  [switch]$WhatIf,
  [string]$SprintName = "Sprint 0 - Foundation",
  [string]$SprintGoal = "Set up the technical and delivery foundations for WAY-MEDICAL.",
  [string]$BoardId,
  [string[]]$IssueKeys = @()
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
    [object]$Body
  )

  $baseUrl = Get-RequiredEnvVar -Name "JIRA_BASE_URL"
  $uri = "{0}{1}" -f $baseUrl.TrimEnd("/"), $Path
  $jsonBody = $Body | ConvertTo-Json -Depth 20
  return Invoke-RestMethod -Method Post -Uri $uri -Headers (Get-JiraHeaders) -Body $jsonBody
}

function Get-JiraProjectKey {
  return Get-RequiredEnvVar -Name "JIRA_PROJECT_KEY"
}

function Get-JiraBoardId {
  if (-not [string]::IsNullOrWhiteSpace($BoardId)) {
    return $BoardId
  }

  return Get-RequiredEnvVar -Name "JIRA_BOARD_ID"
}

function Get-BoardSummary {
  $boardId = Get-JiraBoardId
  return Invoke-JiraGet -Path "/rest/agile/1.0/board/$boardId"
}

function Get-ProjectSummary {
  $projectKey = Get-JiraProjectKey
  return Invoke-JiraGet -Path "/rest/api/3/project/$projectKey"
}

function New-SprintPayload {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Name,
    [Parameter(Mandatory = $true)]
    [string]$Goal,
    [Parameter(Mandatory = $true)]
    [string]$BoardId
  )

  return @{
    name = $Name
    goal = $Goal
    originBoardId = [int]$BoardId
  }
}

Write-Host "Checking Jira configuration..." -ForegroundColor Cyan
$project = Get-ProjectSummary
$board = Get-BoardSummary

Write-Host ("Connected to project: {0} ({1})" -f $project.name, $project.key) -ForegroundColor Green
Write-Host ("Connected to board: {0} (id: {1})" -f $board.name, $board.id) -ForegroundColor Green

if ($WhatIf) {
  Write-Host ("[WhatIf] Would create sprint: {0}" -f $SprintName) -ForegroundColor Yellow
  Write-Host ("[WhatIf] Goal: {0}" -f $SprintGoal) -ForegroundColor Yellow

  if ($IssueKeys.Count -gt 0) {
    Write-Host ("[WhatIf] Would add issues to sprint: {0}" -f ($IssueKeys -join ", ")) -ForegroundColor Yellow
  }

  return
}

$sprintPayload = New-SprintPayload -Name $SprintName -Goal $SprintGoal -BoardId $board.id
$sprintResult = Invoke-JiraPost -Path "/rest/agile/1.0/sprint" -Body $sprintPayload

Write-Host ("Created sprint: {0} -> id {1}" -f $sprintResult.name, $sprintResult.id) -ForegroundColor Green

if ($IssueKeys.Count -gt 0) {
  $assignPayload = @{
    issues = $IssueKeys
  }

  Invoke-JiraPost -Path "/rest/agile/1.0/sprint/$($sprintResult.id)/issue" -Body $assignPayload | Out-Null
  Write-Host ("Added issues to sprint: {0}" -f ($IssueKeys -join ", ")) -ForegroundColor Green
}
