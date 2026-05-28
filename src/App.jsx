import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import MediaGrid from './components/MediaGrid';
import MediaDetails from './components/MediaDetails';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile'; // Importando a nova tela de Perfil
import { getTrending, getMovies, getSeries } from './services/tmdb';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [data, setData] = useState([]);
  const [heroItem, setHeroItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // ESTADOS DE AUTENTICAÇÃO
  const [currentUser, setCurrentUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('login');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // NOVO ESTADO: Controla a exibição do Perfil
  const [showProfile, setShowProfile] = useState(false);

  // Mantém a sessão ativa se o usuário recarregar a página
  useEffect(() => {
    const loggedUser = localStorage.getItem('movieflix_logged_user');
    if (loggedUser) {
      setCurrentUser(JSON.parse(loggedUser));
    }
  }, []);

  // Reseta os detalhes e fecha o perfil ao navegar pelas abas da Sidebar
  useEffect(() => {
    setSelectedMedia(null);
    setShowProfile(false);
  }, [activeTab]);

  useEffect(() => {
    if (!currentUser || isLoggingIn) return;

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
  }, [activeTab, currentUser, isLoggingIn]);

  const handleLoginSuccess = (user) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setCurrentUser(user);
      localStorage.setItem('movieflix_logged_user', JSON.stringify(user));
      setIsLoggingIn(false);
    }, 2500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('movieflix_logged_user');
    setAuthScreen('login');
    setShowProfile(false);
  };

  // 1. SPLASH SCREEN PÓS-LOGIN
  if (isLoggingIn) {
    return (
      <div className="min-h-screen bg-[#060213] text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/5 blur-[100px] animate-pulse" />
        
        <div className="text-center relative z-10 space-y-6 animate-fadeIn">
          <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_35px_rgba(34,211,238,0.3)]">
            Movie<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Flix</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase font-bold animate-pulse">
            Preparando seu catálogo personalizado...
          </p>
          <div className="w-48 h-[4px] bg-white/5 rounded-full mx-auto overflow-hidden border border-white/5 relative">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-full animate-loadingBar" />
          </div>
        </div>
      </div>
    );
  }

  // 2. FLUXO DE AUTENTICAÇÃO
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

  // 3. HOME DO SISTEMA (LOGADO)
  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 antialiased font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 relative">
      <div className="absolute top-[-10%] left-[-5%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-purple-600/10 ambient-glow-1 pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-cyan-600/5 ambient-glow-2 pointer-events-none z-0" />

      {/* Sidebar atualizada com a propriedade de clique no Perfil */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onProfileClick={() => {
          setSelectedMedia(null); // Fecha modal de mídia se estiver aberto
          setShowProfile(true);   // Exibe os dados do usuário
        }}
      />

      <button 
        onClick={handleLogout}
        className="absolute top-6 right-6 z-50 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 px-4 py-2 border border-white/10 hover:border-red-500/20 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer shadow-lg"
      >
        SAIR
      </button>

      <main className="px-4 md:pl-36 md:pr-16 pt-4 md:pt-8 pb-24 md:pb-16 min-h-screen max-w-[1700px] mx-auto relative z-10 transition-all duration-300">
        
        {/* Nova Condicional: Se o perfil estiver ativo, exibe a tela de Perfil. Caso contrário, segue o fluxo normal */}
        {showProfile ? (
          <UserProfile 
            user={currentUser} 
            onClose={() => setShowProfile(false)} 
          />
        ) : loading ? (
          <div className="h-[80vh] w-full flex items-center justify-center">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            {selectedMedia ? (
              <MediaDetails 
                media={selectedMedia} 
                onClose={() => setSelectedMedia(null)} 
              />
            ) : (
              <>
                <Hero 
                  item={heroItem} 
                  onDetailsClick={(media) => setSelectedMedia(media)} 
                />

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