
import React from 'react';
import type { Festa } from '../../lib/api';
import { FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';

interface DayEventsModalProps {
  selectedDate: Date | null;
  eventos: Festa[];
  onClose: () => void;
}

const DayEventsModal: React.FC<DayEventsModalProps> = ({
  selectedDate,
  eventos,
  onClose
}) => {
  // removido selectedFesta
  if (!selectedDate) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // removido handleEventClick

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b-2 border-gray-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Eventos do Dia</h2>
            <p className="text-gray-500 text-base font-medium capitalize m-0">{formatDate(selectedDate)}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 border-none rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-500 transition-all duration-200"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Lista de Eventos */}
        {eventos.length === 0 ? (
          <div className="text-center py-12 px-4 text-gray-400">
            <div className="text-6xl mb-4 flex justify-center">
              <FiCalendar size={64} color="#9ca3af" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum evento neste dia</h3>
            <p className="m-0">Que tal cadastrar um evento para esta data?</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {eventos.map((evento) => {
              const hora = evento.horaInicio ? 
                `${evento.horaInicio}${evento.horaFim ? ` - ${evento.horaFim}` : ''}` : 
                'Horário não informado';
              const dataFormatada = evento.data ? new Date(evento.data).toLocaleDateString('pt-BR', {
                weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
              }) : 'Data não informada';
              // removido mapSearchTerm
              return (
                <div
                  key={evento.id}
                  className="relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-gray-200 rounded-2xl p-0 overflow-hidden shadow-xl"
                >
                  {/* Imagem/Flyer do Evento */}
                  <div className="relative">
                    <img 
                      src={evento.urlImagemFlyer || 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto'} 
                      alt={`Flyer da ${evento.nome}`} 
                      className="w-full h-48 object-cover rounded-t-2xl"
                      onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
                    {evento.destaque && (
                      <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-300 to-orange-400 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow">
                        <FiStar className="inline mr-1" /> Destaque
                      </div>
                    )}
                  </div>
                  {/* Conteúdo do Evento */}
                  <div className="p-6">
                    <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">{evento.nome}</h3>
                    {evento.descricaoCurta && (
                      <p className="text-sm font-medium text-purple-600 mb-4 px-3 py-1 bg-purple-100 rounded-full inline-block">{evento.descricaoCurta}</p>
                    )}
                    <div className="space-y-4 border-t border-gray-200 pt-6">
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
                            <span className="ml-2">{hora}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-800 mb-2">
                          <FiMapPin className="text-2xl mr-3" />
                          <div>
                            <span className="font-semibold text-purple-700">Local:</span> 
                            <span className="ml-2">{evento.local || '-'}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-800">
                          <span className="text-2xl mr-3">🏙️</span>
                          <div>
                            <span className="font-semibold text-purple-700">Cidade:</span> 
                            <span className="ml-2">{evento.cidade}</span>
                          </div>
                        </div>
                        {evento.linkVendas && (
                          <div className="flex items-center text-gray-800 mt-2">
                            <a href={evento.linkVendas} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Comprar Ingressos</a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
  {/* Modal de detalhes do evento removido, pois detalhes agora aparecem direto nos cards */}
    </div>
  );
};

export default DayEventsModal;