const supabase = require('../db');

// Função para login de vendedor
const login = async (req, res) => {
  const { email, senha } = req.body;

  // Verificar se os dados foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase
      .from('vendedores')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      console.log('Erro no login: ', error);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se a senha fornecida corresponde à armazenada (sem hashing)
    if (data.senha !== senha) {
      console.log('Senha inválida.');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido', vendedorId: data.id });
  } catch (error) {
    console.log('Erro no servidor de login: ', error);
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

// Função para registrar novo vendedor
const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  // Verificar se os dados necessários foram fornecidos
  if (!nome || !email || !senha) {
    console.log('Dados faltando: ', { nome, email, senha });
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  try {
    console.log('Iniciando verificação de vendedor existente');
    // Verificar se o email já está registrado
    const { data: existingVendedor, error: checkError } = await supabase
      .from('vendedores')
      .select('email') // Buscar apenas o campo 'email' para otimizar
      .eq('email', email);

    if (checkError) {
      console.log('Erro ao verificar vendedor existente: ', checkError);
      return res.status(500).json({ message: 'Erro ao verificar vendedor existente', error: checkError });
    }

    if (existingVendedor.length > 0) {
      console.log('Email já registrado: ', email);
      return res.status(400).json({ message: 'Email já registrado' });
    }

    // Inserir o novo vendedor
    console.log('Inserindo novo vendedor');
    const { data, error } = await supabase
      .from('vendedores')
      .insert([{ nome, email, senha }])
      .select()
      .single();

    if (error) {
      console.log('Erro ao registrar vendedor: ', error);
      return res.status(400).json({ message: 'Erro ao registrar vendedor', error });
    }

    return res.status(201).json({ message: 'Vendedor registrado com sucesso', vendedorId: data.id });
  } catch (error) {
    console.log('Erro no servidor de registro: ', error);
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

module.exports = { login, register };
