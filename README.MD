# NodeJsCrud e MongoDB

Este projeto é um simples crud de Cliente utilizando o banco de dados mongoDB

## Requisitos
```
nodejs 14.16.1
npm ou yarn
```
## Variaveis de ambiente

É necessário peencher as seguintes variaveis de ambiente:

```
MONGO_DATABASE
APP_SECRET
```
- MONGO_DATABASE é o endereço do banco de dados mongo
- APP_SECRET é a chave para validação do token jwt
- Poder ser preenchica por uma arquivo .env ou por variaveis de sistema

### Exemplo de .env
```
  MONGO_DATABASE=mongodb://localhost:27017/mongo-js
  APP_SECRET=123456789
```

## Como executar

- git clone https://github.com/esiqueira-dev/nodejs-and-mongodb-crud.git
- cd nodejs-and-mongodb-crud
- npm install/yarn install
- npm run dev/yarn dev
- Abra o navegador em: http://localhost:3333/api-docs/ para documentação e requisições
- Caso queira fazer as requisições por insomnia ou postman utilizar: http://localhost:3333

## Banco de dados
Caso queira existe um arquivo docker-compose na pasta raiz que pode ser utilizado para subir um banco de dados mongoDB e o gerenciador mongo-express. É necessário ter o docker e o docker-compose no sistema e executar o comando: <b> docker-compose up -d </b>