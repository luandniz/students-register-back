

<h1 align="center">
  cadastro de alunos - API
</h1>

<p align = "center">
Este é o backend da aplicação cadastro de alunos - onde os usuários podem realizar operações CRUD (Create, Read, Update, Delete) em registros de alunos. Os dados de cada aluno incluem nome, e-mail e CPF. Além disso, a aplicação permite a busca de alunos por qualquer um desses campos.
</p>

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

Node.js e npm: O Node.js é um ambiente de tempo de execução JavaScript e o npm é o gerenciador de pacotes para o Node.js. Você pode baixá-los e instalá-los a partir do site oficial do Node.js.

PostgreSQL: O PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto. Baixe e instale o PostgreSQL a partir do site oficial do PostgreSQL.

DBeaver ou outra ferramenta de administração de banco de dados: Essa ferramenta será usada para criar e administrar seu banco de dados local PostgreSQL. Você pode baixar o DBeaver ou outra ferramenta similar de sua preferência.

## Inicializando a Aplicação

1. Clone este repositório para o seu ambiente local:

   ```bash
   git@github.com:luandniz/students-register-back.git

2. Instale as dependências necessárias usando
    ```bash
    cd students-register-back
    npm install

3. Criar um banco de dados local e iniciá-lo:

Utilize o DBeaver ou outra ferramenta de administração de banco de dados para criar um banco de dados local PostgreSQL.
Após a criação do banco de dados, inicie o servidor.

4. Configurar as variáveis de ambiente:

Dentro do diretório da sua aplicação, crie um arquivo .env e defina as variáveis de ambiente necessárias, conforme instruções do arquivo .env.example:

5. Executar as migrações do TypeORM:

    Execute o seguinte comando para aplicar as migrações definidas no projeto e criar a estrutura inicial do banco de dados:
    ```bash
    npm run typeorm migration:run -- -d src/data-source


   Caso você esteja usando yarn, o comando será:
    
    ```bash
    npm run typeorm migration:run -d src/data-source

  
6. Enfim, chegamos na última etapa e você pode rodar a aplicação localmente com o seguinte comando:
   ```bash
     npm run dev


<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 4 endpoints. <br/>

<h2 align ='center'> Listando Alunos </h2>

`GET /students - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": 18,
		"name": "Mary Aneexlll",
		"email": "maryanee@email.corna",
		"cpf": "05089748987"
	},
	{
		"id": 20,
		"name": "john",
		"email": "john@email.com",
		"cpf": "05897458963"
	},
	{
		"id": 21,
		"name": "Kate",
		"email": "kate@email.com",
		"cpf": "54896321458"
	},
	{
		"id": 22,
		"name": "jessy",
		"email": "jessy@email.com",
		"cpf": "56897412365"
	},
	{
		"id": 23,
		"name": "carrie",
		"email": "carrie@email.com",
		"cpf": "52145789632"
	},
]
```


Podemos utilizar os query params para filtrar a lista, usando o tipo de busca que será name, email ou cpf e o valor a ser pesquisado.

`GET /students?email=mary - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": 2,
		"name": "Mary Kate Update",
		"email": "marykate@email.com",
		"cpf": "25896312549"
	}
]
```



<h2 align ='center'> Criação de aluno </h2>

`POST /students - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "john Doe",
	"email": "johndoe@email.com",
	"cpf": "05089748986"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /students - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"name": "john Doe",
	"email": "johndoe@email.com",
	"cpf": "05089748986",
	"id": 19
}
```


<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
No exemplo a requisição foi feita faltando o campo "name" um "email" inválido e com o tipo de "cpf" errado.

`POST /students - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"name": [
		"String must contain at least 3 character(s)"
	],
	"email": [
		"Invalid email"
	],
	"cpf": [
		"Expected string, received number"
	]
}
```

<h2 align ='center'> Update de aluno </h2>

`PATCH /students/:studentId - FORMATO DA REQUISIÇÃO`

```json
	{
		"name": "john Doe Update",
		"email": "johndoe@email.com",
		"cpf": "12345678912"
	}
```

ou por campo específico

```json
	{
		"email": "johndoe@email.com",
	}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /students/:studentsId - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": 11,
	"name": "john Doe Update",
	"email": "johndoe@email.com",,
	"cpf": "12345678912"
}
```


<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
No exemplo a requisição foi feita com um cpf que já está cadastrado no banco de dados.

`PATCH /students/:studentId - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "CPF already in use"
}
```

<h2 align ='center'> Deletar um aluno </h2>


`DELETE /students/:studentId`

```
Não é necessário um corpo da requisição.
```

Caso dê tudo certo, o status da requisição será 200:


