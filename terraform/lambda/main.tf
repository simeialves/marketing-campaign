resource "aws_lambda_function" "this" {
  function_name = var.lambda_name
  role          = var.role_arn
  handler       = var.handler
  runtime       = "nodejs18.x"
  filename      = var.zip_file
  source_code_hash = filebase64sha256(var.zip_file)

  environment {
    variables = var.environment
  }
}

# Permitir a trigger da SQS (para a consumer)
resource "aws_lambda_event_source_mapping" "sqs_trigger" {
  count            = var.subscribe_to_sqs != null ? 1 : 0
  event_source_arn = var.subscribe_to_sqs.queue_arn
  function_name    = aws_lambda_function.this.arn
  batch_size       = 1
  enabled          = true
}