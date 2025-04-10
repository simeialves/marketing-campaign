# Instalação e Configuração do Terraform

Este guia mostra como instalar e configurar o **Terraform** no seu sistema operacional para utilizar em projetos de infraestrutura como código (IaC).

---

## Pré-requisitos

- Acesso de administrador ou políticas necessárias para criar recursos
- Acesso à internet para baixar o Terraform

---

## Windows

### 1. Baixar o Terraform

Acesse a página oficial:

https://developer.hashicorp.com/terraform/downloads

- Escolha **Windows (amd64)** e baixe o `.zip`
- Extraia o conteúdo (um único executável chamado `terraform.exe`)

### 2. Mover e configurar a variável de ambiente

- Mova o `terraform.exe` para uma pasta de fácil acesso, como:

```text
C:\terraform
```

- Abra o menu iniciar e pesquise: `Variáveis de Ambiente`
- Clique em **"Variáveis de ambiente"**
- Na seção "**Variáveis de usuário para <NOME_DO_SEU_USUARIO>**", selecione a variável `Path` e clique em `Editar...`
- Ao abrir a tela `Editar a variável de ambiente`, clique em **"Novo"** e adicione uma nova variável com o local aonde foi adicionado o `terraform.exe`, conforme abaixo:

```text
C:\terraform
```

### 3. Verificar a instalação

Abra o **Prompt de Comando (CMD)** ou **PowerShell** e digite:

```bash
terraform -v
```

Você deverá ver algo como:

```bash
Terraform v1.6.2
```

## Linux

### 1. Baixar e instalar o Terraform via terminal

```
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl unzip
curl -fsSL https://apt.releases.hashicorp.com/gpg | gpg --dearmor > hashicorp-archive-keyring.gpg
sudo mv hashicorp-archive-keyring.gpg /usr/share/keyrings/
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update
sudo apt install terraform
```

### 2. Verificar instalação

```bash
terraform -v
```

## macOS

### 1. Usando Homebrew

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

### 2. Verificar instalação

```bash
terraform -v
```

## Testar o Terraform

Para garantir que está tudo certo:

```bash
terraform version
terraform -help
```

---

## Dicas para Usar o Terraform

Para inicializar o Terraform:

```bash
terraform init
```

Para validar a configuração do Terraform:

```bash
terraform plan
```

Para aplicar as alterações e criar os recursos:

```bash
terraform apply
```

Caso quer desfazer as alterações e remover os recursos criados:

```bash
terraform destroy
```

---

## Links úteis

- [Documentação oficial do Terraform](https://developer.hashicorp.com/terraform)

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
