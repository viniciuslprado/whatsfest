import React, { useState } from 'react';
import { FaPlus, FaArrowLeft, FaImage, FaCog } from 'react-icons/fa';
import CriarEventoForm from '../components/admin/CriarEventoForm';
import GerenciarEventos from '../components/admin/GerenciarEventos';
import UploadFlyer from '../components/admin/UploadFlyer';

const AdminPage: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'eventos' | 'flyers' | 'gerenciar'>('eventos');

  return (
  <div className="min-h-screen w-full m-0 p-0 box-border bg-gradient-to-br from-fuchsia-700 via-pink-500 to-rose-400 overflow-x-hidden">
    <div className="max-w-3xl mx-auto p-5 box-border h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-2xl">
        {/* Cabeçalho */}
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white m-0 flex items-center gap-3">
              <FaCog /> Painel Administrativo
            </h1>
            <button
              onClick={onLogout}
              className="bg-red-600/80 border-none text-white px-6 py-3 rounded-lg cursor-pointer text-sm font-bold flex items-center gap-2 hover:bg-red-700/90 transition"
            >
              <FaArrowLeft /> Sair
            </button>
          </div>

          {/* Sistema de Abas */}
          <div className="flex gap-2 border-t border-white/20 pt-6 mt-6">
            {[
              { id: 'eventos', label: '📅 Criar Eventos', icon: FaPlus },
              { id: 'gerenciar', label: '📝 Gerenciar Eventos', icon: FaCog },
              { id: 'flyers', label: '🎨 Upload Flyers', icon: FaImage }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as 'eventos' | 'flyers' | 'gerenciar');
                }}
                className={
                  `${activeTab === tab.id
                    ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-pink-400 border-2 border-white/40 font-bold shadow-lg'
                    : 'bg-white/10 border border-white/20 font-normal'} text-white px-5 py-3 rounded-xl cursor-pointer text-sm flex items-center gap-2 transition-all duration-300`
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

        {/* Seção de Criar Evento */}
        {activeTab === 'eventos' && (
          <CriarEventoForm />
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