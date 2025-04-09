# marketing-campaign

Este projeto implementa um serviço serverless de envio de campanhas por e-mail usando **AWS Lambda**, **API Gateway v2 (HTTP API)** e **Terraform**. Ideal para disparos de campanha em larga escala com monitoramento via **CloudWatch Logs** e lógica de **retry** simples em falhas de envio.

---

## Sumário

- [Contexto do Projeto](#contexto-do-projeto)
- [Arquitetura Utilizada](#arquitetura-utilizada)
- [Pré-requisitos](#pré-requisitos)
- [Instalação do Terraform](./docs/terraform.md)
- [Configuração da AWS CLI](./docs/aws-config.md)
- [Deploy com Terraform](#deploy-com-terraform)
- [Testando com Postman](#testando-com-postman)
- [Monitoramento com CloudWatch](#monitoramento-com-cloudwatch)
- [Autor](#autor)

---

## Contexto do Projeto

Este projeto foi desenvolvido como parte de um desafio técnico que exigia:

- Criação de uma API REST com Lambda + API Gateway
- Processamento de campanhas com envio de e-mails
- Lógica de tratamento de erros e retentativas
- Monitoramento via logs CloudWatch
- Infraestrutura como código via Terraform

---

## Arquitetura Utilizada

Usuário (Postman) ↓ API Gateway (HTTP API) ↓ AWS Lambda (Node.js) ↓ EmailService com retry e logs ↓ CloudWatch Logs

---

## Pré-requisitos

Antes de começar, você precisa ter:

- Node.js instalado
- Conta na AWS
- Chave de acesso IAM criada
- Terraform instalado
- AWS CLI configurado com suas credenciais

> Veja aqui:
>
> - [Instalação do Terraform](./docs/terraform.md)
> - [Configuração da AWS CLI e chave IAM](./docs/aws-config.md)

---

## Deploy com Terraform

1. Acesse a pasta do projeto `terraform/`
2. Atualize o valor de `lambda_name` e `lambda_arn` no `terraform.tfvars`
3. Execute os comandos:

```
terraform init
terraform apply --auto-approve
```

4. Copie a URL gerada na saída:
   https://xxxxx.execute-api.us-east-2.amazonaws.com

---

## Testando com Postman

1. Abra o Postman

2. Faça uma requisição POST para:

```
https://xxxxx.execute-api.us-east-2.amazonaws.com/campaigns
```

3. No corpo (Body → raw → JSON), envie algo como:

```
{
  "title": "Nova campanha",
  "message": "Olá! Esta é uma campanha de teste.",
  "emails": [
    "simeiparreiras@gmail.com",
    "simeialves@email.com"
  ]
}
```

4. Você verá os logs no console ou via CloudWatch!

---

## Monitoramento com CloudWatch

1. Acesse AWS CloudWatch

2. Vá em Logs > Log groups

3. Busque pelo nome da sua função Lambda

4. Você poderá ver logs como:

- Campanha iniciada

- Email enviado

- Tentativas de retry

- Erros capturados

---

## Autor

Desenvolvido por Simei Alves
🔗 [LinkedIn](https://www.linkedin.com/in/simeiparreiras/) | [GitHub](https://github.com/simeialves)
