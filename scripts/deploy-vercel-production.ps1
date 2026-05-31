param(
    [switch]$Preview,
    [switch]$SkipDomainAliases
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Get-HeaderValue {
    param(
        [string[]]$Lines,
        [string]$HeaderName
    )

    $prefix = "${HeaderName}:"
    $line = $Lines | Where-Object { $_ -like "$prefix*" } | Select-Object -First 1

    if (-not $line) {
        return $null
    }

    return $line.Substring($prefix.Length).Trim()
}

function Assert-PublicResponse {
    param(
        [string]$Url,
        [int]$ExpectedStatus,
        [string]$ExpectedLocationPrefix
    )

    $lines = & curl.exe -sSI $Url

    if ($LASTEXITCODE -ne 0) {
        throw "Failed to fetch headers from $Url"
    }

    $statusLine = $lines | Select-Object -First 1

    if (-not $statusLine -or $statusLine -notmatch "HTTP/\S+\s+$ExpectedStatus\s") {
        throw "Unexpected response from $Url. Expected $ExpectedStatus but got: $statusLine"
    }

    if ($ExpectedLocationPrefix) {
        $location = Get-HeaderValue -Lines $lines -HeaderName 'Location'

        if (-not $location -or -not $location.StartsWith($ExpectedLocationPrefix)) {
            throw "Unexpected redirect from $Url. Expected prefix $ExpectedLocationPrefix but got: $location"
        }
    }
}

Write-Host "Building portfolio-v3..."
npm run build

if ($LASTEXITCODE -ne 0) {
    throw "Build failed."
}

$deployCommand = if ($Preview) {
    'npx vercel'
} else {
    'npx vercel --prod --yes'
}

Write-Host "Deploying with: $deployCommand"
Invoke-Expression $deployCommand

if ($LASTEXITCODE -ne 0) {
    throw "Vercel deployment failed."
}

if (-not $Preview -and -not $SkipDomainAliases) {
    & (Join-Path $PSScriptRoot 'attach-custom-domains.ps1')
}

if (-not $Preview) {
    Write-Host "Verifying public URLs..."
    Assert-PublicResponse -Url 'https://kamikagura.com' -ExpectedStatus 200
    Write-Host "kamikagura.com OK"

    Assert-PublicResponse -Url 'https://www.kamikagura.com' -ExpectedStatus 308 -ExpectedLocationPrefix 'https://kamikagura.com/'
    Write-Host "www.kamikagura.com redirect OK"
}
