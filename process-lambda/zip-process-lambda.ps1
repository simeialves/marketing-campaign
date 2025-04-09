$zipPath = "process_lambda.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

Compress-Archive -Path dist/*, node_modules, package.json -DestinationPath $zipPath

Write-Host "Arquivo $zipPath gerado com sucesso!"
