param(
  [string]$EnvFile = ".env"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $EnvFile)) {
  throw "Environment file not found: $EnvFile. Create it from .env.example with 'Copy-Item .env.example .env'."
}

$lines = Get-Content -LiteralPath $EnvFile

foreach ($line in $lines) {
  if ([string]::IsNullOrWhiteSpace($line)) {
    continue
  }

  $trimmed = $line.Trim()
  if ($trimmed.StartsWith("#")) {
    continue
  }

  $parts = $trimmed -split "=", 2
  if ($parts.Count -ne 2) {
    continue
  }

  $name = $parts[0].Trim()
  $value = $parts[1].Trim()

  if ([string]::IsNullOrWhiteSpace($name)) {
    continue
  }

  [Environment]::SetEnvironmentVariable($name, $value, "Process")
  Write-Host ("Loaded {0}" -f $name) -ForegroundColor Green
}
