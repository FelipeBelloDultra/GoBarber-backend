# GoBarber - Backend

## 📃 Sobre
API Rest servindo como Backend da aplicação, que contém todas as regras de negócios, tratamento de erros, persistência no banco, persistência em cache e serve dados tanto para o Frontend quanto para o Mobile.

## 📚 Requisitos
* Usar o [Git](https://github.com/) para clonar o repositório.
* Usar o [NodeJS](https://nodejs.org/en/) para rodar o projeto.
* Usar o [Docker](https://www.docker.com/) para persistência no banco.
* Usar seu dispositivo ou um emalador [iOS](https://developer.apple.com/xcode/) ou [Android](https://developer.android.com/studio)

## ⚙ Tecnologias usadas
Foram usadas várias tecnologias e libs ao decorrer do desenvolvimento, vou citar algumas.

1. [NodeJS](https://nodejs.org/en/)
2. [Typescript](https://www.typescriptlang.org/)
3. [AWS SDK](https://aws.amazon.com/pt/sdk-for-node-js/)
4. [Date FNS](https://date-fns.org/)
5. [MongoDB](https://mongodb.github.io/node-mongodb-native/)
6. [Redis](https://github.com/luin/ioredis)
7. [Postgres](https://node-postgres.com/)
8. [Typeorm](https://typeorm.io/)
9. [Celebrate](https://github.com/arb/celebrate)
10. [Express](https://expressjs.com/)

## 🚀 Rodando o Backend

1. Instale as imagens no docker
```bash
# Instale a imagem do postgres em seu Docker
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Inicie seu Docker com o postgres
docker start gostack_postgres

# Instale a imagem do MongoDB em seu Docker
docker run --name mongodb -p 27017:27017 -d -t mongo

# Inicie o MongoDB em seu docker
docker start mongodb

# Instale a imagem do Redis Alphine em seu Docker
docker run --name redis -p 6379:6379 -d -t redis:alphine

# Inicie o Redis em seu docker
docker start redis
```

2. Clone o projeto
```bash
# Clone o repositório para rodar em sua máquina
git clone https://github.com/FelipeBelloDultra/GoBarber-backend.git

# Instale as dependências
# Se estiver usando o "Yarn" como gerenciador de dependências use o comando na raiz de seu projeto
yarn

# Se esiver usando npm use o comando
npm install
```

3. Troque as os dados sensíveis no .env

4. Inicie o Backend
```bash
# Entre na pasta criada pelo git clone
cd GoBarber-backend

# Rode as migrations
yarn typeorm migration:run

# Inicie o servidor
yarn dev:server
```

## 💼 Funcionalidades

### Recuperar senha

**RF (Requisitos funcionais)**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos não funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regra de negócios)**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar ela;

### Atualização de perfil

**RF (Requisitos funcionais)**

- O usuário deve poder atualizar seu nome, email e senha;

**RN (Regra de negócios)**

- O usuário não pode alterar seu e-mail para um e-mail um já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

### Painel do prestador

**RF (Requisitos funcionais)**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF (Requisitos não funcionais)**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN (Regra de negócios)**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de serviços

**RF (Requisitos funcionais)**

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar as dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve realizar um novo agendamento com um prestador;

**RNF (Requisitos não funcionais)**

- A listagem de prestadores deve ser armazenadas em cache;

**RN (Regra de negócios)**

- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
