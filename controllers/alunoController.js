// controllers/alunoController.js
const supabase = require('../db');

// Função para obter alunos por curso
const getAlunosPorCurso = async (req, res) => {
  const cursoId = req.params.id; // Obtém o id do curso da URL

  if (!cursoId || isNaN(cursoId)) { // Verifica se o id é válido
    return res.status(400).json({ message: 'ID do curso inválido ou não fornecido' });
  }

  console.log(`Buscando alunos para o curso ID: ${cursoId}`); // Log para depuração

  try {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .eq('curso_id', cursoId);

    if (error) {
      console.error('Erro no Supabase (getAlunosPorCurso):', error.message);
      return res.status(400).json({ message: 'Erro ao buscar alunos', error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error.message);
    return res.status(500).send('Erro ao buscar alunos: ' + error.message);
  }
};

// Função para obter um aluno por ID
const getAlunoPorId = async (req, res) => {
  const alunoId = req.params.id; // Obtém o id do aluno da URL

  if (!alunoId || isNaN(alunoId)) { // Verifica se o id é válido
    return res.status(400).json({ message: 'ID do aluno inválido ou não fornecido' });
  }

  console.log(`Buscando aluno ID: ${alunoId}`); // Log para depuração

  try {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .eq('id', alunoId)
      .single(); // Espera um único aluno como resultado

    if (error) {
      console.error('Erro no Supabase (getAlunoPorId):', error.message);
      return res.status(400).json({ message: 'Erro ao buscar aluno', error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar aluno:', error.message);
    return res.status(500).send('Erro ao buscar aluno: ' + error.message);
  }
};

// Função para adicionar um aluno
const addAluno = async (req, res) => {
  const {
    nome, sobrenome, telefone, data_nascimento, cpf, email, curso_id,
    data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao, senha,
  } = req.body;

  console.log(`Adicionando aluno: ${nome} ${sobrenome} para o curso ID: ${curso_id}`); // Log para depuração

  try {
    const { data, error } = await supabase
      .from('alunos')
      .insert([{
        nome, sobrenome, telefone, data_nascimento, cpf, email, curso_id,
        data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao, senha,
      }]);

    if (error) {
      console.error('Erro no Supabase (addAluno):', error.message);
      return res.status(400).json({ message: 'Erro ao adicionar aluno', error: error.message });
    }

    console.log(`Aluno adicionado com sucesso: ${nome} ${sobrenome}`);
    return res.status(201).json(data);
  } catch (error) {
    console.error('Erro inesperado (addAluno):', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função para editar um aluno
const editarAluno = async (req, res) => {
  const { id } = req.params;
  const {
    nome, sobrenome, telefone, data_nascimento, cpf, email, curso_id,
    data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao, senha,
  } = req.body;

  console.log(`Editando aluno ID: ${id}`); // Log para depuração

  try {
    const { data, error } = await supabase
      .from('alunos')
      .update([{
        nome, sobrenome, telefone, data_nascimento, cpf, email, curso_id,
        data_curso, sinal, valor, presente, vendedora, formas_pagamento, observacao, senha,
      }])
      .eq('id', id);

    if (error) {
      console.error('Erro no Supabase (editarAluno):', error.message);
      return res.status(400).json({ message: 'Erro ao editar aluno', error: error.message });
    }

    console.log(`Aluno ID ${id} editado com sucesso`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro inesperado (editarAluno):', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função para excluir um aluno
const excluirAluno = async (req, res) => {
  const { id } = req.params;

  console.log(`Excluindo aluno ID: ${id}`); // Log para depuração

  try {
    const { data, error } = await supabase
      .from('alunos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro no Supabase (excluirAluno):', error.message);
      return res.status(400).json({ message: 'Erro ao excluir aluno', error: error.message });
    }

    console.log(`Aluno ID ${id} excluído com sucesso`);
    return res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (error) {
    console.error('Erro inesperado (excluirAluno):', error.message);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = { getAlunosPorCurso, addAluno, editarAluno, excluirAluno, getAlunoPorId };
