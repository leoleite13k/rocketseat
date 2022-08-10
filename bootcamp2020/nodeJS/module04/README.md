# Recuperação de senha
**RF** (REQUISITOS FUNCIONAIS)

- O usuário deve poder recuperar sua senha informando o e-mail.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar a senha.

**RNF** (REQUISITOS NÃO FUNCIONAIS)

- Utilizar o mailtrap para testar envios em ambiente de dev.
- Utilizar o Amazon SES para envios em produção.
- O envio de e-mail deve acontecer em segundo plano (background job).

**RN** (REGRAS DE NEGÓCIOS)

- O link enviado por e-mail para resetar senha, deve expirar em 2 horas.
- O usuário precisa confirmar a nova senha ao resetar sua senha.

<br />

# Atualização do perfil
**RF**

- O usuário deve poder atualizar seu nome, email e senha.

**RN**

- O usuário não pode alterar seu email para um email já utilizado.
- Para atualizar sua senha, o usuário deve informar a senha antiga.
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.

<br/>

# Painel do prestador
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder visualizar todas as notificações não lidas.

**RNF**
- Os agendamentos do prestador no dia devem ser armazenadas em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador ndevem ser enviadas em real time com socket.io.

**RN**
- A notificação deve ter um status de lida e não lida para controle.

<br/>

# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestador de serviços cadastrados.
- O usuário deve poder listar os dias de um mês com pelomenos um horário disponível de um prestador.
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador.
- O usuário deve poder realizar um novo agendamento com um prestador.

**RNF**
- A listagem de prestadores deve ser armazenada em cache.

**RN**
- Cada agendamento deve durar 1 hora exatamente.
- Os agendamentos devem estar disponíveis entre 8 horas ás 18 horas (Primeiro ás 8h, último aás 17h).
- O usuário não pode agendar em um horário já ocupado.
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços consigo mesmo.
