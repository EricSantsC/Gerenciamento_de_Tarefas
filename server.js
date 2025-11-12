// backend/server.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000; // Porta que o servidor irá escutar

// Middlewares
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rotas
app.use('/api', routes); // Prefixo /api para todas as rotas

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}` );
});
