import React from 'react';
import type { Festa } from '../../../lib/api';

interface EventosTableProps {
  eventos: Festa[];
  selectedId: number | null;
  onSelect: (evento: Festa) => void;
}

const EventosTable: React.FC<EventosTableProps> = ({ eventos, selectedId, onSelect }) => {
  if (eventos.length === 0) {
    return <div className="text-center text-gray-400 py-8">Nenhum evento cadastrado.</div>;
  }
  return (
    <div className="overflow-x-auto max-w-full">
      <table className="min-w-[220px] sm:min-w-[320px] w-full divide-y divide-gray-200 text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-xs font-bold text-gray-700 uppercase rounded-l-xl bg-gray-50">Nome do Evento *</th>
            <th className="px-2 py-2 text-left text-xs font-bold text-gray-700 uppercase rounded-r-xl bg-gray-50">Data *</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {eventos.map((evento) => (
            <tr
              key={evento.id}
              className={`transition cursor-pointer ${selectedId === evento.id
                ? 'bg-purple-100/80 ring-2 ring-purple-500 shadow-lg scale-[1.01] border-2 border-pink-500 rounded-xl'
                : 'hover:bg-purple-50 rounded-xl'}`}
              style={selectedId === evento.id ? { boxShadow: '0 0 0 2px #ec4899, 0 4px 16px 0 rgba(139,92,246,0.10)' } : {}}
              onClick={() => onSelect(evento)}
            >
              <td className="px-2 py-2 font-semibold text-gray-800 rounded-l-xl bg-white/80">{evento.nome}</td>
              <td className="px-2 py-2 text-gray-600 rounded-r-xl bg-white/80">{evento.data ? new Date(evento.data).toLocaleDateString('pt-BR') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventosTable;
