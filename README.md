# marketing-campaign

Este projeto implementa um serviço serverless de envio de campanhas por e-mail usando **AWS Lambda**, **API Gateway v2 (HTTP API)** e **Terraform**. Ideal para disparos de campanha em larga escala com monitoramento via **CloudWatch Logs**.

---

## Sumário

- [Contexto do Projeto](#contexto-do-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
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

## Estrutura de Pastas

```txt
marketing-campaign/
├── docs/                    # Documentação (Terraform, AWS CLI)
├── process-lambda/          # Função responsável por processar as campanhas da fila SQS
│   └── src/
│       └── services/
├── producer-lambda/         # Função responsável por receber e enviar campanhas para a fila
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       └── utils/
├── terraform/               # Infraestrutura como código com Terraform
│   ├── apigateway/
│   ├── iam/
│   ├── lambda/
│   └── sqs/
├── .gitignore                # Arquivo para ignorar arquivos no Git
└── README.md                 # Documentação do projeto
```

---

## Pré-requisitos

Antes de começar, você precisa ter:

- Node.js instalado
- Conta na AWS
- Chave de acesso IAM criada
- Terraform instalado
- AWS CLI configurado com suas credenciais
- Postman, Insomnia ou outra ferramenta de sua preferência para testar a API.

> Veja aqui:
>
> - [Instalação do Terraform](./docs/terraform.md)
> - [Configuração da AWS CLI e chave IAM](./docs/aws-config.md)

---

## Inicializando o projeto

**O processo aqui será demonstrado usando o prompt de comando do Windows, mas você pode usar o terminal de sua preferência.**

1. Se você não tem o repositório, crie uma pasta, em um local de sua preferência, e acesse-a:

```bash
mkdir marketing-campaign
cd marketing-campaign
```

2. Clone o repositório com o comando:

```bash
git clone https://github.com/simeialves/marketing-campaign.git
```

3. Acesse a pasta do projeto:

```bash
cd marketing-campaign
```

4. Acesse a pasta do projeto "process-lambda":

```bash
cd process-lambda
```

5. Instale as dependências do projeto, com o comando:

```bash
npm install
```

6. Crie o .zip do projeto `process-lambda` para fazer o deploy, com o comando:

```bash
npm run build:zip
```

Obs.1: Esse comando realizará o build do projeto dentro da pasta `process-lambda/dist` e criará um arquivo `process_lambda.zip` dentro da pasta `process-lambda`.

Obs.2: O arquivo `process_lambda.zip` será utilizado para o deploy do Lambda Process, no passo do `Terraform`.

Obs.3: Esse processo poderá ser um pouco demorado.

7. Assim que o `process_lambda.zip` for concluído, retorne para a pasta raiz do projeto, com o comando:

```bash
cd ..
```

8. Acesse a pasta do projeto "producer-lambda":

```bash
cd producer-lambda
```

9. Instale as dependências do projeto, com o comando:

```bash
npm install
```

10. Crie o .zip do projeto `producer-lambda` para fazer o deploy, com o comando:

```bash
npm run build:zip
```

Obs.1: Esse comando realizará o build do projeto dentro da pasta `producer-lambda/dist` e criará um arquivo `producer_lambda.zip` dentro da pasta `producer-lambda`.

Obs.2: O arquivo `producer_lambda.zip` será utilizado para o deploy do Lambda Producer, no passo do `Terraform`.

Obs.3: Esse processo poderá ser um pouco demorado.

11. Assim que o `producer_lambda.zip` for concluído, retorne para a pasta raiz do projeto, com o comando:

```bash
cd ..
```

## Deploy com Terraform

1. Dentro da raiz do projeto, acesse a pasta `terraform/`:

```bash
cd terraform
```

2. Execute o comando para inicializar o Terraform:

```bash
terraform init
```

Caso apareça a seguinte mensagem `Terraform has been successfully initialized!` você está pronto para prosseguir.

3. Para aplicar as alterações e criar os recursos, execute:

```bash
terraform apply --auto-approve
```

4. Ao final do processo, caso apareça a mensagem `Apply complete! Resources: 12 added, 0 changed, 0 destroyed.` você está pronto para testar o projeto.

5. Copie a URL gerada abaixo da descrição `Outputs:` do Terraform, que será algo como:

```bash
Outputs:
marketing_campaign_api_url = "https://xxxxx.execute-api.us-east-2.amazonaws.com"
```

---

## Testando o projeto

1. Abra o Postman ou outro aplicativo de sua preferência.

2. Faça uma requisição POST para a URL copiada no passo anterior, adicionando `/campaigns` ao final, ficando assim:

```bash
https://xxxxx.execute-api.us-east-2.amazonaws.com/campaigns
```

3. No corpo (Body -> raw -> JSON), envie algo como:

```bash
{
    "title": "Promoção de Outono",
    "message": "Aproveite 50% OFF em todos os produtos!",
    "emails": [
        "simeiparreiras@gmail.com",
        "simeialves@gmail.com"
    ]
}
```

4. Caso o retorno da requisição seja `{"statusCode":200,"body":"message: Success"}`, significa que o projeto está funcionando corretamente.

---

## Monitoramento com CloudWatch

1. Acesse a mesma região que você configurou o `AWS CLI`, que no nosso exemplo é `us-east-2`.

2. Acesse AWS CloudWatch

3. Vá em Logs > Grupos de Logs

4. Busque pelo nome da sua função Lambda `process_queue_lambda` ou `producer_campaign_lambda`.

5. Você poderá ver logs como:

- Na função `producer_campaign_lambda` você verá:

  - Confirmação de Recebimento do Body

  - Mensagem de confirmação de Envio para a Fila SQS

- Na função `process_queue_lambda` você verá:

  - Mensagem de confirmação de Início, com o nome da campanha que está sendo processada

  - Mensagem de confirmação para cada e-mail enviado

  - Mensagem com o conteúdo da mensagem enviada na campanha

  - Mensagem de confirmação no final do processamento da campanha

  - Tentativas de retry caso o envio falhe

  - Erros capturados

---

## Autor

Desenvolvido por Simei Alves
[LinkedIn](https://www.linkedin.com/in/simeiparreiras/) | [GitHub](https://github.com/simeialves)
