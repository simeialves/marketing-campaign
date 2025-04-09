resource "aws_sqs_queue" "marketing_campaign_queue" {
  name = "marketing-campaign-queue"
}

output "queue_url" {
  value = aws_sqs_queue.marketing_campaign_queue.id
}

output "queue_arn" {
  value = aws_sqs_queue.marketing_campaign_queue.arn
}
