# Spusť po vyplnění .env.local — ověří připojení
# Usage: .\scripts\check-env.ps1

$required = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
)

$optional = @(
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",
    "TELEGRAM_BOT_TOKEN"
)

$envFile = Join-Path $PSScriptRoot "..\.env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "CHYBA: .env.local neexistuje. Zkopiruj .env.example -> .env.local" -ForegroundColor Red
    exit 1
}

$envContent = Get-Content $envFile -Raw
$missing = @()

foreach ($key in $required) {
    if ($envContent -notmatch "$key=.+") {
        $missing += $key
    }
}

if ($missing.Count -gt 0) {
    Write-Host "CHYBI povinne promenne:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" }
    exit 1
}

Write-Host "OK: Vsechny povinne env promenne jsou nastaveny" -ForegroundColor Green

foreach ($key in $optional) {
    if ($envContent -match "$key=.+") {
        Write-Host "  [+] $key" -ForegroundColor Green
    } else {
        Write-Host "  [-] $key (volitelne)" -ForegroundColor Yellow
    }
}

# Test Supabase URL format
if ($envContent -match "NEXT_PUBLIC_SUPABASE_URL=(https://[^.]+\.supabase\.co)") {
    Write-Host "`nSupabase URL format OK" -ForegroundColor Green
} else {
    Write-Host "`nUPOZORNENI: Supabase URL nevypada spravne" -ForegroundColor Yellow
}
