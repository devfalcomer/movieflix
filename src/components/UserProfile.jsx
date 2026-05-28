import React from 'react';
import { User, Mail, Calendar, ArrowLeft, LogOut } from 'lucide-react';

export default function UserProfile({ user, onClose, onLogout }) {
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-[#0d091f]/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl animate-fadeIn">
      
      {/* Cabeçalho com botão para voltar */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onClose}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-black text-white tracking-tight">Minha Conta</h2>
      </div>

      <div className="flex flex-col items-center text-center sm:text-left sm:flex-row gap-6 pb-8 border-b border-white/5 mb-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <User size={44} className="text-slate-950" />
        </div>
        
        <div>
          <h3 className="text-3xl font-black text-white tracking-tight mb-1">{user.name}</h3>
          <p className="text-cyan-400 font-semibold text-sm tracking-wider uppercase">Plano Premium Ativo</p>
        </div>
      </div>

      {/* Grid com Informações de Detalhe */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4 bg-[#060213]/60 border border-white/5 p-4 rounded-xl">
          <Mail className="text-purple-400" size={20} />
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">E-mail de Acesso</p>
            <p className="text-white text-sm font-medium mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#060213]/60 border border-white/5 p-4 rounded-xl">
          <Calendar className="text-cyan-400" size={20} />
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status da Assinatura</p>
            <p className="text-white text-sm font-medium mt-0.5">Renovação Automática via LocalStorage</p>
          </div>
        </div>
      </div>

      {/* BOTÃO SAIR INTEGRADO: Alinhado e seguro no final da área de perfil */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-sm tracking-wider uppercase py-3 px-4 border border-red-500/20 hover:border-red-500/30 rounded-2xl transition-all cursor-pointer shadow-lg"
      >
        <LogOut size={16} />
        <span>Sair da Conta</span>
      </button>

    </div>
  );
}