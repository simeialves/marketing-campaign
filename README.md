# marketing-campaign

Este projeto implementa um serviço serverless de envio de campanhas por e-mail usando **AWS Lambda**, **API Gateway v2 (HTTP API)** e **Terraform**. Ideal para disparos de campanha em larga escala com monitoramento via **CloudWatch Logs**.

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

- Editor de código (ex: VSCode)
- Node.js instalado
- Conta na AWS
- Chave de acesso IAM criada
- Terraform instalado
- AWS CLI configurado com suas credenciais
- Postman, Insomnia ou outro aplicativo de sua preferência.

> Veja aqui:
>
> - [Instalação do Terraform](./docs/terraform.md)
> - [Configuração da AWS CLI e chave IAM](./docs/aws-config.md)

---

## Inicializando o projeto

1. Se você não tem o repositório, crie uma pasta, em um local de sua preferência, e acesse-a:

```
mkdir marketing-campaign
cd marketing-campaign
```

2. Clone o repositório com o comando:

```
git clone https://github.com/simeialves/marketing-campaign.git
```

3. Acesse a pasta do projeto:

```
cd marketing-campaign
```

4. Acesse a pasta do projeto "process-lambda":

```
cd process-lambda
```

5. Instale as dependências do projeto com o comando:

```
npm install
```

6. Crie o .zip do projeto `process-lambda` para fazer o deploy:

```
npm run build:zip
```

Obs.1: Esse comando realizará o build do projeto dentro da pasta `process-lambda/dist` e criará um arquivo `process_lambda.zip` dentro da pasta `process-lambda`.
Obs.2: O arquivo `process_lambda.zip` será utilizado para o deploy do Lambda Producer, no passo do `Terraform`.
Obs.3: Esse processo pode demorar um pouco.

7. Retorne para a pasta raiz do projeto:

```
cd ..
```

8. Acesse a pasta do projeto "producer-lambda":

```
cd producer-lambda
```

9. Instale as dependências do projeto com o comando:

```
npm install
```

9. Crie o .zip do projeto `producer-lambda` para fazer o deploy:

```
npm run build:zip
```

Obs.1: Esse comando realizará o build do projeto dentro da pasta `producer-lambda/dist` e criará um arquivo `producer_lambda.zip` dentro da pasta `producer-lambda`.
Obs.2: O arquivo `producer_lambda.zip` será utilizado para o deploy do Lambda Producer, no passo do `Terraform`.
Obs.3: Esse processo pode demorar um pouco.

10. Retorne para a pasta raiz do projeto:

```
cd ..
```

## Deploy com Terraform

1. Dentro da raiz do projeto, acesse a pasta `terraform/`:

```
cd terraform
```

2. Execute os comandos para inicializar o Terraform:

```
terraform init
```

Caso apareça a seguinte mensagem `Terraform has been successfully initialized!` você está pronto para prosseguir.

3. Para aplicar as alterações e criar os recursos, execute:

```
terraform apply --auto-approve
```

4. Ao final do processo, caso apareça a mensagem `Apply complete! Resources: 12 added, 0 changed, 0 destroyed.` você está pronto para testar o projeto.

5. Copie a URL gerada abaixo da descrição `Outputs:` do Terraform, que será algo como:

```
https://xxxxx.execute-api.us-east-2.amazonaws.com
```

---

## Testando o projeto

1. Abra o Postman ou outro aplicativo de sua preferência.

2. Faça uma requisição POST para a URL copiada no passo anterior, adicionando `/campaigns` ao final, ficando assim:

```
https://xxxxx.execute-api.us-east-2.amazonaws.com/campaigns
```

3. No corpo (Body → raw → JSON), envie algo como:

```
{
    "title": "Promoção de Outono",
    "message": "Aproveite 50% OFF em todos os produtos!",
    "emails": [
        "simeiparreiras@gmail.com",
        "stefaneparreiras@gmail.com"
    ]
}
```

4. Caso o retorno da requisição seja `{"statusCode":200,"body":"message: Success"}`, significa que o projeto está funcionando corretamente.

---

## Monitoramento com CloudWatch

1. Acesse AWS CloudWatch

2. Vá em Logs > Grupos de Logs

3. Busque pelo nome da sua função Lambda `process_queue_lambda` ou `producer_campaign_lambda`.

4. Você poderá ver logs como:

- Na função `producer_campaign_lambda` você verá:

* Confirmação de Recebimento do Body

* Mensagem de confirmação de Envio para a Fila SQS

- Na função `process_queue_lambda` você verá:

* Mensagem de confirmação de Início, com o nome da campanha que está sendo processada

* Mensagem de confirmação para cada e-mail enviado

* Mensagem com o conteúdo da mensagem enviada na campanha

* Mensagem de confirmação no final do processamento da campanha

* Tentativas de retry caso o envio falhe

* Erros capturados

---

## Autor

Desenvolvido por Simei Alves
🔗 [LinkedIn](https://www.linkedin.com/in/simeiparreiras/) | [GitHub](https://github.com/simeialves)

```

```

```

```
