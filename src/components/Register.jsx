import React, { useState } from 'react';
import { User, Mail, Lock, CreditCard } from 'lucide-react';

export default function Register({ onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('Gratuito'); // Plano inicial padrão

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Cria o objeto do usuário incluindo o plano escolhido
    const newUser = { name, email, password, plan };
    
    // Salva no localStorage (simulando banco de dados de usuários cadastrados)
    const users = JSON.parse(localStorage.getItem('movieflix_users') || '[]');
    
    // Verifica se o e-mail já existe
    if (users.some(u => u.email === email)) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    users.push(newUser);
    localStorage.setItem('movieflix_users', JSON.stringify(users));
    
    alert("Cadastro realizado com sucesso!");
    onNavigateToLogin();
  };

  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[100px]" />
      
      <div className="w-full max-w-md bg-[#0d091f]/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 animate-fadeIn">
        <h2 className="text-3xl font-black text-white text-center mb-1">Criar Conta</h2>
        <p className="text-gray-400 text-xs text-center mb-6">Seja bem-vindo ao MovieFlix</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Nome Completo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-colors"
            />
          </div>

          {/* E-mail */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-colors"
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Crie uma senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-colors"
            />
          </div>

          {/* SELEÇÃO DE PLANO */}
          <div className="relative">
            <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-[#060213]/80 border border-white/10 focus:border-cyan-500 rounded-xl py-3 pl-12 pr-4 text-sm outline-none transition-colors text-gray-300 appearance-none cursor-pointer"
            >
              <option value="Gratuito" className="bg-[#0d091f]">Plano Gratuito (Com anúncios, SD)</option>
              <option value="Bronze" className="bg-[#0d091f]">Plano Bronze - R$ 19,90</option>
              <option value="Prata" className="bg-[#0d091f]">Plano Prata - R$ 34,90</option>
              <option value="Premium" className="bg-[#0d091f]">Plano Premium - R$ 49,90</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm tracking-wider uppercase py-3 rounded-xl transition-all cursor-pointer mt-2 shadow-lg shadow-cyan-500/10"
          >
            Cadastrar e Maratona
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Já tem uma conta?{' '}
          <button onClick={onNavigateToLogin} className="text-cyan-400 font-bold hover:underline cursor-pointer">
            Faça Login
          </button>
        </p>
      </div>
    </div>
  );
}