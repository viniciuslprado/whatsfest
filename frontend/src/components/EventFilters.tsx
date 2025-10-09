import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdEvent } from 'react-icons/md';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import useLocation from '../hooks/useLocation';


export interface FilterState {
  nomeEvento: string;
  cidade: string;
  data: string;
  userLatitude?: number;
  userLongitude?: number;
  maxDistance?: number; // km
}

interface EventFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ filters, onFiltersChange }) => {
  // Estados locais para os inputs (não aplicam filtros automaticamente)
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [citySuggestions, setCitySuggestions] = React.useState<string[]>([]);
  const [hasUserEditedCity, setHasUserEditedCity] = React.useState(false);
  const [locationStatus, setLocationStatus] = React.useState<'detecting' | 'found' | 'error' | 'none'>('none');
  const [detectedCityName, setDetectedCityName] = React.useState<string>('');
  const [geolocationCancelled, setGeolocationCancelled] = React.useState(false);
  
  const { location, error: locationError, searchCities } = useLocation();

  // Sincronizar filtros locais quando os filtros externos mudarem (apenas quando limpar)
  React.useEffect(() => {
    if (!filters.nomeEvento && !filters.cidade && !filters.data) {
      setLocalFilters(filters);
    }
  }, [filters]);

  // Função para converter nome do estado para sigla
  const getStateAbbreviation = React.useCallback((stateName: string | undefined): string => {
    if (!stateName) return '';
    
    const stateMap: Record<string, string> = {
      'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM',
      'Bahia': 'BA', 'Ceará': 'CE', 'Distrito Federal': 'DF', 'Espírito Santo': 'ES',
      'Goiás': 'GO', 'Maranhão': 'MA', 'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS',
      'Minas Gerais': 'MG', 'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR',
      'Pernambuco': 'PE', 'Piauí': 'PI', 'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN',
      'Rio Grande do Sul': 'RS', 'Rondônia': 'RO', 'Roraima': 'RR', 'Santa Catarina': 'SC',
      'São Paulo': 'SP', 'Sergipe': 'SE', 'Tocantins': 'TO'
    };
    
    // Buscar nome exato
    if (stateMap[stateName]) return stateMap[stateName];
    
    // Buscar nome parcial (case insensitive)
    const normalizedInput = stateName.toLowerCase();
    for (const [fullName, abbr] of Object.entries(stateMap)) {
      if (fullName.toLowerCase().includes(normalizedInput) || 
          normalizedInput.includes(fullName.toLowerCase())) {
        return abbr;
      }
    }
    
    // Se já é uma sigla de 2 letras, retorna ela mesma
    if (stateName.length === 2 && /^[A-Z]{2}$/.test(stateName.toUpperCase())) {
      return stateName.toUpperCase();
    }
    
    return '';
  }, []);

