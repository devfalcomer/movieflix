import React from 'react';
import { Play, Info, Star } from 'lucide-react';

export default function Hero({ item }) {
  if (!item) return null;

  return (
    /* CORREÇÃO 1: h-auto no mobile com min-h para o conteúdo não vazar, 
      e md:h-[65vh] para telas grandes. Removido padding estático do container.
    */
    <div className="relative min-h-[550px] md:h-[65vh] w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-[#0d091f] flex flex-col justify-end">
      
      {/* Imagem de Fundo adaptada com object-center para não cortar o foco */}
      <img 
        src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} 
        alt={item.title || item.name} 
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.6] contrast-105"
      />
      
      {/* Overlays de degradê ajustados para cobrir bem o fundo no mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060213] via-[#060213]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060213]/80 md:from-[#060213]/90 md:via-[#060213]/30 to-transparent" />

      {/* CORREÇÃO 2: Alinhamento do conteúdo. 
        No mobile centraliza (items-center text-center), no desktop alinha à esquerda (md:items-start md:text-left).
      */}
      <div className="relative p-6 sm:p-8 md:p-12 max-w-2xl z-10 flex flex-col items-center text-center md:items-start md:text-left w-full">
        
        {/* Badge de Média */}
        <div className="flex items-center gap-2 mb-4 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full w-max border border-white/10">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-black">{item.vote_average?.toFixed(1)} Média</span>
        </div>

        {/* Título adaptável */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight drop-shadow-md">
          {item.title || item.name}
        </h1>
        
        {/* Sinopse */}
        <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-6 line-clamp-3 md:line-clamp-4 font-normal leading-relaxed max-w-md md:max-w-none">
          {item.overview}
        </p>

        {/* CORREÇÃO 3: Botões responsivos. 
          No mobile eles ficam lado a lado e dividem o espaço de forma justa (w-full grid grid-cols-2). 
          No desktop eles voltam ao tamanho normal lado a lado (md:flex md:w-auto).
        */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto md:flex md:flex-row md:gap-4">
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-950 font-extrabold px-4 md:px-6 py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(34,211,238,0.25)] text-xs sm:text-sm cursor-pointer whitespace-nowrap">
            <Play size={16} fill="currentColor" /> Assistir Agora
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border border-white/10 font-semibold px-4 md:px-6 py-3.5 rounded-xl transition-all text-xs sm:text-sm cursor-pointer whitespace-nowrap">
            <Info size={16} /> Mais Detalhes
          </button>
        </div>

      </div>
    </div>
  );
}