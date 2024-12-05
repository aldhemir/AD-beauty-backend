require('dotenv').config(); // Carregando as variáveis de ambiente
const { createClient } = require('@supabase/supabase-js');

// Inicializando o Supabase com as credenciais
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = supabase;
