# ConectaSocial

> **Global Solution 2026/2 - CitizenTech**  
> *Conectando pessoas, ONGs e oportunidades para transformar realidades.*

O **ConectaSocial** é um aplicativo mobile desenvolvido em React Native (Expo) que visa facilitar a conexão entre voluntários e campanhas sociais. O app consome uma API RESTful desenvolvida em Java (Spring Boot) hospedada no Microsoft Azure.

Até a etapa atual de desenvolvimento, o cadastro está limitado apenas à voluntários, sem permitir beneficiários ou ONGs. O Voluntário consegue acompanhar ativamente os eventos criados por ONGs para colaborar.
---

## Funcionalidades (Requisitos Atendidos)

*   **Autenticação de Usuários:** Fluxo completo de Login, Cadastro (com validação de Política de Uso) e Logout, com persistência de sessão via `AsyncStorage` e proteção de rotas.
*   **Integração com API e CRUD:** Consumo da API Java no Azure para listagem de campanhas. A arquitetura foi preparada para operações de Create, Read, Update e Delete (CRUD).
*   **Navegação:** Navegação fluida por meio de *Bottom Tabs* (Início, Explorar, Atividades e Perfil) e *Stack Navigator* para telas de detalhes e autenticação. Total de 6+ telas funcionais.
*   **Estilização e Identidade Visual:** Interface baseada no tema *CitizenTech*, com paleta de cores (laranja, pêssego e off-white), fontes legíveis, além de upload de foto de perfil salva localmente.
*   **Tela "Sobre o App":** Tela dedicada a exibir os desenvolvedores, a versão do aplicativo e o hash do commit atual.

## Tecnologias Utilizadas

*   **React Native** & **Expo**
*   **TypeScript**
*   **React Navigation** (Stack e Bottom Tabs)
*   **React Query (TanStack)** (Gerenciamento de estado e cache)
*   **Axios** (Consumo de API)
*   **AsyncStorage** (Persistência local de token e foto)
*   **Expo Image Picker** (Seleção de foto de perfil)

## Arquitetura do Projeto

O projeto foi estruturado seguindo o padrão de separação de responsabilidades:

```text
src/
├── control/       # Contextos globais (AuthContext, ThemeContext)
├── hooks/         # Hooks customizados (ex: useCampanhas)
├── services/      # Configuração e chamadas de API (axios, auth, campanhas)
└── view/          # Telas do aplicativo
    ├── App/       # Navegação principal (App.tsx)
    ├── cidadao/   # Telas da área logada (Home, Explorar, Atividades, Perfil, Sobre)
    └── login/     # Telas de autenticação (Login, Cadastro)

## Integração com a API

O aplicativo consome a **API REST ClyvoPet**, hospedada no Microsoft Azure:

**URL Base:** `https://global-solution-java-rm561497.azurewebsites.net/`

## Endpoints da API Consumidos

O aplicativo está integrado com a API Java hospedada no Azure. Abaixo estão os principais endpoints utilizados:

| Método | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Realiza o login e retorna o Token JWT | Pública |
| `POST` | `/api/auth/register` | Cadastra um novo usuário voluntário | Pública |
| `GET` | `/api/campanhas` | Lista todas as campanhas para a Home/Explorar | Bearer Token |
| `GET` | `/api/campanhas/{id}` | Busca os detalhes de uma campanha | Bearer Token |
| `POST` | `/api/campanhas` | Cria uma nova campanha (ONG) | Bearer Token |
| `PUT` | `/api/campanhas/{id}` | Atualiza uma campanha existente (ONG) | Bearer Token |
| `DELETE` | `/api/campanhas/{id}` | Deleta uma campanha (ONG) | Bearer Token |

> **Nota:** O aplicativo utiliza a biblioteca **Axios** com *Interceptors* para injetar automaticamente o Token JWT no cabeçalho `Authorization` de todas as requisições autenticadas.
```

## Telas do Aplicativo

| Tela | Funcionalidade |
| :--- | :--- |
| **Login** | Autenticação do usuário |
| **Cadastro** | Cadastro de novo usuário |
| **Home** | Banner + Campanhas em destaque |
| **Explorar** | Filtro de busca pra campanhas |
| **Atividades** | Tipo de perfil + Orientações |
| **Perfil** | Edição de foto de perfil + Informações de contato + Sobre + Logout |
| **Sobre** | Hash do commit + Versão do app + Equipe + Política de uso|


## Como Instalar e Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo Go (no celular) ou emulador Android/iOS

### Passos para execução

1. **Clone o repositório**
```
git clone https://github.com/nanabaa/mad-gs-2s.git
cd mad-gs-2s
```
2. Instale as dependências

```
npm install --legacy-peer-deps
```
3. Instale as dependências do Expo
   
```
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-gesture-handler
npx expo install @tanstack/react-query axios
npx expo install expo-image-picker
```
4. Inicie o projeto

```
npm run android
```

## Credenciais de Teste

| Perfil | Email | Senha |
|--------|-------|-------|
| **Voluntário** | `ana@gmail.com` | 12345678 |

## Dependências Principais
```
{
  "react-native": "0.81.5",
  "expo": "~52.0.0",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/stack": "^6.4.1",
  "@react-navigation/bottom-tabs": "^6.6.1",
  "@react-native-async-storage/async-storage": "1.23.1",
  "react-native-screens": "~4.16.0",
  "react-native-safe-area-context": "~5.6.0",
  "react-native-gesture-handler": "~2.20.2",
  "typescript": "^5.3.3"
}
```

## Observações
-Todos os dados são provenientes da API REST real no Azure.

-A sessão do usuário é persistida com AsyncStorage (não precisa logar novamente ao reabrir).

-As rotas são protegidas — só acessa telas internas após autenticação.

-O cache é gerenciado pelo TanStack Query (atualização automática após mutações).

-O app é temporariamente exclusivo para voluntários (não há perfil de ONG ou beneficiário por enquanto).

## Backend
-O backend do ClyvoPet foi desenvolvido em Java Spring Boot e está hospedado no Microsoft Azure App Service.

-Repositório do backend: https://github.com/isismodd/Global-Solution-Java.git

-URL da API: global-solution-java-rm561497.azurewebsites.net

-Banco de dados: Oracle Database

-Autenticação: Spring Security + JWT

## Grupo do Challenge
Ana Clara de Oliveira Nascimento | RM 561957
Augusto Bonomo Junior | RM 565155
Isis Macedo | RM 561497
Henrique Pereira | RM 565608
Rafael Carvalho Meireles | RM 563413

**Link do vídeo no YouTube:** 
**Link do Repositório:** https://github.com/nanabaa/mad-gs-2s.git
