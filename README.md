# Recuperar senha

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

# Atualização de perfil

**RF (Requisitos funcionais)**

- O usuário deve poder atualizar seu nome, email e senha;

**RN (Regra de negócios)**

- O usuário não pode alterar seu e-mail para um e-mail um já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF (Requisitos funcionais)**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF (Requisitos não funcionais)**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- AS notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN (Regra de negócios)**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

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
