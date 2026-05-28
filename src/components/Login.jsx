import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onNavigateToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Busca a lista de usuários salvos no localStorage
    const existingUsers = JSON.parse(localStorage.getItem('movieflix_users')) || [];

    // Procura por um usuário com o mesmo e-mail e senha
    const user = existingUsers.find(u => u.email === email && u.password === password);

    if (user) {
      // Login com sucesso! Passa os dados do usuário conectado para o App
      onLoginSuccess(user);
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Luzes de Fundo Ambientais */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0d091f]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-fadeIn">
        <h2 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
          Movie<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Flix</span>
        </h2>
        <p className="text-gray-400 text-sm text-center mb-8">Faça login para acessar o catálogo</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
            Entrar
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Não tem uma conta?{' '}
          <button 
            onClick={onNavigateToRegister}
            className="text-cyan-400 hover:underline font-semibold cursor-pointer"
          >
            Cadastre-se grátis
          </button>
        </p>
      </div>
    </div>
  );
}