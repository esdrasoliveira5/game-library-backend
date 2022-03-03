# Game-library-backend

## Sumário

- [Descrição](#Descrição)
- [Pré-requisitos](#Pre-requisitos)
  - [Instalação](#Instalação)
  - [Instruções para iniciar o projeto](#Intruções-para-iniciar-o-projeto)
- [Documentação](#Documentação)
  - [Verificar o estado da Api](#Verificar-o-estado-da-Api)
  - [Registrar usuário](#Registrar-usuário)
  - [Atualizar usuário](#Atualizar-usuário) 
  - [Deletar usuário](#Deletar-usuário)
  - [Buscar usuário](#Buscar-usuário)
  - [Criar categoria](#Criar-categoria)
  - [Listar todas as categorias relacionadas ao usuário](#Listar-todas-as-categorias-relacionadas-ao-usuário)
  - [Adiciona um game a coleção](#Adiciona-um-game-a-coleção)
  - [Atualiza a categoria de uma coleção](#Atualiza-a-categoria-de-uma-coleção)
  - [Deleta um game de uma coleção](#Deleta-um-game-de-uma-coleção)
  - [Lista uma coleção](#Lista-uma-coleção)
  - [Lista todas as coleções de um usuário](#Lista-todas-as-coleções-de-um-usuário)
  - [Lista todas as coleções de um usuário pela categoria](#Lista-todas-as-coleções-de-um-usuário-pela-categoria)


<br>

## Descrição

**Objetivo**: Este projeto, foi desenvolvido uma CRUD que gerencia dados de umusuario em um site de catalogo dee games, no formato de uma API RESTful, utilizando Typescript.

- Arquitetura REST;
- Autenticações e Permissões com JWT;
- Cryptografia de senha com bcrypt
- Banco de Dados PostgreSQL;
- Docker

## Pré-requisitos

- `npm version 6.14.13`
- `node version 14.17.0`
- `docker`
- `docker-compose`

## Instalação

- Clone o repositório
  ```sh
    git clone git@github.com:esdrasoliveira5/game-library-backend.git
- Vá para a pasta da aplicação
  ```sh
    cd game-library-backend

## Instruções para iniciar o projeto

<br>

- Comando para iniciar

  ```sh
    sudo docker-compose up

- Instalar dependencias

  ```sh
    npm install

- Configurar prisma client

  ```sh
    npx prisma generate

- Gerar bacno de dados

  ```sh
    npx prisma migrate dev

<br/>

## Documentação

<br/>

### **Verificar o estado da Api**
##### `GET` /
<br/>

  Esse endpoint verifica se a Api esta online e retorna um objeto com a mensagem `'Api Online!!`

  - Exemplo `response body`
    ```json
      {
          "message": "'Api Online!!"
      }
    ```
  <br/>

### **Registrar usuário**
##### `POST` /user
<br/>

  Esse endpoint registra um usuário e retorna um objeto com um token.

  - Exemplo `request body` 
    ``` json
      {
          "name": "name",
          "lastName": "lastname",
          "email": "email@email.com",
          "password": "123456789",
          "avatar": "imageurl"
      }
    ```

  - Exemplo `response body`
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
    ```
<br/>

### **Logar usuário** 
##### `POST` /user/login
  <br/>

  Esse endpoint valida o login do usuário e retorna um objeto com um  token.

  - Exemplo `request body` 
    ``` json
      {
        {
          "email": "email@email.com",
          "password": "123456789",
        }
      }
    ```

  - Exemplo `response body`
    ```json
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZXhlbXBsZUBlbWFpbC5jb20iLCJpYXQiOjE2NDUxNDI0NzksImV4cCI6MTY0NTc0NzI3OX0.sRZtnLnkGYHjhFBXJISTcX41QbvpGxll-wUnU-kGxyE"
      }
    ```
  <br/>

### **Atualizar usuário**
##### `PUT` /user/update
  <br/>

  Este endpoint atualiza os dados de um usuário e retorna os dados atualizados.

  *Obs: Apenas o usuário que criou o usuario pode atualizar.* 
  *Obs2: Apenas os campos email e id nao podem ser atualizados.* 

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```
  - Exemplo `request body` 
    ``` json
      {
          "name": "name",
          "lastName": "lastname",
          "email": "email@email.com",
          "password": "123456789",
          "avatar": "imageurl"
      }
    ```

  - Exemplo `response body`
    ```json
        {
            "id": "0aef7d0c-7c21-4c68-85d4-05007b69fd06",
            "name": "name",
            "lastName": "lastname",
            "email": "email@email.com",
            "password": "$2b$06$CDrEn2xq88mZ77kWfdTAoe/scDxlph8x0w9ggClUNhC9T3fZ7cul2",
            "avatar": "imageurl"
        }
    ```
  <br/>

### **Deletar usuário**
##### `DELETE` /user/delete
  <br/>

  Esse endpoint deleta um usuário cadastrado e nao retorna conteúdo.

  *Obs: Apenas o usuário que criou o usuario pode deletar.* 

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  <br/>

### **Buscar usuário**
##### `GET` /user
  <br/>

  Esse endpoint busca um usuario cadastrado pelo token.
  

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      {
          "name": "name",
          "lastName": "lastname",
          "email": "email@email.com",
          "avatar": "imageurl"
      }
    ```
  <br/>

### **Criar categoria**
##### `POST` /categories
  <br/>

  Esse endpoint cria e retorna uma categoria.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
      {
          "name": "categorie1"
      }
    ```
    
  - Exemplo `response body`
    ```json
      {
          "id": 18,
          "name": "categorie1",
          "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
      }
      ```
  <br/>

### **Listar todas as categorias relacionadas ao usuário**
##### `GET` /categories
  <br/>

  Esse endpoint lista todos os pedidos e os retorna em um array.
  
  *Obs: Retorna apenas as categorias criadas pelo usuario.* 

  - Exemplo `request headers`
    ```json
        {
          "Authorization": "(Bearer Token)"
        }
    ```

  - Exemplo `response body`
    ```json
        [
            {
                "id": 13,
                "name": "Sem categoria",
                "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
            },
            {
                "id": 14,
                "name": "Jogando",
                "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
            },
            {
                "id": 15,
                "name": "Completo",
                "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
            },
            {
                "id": 16,
                "name": "Não joguei",
                "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
            },
            {
                "id": 17,
                "name": "testeGame2",
                "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
            },
            {
                "id": 18,
                "name": "categorie1",
                "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736"
            }
        ]
    ```
  <br/>
  
### **Adiciona um game a coleção**
##### `POST` /collections
  <br/>

  Esse endpoint adiciona um game a coleção do usuário.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
      {
          "id": 12345,
          "name": "game1",
          "image": "image"
      }
      ```
    
  - Exemplo `response body`
    ```json
        {
          "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
          "gamesId": 12345,
          "categoriesId": 13
        }
      ```
  <br/>

  
### **Atualiza a categoria de uma coleção**
##### `PUT` /collections/update
  <br/>

  Esse endpoint atualiza a categoria de um game na coleção do usuário e retorna os dados atualizados.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
        {
            "gamesId": 12345,
            "categoriesId": 1
        }
      ```
    
  - Exemplo `response body`
    ```json
        {
            "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
            "gamesId": 12345,
            "categoriesId": 1
        }
      ```
  <br/>

  
### **Deleta um game de uma coleção**
##### `DELETE` /collections/delete
  <br/>

  Esse endpoint deleta um game de uma coleção.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
        {
            "gamesId": 12345,
        }
      ```
  <br/>


  
### **Lista  uma coleção**
##### `GET` /collections/:id
  <br/>

  Esse endpoint lista uma coleção pelo id do game.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `request body` 
    ```json
      {
          "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
          "gamesId": 12345,
          "categoriesId": 13
      }
      ```
  <br/>



### **Lista todas as coleções de um usuário**
##### `GET` /collections/user/:page
  <br/>

  Esse endpoint retorna todas as coleções que pertencem ao usuario do token em paginas de até 20 objetos.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      [
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 12345,
              "categoriesId": 3,
              "games": {
                  "id": 12345,
                  "name": "game1",
                  "image": "image"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 12435,
              "categoriesId": 2,
              "games": {
                  "id": 12435,
                  "name": "game2",
                  "image": "image2"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13423,
              "categoriesId": 1,
              "games": {
                  "id": 13423,
                  "name": "game4",
                  "image": "image4"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13435,
              "categoriesId": 1,
              "games": {
                  "id": 13435,
                  "name": "game3",
                  "image": "image3"
              }
          }
      ]
      ```
  <br/>
    
### **Lista todas as coleções de um usuário pela categoria**
##### `GET` /collections/user/:page/:id
  <br/>

  Esse endpoint retorna todas as coleções que pertencem ao usuario relacionadas a categoria em paginas de até 20 objetos.

  - Exemplo `request headers`
      ```json
      {
        "Authorization": "(Bearer Token)"
      }
      ```

  - Exemplo `response body`
    ```json
      [
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13423,
              "categoriesId": 1,
              "games": {
                  "id": 13423,
                  "name": "game4",
                  "image": "image4"
              }
          },
          {
              "userId": "38000780-44bc-488a-bd17-3c3c7dd0a736",
              "gamesId": 13435,
              "categoriesId": 1,
              "games": {
                  "id": 13435,
                  "name": "game3",
                  "image": "image3"
              }
          }
      ]
      ```
  <br/>