# 📃 Sobre o Projeto

O **ImobiFácil** é um sistema de gestão imobiliária desenvolvido com **NestJS** e **Prisma ORM**, com autenticação via **Google OAuth 2.0** e controle de acesso baseado em papéis (**RBAC**).  
O sistema conecta **corretores** e **clientes**, permitindo gerenciamento de cadastros, imóveis e dados complementares.

**Fluxo de uso:**  
Após autenticar com o Google, o usuário escolhe se deseja se registrar como **corretor** ou **cliente**:

- **Corretor**: informa **nome completo**, **número do CRECI**, **status do CRECI** (apenas ativos são aceitos) e **localização** (estado e cidade).
- **Cliente**: informa **nome completo** e **localização** (estado e cidade).

### Tecnologias Escolhidas e suas funcionalidades

| Tecnologia/Ferramenta                                                                                                                  | Para que serve                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --- |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nodejs" alt="Node.js"> **Node.js**                                     | Ambiente de execução JavaScript no servidor. Alta performance, ideal para APIs REST e apps modernos.                                |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=ts" alt="TypeScript"> **TypeScript (TS)**                              | Superset do JavaScript com tipagem estática. Mais segurança e produtividade no desenvolvimento.                                     |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nest" alt="NestJS"> **NestJS**                                         | Framework backend modular baseado em TypeScript. Excelente para construção de APIs escaláveis e testáveis.                          |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=prisma" alt="Prisma ORM"> **Prisma ORM**                               | ORM moderno, rápido e com suporte a tipagem. Interage com o banco de forma segura e eficiente.                                      |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=postgres" alt="PostgreSQL"> **PostgreSQL (Railway)**                   | Banco de dados relacional confiável e robusto. Railway facilita o deploy e gestão inicial.                                          |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=aws" alt="AWS"> **AWS (futuramente)**                                  | Infraestrutura escalável para banco, arquivos (S3), serviços em nuvem e deployment (EKS).                                           |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=docker" alt="Docker"> **Docker**                                       | Containerização da aplicação. Garante portabilidade, isolamento de ambiente e compatibilidade entre dev e produção.                 |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=kubernetes" alt="Kubernetes"> **Kubernetes**                           | Orquestração de contêineres Docker. Gerencia escalabilidade, balanceamento de carga, atualizações contínuas e alta disponibilidade. |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nest" alt="class-validator"> **class-validator**                       | Validação de dados com decorators em DTOs NestJS. Garante que os dados sejam corretos antes de processá-los.                        |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=haskell" alt="Bcrypt"> **Bcrypt**                                      | Hash seguro de senhas. Protege os dados sensíveis dos usuários.                                                                     |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=gmail" alt="Nodemailer"> **Nodemailer**                                | Envio de emails SMTP (ex: recuperação de senha, avisos de agendamento).                                                             |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=googlecloud" alt="Google OAuth"> **Google Provider (OAuth)**           | Login seguro com conta Google. Melhora a experiência do usuário.                                                                    |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=react" alt="Socket.IO"> **Socket.IO**                                  | Comunicação em tempo real entre cliente e corretor via WebSockets (ex: chat).                                                       |     |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=redis" alt="Redis"> **Redis**                                          | Banco de dados em memória. Usado para cache, gerenciamento de sessões e suporte a notificações em tempo real (usado com Socket.IO). |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nest" alt="Autoguard"> **Autoguard**                                   | Geração automática de validações e contratos seguros entre client/backend.                                                          |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nodejs" alt="Axios"> **Axios**                                         | Cliente HTTP usado para comunicação com APIs externas (ex: serviços de geolocalização, e-mail, etc.).                               |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nodejs" alt="Helmet"> **Helmet**                                       | Middleware de segurança para proteger a aplicação contra vulnerabilidades comuns da web.                                            |
| <img height="20" width="25" src="https://skillicons.dev/icons?i=nodejs" alt="Rate Limiter"> **Rate Limiter (rate-limiter-flexible)**   | Previne ataques de força bruta limitando o número de requisições por IP.                                                            |
| <img height="17" width="21" src="http://fruzenshtein.com/wp-content/uploads/2014/12/swagger-ui-300x293.png" alt="Swagger"> **Swagger** | Geração automática de documentação interativa da API. Útil para testes e integração com o front.                                    |

---

# 📂 Estrutura de Pastas

