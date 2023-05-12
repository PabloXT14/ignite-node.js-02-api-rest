<h1 align="center">
  <img
    src=".github/logo-ignite.svg"
    title="Logo Ignite Rocketseat"
    alt="Logo Ignite Rocketseat"
    width="30px"
  />
  API REST com Node.js
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pabloxt14/ignite-node.js-02-api-rest">

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/pabloxt14/ignite-node.js-02-api-rest" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/pabloxt14/ignite-node.js-02-api-rest">
  
  <a href="https://github.com/pabloxt14/ignite-node.js-02-api-rest/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/pabloxt14/ignite-node.js-02-api-rest">
  </a>
    
  <img alt="License" src="https://img.shields.io/github/license/pabloxt14/ignite-node.js-02-api-rest">

  <a href="https://github.com/pabloxt14/ignite-node.js-02-api-rest/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/pabloxt14/ignite-node.js-02-api-rest?style=social">
  </a>
</p>

<h4 align="center"> 
	🚧 Aplicação em Desenvolvimento 🚧
</h4>

<p align="center">
 <a href="#-about">About</a> |
 <a href="#-functionalities">Functionalities</a> |
 <a href="#-deploy">Deploy</a> | 
 <a href="#-how-it-works">How It Works</a> | 
 <a href="#-technologies">Technologies</a> | 
 <a href="#-author">Author</a> | 
 <a href="#-license">License</a>
</p>

## 💻 About

Este é o repositório de uma API REST feita em Node.js, no qual os principais objetivos foram utilizar o microframework `Fastify`, a linguagem `TypeScript`, o Query Builder `Knex.js`, validação de dados com o `Zod`, além de outras ferramentas para auxiliar durante o desenvolvimento.

Vale ressaltar que este projeto foi desenvolvido como conclusão de um desafio proposto pela trilha/curso **Ignite** oferecido pela [Rocketseat](https://www.rocketseat.com.br/).

---

## ⚙ Functionalities

### RF (Requisitos Funcionais)
- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

### RN (Regras de Negócio)
- [x] A transação deve ser do tipo crédito (somará ao valor total) ou débito(subtrairá ao valor total);
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações a qual ele criou;

---

## 🔗 Deploy

A API pode ser acessada através da seguinte URL base: https://ignite-node-js-02-api-rest.vercel.app/

> Obs: a aplicação pode demorar um pouco para entrar na primeira execução depois de um tempo, devido ao back-end estar rodando através do plano gratuito na plataforma de hospedagem.

---

## 🚀 How it works

### Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/ignite-node.js-02-api-rest.git

# Acesse a pasta do projeto no terminal/cmd
$ cd ignite-node.js-02-api-rest

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```

### Rotas

| Método | Rota	| Descrição	| Parâmetros |
| --- | --- | --- | --- |
| POST | /transactions | Cria uma nova transação | `title`, `amount`, `type`(credit,debit) |
| GET | /transactions | Retorna todas as transações de um usuários específico | `sessionId`(cookie) |
| GET | /transactions/:id | Retorna uma tarefa específica | `id`, `sessionId`(cookie) |
| GET | /transactions/summary | Resumo das transações de um usuário | `sessionId`(cookie) |
| PUT | /transactions/:id | Atualiza uma tarefa específica | `id`, `sessionId`(cookie), `title`(opcional), `amount`(opcional), `type`(credit,debit) |
| DELETE | /transactions/:id | Deleta uma tarefa específica | `id`, `sessionId`(cookie) |

> Obs: todos os parâmetros enviados e respondidos no corpo da requisição e resposta estão no formato `JSON`.

---

## 🛠 Technologies

As seguintes principais ferramentas foram usadas na construção do projeto:

#### **Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Fastify](https://www.fastify.io/)**
-   **[TypeScript](https://www.typescriptlang.org/)**
-   **[Zod](https://github.com/colinhacks/zod)**
-   **[Knex.js](https://knexjs.org/)**
-   **[SQLite](https://sqlite.org/index.html)**
-   **[PostgreSQL](https://www.postgresql.org/)**
-   **[TSX](https://github.com/esbuild-kit/tsx)**
-   **[TSUP](https://tsup.egoist.dev/)**
-   **[ESLint](https://eslint.org/)**
-   **[Dotenv](https://github.com/motdotla/dotenv)**
-   **[Vitest](https://vitest.dev/)**
-   **[Supertest](https://github.com/ladjs/supertest)**

> Veja o arquivo [package.json](./package.json) para mais detalhes sobre as dependências utilizadas no projeto.
---

## ✍ Author

<img alt="Perfil Github" title="Perfil Github" src="https://github.com/PabloXT14.png" width="100px" />

[![Linkedin Badge](https://img.shields.io/badge/-Pablo_Alan-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pabloalan/)](https://www.linkedin.com/in/pabloalan/)

[![Gmail Badge](https://img.shields.io/badge/-pabloxt14@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:pabloxt14@gmail.com)](mailto:pabloxt14@gmail.com)

---

## 📝 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações

Feito com 💜 por Pablo Alan 👋🏽 [Entre em contato!](https://www.linkedin.com/in/pabloalan/)
