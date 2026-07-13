# Nahraď TVUJ_USERNAME a TVUJ_REPO
# Usage: .\scripts\connect-github.ps1 -RepoUrl "https://github.com/username/repo.git"

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

Set-Location $PSScriptRoot\..

$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' uz existuje: $remote"
    $confirm = Read-Host "Prepsat? (y/n)"
    if ($confirm -ne "y") { exit 0 }
    git remote remove origin
}

git remote add origin $RepoUrl
git branch -M main

Write-Host "`nRemote nastaven. Pro push spust:"
Write-Host "  git push -u origin main" -ForegroundColor Cyan
