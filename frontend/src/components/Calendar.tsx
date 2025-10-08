import React, { useState, useEffect, useMemo } from 'react';
import { buscarFestas } from '../lib/api'; 
import type { Festa } from '../lib/api'
import FestaDetailsModal from './FestaDetailsModal'; // Importa o Modal de Detalhes
import DayEventsModal from './DayEventsModal'; // Importa o Modal de Eventos do Dia
import { FiSearch, FiCalendar, FiClock, FiMapPin, FiHome, FiFrown, FiStar } from 'react-icons/fi';

// Endereço de uma API gratuita de geolocalização (IP para Cidade)
const GEO_API_URL = 'https://ipapi.co/json/';

interface FilterState {
  nomeEvento: string;
  cidade: string;
  data: string;
  userLatitude?: number;
  userLongitude?: number;
  maxDistance?: number; // km
}

interface CalendarProps {
  filters?: FilterState;
}

const Calendar: React.FC<CalendarProps> = ({ filters }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [festas, setFestas] = useState<Festa[]>([]);
  const [cidadeUsuario, setCidadeUsuario] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar a exibição do Modal de Detalhes
  const [selectedFesta, setSelectedFesta] = useState<Festa | null>(null);
  
  // Estado para controlar o Modal de Eventos do Dia
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Festa[]>([]);
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  // --- 1. Lógica de Geolocalização ---

  useEffect(() => {
    // Tenta obter a cidade do usuário baseado no IP
    const getGeolocation = async () => {
      try {
        const response = await fetch(GEO_API_URL);
        const data = await response.json();
        setCidadeUsuario(data.city); 
      } catch (error) {
        console.error('Erro ao obter geolocalização:', error);
        setCidadeUsuario(null);
      }
    };
    getGeolocation();
  }, []); 

  // --- 2. Busca de Dados e Rebusca ao Mudar de Mês/Cidade ---
  
  useEffect(() => {
    const loadFestas = async () => {
      setLoading(true);
      // Busca TODAS as festas sem filtro de cidade (cidade serve apenas como filtro no frontend)
      const data = await buscarFestas();
      setFestas(data);
      setLoading(false);
    };
    
    loadFestas();
  }, []); // Remove dependência de cidadeUsuario 

  // Filtra as festas aplicando apenas os filtros (sem restrição de mês/ano)
  const festasFiltradas = useMemo(() => {
    return festas.filter(festa => {
      const dataFesta = new Date(festa.dataHora);
      
      // Aplicar filtros se existirem
      if (filters) {
        // Filtro por nome do evento
        if (filters.nomeEvento && !festa.nome.toLowerCase().includes(filters.nomeEvento.toLowerCase())) {
          return false;
        }
        
        // Filtro por cidade
        if (filters.cidade && !festa.cidade.toLowerCase().includes(filters.cidade.toLowerCase())) {
          return false;
        }
        
        // Filtro por data (a partir de)
        if (filters.data) {
          const dataFiltro = new Date(filters.data);
          if (dataFesta < dataFiltro) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [festas, filters]);

  // Separa as festas do mês atual sendo visualizado (para o calendário)
  const festasDoMes = useMemo(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return festasFiltradas.filter(festa => {
      const dataFesta = new Date(festa.dataHora);
      return dataFesta.getMonth() === currentMonth && dataFesta.getFullYear() === currentYear;
    });
  }, [festasFiltradas, currentDate]);
  
  // --- 3. Lógica e Funções de Navegação e Modal ---

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };
  
  const handleFestaClick = (festa: Festa) => {
    setSelectedFesta(festa);
  };
  
  const handleCloseModal = () => {
    setSelectedFesta(null);
  };

  // Função para lidar com click no dia (abre modal com lista de eventos)
  const handleDayClick = (day: number, eventos: Festa[]) => {
    if (eventos.length > 0) {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(clickedDate);
      setSelectedDayEvents(eventos);
    }
  };

  // Função para fechar o modal de eventos do dia
  const handleCloseDayModal = () => {
    setSelectedDate(null);
    setSelectedDayEvents([]);
  };

  // --- 4. Renderização Avançada dos Dias ---

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Dias em branco
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} style={{
          padding: '8px',
          minHeight: '120px',
          background: '#f9fafb',
          borderRadius: '12px',
          border: '1px solid #f3f4f6'
        }}>
        </div>
      );
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const today = new Date();
      const isToday = 
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
        
      // Filtra as festas que acontecem NESTE dia
      const festasDoDia = festasDoMes.filter(festa => 
        new Date(festa.dataHora).getDate() === day
      );
      
      const dayStyle = {
        padding: '12px',
        minHeight: '120px',
        color: '#374151',
        border: '2px solid',
        borderRadius: '16px',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        cursor: festasDoDia.length > 0 ? 'pointer' : 'default',
        ...(isToday 
          ? {
              background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
              borderColor: '#60a5fa',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 0 0 4px rgba(147, 197, 253, 0.3)'
            }
          : festasDoDia.length > 0
            ? {
                background: 'white',
                borderColor: '#d8b4fe',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }
            : {
                background: '#f9fafb',
                borderColor: '#e5e7eb'
              }
        )
      };

      days.push(
        <div 
          key={day} 
          style={dayStyle}
          onClick={() => handleDayClick(day, festasDoDia)}
        >
          {/* Número do Dia */}
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '8px',
            color: isToday 
              ? '#1d4ed8' 
              : festasDoDia.length > 0 
                ? '#7c3aed' 
                : '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            {day}
            {festasDoDia.length > 0 && (
              <span style={{
                fontSize: '10px',
                background: '#f3e8ff',
                color: '#7c3aed',
                padding: '2px 6px',
                borderRadius: '12px',
                fontWeight: '500'
              }}>
                {festasDoDia.length}
              </span>
            )}
          </div>
          
          {/* Área dos Eventos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {festasDoDia.slice(0, 2).map(festa => {
              // Verifica se a festa é na cidade do usuário (para destaque visual)
              const isLocal = cidadeUsuario && festa.cidade.toLowerCase() === cidadeUsuario.toLowerCase();
              const hora = new Date(festa.dataHora).toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });

              return (
                <div 
                  key={festa.id} 
                  onClick={() => handleFestaClick(festa)}
                  style={{
                    fontSize: '11px',
                    padding: '6px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: isLocal 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                      : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                    color: isLocal ? 'white' : '#374151',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  title={`${festa.nome} - ${hora}${festa.local ? `\nLocal: ${festa.local}` : ''}\nCidade: ${festa.cidade}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.background = '#f0f9ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <div style={{
                    fontWeight: '600',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {festa.nome} {isLocal && <FiStar style={{ display: 'inline', marginLeft: '4px', color: '#fbbf24' }} />}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    marginTop: '2px',
                    opacity: 0.8,
                    color: isLocal ? '#d1fae5' : '#6b7280'
                  }}>
                    {hora} • {festa.cidade}
                  </div>
                </div>
              );
            })}
            
            {festasDoDia.length > 2 && (
              <div style={{
                fontSize: '10px',
                color: '#7c3aed',
                fontWeight: '500',
                textAlign: 'center',
                padding: '4px',
                background: '#f3e8ff',
                borderRadius: '6px'
              }}>
                +{festasDoDia.length - 2} eventos
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <>
      {/* Seção de Resultados dos Filtros - ACIMA do calendário */}
      {(filters?.nomeEvento || filters?.cidade || filters?.data) && (
        <div style={{
          width: '100%',
          maxWidth: '100vw',
          margin: '1rem 1rem 0.5rem 1rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: window.innerWidth < 768 ? '16px' : '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
            color: 'white',
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: 0,
              textAlign: 'center'
            }}>
              <FiSearch style={{ display: 'inline', marginRight: '8px' }} />
              Resultados da Pesquisa ({festasFiltradas.length} encontrados)
            </h3>
            {(filters?.nomeEvento || filters?.cidade || filters?.data) && (
              <div style={{
                textAlign: 'center',
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                opacity: 0.9
              }}>
                {filters.nomeEvento && `"${filters.nomeEvento}"`}
                {filters.cidade && ` em ${filters.cidade}`}
                {filters.data && ` a partir de ${new Date(filters.data).toLocaleDateString('pt-BR')}`}
              </div>
            )}
          </div>

          <div style={{ padding: '1.5rem' }}>
            {festasFiltradas.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: '#9ca3af'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <FiFrown size={64} color="#9ca3af" />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                  Nenhum evento encontrado
                </h3>
                <p style={{ margin: 0 }}>
                  Tente ajustar os filtros para encontrar mais eventos
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {festasFiltradas.map((evento) => {
                  const dataEvento = new Date(evento.dataHora);
                  const dataFormatada = dataEvento.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  });
                  const horaFormatada = dataEvento.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  const isLocal = cidadeUsuario && evento.cidade.toLowerCase() === cidadeUsuario.toLowerCase();

                  return (
                    <div
                      key={evento.id}
                      onClick={() => handleFestaClick(evento)}
                      style={{
                        background: isLocal 
                          ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
                          : 'white',
                        border: `2px solid ${isLocal ? '#10b981' : '#e5e7eb'}`,
                        borderRadius: '16px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.borderColor = '#8b5cf6';
                        e.currentTarget.style.background = '#fefbff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = isLocal ? '#10b981' : '#e5e7eb';
                        e.currentTarget.style.background = 'white';
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

                      {/* Badge de evento local */}
                      {isLocal && (
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          <FiMapPin style={{ display: 'inline', marginRight: '4px' }} />
                          Sua cidade
                        </div>
                      )}

                      <div>
                        {/* Informações do evento */}
                        <div>
                          <h4 style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: '#1f2937',
                            margin: '0 0 0.5rem 0'
                          }}>
                            {evento.nome}
                          </h4>

                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            marginBottom: '0.75rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <FiCalendar size={16} />
                              <span style={{ textTransform: 'capitalize' }}>{dataFormatada}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <FiClock size={16} />
                              <span>{horaFormatada}</span>
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
                              margin: 0,
                              color: '#374151',
                              fontSize: '0.85rem',
                              lineHeight: '1.4',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
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
      )}

      {/* Calendário Principal */}
      <div style={{
        width: '100%',
        maxWidth: '100vw',
        margin: '1rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: window.innerWidth < 768 ? '16px' : '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        
        {/* Header principal centralizado */}
        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          color: 'white',
          padding: '2rem'
        }}>
          {/* Navegação do mês centralizada */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={goToPreviousMonth}
              style={{
                padding: '15px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Mês anterior"
            >
              ←
            </button>
            
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={goToNextMonth}
              style={{
                padding: '15px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Próximo mês"
            >
              →
            </button>
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Dias da semana */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            marginBottom: '1rem'
          }}>
            {daysOfWeek.map((day) => (
              <div key={day} style={{
                padding: '12px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#4b5563',
                background: '#f3f4f6',
                borderRadius: '12px'
              }}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Dias do calendário */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px'
          }}>
            {loading ? (
              <div style={{
                gridColumn: 'span 7',
                textAlign: 'center',
                padding: '3rem 0'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '1rem 2rem',
                  background: '#eff6ff',
                  borderRadius: '50px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #3b82f6',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ color: '#2563eb', fontWeight: '500' }}>
                    Carregando eventos...
                  </span>
                </div>
              </div>
            ) : (
              renderCalendarDays()
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* O Modal de Detalhes da Festa (Renderizado fora do calendário, mas na mesma página) */}
      <FestaDetailsModal 
        festa={selectedFesta} 
        onClose={handleCloseModal} 
      />

      {/* Modal de Eventos do Dia */}
      <DayEventsModal
        selectedDate={selectedDate}
        eventos={selectedDayEvents}
        onClose={handleCloseDayModal}
        onEventClick={handleFestaClick}
      />
    </>
  );
};

export default Calendar;