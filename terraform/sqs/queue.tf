resource "aws_sqs_queue" "campaign_queue" {
  name = "campaign-queue"
}

output "queue_url" {
  value = aws_sqs_queue.campaign_queue.id
}

output "queue_arn" {
  value = aws_sqs_queue.campaign_queue.arn
}
