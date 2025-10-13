import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaHome, FaCog, FaInfoCircle, FaPhone } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';

type Page = 'inicio' | 'admin' | 'login' | 'sobre' | 'contato';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha menu ao navegar
  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
      color: 'white',
      padding: '16px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
  <div className="container header-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: '12px'
      }}>
        {/* Logo */}
        <div 
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('inicio')}
        >
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <GiPartyPopper size={32} /> WhatsFest
          </h1>
        </div>

        {/* Menu Hamburguer Mobile */}
        <div className="header-hamburger" style={{ display: 'none', marginLeft: 'auto' }}>
          <button
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '16px',
              zIndex: 20
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navegação central */}
        <nav className="header-nav" style={{
          display: menuOpen ? 'block' : '',
          position: menuOpen ? 'absolute' : undefined,
          top: menuOpen ? '64px' : undefined,
          right: menuOpen ? '16px' : undefined,
          background: menuOpen ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)' : undefined,
          borderRadius: menuOpen ? '16px' : undefined,
          boxShadow: menuOpen ? '0 8px 32px rgba(0,0,0,0.15)' : undefined,
          padding: menuOpen ? '16px 24px' : undefined,
          zIndex: menuOpen ? 10 : undefined,
          minWidth: menuOpen ? '180px' : undefined
        }}>
          <ul style={{
            display: menuOpen ? 'flex' : 'flex',
            flexDirection: menuOpen ? 'column' : 'row',
            flexWrap: 'wrap',
            listStyle: 'none',
            gap: menuOpen ? '12px' : '32px',
            margin: 0,
            padding: 0,
            alignItems: menuOpen ? 'flex-start' : 'center'
          }}>
            <li>
              <button
                onClick={() => handleNavigate('inicio')}
                style={{
                  background: currentPage === 'inicio' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: currentPage === 'inicio' ? 'bold' : 'normal',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'inicio') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'inicio') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <FaHome /> Início
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigate('sobre')}
                style={{
                  background: currentPage === 'sobre' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: currentPage === 'sobre' ? 'bold' : 'normal',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'sobre') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'sobre') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <FaInfoCircle /> Sobre
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('contato')}
                style={{
                  background: currentPage === 'contato' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: currentPage === 'contato' ? 'bold' : 'normal',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'contato') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'contato') {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <FaPhone /> Contato
              </button>
            </li>
          </ul>
        </nav>

        {/* Botão Admin */}
        <div style={{ marginLeft: menuOpen ? 0 : '16px', marginTop: menuOpen ? '8px' : 0 }}>
          <button
            onClick={() => handleNavigate('login')}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaCog /> Admin
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;