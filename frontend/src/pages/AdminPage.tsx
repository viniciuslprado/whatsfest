import React, { useState } from 'react';
import { FaArrowLeft, FaImage, FaCog } from 'react-icons/fa';
import GerenciarEventos from '../components/admin/GerenciarEventos';
import UploadFlyer from '../components/admin/UploadFlyer';

const AdminPage: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'eventos' | 'flyers' | 'gerenciar'>('gerenciar');

  return (
  <div className="min-h-screen w-full m-0 p-0 box-border bg-gradient-to-br from-blue-700 via-purple-700 to-fuchsia-700 overflow-x-hidden">
  <div className="max-w-5xl w-full mx-auto p-1 sm:p-2 md:p-6 box-border h-auto min-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-2xl">
        {/* Cabeçalho */}
  <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-1 sm:p-3 md:p-5 mb-2 border border-white/30 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white m-0 flex items-center gap-3">
              <FaCog /> Painel Administrativo
            </h1>
            <button
              onClick={onLogout}
              className="bg-red-600/80 border-none text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg cursor-pointer text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-red-700/90 transition"
            >
              <FaArrowLeft /> Sair
            </button>
          </div>

          {/* Sistema de Abas */}
          <div className="flex flex-wrap gap-1 sm:gap-2 border-t border-white/20 pt-3 sm:pt-5 mt-3 sm:mt-5">
            {[ 
              { id: 'gerenciar', label: 'Gerenciar Eventos', icon: FaCog },
              { id: 'flyers', label: 'Upload Flyers', icon: FaImage }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as 'flyers' | 'gerenciar');
                }}
                className={
                  `${activeTab === tab.id
                    ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-pink-400 border-2 border-white/40 font-bold shadow-lg'
                    : 'bg-white/10 border border-white/20 font-normal'} text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl cursor-pointer text-xs sm:text-sm flex items-center gap-2 transition-all duration-300`
                }
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Seção de Gerenciar Eventos */}
        {activeTab === 'gerenciar' && (
          <GerenciarEventos />
        )}

        {/* Seção de Upload de Flyers */}
        {activeTab === 'flyers' && (
          <UploadFlyer />
        )}

        {/* ======================================== */}
        {/* ESTILOS CSS DINÂMICOS */}
        {/* ======================================== */}
        <style>
          {`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AdminPage;