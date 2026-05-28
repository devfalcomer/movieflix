import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import MediaGrid from './components/MediaGrid';
import MediaDetails from './components/MediaDetails';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Plans from './components/Plans'; 
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

  // ESTADOS DE NAVEGAÇÃO DE TELAS ESPECIAIS
  const [showProfile, setShowProfile] = useState(false);
  const [showPlans, setShowPlans] = useState(false); 

  // Mantém a sessão ativa se o usuário recarregar a página
  useEffect(() => {
    const loggedUser = localStorage.getItem('movieflix_logged_user');
    if (loggedUser) {
      setCurrentUser(JSON.parse(loggedUser));
    }
  }, []);

  // Reseta as telas flutuantes ao navegar pelas abas da Sidebar
  useEffect(() => {
    setSelectedMedia(null);
    setShowProfile(false);
    setShowPlans(false); 
  }, [activeTab]);

  // Busca de dados no TMDB baseado na aba ativa
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
    setShowPlans(false);
  };

  // ATUALIZAÇÃO: Altera o plano e sincroniza as duas chaves do LocalStorage
  const handleUpdatePlan = (newPlan) => {
    // 1. Atualiza a sessão do usuário ativo no momento
    const updatedUser = { ...currentUser, plan: newPlan };
    setCurrentUser(updatedUser);
    localStorage.setItem('movieflix_logged_user', JSON.stringify(updatedUser));

    // 2. Atualiza os dados dele na lista geral de cadastros
    const users = JSON.parse(localStorage.getItem('movieflix_users') || '[]');
    const updatedUsersList = users.map(u => {
      if (u.email === currentUser.email) {
        return { ...u, plan: newPlan };
      }
      return u;
    });
    localStorage.setItem('movieflix_users', JSON.stringify(updatedUsersList));
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

  // 2. FLUXO DE AUTENTICAÇÃO (LOGIN / CADASTRO)
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

  // 3. CATALOGO PRINCIPAL (LOGADO)
  return (
    <div className="min-h-screen bg-[#060213] text-gray-100 antialiased font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950 relative">
      <div className="absolute top-[-10%] left-[-5%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full bg-purple-600/10 ambient-glow-1 pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full bg-cyan-600/5 ambient-glow-2 pointer-events-none z-0" />

      {/* Barra lateral fixa */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onProfileClick={() => {
          setSelectedMedia(null);
          setShowPlans(false);
          setShowProfile(true);
        }}
      />

      <main className="px-4 md:pl-36 md:pr-16 pt-4 md:pt-8 pb-24 md:pb-16 min-h-screen max-w-[1700px] mx-auto relative z-10 transition-all duration-300">
        
        {/* Renderização Condicional de Telas Inteiras */}
        {showPlans ? (
          <Plans 
            currentPlan={currentUser.plan || 'Gratuito'} 
            onSelectPlan={handleUpdatePlan} 
            onClose={() => {
              setShowPlans(false);
              setShowProfile(true);
            }} 
          />
        ) : showProfile ? (
          <UserProfile 
            user={currentUser} 
            onClose={() => setShowProfile(false)} 
            onLogout={handleLogout}
            onNavigateToPlans={() => {
              setShowProfile(false);
              setShowPlans(true);
            }} 
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
            {/* O Grid de filmes permanece montado no DOM para fixar a rolagem de página original */}
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

            {/* Modal Fixo de Detalhes por cima do Grid */}
            {selectedMedia && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-[#060213] px-4 md:pl-36 md:pr-16 pt-4 md:pt-8 pb-24 md:pb-16 animate-fadeIn">
                <MediaDetails 
                  media={selectedMedia} 
                  onClose={() => setSelectedMedia(null)} 
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}