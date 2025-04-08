terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "aws" {
  region = "us-east-2"
}

module "sqs" {
  source = "./sqs"
}

module "iam" {
  source = "./iam"
}

module "producer_lambda" {
  source         = "./lambda"
  lambda_name    = "producer_campaign_lambda"
  handler        = "handler.handler"
  zip_file       = "${path.root}/../producer-lambda/producer_lambda.zip"
  role_arn       = module.iam.lambda_execution_role_arn
  environment = {
    QUEUE_URL = module.sqs.queue_url
  }
}

module "process_lambda" {
  source         = "./lambda"
  lambda_name    = "process_queue_lambda"
  handler        = "handler.handler"
  zip_file       = "${path.root}/../process-lambda/process_lambda.zip"
  role_arn       = module.iam.lambda_execution_role_arn
  subscribe_to_sqs = {
    queue_arn = module.sqs.queue_arn
  }
}

module "apigateway" {
  source      = "./apigateway"
  lambda_name = module.producer_lambda.lambda_function_name
  lambda_arn  = module.producer_lambda.lambda_arn
}