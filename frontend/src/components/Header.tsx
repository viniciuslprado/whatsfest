import React from 'react';
import { FaHome, FaCog, FaInfoCircle, FaPhone } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';

type Page = 'inicio' | 'admin' | 'login' | 'sobre' | 'contato';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
      color: 'white',
      padding: '16px 0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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

        {/* Navegação central */}
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '32px',
            margin: 0,
            padding: 0
          }}>
            <li>
              <button
                onClick={() => onNavigate('inicio')}
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
                onClick={() => onNavigate('sobre')}
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
                onClick={() => onNavigate('contato')}
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
        <div>
          <button
            onClick={() => onNavigate('login')}
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