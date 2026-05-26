import React from 'react';
import { Film, Tv, TrendingUp } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'trending', label: 'Tendências', icon: TrendingUp },
    { id: 'movies', label: 'Filmes', icon: Film },
    { id: 'series', label: 'Séries', icon: Tv },
  ];

  return (
    /* Ajustado o padding horizontal da própria barra (px-2 no desktop) para o CINE não cortar */
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:left-6 md:top-1/2 md:-translate-y-1/2 w-[calc(100%-2rem)] md:w-20 md:hover:w-64 h-16 md:h-[80vh] glass-effect rounded-2xl md:rounded-3xl flex md:flex-col items-center justify-between px-6 md:px-2 py-2 md:py-8 transition-all duration-300 ease-in-out z-50 group shadow-2xl">
      
      {/* CORREÇÃO DO CINE: w-full e text-center garantem centralização sem quebrar letras */}
      <div className="hidden md:block text-lg font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform tracking-widest w-full text-center select-none">
        CINE
      </div>
      
      {/* Menu Principal */}
      <nav className="flex md:flex-col justify-around md:justify-center gap-2 md:gap-5 w-full px-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`neon-card-glow w-full h-12 md:h-13 rounded-xl md:rounded-2xl flex items-center justify-center md:justify-start cursor-pointer transition-all duration-300 overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-cyan-500/15 to-purple-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }
              `}
            >
              {/* CORREÇÃO DOS ÍCONES: 
                Alinhamento por flexbox puro. No desktop estático, o container do ícone centraliza perfeitamente 
                na largura total disponível sem amassar o Lucide Icon.
              */}
              <div className="flex items-center justify-center md:justify-start w-full h-full px-3 md:px-0 md:group-hover:pl-5 transition-all duration-300">
                
                {/* Elemento que envelopa o ícone e força ele a ficar estável no meio da barra de 80px */}
                <div className="flex items-center justify-center md:w-14 group-hover:md:w-6 shrink-0 transition-all duration-300">
                  <Icon size={22} />
                </div>
                
                {/* O texto desliza de volta para a tela sem criar orelhas */}
                <span className="hidden md:block opacity-0 group-hover:opacity-100 ml-3 transition-all duration-300 font-semibold whitespace-nowrap text-sm tracking-wide">
                  {item.label}
                </span>

              </div>
            </div>
          );
        })}
      </nav>

      {/* Versão do App */}
      <div className="hidden md:block text-gray-600 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-mono w-full text-center">
        v1.0
      </div>
    </div>
  );
}