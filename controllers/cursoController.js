const supabase = require('../db'); // Importando o cliente do Supabase


// Função para listar todos os cursos
const getCursos = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cursos')
      .select('*');

    if (error) {
      throw new Error(error.message); // Lançar o erro caso aconteça
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send('Erro ao buscar cursos: ' + error.message);
  }
};

// Função para listar alunos de um curso específico
const getAlunosByCurso = async (req, res) => {
  const { cursoId } = req.params; // Acessando o parâmetro do curso

  // Realizando a busca no banco de dados
  const { data, error } = await supabase
    .from('alunos')
    .select('*')
    .eq('curso_id', cursoId); // Filtrando pelo ID do curso

  if (error) {
    // Caso ocorra erro, retorna o status 500 e a mensagem de erro
    return res.status(500).send('Erro ao buscar alunos');
  }

  // Retorna os dados encontrados no formato JSON
  return res.status(200).json(data);
};

// Função para excluir um curso
const excluirCurso = async (req, res) => {
  const { id } = req.params; // Acessando o ID do curso

  try {
    // Excluindo o curso no banco de dados
    const { data, error } = await supabase
      .from('cursos')
      .delete()
      .match({ id }); // Exclui o curso com o ID correspondente

    if (error) {
      return res.status(400).send({ message: 'Erro ao excluir curso', error });
    }

    // Se a exclusão for bem-sucedida, retorna a resposta com sucesso
    return res.status(200).send({ message: 'Curso excluído com sucesso' });
  } catch (err) {
    // Caso algum erro interno aconteça, retorna um erro 500
    return res.status(500).send({ message: 'Erro interno ao excluir curso', error: err.message });
  }
};

module.exports = { getCursos, getAlunosByCurso, excluirCurso };

