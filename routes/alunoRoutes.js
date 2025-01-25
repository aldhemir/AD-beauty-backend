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

// Rota para adicionar um aluno
router.post('/add', addAluno);

// Rota para editar um aluno
router.put('/editar/:id', editarAluno);

// Rota para excluir um aluno
router.delete('/excluir/:id', excluirAluno);

module.exports = router;
