# Desafio Arte Arena

<div align="center">
  <img src="https://res.cloudinary.com/drweceipc/image/upload/v1761059510/documents/sentinel_mxaaq7.png" alt="Sentinel" />
</div>

<p align="center">
  <strong>Landing Page & Dashboard Interativo para E-commerce</strong><br>
  Teste técnico para vaga de Desenvolvedor Front-End
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-características">Características</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-execução">Execução</a> •
  <a href="#-testes">Testes</a>
</p>

---

## 🚀 Sobre o Projeto

O **Desafio Arte Arena** é uma aplicação web SPA (Single Page Application) desenvolvida como teste técnico para demonstrar habilidades em desenvolvimento front-end. O foco está na criação de um dashboard moderno e funcional para o back-office de um e-commerce, com foco em experiência do usuário, componentização e boas práticas de desenvolvimento.

Este projeto adota uma **arquitetura baseada em Features (Feature-Based Architecture)** combinada com **Componentização e Separação de Camadas**. A estrutura do código é organizada em módulos independentes (como `auth`, `dashboard`,`products` , `users`, `orders`), cada um encapsulando suas próprias páginas, componentes, roteamento e, quando necessário, lógica de estado. Recursos compartilhados, como componentes genéricos, serviços de API, tipos e hooks, são centralizados na pasta shared.

Essa arquitetura foi escolhida porque **promove coesão, desacoplamento e reutilização de código**, tornando o projeto mais **modular, fácil de manter e escalável**. A divisão clara entre as responsabilidades facilita a colaboração e o entendimento do sistema como um todo.

---

## 💻 Tecnologias

Este projeto foi construído com as seguintes tecnologias:

| Tecnologia    | Descrição                                   |
| ------------- | ------------------------------------------- |
| Vue 3         | Framework JavaScript progressivo            |
| TypeScript    | Superset do JavaScript com tipagem estática |
| Tailwind CSS  | Framework utilitário para estilização       |
| Pinia         | Gerenciamento de estado                     |
| Vue Router    | Roteamento SPA                              |
| Axios         | Requisições HTTP                            |
| Vue Toastify  | Toasts para feedbacks visuais               |
| Fake Store Api| Uma API RESTful gratuita para desenvolvedores, ideal para prototipagem, testes ou ensino.        |
| Vitest          | Framework de testes                         |
| Docker        | Containerização                             |
| Atomic Design | Organização baseada em átomos/componentes   |

---
## 🔧 Configuração de Ambiente

### 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_API_URL="https://fakestoreapi.com"
```

---

## ✨ Características

- **Dashboard Interativo**: Painel com KPIs e gráficos para monitoramento de dados do e-commerce.
- **Autenticação de Usuário**: Login e registro com persistência de sessão.
- **CRUD de Produtos e Usuários**: Cadastro, listagem, detalhes e atualização de entidades.
- **Gestão de Pedidos**: Visualização de pedidos recentes e detalhes de cada pedido.
- **Layout Responsivo**: Design adaptável para diferentes tamanhos de tela.
- **Componentes Reutilizáveis**: Estrutura modular e limpa.
- **Testes Unitários**: Cobertura de testes para principais componentes e funcionalidades.
- **Middleware de Autenticação**: Controle de acesso às rotas protegidas.
- **Temas e Estilização**: Consistência visual com Tailwind CSS.

---

## 📦 Instalação e Execução Local

### ✅ Pré-requisitos

| Requisito | Versão mínima | Como verificar     |
| --------- | ------------- | ------------------ |
| Node.js   | >= 20         | `node -v`          |
| Yarn      | >= 1.22       | `yarn -v`          |
| npm       | >= 9.x        | `npm -v`           |
| Docker    | >= 24         | `docker --version` |

---

## 📁 Estrutura do Projeto

dashboard-arte-arena/
├── public/
├── src/
│ ├── test/ # Arquivos de teste
│ ├── assets/ # Recursos estáticos
│ ├── features/ # Módulos por funcionalidade (Home, auth, dashboard, products, users, orders)
│ │ ├── Home/ # Contém a Landing Page
│ │ │ ├── components/ # Componentes da Landing (LandHero, LandFeatures, etc.)
│ │ │ └── pages/ # Página principal da Landing (LandingPage.vue)
│ │ │ └── router/ # Roteamento da Home
│ │ ├── auth/ # Funcionalidades de autenticação
│ │ ├── dashboard/ # Funcionalidades do Dashboard
│ │ ├── products/ # Funcionalidades de Produtos
│ │ ├── users/ # Funcionalidades de Usuários
│ │ └── orders/ # Funcionalidades de Pedidos
│ ├── layouts/ # Componentes de layout (Sidebar, Topbar)
│ ├── router/ # Roteamento principal
│ ├── shared/ # Componentes, hooks, serviços e tipos compartilhados
│ ├── utils/ # Funções utilitárias
│ ├── App.vue
│ └── main.ts
├── .gitignore
├── Dockerfile # Arquivo para construção da imagem Docker
├── LISENCE.md
├── README.md
├── index.html
├── nginx.conf # Configuração do Nginx para servir a aplicação
├── package.json
├── shims-vue.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── yarn.lock

---

### ▶️ Execução Local

| Ambiente | Comando           | Acesso                |
| -------- | ----------------- | --------------------- |
| Dev      | `yarn dev`        | http://localhost:5173 |
|          | `npm run dev`     | http://localhost:5173 |
| Preview  | `yarn preview`    | http://localhost:4173 |
|          | `npm run preview` | http://localhost:4173 |
| Build    | `yarn build`      | Arquivos em `/dist`   |
|          | `npm run build`   | Arquivos em `/dist`   |

### 🐳 Rodando com Docker

| Etapa           | Comando                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Build da imagem | `docker build -t dashboard-arte-arena ..`                                                                      |
| Rodar container | `docker run -p 8080:80 --name arte-arena-container dashboard-arte-arena`  

---
### 🧰 Rodando Testes

| Etapa                                        | Comando           |
| -------------------------------------------- | ----------------- |
| Executa todos os testes uma vez              | `yarn vitest`       |



---


---
### 🧩 Considerações Técnicas

| Recurso         | Descrição                                        |
| --------------- | ------------------------------------------------ |
| Responsividade  | Mobile-first com Tailwind                        |
| Atomic Design   | Componentização reutilizável                     |
| Feedback visual | Toasts para ações de sucesso ou erro             |
| Código limpo    | Nomeação padrão, responsabilidades bem definidas |


---
### 📱 Interface Responsiva

| Plataforma | Suporte                |
| ---------- | ---------------------- |
| Mobile     | ✅ Totalmente adaptado |
| Desktop    | ✅ Totalmente adaptado |

---
✍️ Autor
| Nome | Contato |
| --------------- | ------------------------------------------------------- |
| Leonardo Toledo | [leotoledo010@gmail.com](mailto:leotoledo010@gmail.com) |
| GitHub | [@LeonardoToledo0](https://github.com/LeonardoToledo0) |

---
## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

Veja o arquivo [LICENSE](./LICENSE) para detalhes completos.

---

Você pode usar, modificar e distribuir o código conforme os termos da licença MIT.




