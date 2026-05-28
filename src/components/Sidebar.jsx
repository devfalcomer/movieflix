import React from 'react';
import { TrendingUp, Film, Tv, User } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onProfileClick }) {
  return (
    <aside className="fixed bottom-0 left-0 w-full md:w-28 h-16 md:h-screen bg-[#0d091f]/90 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/10 z-40 grid grid-cols-4 md:flex md:flex-col items-center justify-items-center md:justify-start md:py-8 gap-0 md:gap-6 transition-all duration-300 px-2 md:px-0">
      
      {/* Logo: visível apenas no desktop */}
      <div className="hidden md:block text-xl font-black tracking-wider text-white mb-4">
        CINE
      </div>

      {/* Botão: Tendências */}
      <button
        onClick={() => setActiveTab('trending')}
        className={`flex flex-col items-center justify-center rounded-xl w-full max-w-[70px] md:w-16 h-12 md:h-16 transition-all duration-300 cursor-pointer ${
          activeTab === 'trending'
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
        }`}
      >
        <TrendingUp size={18} className="md:w-[20px] md:h-[20px] flex-shrink-0" />
        <span className="text-[9px] md:text-[10px] font-bold mt-0.5 md:mt-1 tracking-wide block truncate">Tendências</span>
      </button>

      {/* Botão: Filmes */}
      <button
        onClick={() => setActiveTab('movies')}
        className={`flex flex-col items-center justify-center rounded-xl w-full max-w-[70px] md:w-16 h-12 md:h-16 transition-all duration-300 cursor-pointer ${
          activeTab === 'movies'
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
        }`}
      >
        <Film size={18} className="md:w-[20px] md:h-[20px] flex-shrink-0" />
        <span className="text-[9px] md:text-[10px] font-bold mt-0.5 md:mt-1 tracking-wide block truncate">Filmes</span>
      </button>

      {/* Botão: Séries */}
      <button
        onClick={() => setActiveTab('series')}
        className={`flex flex-col items-center justify-center rounded-xl w-full max-w-[70px] md:w-16 h-12 md:h-16 transition-all duration-300 cursor-pointer ${
          activeTab === 'series'
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
        }`}
      >
        <Tv size={18} className="md:w-[20px] md:h-[20px] flex-shrink-0" />
        <span className="text-[9px] md:text-[10px] font-bold mt-0.5 md:mt-1 tracking-wide block truncate">Séries</span>
      </button>

      {/* Botão: Perfil */}
      <button
        onClick={onProfileClick}
        className="flex flex-col items-center justify-center rounded-xl w-full max-w-[70px] md:w-16 h-12 md:h-16 transition-all duration-300 cursor-pointer md:mt-auto text-gray-400 hover:text-cyan-400 hover:bg-white/5 border border-transparent"
      >
        <User size={18} className="md:w-[20px] md:h-[20px] flex-shrink-0" />
        <span className="text-[9px] md:text-[10px] font-bold mt-0.5 md:mt-1 tracking-wide block truncate">Perfil</span>
      </button>

    </aside>
  );
}