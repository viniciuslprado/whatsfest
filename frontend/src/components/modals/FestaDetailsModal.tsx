// frontend/src/components/modals/FestaDetailsModal.tsx
import React from 'react';
import type { Festa } from '../../lib/api'; // Importamos o tipo Festa
import { FiCalendar, FiMapPin } from 'react-icons/fi';

// Propriedades (Props) que o Modal vai receber
interface ModalProps {
  festa: Festa | null; // A festa a ser exibida (pode ser nula se estiver fechado)
  onClose: () => void; // Função para fechar o modal
}

const FestaDetailsModal: React.FC<ModalProps> = ({ festa, onClose }) => {
  // Se 'festa' for nulo, o modal não é exibido
  if (!festa) return null;

  // Formata a data para ser mais legível
  const dataFormatada = festa.data ? new Date(festa.data).toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  }) : 'Data não informada';
  
  // Formata a hora
  const horaFormatada = festa.horaInicio ? 
    `${festa.horaInicio}${festa.horaFim ? ` - ${festa.horaFim}` : ''}` : 
    'Horário não informado';

  // URL para busca no Google Maps
  const mapSearchTerm = encodeURIComponent(festa.local ? `${festa.local}, ${festa.cidade}` : festa.cidade);
  

  return (
    // Overlay (fundo escuro com backdrop blur)
    <div 
      className="fixed inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-blue-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
      onClick={onClose}
    >
      {/* Container Principal do Modal */}
      <div 
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all scale-100 hover:scale-105 duration-300 ring-1 ring-purple-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Imagem/Flyer do Destaque com gradiente overlay */}
        <div className="relative">
          <img 
            src={festa.urlImagemFlyer || 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto'} 
            alt={`Flyer da ${festa.nome}`} 
            className="w-full h-48 object-cover rounded-t-2xl"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">{festa.nome}</h2>
          {festa.descricaoCurta && (
            <p className="text-sm font-medium text-purple-600 mb-4 px-3 py-1 bg-purple-100 rounded-full inline-block">{festa.descricaoCurta}</p>
          )}
          
          <div className="space-y-4 border-t border-gray-200 pt-6">
            {/* Informações de Data e Hora com cards */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl">
              <div className="flex items-center text-gray-800 mb-2">
                <FiCalendar className="text-2xl mr-3" />
                <div>
                  <span className="font-semibold text-purple-700">Data:</span> 
                  <span className="ml-2">{dataFormatada}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-800 mb-2">
                <span className="text-2xl mr-3">⏰</span>
                <div>
                  <span className="font-semibold text-purple-700">Hora:</span> 
                  <span className="ml-2">{horaFormatada}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-800">
                <FiMapPin className="text-2xl mr-3" />
                <div>
                  <span className="font-semibold text-purple-700">Local:</span> 
                  <span className="ml-2">{festa.local ? `${festa.local}, ${festa.cidade}` : festa.cidade}</span>
                </div>
              </div>
            </div>

            {/* Link de Vendas */}
            {festa.linkVendas && (
              <a 
                href={festa.linkVendas} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-6 w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🎟️ Comprar Ingressos →
              </a>
            )}
            
            {/* Seção do Mapa */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🗺️</span>
                Como Chegar
              </h3>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                {/* Link para abrir no Google Maps (sem API key) */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    {festa.local && (
                      <>
                        📍 <strong>{festa.local}</strong><br />
                      </>
                    )}
                    {festa.cidade}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/${mapSearchTerm}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                  >
                    🗺️ Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Botão de Fechar */}
            <button 
              onClick={onClose}
              className="mt-6 w-full text-center bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              ✖️ Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestaDetailsModal;