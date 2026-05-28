import React from 'react';
import { X, Star, Calendar, Film, Tv, Clock } from 'lucide-react';

export default function MediaDetails({ media, onClose }) {
  if (!media) return null;

  // Configuração da imagem de fundo e do poster vindo da API do TMDB
  const backdropUrl = media.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${media.backdrop_path}` 
    : null;
    
  const posterUrl = media.poster_path 
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}` 
    : null;

  // Formatação simples para o ano de lançamento
  const releaseYear = media.release_date 
    ? media.release_date.substring(0, 4) 
    : media.first_air_date 
    ? media.first_air_date.substring(0, 4) 
    : 'N/A';

  // Nota com uma casa decimal
  const voteAverage = media.vote_average ? media.vote_average.toFixed(1) : '0.0';

  return (
    <div className="w-full bg-[#0d091f]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8 animate-fadeIn relative overflow-hidden pb-28 md:pb-8 shadow-2xl">
      
      {/* Imagem de Fundo Desfocada para efeito imersivo */}
      {backdropUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 blur-xl pointer-events-none"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      {/* Botão Fechar (X) - Posicionado com segurança para não colidir com o botão SAIR */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-40 p-2.5 bg-[#060213]/80 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl transition-all cursor-pointer shadow-lg"
        title="Fechar detalhes"
      >
        <X size={20} />
      </button>

      {/* Conteúdo Principal em Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-10 items-start mt-8 md:mt-0">
        
        {/* Poster do Filme/Série */}
        <div className="w-full max-w-[260px] md:max-w-none mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 group">
          {posterUrl ? (
            <img 
              src={posterUrl} 
              alt={media.title || media.name} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-[#060213] flex flex-col items-center justify-center text-gray-500 gap-2">
              <Film size={40} />
              <span className="text-xs font-semibold">Sem Imagem</span>
            </div>
          )}
        </div>

        {/* Detalhes Textuais */}
        <div className="space-y-6">
          
          {/* Título e Tipo de Mídia */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-black tracking-widest uppercase rounded-md flex items-center gap-1">
                {media.media_type === 'tv' ? <Tv size={10} /> : <Film size={10} />}
                {media.media_type === 'tv' ? 'Série' : 'Filme'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {media.title || media.name}
            </h1>
          </div>

          {/* Badges de Informações (Nota e Ano) */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-amber-400 text-sm font-bold">
              <Star size={16} className="fill-amber-400" />
              <span>{voteAverage}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl text-cyan-400 text-sm font-bold">
              <Calendar size={16} />
              <span>{releaseYear}</span>
            </div>
          </div>

          {/* Sinopse */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest">
              Sinopse
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium bg-[#060213]/40 border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
              {media.overview || "Nenhuma sinopse disponível para esta mídia até o momento."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}