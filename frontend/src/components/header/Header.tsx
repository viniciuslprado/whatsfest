import React, { useState } from 'react';
import GhostButton from '../button/GhostButton';
import { GiPartyPopper } from 'react-icons/gi';
import { FaTimes, FaBars, FaHome, FaInfoCircle, FaCog, FaWhatsapp } from 'react-icons/fa';

type Page = 'inicio' | 'admin' | 'login' | 'sobre';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-pink-600 via-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => onNavigate('inicio')}>
          <GiPartyPopper size={32} />
          <span className="text-2xl font-extrabold tracking-tight">WhatsFest</span>
        </div>

        {/* Menu Hamburguer Mobile */}
        <GhostButton
          className="sm:hidden ml-auto p-2 rounded-full hover:bg-white/10 focus:outline-none"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </GhostButton>

        {/* Navegação */}
        <nav
          className={`
            ${menuOpen ? 'absolute top-16 right-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl shadow-2xl p-6 z-50 flex flex-col gap-3 min-w-[220px]' :
            'hidden sm:flex flex-row gap-6 items-center'}
          `}
        >
          {/* Botões principais */}
          <GhostButton
            onClick={() => handleNavigate('inicio')}
            active={currentPage === 'inicio'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
            type="button"
          >
            <FaHome /> Início
          </GhostButton>
          <GhostButton
            onClick={() => handleNavigate('sobre')}
            active={currentPage === 'sobre'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
            type="button"
          >
            <FaInfoCircle /> Sobre
          </GhostButton>

          {/* Link WhatsApp */}
          <a
            href="https://chat.whatsapp.com/DVbSwHcYZqJ3lFapfelkN6"
            target="_blank"
            rel="noopener noreferrer"
            style={{ minWidth: 0 }}
            className="no-underline"
          >
            <GhostButton
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold w-full"
              type="button"
            >
              <FaWhatsapp size={20} /> Grupo WhatsApp
            </GhostButton>
          </a>

          {/* Admin sempre no final */}
          <GhostButton
            onClick={() => handleNavigate('login')}
            active={currentPage === 'login'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 border-white/30"
            type="button"
          >
            <FaCog /> Admin
          </GhostButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