```bash
/imobifacil-backend
│
├── prisma/                                  # Configuração e definição do banco de dados
│   └── schema.prisma                        # Schema do banco (User, Corretor, Cliente) usando Prisma ORM
│
├── src/                                     # Código-fonte principal da aplicação
│   ├── lib/                                 # Bibliotecas e utilitários globais
│   │   └── prisma.ts                        # Instância única do PrismaClient para acesso ao banco
│   │
│   ├── middlewares/                         # Middlewares e Guards (NestJS)
│   │   ├── auth.guard.ts                    # Verifica se o usuário está autenticado (JWT)
│   │   └── roles.guard.ts                   # Restringe acesso com base no papel (RBAC)
│   │
│   ├── models/                              # Módulos organizados por domínio da aplicação
│   │   ├── auth/                            # Módulo de autenticação
│   │   │   ├── controllers/                 # Recebem e tratam requisições HTTP
│   │   │   │   └── auth.controller.ts       # Endpoints de login, cadastro e Google OAuth
│   │   │   ├── dtos/                        # Data Transfer Objects — validação e tipagem de dados
│   │   │   │   └── auth.dto.ts              # Definição de inputs/outputs da autenticação
│   │   │   ├── interfaces/                  # Contratos que o service/repository devem seguir
│   │   │   │   ├── authRepository.interface.ts  # Contrato de acesso a dados (Prisma) p/ Auth
│   │   │   │   └── authService.interface.ts # Contrato da camada de serviço (regras Auth)
│   │   │   ├── repository/                  # Comunicação com o banco de dados
│   │   │   │   └── auth.repository.ts       # CRUD e consultas de usuários
│   │   │   ├── service/                     # Regras de negócio da autenticação
│   │   │   │   └── auth.service.ts          # Implementa IAuthService: valida token Google, emite JWT, define role (RBAC), completa perfis e verifica CRECI
│   │   │   └── auth.module.ts               # Configuração e injeção de dependências do módulo Auth
│   │   ├── corretor/                        # Módulo para gestão de corretores (cadastro, CRECI, status)
│   │   ├── clientes/                        # Módulo para gestão de clientes
│   │   ├── imovel/                          # Módulo de imóveis (CRUD, listagem, busca, etc.)
│   │
│   ├── app.module.ts                        # Módulo raiz do NestJS — importa todos os outros módulos
│   └── main.ts                              # Arquivo inicial — inicializa a aplicação
│
├── api.http                                 # Arquivo para testar rotas (extensão REST Client no VSCode)
├── .env                                     # Variáveis de ambiente (DB, Google OAuth, JWT)
├── .env.example                             # Exemplo de variáveis de ambiente para configuração local
├── package.json                             # Configurações do projeto e dependências
├── tsconfig.json                            # Configuração do TypeScript
└── README.md                                # Documentação do projeto

```

## 🚀 Começando

### 1. Clonar o repositório

```bash
git clone  https://github.com/Ameglebm/backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Configure o arquivo `.env` com a sua URL de conexão do banco PostgreSQL

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/imobifacil"
JWT_SECRET="sua_chave_jwt"
GOOGLE_CLIENT_ID="id_do_google"
GOOGLE_CLIENT_SECRET="segredo_do_google"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
CLIENT_URL="http://localhost:5173"
```

### 4. Rodar as migrações e iniciar o projeto

```bash
npx prisma migrate dev
npm run start:dev
```

## 🔢 Scripts disponíveis

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod

# Rodar testes
npm run test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 🗕️ Funcionalidades principais

- Login seguro com Google OAuth 2.0
- Emissão de JWT para autenticação
- RBAC (controle de acesso baseado em papéis) para CORRETOR e CLIENTE
- Cadastro de corretores com verificação de CRECI
- CRUD de imóveis
- Middleware para autenticação e autorização

## 📦 Deploy

O projeto pode ser deployado em qualquer ambiente Node.js, como:

- Railway
- Render
- AWS
- Heroku

## 📦 Módulos Principais

| Módulo     | Descrição                           | Endpoints Principais                |
| ---------- | ----------------------------------- | ----------------------------------- |
| Auth       | Autenticação via Google OAuth + JWT | /auth/google, /auth/google/callback |
| Corretores | Cadastro e gestão de corretores     | /corretores                         |
| Clientes   | Cadastro e gestão de clientes       | /clientes                           |
| Imóveis    | CRUD de imóveis                     | /imoveis                            |

## 🚧 Autor

- Nome: **Alisson**
- GitHub: [Ameglebm](https://github.com/Ameglebm)
- Email: [ameglevr@gmail.com](mailto:ameglevr@gmail.com)
