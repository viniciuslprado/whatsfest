
import React, { useState } from 'react';
import type { Festa } from '../../lib/api';
import { FiCalendar, FiClock, FiMapPin, FiHome, FiStar } from 'react-icons/fi';
import FestaDetailsModal from './FestaDetailsModal';

interface DayEventsModalProps {
  selectedDate: Date | null;
  eventos: Festa[];
  onClose: () => void;
  onEventClick: (festa: Festa) => void;
}

const DayEventsModal: React.FC<DayEventsModalProps> = ({
  selectedDate,
  eventos,
  onClose,
  onEventClick
}) => {
  const [selectedFesta, setSelectedFesta] = useState<Festa | null>(null);
  if (!selectedDate) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEventClick = (festa: Festa) => {
    setSelectedFesta(festa);
    if (onEventClick) onEventClick(festa);
  };

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

              return (
                <div
                  key={evento.id}
                  onClick={() => handleEventClick(evento)}
                  className="relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-200 overflow-hidden hover:border-purple-500 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {/* Badge de destaque */}
                  {evento.destaque && (
                    <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-300 to-orange-400 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow">
                      <FiStar className="inline mr-1" /> Destaque
                    </div>
                  )}

                  <div>
                    {/* Informações do evento */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{evento.nome}</h3>

                      <div className="flex flex-col gap-1 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FiClock size={16} />
                          <span>{hora}</span>
                        </div>
                        {evento.local && (
                          <div className="flex items-center gap-2">
                            <FiMapPin size={16} />
                            <span>{evento.local}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FiHome size={16} />
                          <span>{evento.cidade}</span>
                        </div>
                      </div>

                      {evento.descricaoCurta && (
                        <p className="mt-3 text-gray-700 text-sm leading-relaxed">{evento.descricaoCurta}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Modal de detalhes do evento */}
      <FestaDetailsModal festa={selectedFesta} onClose={() => setSelectedFesta(null)} />
    </div>
  );
};

export default DayEventsModal;