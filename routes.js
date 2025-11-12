// backend/routes.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Importa a conexão

// READ (GET) - Listar todas as tarefas
router.get('/tarefas', (req, res) => {
  db.query('SELECT * FROM tarefas ORDER BY data_criacao DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// CREATE (POST) - Adicionar nova tarefa
router.post('/tarefas', (req, res) => {
  const { titulo, descricao, data_vencimento, prioridade } = req.body;
  // Validação simples
  if (!titulo || !prioridade) {
    return res.status(400).send('Título e prioridade são obrigatórios.');
  }
  const query = 'INSERT INTO tarefas (titulo, descricao, data_vencimento, prioridade) VALUES (?, ?, ?, ?)';
  db.query(query, [titulo, descricao, data_vencimento, prioridade], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// UPDATE (PUT) - Editar uma tarefa
router.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data_vencimento, prioridade, status } = req.body;
  const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, data_vencimento = ?, prioridade = ?, status = ? WHERE id = ?';
  db.query(query, [titulo, descricao, data_vencimento, prioridade, status, id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.send('Tarefa atualizada com sucesso.');
  });
});

// DELETE (DELETE) - Excluir uma tarefa
router.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tarefas WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    res.send('Tarefa excluída com sucesso.');
  });
});

module.exports = router;
