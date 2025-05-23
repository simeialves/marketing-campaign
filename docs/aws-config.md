# Configuração da AWS CLI e Credenciais IAM

Este guia mostra como criar um usuário IAM com permissões adequadas, gerar as credenciais de acesso (Access Key e Secret), e configurar a AWS CLI no seu ambiente.

---

## O que você vai precisar

- Uma conta na [AWS](https://aws.amazon.com/)
- Permissões de administrador para gerar as credenciais

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

Deve retornar algo como: `aws-cli/2.x.x`.

Obs.: Caso não tenha o `aws` disponível, reinicie o computador.

---

### Linux

1. Execute os seguintes comandos no terminal:

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

---

### macOS

1. Execute os seguintes comandos no terminal:

```
brew install awscli
aws --version
```

---

## Criar usuário IAM

1. Acesse: https://console.aws.amazon.com/iam/home

2. No menu lateral, clique em Usuários > Criar usuário

3. Na tela "Especificar detalhes do usuário", preencha:

   - Nome: nome de usuário de sua preferência

4. Clique em Próximo

5. Na tela "Definir permissões", escolha:

   - Na seção "Opções de permissões", selecione a opção "Anexar políticas diretamente"
   - Na seção "Políticas de permissões", marque: "AdministratorAccess"

6. Clique em Próximo

7. Na tela "Revisar e criar", revise as informações e clique em "Criar usuário"

8. Ao finalizar, localize o usuário criado e clique no nome dele:

   - Na seção "Resumo", clique em "Criar chave de acesso"

9. Na tela "Práticas recomendadas e alternativas para chaves de acesso", selecione:

   - Na seção "Caso de uso" selecione a opção "Command Line Interface (CLI)"
   - Na opção "Confirmação" selecione "Compreendo a recomendação acima e quero prosseguir para criar uma chave de acesso."

10. Clique em "Próximo"

11. Na tela "Definir etiqueta de descrição - opcional", clique em "Criar chave de acesso"

12. Na tela "Recuperar chaves de acesso", clique em "Baixar arquivo csv" para baixar o arquivo CSV com as credenciais. Guarde-a em um local seguro, pois você não poderá ver a chave secreta novamente.

---

## Configurar a AWS CLI

No terminal, digite:

```bash
aws configure
```

Preencha com os dados que foram obtidos no arquivo _csv_ no passo anterior:

```bash
AWS Access Key ID [None]: SUA_ACCESS_KEY
AWS Secret Access Key [None]: SUA_SECRET_KEY
Default region name [None]: us-east-2
Default output format [None]: json
```

Região: escolha a mesma usada no seu projeto Terraform (ex: us-east-2)

---

Para testar se a configuração foi feita corretamente, execute o seguinte comando:

```bash
aws sts get-caller-identity
```

Caso a configuração tenha sido realizada corretamente, você verá algo como:

```json
{
  "UserId": "xxxxxxxxxxxxxx",
  "Account": "xxxxxxxxxxxxxx",
  "Arn": "arn:aws:iam::xxxxxxxxxxxxxx:user/username"
}
```

Caso apareça a mensagem `An error occurred (AccessDenied) when calling the GetCallerIdentity operation: User: arn:aws:iam::xxxxxxxxxxxxxx:user/username is not authorized to perform: sts:GetCallerIdentity on resource: *`, significa que o usuário não tem permissão para executar o comando. Dessa forma, você deverá verificar as permissões do usuário criado anteriormente.

---

Segurança

- Nunca compartilhe sua chave secreta em código público!
- Se perder ou suspeitar de vazamento, desative a chave no IAM e gere outra.

---

Links úteis

- [Documentação da AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/)
- [Criar usuários no IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
