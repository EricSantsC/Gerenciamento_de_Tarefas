# Gerenciamento_de_Tarefas
# 🚀 Sistema de Gerenciamento de Tarefas

![Badge de Status](https://img.shields.io/badge/status-conclu%C3%ADdo-green )
![Badge da Licença](https://img.shields.io/badge/license-MIT-blue )

Projeto web para gerenciamento de tarefas, implementando as operações de CRUD (Create, Read, Update, Delete). Desenvolvido como atividade acadêmica.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Exemplos de Uso (Screenshots)](#-exemplos-de-uso-screenshots)

---

## 📖 Visão Geral

A aplicação permite que usuários criem, visualizem, atualizem e excluam tarefas. A interface indica a prioridade de cada tarefa visualmente através de cores e permite a atualização do status (pendente, em andamento, concluída).

## ✨ Funcionalidades

- **[C]reate:** Formulário para adicionar novas tarefas com título, descrição, data de vencimento e prioridade.
- **[R]ead:** Listagem de todas as tarefas em formato de cards responsivos.
- **[U]pdate:** Edição de tarefas existentes com formulário pré-preenchido.
- **[D]elete:** Remoção de tarefas com diálogo de confirmação.
- **Interface Responsiva:** Funciona em desktops e dispositivos móveis.
- **Validação de Formulário:** Campos obrigatórios (título e prioridade) são validados.

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - **Bootstrap 5** (para estilização e responsividade)
  - **JavaScript (ES6+)** (para consumir a API REST)

- **Backend:**
  - **Node.js**
  - **Express.js** (para o servidor e rotas da API)
  - **MySQL (Driver `mysql`)** (para a comunicação com o banco de dados)
  - **CORS** (para permitir a comunicação entre frontend e backend)

- **Banco de Dados:**
  - **MySQL**

## 🔧 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/ ) (versão LTS recomendada)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/ )
- [Git](https://git-scm.com/ ) (para clonar o repositório)

## 🚀 Como Executar o Projeto

# 1. Clone este repositório
$ git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 2. Acesse a pasta do projeto
$ cd sistema-gerenciamento-tarefas

# 3. Configure o Banco de Dados
#    - Acesse seu cliente MySQL e execute o script abaixo:
#    - (O script está na seção "Estrutura do Banco de Dados" )

# 4. Configure e inicie o Backend
$ cd backend
$ npm install
#    - IMPORTANTE: Abra o arquivo 'db.js' e configure suas credenciais do MySQL (host, user, password).
$ npm start
#    - O servidor estará rodando em http://localhost:3000

# 5. Execute o Frontend
#    - Abra o arquivo 'frontend/index.html' em seu navegador.
#    - (Recomendado: usar a extensão "Live Server" do VS Code )


