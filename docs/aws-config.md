# Configuração da AWS CLI e Credenciais IAM

Este guia mostra como criar um usuário IAM com permissões adequadas, gerar as credenciais de acesso (Access Key e Secret), e configurar a AWS CLI no seu ambiente.

---

## O que você vai precisar

- Uma conta na [AWS](https://aws.amazon.com/)
- Permissões de administrador ou alguém da sua equipe para gerar as credenciais
- A AWS CLI instalada no seu sistema (veja abaixo)

---

## Instalar a AWS CLI

Escolha seu sistema operacional:

### Windows

1. Baixe o instalador:
   https://awscli.amazonaws.com/AWSCLIV2.msi

2. Instale normalmente e depois abra o Prompt de Comando (cmd) ou PowerShell:

```
aws --version
```

Deve retornar algo como: `aws-cli/2.x.x`

---

### Linux

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

---

### macOS

Se tiver o Homebrew:

```
brew install awscli
aws --version
```

---

Criar usuário IAM com acesso programático

1. Acesse: https://console.aws.amazon.com/iam/home

2. No menu lateral, clique em Usuários > Adicionar usuário

3. Preencha:

- Nome: terraform-user (ou outro nome)

- Tipo de acesso: Acesso programático

4. Clique em Próximo: Permissões

5. Selecione: Anexar políticas existentes diretamente

- Marque: AdministratorAccess (ou algo mais restrito se preferir)

6. Clique em Próximo até Criar usuário

7. Ao finalizar, salve as credenciais:

- Access Key ID

- Secret Access Key

---

Configurar a AWS CLI
No terminal/cmd/powershell, digite:

```
aws configure
```

Preencha com os dados:

```
AWS Access Key ID [None]: SUA_ACCESS_KEY
AWS Secret Access Key [None]: SUA_SECRET_KEY
Default region name [None]: us-east-2
Default output format [None]: json
```

Região: escolha a mesma usada no seu projeto Terraform (ex: us-east-2)

---

Testar configuração

```
aws sts get-caller-identity
```

---

Segurança

- Nunca compartilhe sua chave secreta em código público!
- Se perder ou suspeitar de vazamento, desative a chave no IAM e gere outra.

---

Links úteis

- [Documentação da AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/)
- [Criar usuários no IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
