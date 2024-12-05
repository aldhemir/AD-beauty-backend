// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const alunoController = require('./controllers/alunoController');
const { getCursos, excluirCurso } = require('./controllers/cursoController');
const { login, register } = require('./controllers/authController');
const alunoRoutes = require('./routes/alunoRoutes'); // Importa as rotas dos alunos

const app = express();

app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware
app.use(express.json());
app.use(cors());

// Registro das rotas
app.use('/alunos', alunoRoutes); // Prefixo '/alunos'


// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas de API
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rotas de Login e Registro
app.post('/login', login);  // Rota de login
app.post('/register', register);  // Rota para registro de vendedor

// Rotas de Cursos
app.get('/cursos', getCursos);  // Rota para obter cursos
app.delete('/cursos/excluir/:id', excluirCurso);  // Rota para excluir curso

// Rotas de Alunos
app.get('/alunos/:cursoId', alunoController.getAlunosPorCurso);  // Rota para obter alunos de um curso específico
app.get('/alunos/individual/:id', alunoController.getAlunoPorId);  // Rota para obter um aluno específico
app.post('/add-aluno', alunoController.addAluno);  // Rota para adicionar um aluno
app.put('/editar-aluno/:id', alunoController.editarAluno);  // Rota para editar um aluno
app.delete('/excluir-aluno/:id', alunoController.excluirAluno);  // Rota para excluir um aluno

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
