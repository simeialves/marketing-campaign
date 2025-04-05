variable "lambda_name" {
  description = "Lambda function name"
  type        = string
}

variable "handler" {
  description = "Handler function"
  type        = string
}

variable "zip_file" {
  description = "Path to zip file"
  type        = string
}

variable "role_arn" {
  description = "IAM role ARN"
  type        = string
}

variable "environment" {
  description = "Environment variables for Lambda"
  type        = map(string)
  default     = {}
}

variable "subscribe_to_sqs" {
  description = "Optional SQS subscription"
  type = object({
    queue_arn = string
  })
  default = null
}
