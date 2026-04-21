param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("feature", "release", "hotfix")]
  [string]$Type,

  [string]$Scope,
  [string]$JiraKey,

  [Parameter(Mandatory = $true)]
  [string]$Name
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Require-CleanGitStatus {
  $status = git status --short
  if (-not [string]::IsNullOrWhiteSpace(($status | Out-String))) {
    throw "Git working tree is not clean. Commit or stash current changes before creating a branch."
  }
}

function Normalize-Part {
  param([string]$Value)

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $null
  }

  $normalized = $Value.Trim().ToLowerInvariant()
  $normalized = $normalized -replace "\s+", "-"
  $normalized = $normalized -replace "[^a-z0-9\-]", "-"
  $normalized = $normalized -replace "-+", "-"
  return $normalized.Trim("-")
}

Require-CleanGitStatus

switch ($Type) {
  "feature" { $baseBranch = "develop" }
  "release" { $baseBranch = "develop" }
  "hotfix" { $baseBranch = "main" }
}

$namePart = Normalize-Part -Value $Name
if ([string]::IsNullOrWhiteSpace($namePart)) {
  throw "Branch name cannot be empty after normalization."
}

if ($Type -eq "release") {
  $branchName = "release/$namePart"
}
else {
  $scopePart = Normalize-Part -Value $Scope
  $jiraPart = $JiraKey.Trim().ToUpperInvariant()

  if ([string]::IsNullOrWhiteSpace($scopePart)) {
    throw "Scope is required for feature and hotfix branches."
  }

  if ([string]::IsNullOrWhiteSpace($jiraPart)) {
    throw "JiraKey is required for feature and hotfix branches."
  }

  $branchName = "{0}/{1}-{2}-{3}" -f $Type, $scopePart, $jiraPart, $namePart
}

git checkout $baseBranch
git checkout -b $branchName

Write-Host ("Created branch: {0}" -f $branchName) -ForegroundColor Green
Write-Host ("Base branch: {0}" -f $baseBranch) -ForegroundColor Green

