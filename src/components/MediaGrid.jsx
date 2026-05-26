import React from 'react';
import { Star } from 'lucide-react';

export default function MediaGrid({ items, title }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-black text-white mb-8 tracking-wide relative w-max">
        {title}
        <span className="absolute -bottom-2 left-0 w-2/3 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item, index) => {
          if (!item.poster_path) return null;
          
          const isLargeCard = index === 0; // O primeiro card quebra o padrão visual do grid
          
          return (
            <div 
              key={item.id} 
              className={`group relative rounded-2xl overflow-hidden bg-[#0d091f] neon-card-glow cursor-pointer shadow-lg
                ${isLargeCard ? 'md:col-span-2 md:row-span-2' : ''}
              `}
            >
              {/* Container da Imagem */}
              <div className="aspect-[2/3] w-full overflow-hidden relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Degradê interno que aparece no hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060213] via-[#060213]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Informações Inferiores */}
              <div className="p-4 bg-[#0b071a]/90 backdrop-blur-md border-t border-white/5 absolute bottom-0 inset-x-0 transform translate-y-[2px] group-hover:bg-[#0f0a24]">
                <h3 className="text-white font-bold text-sm truncate group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title || item.name}
                </h3>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>
                    {item.release_date || item.first_air_date 
                      ? new Date(item.release_date || item.first_air_date).getFullYear() 
                      : 'N/A'}
                  </span>
                  <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg text-yellow-400 font-bold border border-white/5">
                    <Star size={12} fill="currentColor" /> {item.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}