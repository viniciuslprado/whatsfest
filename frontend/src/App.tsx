import { useState, useEffect } from 'react';

import Header from './components/Header';
import { buscarFestas } from './lib/api';
import type { Festa } from './lib/api';
import type { FilterState } from './components/filters/EventFilters';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Inicio from './pages/home/inicio';
import Sobre from './pages/home/sobre';
import Contato from './pages/home/contato';
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
  const [festas, setFestas] = useState<Festa[]>([]);
  useEffect(() => {
    buscarFestas().then(setFestas);
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/login`
        : (import.meta.env.PROD ? 'https://whatsfest-backend.onrender.com/api/v1/admin/login' : 'http://localhost:3000/api/v1/admin/login');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Armazenar o token JWT no localStorage para uso nas próximas requisições
        localStorage.setItem('adminToken', data.token);
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
    localStorage.removeItem('adminToken');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-white">
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
          <Inicio
            filters={filters}
            onFiltersChange={handleFiltersChange}
            festas={festas}
          />
        )}



        {currentPage === 'sobre' && <Sobre />}

        {currentPage === 'contato' && <Contato />}

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