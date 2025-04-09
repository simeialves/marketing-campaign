output "marketing_campaign_api_url" {
  description = "URL de invocação da API Gateway para criar campanhas"
  value       = module.apigateway.api_endpoint
}
