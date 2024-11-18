# No terminal, nevegue até a pasta onde deseja instalar o projeto e execute os seguintes comandos

```bash

git clone https://github.com/matrizz/worktradehub.git

cd worktradehub/frontend
```

## Configurar Variables de Ambiente

Para configurar as variáveis de ambiente, renomeie o arquivo `.env.template` para `.env` e substitua as variáveis de ambiente com suas credenciais. Por exemplo:

- No template `.env.template`

```env
DATABASE_URL="mysql://user:password@localhost:port/dbname"
```

- No arquivo `.env`

```env
DATABASE_URL="mysql://matrizz:senha1234@localhost:3306/worktradehub"
```

- Faça o mesmo com as outras variáveis de ambiente

## Instalando as dependências do projeto

```bash

npm install

// Isso vai instalar todas as dependências necessárias para o projeto.
```

## Configurar o banco de dados

Para configurar o banco de dados, execute o seguinte comando:

```bash

npx prisma migrate dev --name "first migration"
```

Isso vai criar as tabelas no banco de dados.

## Gerar um client prisma

Para gerar um client prisma, execute o seguinte comando:

```bash

npx prisma generate
```

Isso vai gerar um client prisma que pode ser usado para interagir com o banco de dados.

## Iniciar o projeto

Para iniciar o projeto, execute o seguinte comando:

```bash

npm run dev
```

Isso vai iniciar o projeto em modo de desenvolvimento.

## Documentação da API

Para acessar a documentação da API, execute o seguinte comando:

```bash

npm run docs
```

Isso vai abrir a documentação da API no navegador.