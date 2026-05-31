param(
    [string]$ProductionAlias = 'portfolio-v3-kamisimokaguras-projects.vercel.app',
    [string]$ProjectName = 'portfolio-v3',
    [string]$TeamId = $env:VERCEL_TEAM_ID
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($TeamId)) {
    throw "Vercel Team ID is missing. Set the VERCEL_TEAM_ID environment variable or pass -TeamId."
}

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

$domains = @(
    'kamikagura.com',
    'www.kamikagura.com'
)

function Get-VercelToken {
    $authPath = Join-Path $env:APPDATA 'com.vercel.cli\Data\auth.json'

    if (-not (Test-Path $authPath)) {
        throw "Vercel auth file not found: $authPath"
    }

    $auth = Get-Content $authPath | ConvertFrom-Json

    if (-not $auth.token) {
        throw "Vercel auth token is missing."
    }

    return $auth.token
}

function Ensure-ProjectDomain {
    param(
        [string]$Domain,
        [string]$Redirect,
        [int]$RedirectStatusCode
    )

    $token = Get-VercelToken
    $headers = @{
        Authorization = "Bearer $token"
        'Content-Type' = 'application/json'
    }

    $body = @{
        name = $Domain
        gitBranch = $null
        redirect = $Redirect
        redirectStatusCode = if ($Redirect) { $RedirectStatusCode } else { $null }
    } | ConvertTo-Json

    $uri = "https://api.vercel.com/v10/projects/$ProjectName/domains?teamId=$TeamId"

    try {
        Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body | Out-Null
        Write-Host "Ensured project domain: $Domain"
    } catch {
        $message = $_.ErrorDetails.Message

        if ($message -and $message -match '"code":"domain_already_in_use_by_project"' ) {
            Write-Host "Project domain already exists: $Domain"
            return
        }

        if ($message -and $message -match '"code":"domain_already_in_use"' ) {
            Write-Host "Project domain already exists: $Domain"
            return
        }

        if ($message -and $message -match '"code":"forbidden"' ) {
            throw "Could not ensure project domain $Domain. Vercel API denied the request."
        }

        if ($message -and $message -match '"code":"not_found"' ) {
            throw "Could not ensure project domain $Domain. Project or team was not found."
        }

        if ($message -and $message -match '"code":"domain_already_exists"' ) {
            Write-Host "Project domain already exists: $Domain"
            return
        }

        throw
    }
}

Ensure-ProjectDomain -Domain 'kamikagura.com' -Redirect $null -RedirectStatusCode 0
Ensure-ProjectDomain -Domain 'www.kamikagura.com' -Redirect 'kamikagura.com' -RedirectStatusCode 308

foreach ($domain in $domains) {
    Write-Host "Attaching $domain to $ProductionAlias"
    npx vercel alias set $ProductionAlias $domain

    if ($LASTEXITCODE -ne 0) {
        throw "Could not finish attaching $domain."
    }
}
