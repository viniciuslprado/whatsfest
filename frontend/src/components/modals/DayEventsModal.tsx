
import React from 'react';
import type { Festa } from '../../lib/api';
import { FiCalendar, FiMapPin, FiStar, FiClock, FiHome, FiX } from 'react-icons/fi';

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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-1 sm:p-2"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-1 sm:p-3 md:p-4 max-w-md sm:max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b-2 border-gray-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Eventos do Dia</h2>
            <p className="text-gray-500 text-base font-medium capitalize m-0">{formatDate(selectedDate)}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 border-none rounded-full w-10 h-10 flex items-center justify-center text-xl text-gray-500 transition-all duration-200"
            type="button"
            aria-label="Fechar"
          >
            <FiX />
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
                  className="relative bg-gradient-to-br from-slate-50 to-slate-100 border border-gray-200 rounded-2xl p-0 overflow-hidden shadow-xl flex flex-col sm:flex-row gap-0 sm:gap-2"
                >
                  {/* Imagem/Flyer do Evento */}
                  <div className="relative w-full sm:w-40 flex-shrink-0">
                    <img 
                      src={evento.urlImagemFlyer || 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto'} 
                      alt={`Flyer da ${evento.nome}`} 
                      className="w-full h-40 sm:h-48 object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                      onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"></div>
                    {evento.destaque && (
                      <div className="absolute top-2 right-2 bg-gradient-to-br from-amber-300 to-orange-400 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow">
                        <FiStar className="inline mr-1" /> Destaque
                      </div>
                    )}
                  </div>
                  {/* Conteúdo do Evento */}
                  <div className="p-2 sm:p-2 flex-1 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-1">{evento.nome}</h3>
                    {evento.descricaoCurta && (
                      <p className="text-xs sm:text-xs font-medium text-purple-600 mb-1 sm:mb-2 px-2 py-1 bg-purple-100 rounded-full inline-block">{evento.descricaoCurta}</p>
                    )}
                    <div className="space-y-1 sm:space-y-2 border-t border-gray-200 pt-2 sm:pt-3">
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-1 sm:p-2 rounded-xl">
                        <div className="flex items-center text-gray-800 mb-1">
                          <FiCalendar className="text-lg sm:text-xl mr-2 sm:mr-2" />
                          <div>
                            <span className="font-semibold text-purple-700">Data:</span> 
                            <span className="ml-1 sm:ml-1">{dataFormatada}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-800 mb-1">
                          <FiClock className="text-lg sm:text-xl mr-2 sm:mr-2" />
                          <div>
                            <span className="font-semibold text-purple-700">Hora:</span> 
                            <span className="ml-1 sm:ml-1">{hora}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-800 mb-1">
                          <FiMapPin className="text-lg sm:text-xl mr-2 sm:mr-2" />
                          <div>
                            <span className="font-semibold text-purple-700">Local:</span> 
                            <span className="ml-1 sm:ml-1">{evento.local || '-'} </span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-800">
                          <FiHome className="text-lg sm:text-xl mr-2 sm:mr-2" />
                          <div>
                            <span className="font-semibold text-purple-700">Cidade:</span> 
                            <span className="ml-1 sm:ml-1">{evento.cidade}</span>
                          </div>
                        </div>
                        {evento.linkVendas && (
                          <div className="flex items-center mt-2">
                            <a
                              href={evento.linkVendas}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base sm:text-lg"
                              style={{ letterSpacing: 1 }}
                            >
                              Comprar Ingressos
                            </a>
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