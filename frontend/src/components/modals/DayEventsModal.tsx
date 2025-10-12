import React from 'react';
import type { Festa } from '../../lib/api';
import { FiCalendar, FiClock, FiMapPin, FiHome, FiStar } from 'react-icons/fi';

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
  if (!selectedDate) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #f3f4f6'
        }}>
          <div>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              Eventos do Dia
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              margin: 0,
              fontWeight: '500',
              textTransform: 'capitalize'
            }}>
              {formatDate(selectedDate)}
            </p>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b7280',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Lista de Eventos */}
        {eventos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#9ca3af'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <FiCalendar size={64} color="#9ca3af" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
              Nenhum evento neste dia
            </h3>
            <p style={{ margin: 0 }}>
              Que tal cadastrar um evento para esta data?
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {eventos.map((evento) => {
              const hora = evento.horaInicio ? 
                `${evento.horaInicio}${evento.horaFim ? ` - ${evento.horaFim}` : ''}` : 
                'Horário não informado';

              return (
                <div
                  key={evento.id}
                  onClick={() => onEventClick(evento)}
                  style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    border: '2px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8b5cf6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Badge de destaque */}
                  {evento.destaque && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      <FiStar style={{ display: 'inline', marginRight: '4px' }} />
                      Destaque
                    </div>
                  )}

                  <div>
                    {/* Informações do evento */}
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0 0 0.5rem 0'
                      }}>
                        {evento.nome}
                      </h3>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        fontSize: '0.9rem',
                        color: '#6b7280'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FiClock size={16} />
                          <span>{hora}</span>
                        </div>
                        {evento.local && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiMapPin size={16} />
                            <span>{evento.local}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FiHome size={16} />
                          <span>{evento.cidade}</span>
                        </div>
                      </div>

                      {evento.descricaoCurta && (
                        <p style={{
                          margin: '0.75rem 0 0 0',
                          color: '#374151',
                          fontSize: '0.9rem',
                          lineHeight: '1.5'
                        }}>
                          {evento.descricaoCurta}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayEventsModal;