// routes/cursoRoutes.js
const express = require('express');
const router = express.Router();
const { getCursos, excluirCurso } = require('../controllers/cursoController'); // Importação correta

// Rota para obter cursos
router.get('/', getCursos);

// Rota para excluir curso
router.delete('/excluir/:id', excluirCurso);

module.exports = router;
