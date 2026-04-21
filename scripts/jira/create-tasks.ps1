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

function Get-IssueTypeByNames {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$IssueTypeNames
  )

  foreach ($issueTypeName in $IssueTypeNames) {
    try {
      return Get-IssueTypeByName -IssueTypeName $issueTypeName
    }
    catch {
    }
  }

  $projectKey = Get-JiraProjectKey
  $metadata = Invoke-JiraGet -Path "/rest/api/3/issue/createmeta?projectKeys=$projectKey"
  $project = $metadata.projects | Select-Object -First 1
  $availableTypes = ($project.issuetypes | Select-Object -ExpandProperty name) -join ", "
  throw ("None of the expected issue types were found in project '{0}'. Tried: {1}. Available types: {2}" -f $projectKey, ($IssueTypeNames -join ", "), $availableTypes)
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
    throw "No $IssueTypeName found with summary '$Summary' in project '$projectKey'."
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

function New-TaskPayload {
  param(
    [Parameter(Mandatory = $true)]
    [hashtable]$Task,
    [Parameter(Mandatory = $true)]
    [string]$IssueTypeId,
    [Parameter(Mandatory = $true)]
    [string]$ParentKey
  )

  $projectKey = Get-JiraProjectKey
  return @{
    fields = @{
      project = @{
        key = $projectKey
      }
      summary = $Task.summary
      description = @{
        type = "doc"
        version = 1
        content = @(
          (New-AdfParagraph -Text $Task.description),
          (New-AdfParagraph -Text ("Parent story: {0}" -f $ParentKey))
        )
      }
      issuetype = @{
        id = $IssueTypeId
      }
      parent = @{
        key = $ParentKey
      }
    }
  }
}

