param(
    [string]$TargetDir = 'C:\Users\kamig\OneDrive\ドキュメント\自分のポートフォリオ３'
)

$ErrorActionPreference = 'Stop'

$sourceDir = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path $TargetDir)) {
    throw "Target directory does not exist: $TargetDir"
}

$robocopyArgs = @(
    $sourceDir,
    $TargetDir,
    '/E',
    '/R:1',
    '/W:1',
    '/XD', '.git', '.vercel', 'node_modules', 'dist',
    '/XF', '.env.local'
)

Write-Host "Copying files from $sourceDir to $TargetDir"
& robocopy @robocopyArgs | Out-Host

if ($LASTEXITCODE -gt 7) {
    throw "Robocopy failed with exit code $LASTEXITCODE"
}
