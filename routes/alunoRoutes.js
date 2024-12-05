// routes/alunoRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAlunosPorCurso,
  addAluno,
  editarAluno,
  excluirAluno
} = require('../controllers/alunoController');

// Rota para buscar alunos por curso
router.get('/curso/:id', getAlunosPorCurso);

// Rotas para adicionar, editar e excluir alunos
router.post('/add', addAluno);
router.put('/editar/:id', editarAluno);
router.delete('/excluir/:id', excluirAluno);

module.exports = router;
