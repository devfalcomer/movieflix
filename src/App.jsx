import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import MediaGrid from './components/MediaGrid';
import { getTrending, getMovies, getSeries } from './services/tmdb';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [data, setData] = useState([]);
  const [heroItem, setHeroItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let results = [];
        if (activeTab === 'trending') {
          results = await getTrending();
        } else if (activeTab === 'movies') {
          results = await getMovies();
        } else if (activeTab === 'series') {
          results = await getSeries();
        }
        
        setData(results);
        const validHero = results.find(item => item.backdrop_path) || results[0];
        setHeroItem(validHero);
      } catch (error) {
        console.error("Erro ao buscar dados do TMDB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 antialiased font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 relative">
      
      {/* Luzes de Fundo Ambientais Dinâmicas */}
      <div className="absolute top-[-10%] left-[-5%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-purple-600/10 ambient-glow-1 pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-cyan-600/5 ambient-glow-2 pointer-events-none z-0" />

      {/* Navegação Flutuante Lateral / Inferior */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 
        Responsividade aplicada no Main:
        - Mobile: px-4 pt-4 pb-24 (espaço extra embaixo para não cobrir o menu inferior).
        - Desktop (md:): pl-36 pr-16 pt-8 (recua para o lado da sidebar).
      */}
      <main className="px-4 md:pl-36 md:pr-16 pt-4 md:pt-8 pb-24 md:pb-16 min-h-screen max-w-[1700px] mx-auto relative z-10 transition-all duration-300">
        
        {loading ? (
          <div className="h-[80vh] w-full flex items-center justify-center">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Banner Premium */}
            <Hero item={heroItem} />

            {/* Layout de Grid Assimétrico */}
            <MediaGrid 
              items={data} 
              title={
                activeTab === 'trending' ? 'Tendências Globais' :
                activeTab === 'movies' ? 'Filmes Selecionados' : 'Séries Recomendadas'
              } 
            />
          </>
        )}
      </main>
    </div>
  );
}