$tasks = @(
  @{
    story = "Initialize Spring Boot backend architecture"
    summary = "Create Spring Boot project skeleton"
    description = "Set up the initial backend project, package layout and base dependencies."
  },
  @{
    story = "Initialize Spring Boot backend architecture"
    summary = "Configure Spring profiles for RCT PPR PROD"
    description = "Prepare environment-based configuration for the three target environments."
  },
  @{
    story = "Implement authentication and authorization foundation"
    summary = "Define user roles and access matrix"
    description = "Document and implement the initial role model for API authorization."
  },
  @{
    story = "Implement authentication and authorization foundation"
    summary = "Set up Spring Security baseline"
    description = "Create the technical baseline for secure API access and protected endpoints."
  },
  @{
    story = "Define initial domain modules and REST contracts"
    summary = "Create initial API module structure"
    description = "Organize backend modules by domain and define the first REST package structure."
  },
  @{
    story = "Define initial domain modules and REST contracts"
    summary = "Document first API contract draft"
    description = "Prepare the initial contract definitions consumed by web and mobile clients."
  },
  @{
    story = "Initialize Angular application structure"
    summary = "Create Angular workspace baseline"
    description = "Set up the Angular app structure, modules and base tooling."
  },
  @{
    story = "Initialize Angular application structure"
    summary = "Configure Angular environments"
    description = "Prepare environment files and configuration strategy for RCT PPR PROD."
  },
  @{
    story = "Implement authentication flow on web"
    summary = "Build login page and auth service"
    description = "Create the web login screen and the service layer for authentication."
  },
  @{
    story = "Implement authentication flow on web"
    summary = "Protect Angular routes by role"
    description = "Add route guards and role-aware navigation rules."
  },
  @{
    story = "Prepare core layout and navigation shell"
    summary = "Create main layout shell"
    description = "Build the initial shell with header, sidebar and content zone."
  },
  @{
    story = "Prepare core layout and navigation shell"
    summary = "Add application navigation structure"
    description = "Create the first navigation model for the main modules."
  },
  @{
    story = "Initialize React mobile application"
    summary = "Create React mobile project baseline"
    description = "Set up the mobile project structure, dependencies and coding conventions."
  },
  @{
    story = "Initialize React mobile application"
    summary = "Configure mobile environment settings"
    description = "Prepare environment-specific configuration for RCT PPR PROD."
  },
  @{
    story = "Implement secure mobile authentication flow"
    summary = "Build mobile login screen"
    description = "Create the mobile login experience and API integration entry point."
  },
  @{
    story = "Implement secure mobile authentication flow"
    summary = "Set up secure token storage"
    description = "Prepare secure local handling for authentication tokens and session state."
  },
  @{
    story = "Define mobile feature module structure"
    summary = "Organize mobile app by feature folders"
    description = "Create the first feature-based mobile module structure."
  },
  @{
    story = "Design initial PostgreSQL schema baseline"
    summary = "Define naming conventions for PostgreSQL schema"
    description = "Set conventions for tables, columns, indexes and constraints."
  },
  @{
    story = "Design initial PostgreSQL schema baseline"
    summary = "Draft initial core tables"
    description = "Define the first database entities needed by the MVP."
  },
  @{
    story = "Set up database migration strategy"
    summary = "Choose database migration tool"
    description = "Select and prepare the migration mechanism for schema versioning."
  },
  @{
    story = "Set up database migration strategy"
    summary = "Create first database migration scripts"
    description = "Prepare the initial schema migrations for non-production environments."
  },
  @{
    story = "Prepare synthetic non-production datasets"
    summary = "Define synthetic data generation rules"
    description = "Create principles for safe non-production data generation."
  },
  @{
    story = "Define data platform architecture and ownership"
    summary = "Document data domains and stewardship model"
    description = "Define who owns each data domain and how stewardship responsibilities are assigned."
  },
  @{
    story = "Define data platform architecture and ownership"
    summary = "Draft target data platform components"
    description = "List the core platform components needed for storage, exchange and governance."
  },
  @{
    story = "Establish environment data segregation strategy"
    summary = "Define separate databases by environment"
    description = "Ensure RCT, PPR and PROD each have isolated database instances and access boundaries."
  },
  @{
    story = "Establish environment data segregation strategy"
    summary = "Document environment data refresh rules"
    description = "Set the rules for seeding, refreshing and sanitizing non-production data."
  },
  @{
    story = "Define CNIL compliance baseline for data handling"
    summary = "Document CNIL data processing constraints"
    description = "Write the initial CNIL compliance constraints for collection, retention and minimization."
  },
  @{
    story = "Define CNIL compliance baseline for data handling"
    summary = "Prepare consent and retention rules baseline"
    description = "List the first retention and consent management rules impacting product and operations."
  },
  @{
    story = "Define hashing and pseudonymization strategy"
    summary = "Choose hashing algorithms and usage rules"
    description = "Select approved hashing methods and define where they must be applied."
  },
  @{
    story = "Define hashing and pseudonymization strategy"
    summary = "Define sensitive identifier pseudonymization flow"
    description = "Describe how sensitive identifiers are transformed and protected across systems."
  },
  @{
    story = "Set up CI pipeline for monorepo"
    summary = "Create initial CI workflow"
    description = "Prepare a first pipeline for validation of code quality and builds."
  },
  @{
    story = "Set up CI pipeline for monorepo"
    summary = "Add lint and test quality gates"
    description = "Define the first automated quality gates for the repositories."
  },
  @{
    story = "Define deployment pipeline for RCT PPR PROD"
    summary = "Describe deployment flow by environment"
    description = "Document the promotion strategy across RCT PPR PROD."
  },
  @{
    story = "Define deployment pipeline for RCT PPR PROD"
    summary = "Prepare environment configuration structure"
    description = "Create the deployment configuration layout for each environment."
  },
  @{
    story = "Prepare observability and monitoring baseline"
    summary = "Define application logging standard"
    description = "Set the baseline for logs, correlation and sensitive data masking."
  },
  @{
    story = "Prepare observability and monitoring baseline"
    summary = "Define monitoring and alerting baseline"
    description = "Document the first health indicators and alert expectations."
  },
  @{
    story = "Define n8n orchestration use cases and boundaries"
    summary = "List target n8n automation scenarios"
    description = "Identify the first workflows to automate and their expected value."
  },
  @{
    story = "Define n8n orchestration use cases and boundaries"
    summary = "Define n8n integration boundaries with core systems"
    description = "Clarify what n8n may orchestrate and what must remain in backend services."
  },
  @{
    story = "Design secure n8n platform architecture"
    summary = "Define n8n hosting and network model"
    description = "Prepare the hosting topology, network exposure and access restrictions for n8n."
  },
  @{
    story = "Design secure n8n platform architecture"
    summary = "Define secret and credential management for n8n"
    description = "Establish how workflow credentials are stored, rotated and audited."
  },
  @{
    story = "Prepare first medical workflow automation blueprint"
    summary = "Draft first end-to-end n8n workflow"
    description = "Describe the first automated workflow with triggers, actions and expected controls."
  },
  @{
    story = "Prepare first medical workflow automation blueprint"
    summary = "Define audit trail requirements for n8n workflows"
    description = "Specify the logs and traceability expected for automated medical-related flows."
  },
  @{
    story = "Define medical security baseline"
    summary = "Document secure development rules"
    description = "Write the first secure coding and sensitive data handling rules."
  },
  @{
    story = "Set up secrets management and access control"
    summary = "Define secret storage approach"
    description = "Choose the method for storing and rotating platform secrets."
  },
  @{
    story = "Define audit and traceability requirements"
    summary = "List auditable platform events"
    description = "Identify the events that must be tracked for operations and compliance."
  },
  @{
    story = "Define MVP scope and release roadmap"
    summary = "Prepare MVP feature list"
    description = "List the initial business capabilities targeted for the MVP."
  },
  @{
    story = "Prepare backlog structure in Jira"
    summary = "Define Jira workflow conventions"
    description = "Set the working conventions for statuses, priorities and team usage."
  },
  @{
    story = "Document functional and technical knowledge in Confluence"
    summary = "Create Confluence space structure"
    description = "Prepare the top-level documentation structure for product and engineering."
  }
)

