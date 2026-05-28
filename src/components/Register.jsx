import React, { useState } from 'react';

export default function Register({ onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Busca usuários já cadastrados ou cria uma lista vazia
    const existingUsers = JSON.parse(localStorage.getItem('movieflix_users')) || [];

    // Verifica se o e-mail já está em uso
    const userExists = existingUsers.some(user => user.email === email);
    if (userExists) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    // Cria o novo usuário e adiciona à lista
    const newUser = { name, email, password };
    existingUsers.push(newUser);

    // Salva de volta no localStorage
    localStorage.setItem('movieflix_users', JSON.stringify(existingUsers));
    
    setSuccess(true);
    setTimeout(() => {
      onNavigateToLogin(); // Redireciona para o login após 2 segundos
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Luzes de Fundo Ambientais */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0d091f]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-fadeIn">
        <h2 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
          Criar <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Conta</span>
        </h2>
        <p className="text-gray-400 text-sm text-center mb-8">Cadastre-se para começar a assistir</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">
            Cadastro realizado com sucesso! Redirecionando...
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Nome Completo</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(34,211,238,0.2)] text-sm cursor-pointer mt-2"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Já tem uma conta?{' '}
          <button 
            onClick={onNavigateToLogin}
            className="text-cyan-400 hover:underline font-semibold cursor-pointer"
          >
            Entrar agora
          </button>
        </p>
      </div>
    </div>
  );
}