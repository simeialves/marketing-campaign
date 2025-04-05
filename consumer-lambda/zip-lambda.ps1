# Caminho do zip final
$zipPath = "process_queue_lambda.zip"

# Remove o zip antigo, se existir
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# Cria o novo zip com os diretórios e arquivos necessários
Compress-Archive -Path dist/handler.js, node_modules, package.json -DestinationPath $zipPath

Write-Host "Lambda zip gerado com sucesso em $zipPath"
