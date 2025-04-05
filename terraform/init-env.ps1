# terraform/init-env.ps1

$envVars = Get-Content ../.env | Where-Object { $_ -match "=" }

foreach ($line in $envVars) {
    $parts = $line -split "="
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
}

Write-Host "Variáveis de ambiente carregadas com sucesso."