  const tryAutoDetectLocation = React.useCallback(() => {
    if (!navigator.geolocation || geolocationCancelled) {
      return;
    }

    // Não mostrar "detectando" imediatamente, fazer silenciosamente
    let timeoutId: number | null = null;
    
    // Só mostrar "detectando" se demorar mais de 1 segundo
    timeoutId = setTimeout(() => {
      if (!geolocationCancelled) {
        setLocationStatus('detecting');
      }
    }, 1000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Limpar timeout se conseguiu rapidamente
        if (timeoutId) clearTimeout(timeoutId);
        
        // Verificar se foi cancelado durante a detecção
        if (geolocationCancelled) {
          return;
        }

        const { latitude, longitude } = position.coords;
        
        // Fazer reverse geocoding de forma mais discreta
        try {
          // Controller para cancelar requisição se necessário
          const controller = new AbortController();
          
          // Timeout mais curto para não travar
          setTimeout(() => controller.abort(), 3000);
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'WhatsFest-Calendar/1.0'
              },
              signal: controller.signal
            }
          );
          
          if (response.ok && !geolocationCancelled) {
            const data = await response.json();
            
            // Extrair cidade e estado de forma consistente com a pesquisa manual IBGE
            const city = data.address?.city || 
                        data.address?.town || 
                        data.address?.municipality ||
                        data.address?.village ||
                        'Cidade';
            
            const state = data.address?.state;
            
            // Formato padronizado: "Cidade (UF)" (igual ao IBGE)
            // Converter nome completo do estado para sigla se necessário
            const stateAbbr = getStateAbbreviation(state);
            const cityName = stateAbbr ? `${city} (${stateAbbr})` : city;
                           
            setDetectedCityName(cityName);
            setLocationStatus('found');
            
            // Usar filters atuais e atualizar com geolocalização
            onFiltersChange({
              nomeEvento: filters.nomeEvento,
              cidade: filters.cidade,
              data: filters.data,
              userLatitude: latitude,
              userLongitude: longitude,
              maxDistance: 25
            });
          }
        } catch {
          // Se foi cancelado ou erro de rede, apenas usar coordenadas sem nome
          if (!geolocationCancelled) {
            // Não definir nome da cidade se não conseguir obter
            setLocationStatus('found');
            
            // Usar filters atuais e atualizar com geolocalização
            onFiltersChange({
              nomeEvento: filters.nomeEvento,
              cidade: filters.cidade,
              data: filters.data,
              userLatitude: latitude,
              userLongitude: longitude,
              maxDistance: 25
            });
          }
        }
      },
      () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (!geolocationCancelled) {
          setLocationStatus('none');
        }
      },
      {
        enableHighAccuracy: false, // Mais rápido
        timeout: 3000, // Reduzido para 3 segundos
        maximumAge: 600000, // 10 minutos de cache (aumentado)
      }
    );
  }, [filters.nomeEvento, filters.cidade, filters.data, onFiltersChange, geolocationCancelled, getStateAbbreviation]);

  // Detectar localização automaticamente quando componente carrega
  React.useEffect(() => {
    if (!hasUserEditedCity && !localFilters.cidade && !geolocationCancelled) {
      tryAutoDetectLocation();
    }
  }, [hasUserEditedCity, localFilters.cidade, geolocationCancelled, tryAutoDetectLocation]);

  const handleInputChange = (key: string, value: string) => {
    // Atualizar apenas os filtros locais, não aplicar automaticamente
    setLocalFilters({
      ...localFilters,
      [key]: value
    });
  };

  const selectSuggestion = (suggestion: string) => {
    handleInputChange('cidade', suggestion);
    setShowSuggestions(false);
    setCitySuggestions([]);
    setHasUserEditedCity(true);
  };

  const handleCitySearch = async (value: string) => {
    // Cancelar geolocalização se usuário começou a digitar
    if (!geolocationCancelled && value.length > 0) {
      setGeolocationCancelled(true);
      setLocationStatus('none');
    }
    
    handleInputChange('cidade', value);
    setHasUserEditedCity(true);
    
    if (value.length >= 2) {
      try {
        const suggestions = await searchCities(value);
        setCitySuggestions(suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
    } else {
      setShowSuggestions(false);
      setCitySuggestions([]);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      nomeEvento: '',
      cidade: '',
      data: '',
      userLatitude: undefined,
      userLongitude: undefined,
      maxDistance: undefined
    };
    
    setLocationStatus('none');
    setDetectedCityName('');
    setHasUserEditedCity(false);
    setGeolocationCancelled(false); // Permitir nova detecção
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = localFilters.nomeEvento || localFilters.cidade || localFilters.data || (locationStatus === 'found');

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#374151',
          margin: '0 0 8px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FaSearch /> Procure por eventos aqui
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {/* Filtro Nome do Evento */}
        <div>
          <label style={{
            display: 'flex',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px',
            alignItems: 'center',
            gap: '6px'
          }}>
            <MdEvent /> Nome do evento
          </label>
          <input
            type="text"
            placeholder="Ex: Festa de Ano Novo"
            value={localFilters.nomeEvento}
            onChange={(e) => handleInputChange('nomeEvento', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8b5cf6';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          />
        </div>

        {/* Filtro Cidade */}
        <div style={{ position: 'relative' }}>
          <label style={{
            display: 'flex',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px',
            alignItems: 'center',
            gap: '6px'
          }}>
            <FiMapPin /> Cidade
            {location?.city && !hasUserEditedCity && (
              <span style={{
                fontSize: '12px',
                color: '#10b981',
                background: '#f0fdf4',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 'normal'
              }}>
                <FiMapPin style={{ display: 'inline', marginRight: '4px' }} />
                Detectada automaticamente
              </span>
            )}
          </label>
          <div style={{ position: 'relative', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder={
                locationStatus === 'detecting' 
                  ? "🔄 Detectando sua localização..." 
                  : locationStatus === 'found' && detectedCityName
                  ? `Digite uma cidade ou use "${detectedCityName}" (detectada)`
                  : locationStatus === 'found' && !detectedCityName
                  ? "🌟 Localização detectada - Digite uma cidade ou deixe vazio para eventos próximos"
                  : location?.city 
                  ? `Digite uma cidade ou use "${location.city}" (detectada)` 
                  : "Digite uma cidade (ex: São Paulo, SP ou Rio de Janeiro, RJ)"
              }
              value={localFilters.cidade}
              onChange={(e) => handleCitySearch(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.outline = 'none';
                
                // Cancelar geolocalização quando usuário clica no campo
                if (!geolocationCancelled && locationStatus === 'detecting') {
                  setGeolocationCancelled(true);
                  setLocationStatus('none');
                }
                
                if (localFilters.cidade.length >= 2) {
                  setShowSuggestions(true);
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                // Delay para permitir click nas sugestões
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
            
            {/* Botão para usar cidade detectada */}
            {locationStatus === 'found' && detectedCityName && !localFilters.cidade && (
              <button
                type="button"
                onClick={() => {
                  handleInputChange('cidade', detectedCityName);
                  setHasUserEditedCity(true);
                }}
                style={{
                  padding: '8px 12px',
                  background: '#f0fdf4',
                  border: '1px solid #16a34a',
                  borderRadius: '6px',
                  color: '#16a34a',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#16a34a';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.color = '#16a34a';
                }}
              >
                📍 {detectedCityName}
              </button>
            )}
          </div>
          
          {/* Lista de Sugestões Melhorada */}
          {showSuggestions && citySuggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              border: '2px solid #d1d5db',
              borderTop: '1px solid #e5e7eb',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              maxHeight: '280px',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderBottom: '1px solid #e2e8f0',
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '500'
              }}>
                {citySuggestions.length} cidade{citySuggestions.length !== 1 ? 's' : ''} encontrada{citySuggestions.length !== 1 ? 's' : ''}
              </div>
              {citySuggestions.map((suggestion, index) => {
                // Separa cidade e estado para melhor formatação
                const [cidade, estado] = suggestion.includes('(') 
                  ? suggestion.split(' (') 
                  : [suggestion, ''];
                const estadoLimpo = estado.replace(')', '');
                
                return (
                  <div
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    style={{
                      padding: '14px 16px',
                      cursor: 'pointer',
                      borderBottom: index < citySuggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f9ff';
                      e.currentTarget.style.borderLeft = '3px solid #3b82f6';
                      e.currentTarget.style.paddingLeft = '13px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderLeft = 'none';
                      e.currentTarget.style.paddingLeft = '16px';
                    }}
                  >
                    <FiMapPin style={{ 
                      color: '#8b5cf6', 
                      fontSize: '16px',
                      flexShrink: 0
                    }} />
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      flex: 1
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>
                        {cidade}
                      </span>
                      {estadoLimpo && (
                        <span style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          marginTop: '2px'
                        }}>
                          {estadoLimpo}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {citySuggestions.length === 0 && localFilters.cidade.length >= 2 && (
                <div style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '14px'
                }}>
                  <div style={{ marginBottom: '8px' }}>🔍</div>
                  Nenhuma cidade encontrada para "{localFilters.cidade}"
                </div>
              )}
            </div>
          )}

        </div>

        {/* Filtro Data */}
        <div>
          <label style={{
            display: 'flex',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px',
            alignItems: 'center',
            gap: '6px'
          }}>
            <MdEvent /> Data do evento
          </label>
          <input
            type="date"
            value={localFilters.data}
            onChange={(e) => handleInputChange('data', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#8b5cf6';
              e.currentTarget.style.outline = 'none';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: hasActiveFilters ? '20px' : '0'
      }}>
        <button
          onClick={() => {
            // Aplicar filtros locais quando clicar no botão
            onFiltersChange({ ...localFilters });
          }}
          style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '600'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(139, 92, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <FiSearch style={{ display: 'inline', marginRight: '6px' }} />
          Pesquisar Eventos
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              background: 'transparent',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f87171';
              e.currentTarget.style.color = '#ef4444';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🗑️ Limpar Filtros
          </button>
        )}
      </div>

      {/* Mensagens de localização */}
      {locationError && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: '#fee2e2',
          borderRadius: '8px',
          color: '#dc2626',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⚠️ {locationError}
        </div>
      )}
      
      {location && location.city && (
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          background: '#ecfdf5',
          borderRadius: '6px',
          color: '#065f46',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <FiMapPin style={{ display: 'inline', marginRight: '4px' }} />
          Localização detectada: {location.city}
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default EventFilters;