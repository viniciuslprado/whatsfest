import { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import EventFilters from './components/EventFilters';
import FlyerCarousel from './components/FlyerCarousel';
import type { FilterState } from './components/EventFilters';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import './App.css';


type Page = 'inicio' | 'admin' | 'login' | 'sobre' | 'contato';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    nomeEvento: '',
    cidade: '',
    data: '',
    userLatitude: undefined,
    userLongitude: undefined,
    maxDistance: undefined
  });

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`
        : (import.meta.env.PROD ? 'https://whatsfest-backend.onrender.com/api/v1/auth/login' : 'http://localhost:3000/api/v1/auth/login');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Armazenar a chave de admin no localStorage para uso nas próximas requisições
        localStorage.setItem('adminKey', data.adminKey);
        setIsLoggedIn(true);
        setCurrentPage('admin');
        return true;
      } else {
        console.error('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminKey');
    setIsLoggedIn(false);
    setCurrentPage('inicio');
  };

  const handleNavigate = (page: Page) => {
    if (page === 'admin' && !isLoggedIn) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Página de Login
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onBackToHome={() => setCurrentPage('inicio')}
      />
    );
  }

  // Páginas com Header
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fef7ff 0%, #fdf2f8 25%, #ecfdf5 50%, #f0f9ff 75%, #fef7ff 100%)'
    }}>
      <Header 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0'
      }}>
        {currentPage === 'inicio' && (
          <div style={{ padding: '20px 10px' }}>
            <FlyerCarousel />

            <EventFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
            
            <Calendar filters={filters} />
          </div>
        )}



        {currentPage === 'sobre' && (
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '32px', 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '32px', 
              color: '#1f2937', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              ℹ️ Sobre o WhatsFest
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
              <p style={{ color: '#374151', fontSize: '18px', marginBottom: '20px' }}>
                O <strong>WhatsFest</strong> é sua plataforma completa para descobrir e organizar 
                os melhores eventos e festas da sua região! 🎉
              </p>
              
              <h3 style={{ color: '#8b5cf6', marginTop: '32px', marginBottom: '16px' }}>
                🚀 Funcionalidades
              </h3>
              <ul style={{ color: '#374151', paddingLeft: '24px' }}>
                <li>📅 Calendário interativo com todos os eventos</li>
                <li>🔍 Filtros avançados por nome, cidade e data</li>
                <li>📍 Localização em tempo real dos eventos</li>
                <li>👨‍💼 Área administrativa para organizadores</li>
                <li>📱 Interface responsiva e moderna</li>
              </ul>
              
              <h3 style={{ color: '#8b5cf6', marginTop: '32px', marginBottom: '16px' }}>
                🎯 Missão
              </h3>
              <p style={{ color: '#374151' }}>
                Conectar pessoas aos melhores eventos da cidade, facilitando a descoberta 
                de novas experiências e momentos inesquecíveis.
              </p>
            </div>
          </div>
        )}

        {currentPage === 'contato' && (
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '32px', 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '32px', 
              color: '#1f2937', 
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              📞 Entre em Contato
            </h2>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ 
                display: 'grid', 
                gap: '24px', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                marginBottom: '32px'
              }}>
                <div style={{ 
                  background: '#f8fafc', 
                  padding: '24px', 
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#8b5cf6', marginBottom: '12px' }}>📧 Email</h3>
                  <p style={{ color: '#374151' }}>contato@whatsfest.com</p>
                </div>
                
                <div style={{ 
                  background: '#f8fafc', 
                  padding: '24px', 
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#8b5cf6', marginBottom: '12px' }}>📱 WhatsApp</h3>
                  <p style={{ color: '#374151' }}>(11) 99999-9999</p>
                </div>
              </div>
              
              <form style={{ 
                background: '#f8fafc', 
                padding: '24px', 
                borderRadius: '12px'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '16px' }}>💬 Envie uma mensagem</h3>
                
                <input 
                  type="text"
                  placeholder="Seu nome"
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                
                <input 
                  type="email"
                  placeholder="Seu email"
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                
                <textarea 
                  placeholder="Sua mensagem"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
                
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        )}

        {currentPage === 'admin' && isLoggedIn && (
          <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000
          }}>
            <AdminPage onLogout={handleLogout} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;