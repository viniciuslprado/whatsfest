import React, { useState } from 'react';
import DayEventsModal from '../../components/modals/DayEventsModal';
import EventFilters from '../../components/admin/filters/EventFilters';
import Calendar from '../../components/calendar/Calendar';
import type { Festa } from '../../lib/api';
import type { FilterState } from '../../components/admin/filters/EventFilters';

interface InicioProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  festas: Festa[];
}

const Inicio: React.FC<InicioProps> = ({ filters, onFiltersChange, festas }) => {
  const [showResults, setShowResults] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Festa | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Função para passar para EventFilters, para saber quando clicar em pesquisar
  const handleFiltersChange = (newFilters: FilterState) => {
    // Se todos os filtros estão vazios, esconder resultados
    if (!newFilters.nomeEvento && !newFilters.cidade && !newFilters.data) {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
    onFiltersChange(newFilters);
  };

  return (
    <div style={{ padding: '20px 10px' }}>

      <EventFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Lista de eventos filtrados só aparece após clicar em pesquisar */}
      {showResults && (
        <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 20, marginBottom: 24, border: '1px solid #eee' }}>
          <h3 style={{ fontWeight: 700, fontSize: 18, color: '#8b5cf6', marginBottom: 12 }}>Eventos encontrados</h3>
          {festas.length === 0 ? (
            <div style={{ color: '#dc2626', fontWeight: 500, padding: 12 }}>Nenhum evento encontrado para o filtro aplicado.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {festas.map(ev => (
                <li
                  key={ev.id}
                  style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: 2, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedEvent(ev);
                    setModalOpen(true);
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{ev.nome}</span>
                  <span style={{ color: '#6b7280', fontSize: 13 }}>{ev.data ? new Date(ev.data).toLocaleDateString('pt-BR') : ''} {ev.cidade && `- ${ev.cidade}`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Calendar festas={festas} />

      {/* Modal de detalhes do evento ao clicar na lista */}
      {modalOpen && selectedEvent && (
        <DayEventsModal
          selectedDate={selectedEvent.data ? new Date(selectedEvent.data) : null}
          eventos={[selectedEvent]}
          onClose={() => { setModalOpen(false); setSelectedEvent(null); }}
        />
      )}
    </div>
  );
};

export default Inicio;
