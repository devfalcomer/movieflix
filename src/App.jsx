import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import MediaGrid from './components/MediaGrid';
import MediaDetails from './components/MediaDetails';
import Login from './components/Login';
import Register from './components/Register';
import { getTrending, getMovies, getSeries } from './services/tmdb';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [data, setData] = useState([]);
  const [heroItem, setHeroItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // ESTADOS DE AUTENTICAÇÃO
  const [currentUser, setCurrentUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' ou 'register'

  // Mantém o usuário logado ao recarregar a página
  useEffect(() => {
    const loggedUser = localStorage.getItem('movieflix_logged_user');
    if (loggedUser) {
      setCurrentUser(JSON.parse(loggedUser));
    }
  }, []);

  // Reseta os detalhes caso o usuário mude de aba na Sidebar
  useEffect(() => {
    setSelectedMedia(null);
  }, [activeTab]);

  useEffect(() => {
    // Só busca dados da API do TMDB se o usuário estiver logado
    if (!currentUser) return;

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
  }, [activeTab, currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('movieflix_logged_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('movieflix_logged_user');
    setAuthScreen('login');
  };

  // FLUXO DE TELAS DE AUTENTICAÇÃO (Se não estiver logado)
  if (!currentUser) {
    if (authScreen === 'register') {
      return <Register onNavigateToLogin={() => setAuthScreen('login')} />;
    }
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess} 
        onNavigateToRegister={() => setAuthScreen('register')} 
      />
    );
  }

  // TELA PRINCIPAL (Se estiver logado)
  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 antialiased font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 relative">
      
      {/* Luzes de Fundo Ambientais Dinâmicas */}
      <div className="absolute top-[-10%] left-[-5%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-purple-600/10 ambient-glow-1 pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-cyan-600/5 ambient-glow-2 pointer-events-none z-0" />

      {/* Navegação Flutuante Lateral / Inferior */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Botão de Logout Flutuante (Opcional - útil no topo direito) */}
      <button 
        onClick={handleLogout}
        className="absolute top-6 right-6 z-50 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 px-4 py-2 border border-white/10 hover:border-red-500/20 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer shadow-lg"
      >
        SAIR
      </button>

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
            {/* Condicional: Se houver uma mídia selecionada, renderiza os Detalhes. Caso contrário, renderiza a Home */}
            {selectedMedia ? (
              <MediaDetails 
                media={selectedMedia} 
                onClose={() => setSelectedMedia(null)} 
              />
            ) : (
              <>
                {/* Banner Premium */}
                <Hero 
                  item={heroItem} 
                  onDetailsClick={(media) => setSelectedMedia(media)} 
                />

                {/* Layout de Grid Assimétrico */}
                <MediaGrid 
                  items={data} 
                  title={
                    activeTab === 'trending' ? 'Tendências Globais' :
                    activeTab === 'movies' ? 'Filmes Selecionados' : 'Séries Recomendadas'
                  }
                  onMediaClick={(media) => setSelectedMedia(media)} 
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}