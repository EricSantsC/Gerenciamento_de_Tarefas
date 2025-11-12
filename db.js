// backend/db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Ou o IP do seu servidor de banco de dados
  user: 'root',      // Seu usuário do MySQL
  password: '', // Sua senha do MySQL
  database: 'gerenciador_tarefas'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso! ID da conexão:', connection.threadId);
});

module.exports = connection;