Write-Host "Checking Jira configuration..." -ForegroundColor Cyan
$project = Get-ProjectSummary
$taskIssueType = Get-IssueTypeByNames -IssueTypeNames @("Subtask", "Sous-tâche", "Sous-tache")

Write-Host ("Connected to project: {0} ({1})" -f $project.name, $project.key) -ForegroundColor Green
Write-Host ("Child issue type detected: {0} (id: {1})" -f $taskIssueType.name, $taskIssueType.id) -ForegroundColor Green

$storyCache = @{}

foreach ($task in $tasks) {
  $existingTask = Find-IssueBySummaryAndType -Summary $task.summary -IssueTypeName "Task"
  if ($existingTask) {
    Write-Host ("Skipping Task already present: {0} -> {1}" -f $task.summary, $existingTask.key) -ForegroundColor DarkYellow
    continue
  }

  if (-not $storyCache.ContainsKey($task.story)) {
    $storyIssue = Find-IssueBySummaryAndType -Summary $task.story -IssueTypeName "Story"
    if (-not $storyIssue) {
      throw "Story not found with summary '$($task.story)' in project '$($project.key)'. Create stories first."
    }
    $storyCache[$task.story] = $storyIssue.key
    Write-Host ("Resolved Story: {0} -> {1}" -f $task.story, $storyIssue.key) -ForegroundColor DarkCyan
  }

  $parentKey = $storyCache[$task.story]

  if ($WhatIf) {
    Write-Host ("[WhatIf] Would create child task: {0} -> parent {1}" -f $task.summary, $parentKey) -ForegroundColor Yellow
    continue
  }

  $payload = New-TaskPayload -Task $task -IssueTypeId $taskIssueType.id -ParentKey $parentKey
  $result = Invoke-JiraPost -Path "/rest/api/3/issue" -Body $payload
  Write-Host ("Created child task: {0} -> {1}" -f $task.summary, $result.key) -ForegroundColor Green
}
