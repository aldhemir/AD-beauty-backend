const supabase = require('../db');

// Função para login de vendedor
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const { data, error } = await supabase
      .from('vendedores')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se a senha fornecida corresponde à armazenada (ideal usar hashing de senha)
    if (data.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido', vendedorId: data.id });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

// Função para registrar novo vendedor
const register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se o email já está registrado
    const { data: existingVendedor, error: checkError } = await supabase
      .from('vendedores')
      .select('*')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST100') {
      return res.status(500).json({ message: 'Erro ao verificar vendedor existente', error: checkError });
    }

    if (existingVendedor) {
      return res.status(400).json({ message: 'Email já registrado' });
    }

    // Inserir o novo vendedor
    const { data, error } = await supabase
      .from('vendedores')
      .insert([{ nome, email, senha }])
      .single();

    if (error) {
      return res.status(400).json({ message: 'Erro ao registrar vendedor', error });
    }

    return res.status(201).json({ message: 'Vendedor registrado com sucesso', vendedorId: data.id });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

module.exports = { login, register };
