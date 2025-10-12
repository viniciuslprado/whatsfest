import React, { useState, useRef, useCallback } from 'react';
import { criarNovaFesta } from '../lib/api'; 
import type { FestaData } from '../lib/api';
import { FaPlus, FaSave, FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaUpload, FaImage, FaCog } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

// Interface para eventos existentes (compatível com Prisma schema)
interface Evento {
  id: number;
  nome: string;
  data?: string; // Data do evento
  horaInicio?: string; // Hora de início
  horaFim?: string; // Hora de fim
  cidade: string;
  local?: string;
  urlImagemFlyer?: string;
  linkVendas?: string;
  descricaoCurta?: string;
  destaque: boolean;
  criadoEm: string;
  atualizadoEm: string;
} 

// Estado inicial do formulário (limpo)
const initialFormData: FestaData = {
  nome: '',
  data: undefined,
  horaInicio: undefined,
  horaFim: undefined,
  cidade: '',
  local: '',
  urlImagemFlyer: 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Evento+de+Texto', // Placeholder para eventos de texto
  linkVendas: '',
  descricaoCurta: '',
  destaque: false,
};

// Estado adicional para campos separados de data e hora
const initialDateTimeFields = {
  data: '',
  horaInicio: '',
  horaFim: '',
};

interface AdminPageProps {
  onLogout?: () => void;
}

interface FlyerImage {
  id?: string;
  fileName?: string;
  imageUrl: string;
  size?: number;
  uploadDate?: string;
  title?: string;
  description?: string;
  linkVendas?: string;
  destaque?: boolean;
  dataEvento?: string;
  cidade?: string;
  createdAt?: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  // ========================================
  // ESTADOS DO COMPONENTE
  // ========================================
  
  // Estados do formulário
  const [formData, setFormData] = useState<FestaData>(initialFormData);
  const [dateTimeFields, setDateTimeFields] = useState(initialDateTimeFields);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | '' }>({ text: '', type: '' });
  
  // Estados para upload de arquivos
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [flyers, setFlyers] = useState<FlyerImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para autocomplete de cidades
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  
  // Estados para gerenciamento de eventos
  const [isEditing, setIsEditing] = useState(false);
  const [eventosExistentes, setEventosExistentes] = useState<Evento[]>([]);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  
  // Estado para controle das abas
  const [activeTab, setActiveTab] = useState<'eventos' | 'flyers' | 'gerenciar'>('eventos');

  // ========================================
  // FUNÇÕES AUXILIARES
  // ========================================

  // Função para atualizar campos do formulário
  const handleInputChange = (key: keyof FestaData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Função para buscar cidades
  const searchCities = useCallback(async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(
        `${apiUrl}/api/v1/geolocation/cities?search=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar cidades');
      }

      const cities = await response.json() as string[];
      return cities;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      return [];
    }
  }, []);

  // Função para lidar com mudanças na cidade
  const handleCitySearch = async (value: string) => {
    handleInputChange('cidade', value);
    
    if (value.length >= 2) {
      try {
        const suggestions = await searchCities(value);
        setCitySuggestions(suggestions);
        setShowCitySuggestions(true);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      }
    } else {
      setShowCitySuggestions(false);
      setCitySuggestions([]);
    }
  };

  // Função para selecionar uma sugestão de cidade
  const selectCitySuggestion = (suggestion: string) => {
    handleInputChange('cidade', suggestion);
    setShowCitySuggestions(false);
    setCitySuggestions([]);
  };

  // Função para selecionar uma cidade das sugestões
  const selectCity = (city: string) => {
    handleInputChange('cidade', city);
    setShowCitySuggestions(false);
    setCitySuggestions([]);
  };

  // Função para atualizar campos de data/hora
  const handleDateTimeChange = (field: keyof typeof initialDateTimeFields, value: string) => {
    setDateTimeFields(prev => ({ ...prev, [field]: value }));
  };

  // ========================================
  // FUNÇÕES DE GERENCIAMENTO DE EVENTOS
  // ========================================

  // Função para carregar eventos existentes
  const carregarEventos = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/festas`);
      if (response.ok) {
        const eventos = await response.json();
        setEventosExistentes(eventos);
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  // Função para iniciar edição de um evento
  const iniciarEdicao = (evento: Evento) => {
    setEventoSelecionado(evento);
    setIsEditing(true);
    
    // Mudar para a aba de gerenciar para mostrar o formulário de edição
    setActiveTab('gerenciar');
    
    // Preencher formulário com dados do evento
    setFormData({
      nome: evento.nome,
      data: evento.data,
      horaInicio: evento.horaInicio,
      horaFim: evento.horaFim,
      cidade: evento.cidade,
      local: evento.local || '',
      urlImagemFlyer: evento.urlImagemFlyer || '',
      linkVendas: evento.linkVendas || '',
      descricaoCurta: evento.descricaoCurta || '',
      destaque: evento.destaque || false,
    });
    
    // Preencher campos de data e hora
    setDateTimeFields({
      data: evento.data || '',
      horaInicio: evento.horaInicio || '',
      horaFim: evento.horaFim || '',
    });
  };

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setIsEditing(false);
    setEventoSelecionado(null);
    setFormData(initialFormData);
    setDateTimeFields(initialDateTimeFields);
  };

  // Função para enviar o formulário de evento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Enviar dados separados (data, horaInicio, horaFim) em vez de dataHora
      const dadosParaEnvio = {
        nome: formData.nome,
        data: dateTimeFields.data || undefined,
        horaInicio: dateTimeFields.horaInicio || undefined,
        horaFim: dateTimeFields.horaFim || undefined,
        cidade: formData.cidade,
        local: formData.local || undefined,
        urlImagemFlyer: formData.urlImagemFlyer || undefined,
        linkVendas: formData.linkVendas || undefined,
        descricaoCurta: formData.descricaoCurta || undefined,
        destaque: formData.destaque
      };

      if (isEditing && eventoSelecionado) {
        // Atualizar evento existente
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        console.log('🔄 Enviando atualização para:', `${apiUrl}/api/v1/festas/${eventoSelecionado.id}`);
        console.log('📤 Dados enviados:', dadosParaEnvio);
        
        const response = await fetch(`${apiUrl}/api/v1/festas/${eventoSelecionado.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('adminKey') || 'ChaveDeAcesso-festa17-J8kF%9zWp$rV3hL6sX'
          },
          body: JSON.stringify(dadosParaEnvio),
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ Error response:', errorText);
          throw new Error(`Erro ao atualizar evento: ${response.status} - ${errorText}`);
        }

        const responseData = await response.json();
        console.log('✅ Response data:', responseData);

        setMessage({ text: '✅ Evento atualizado com sucesso!', type: 'success' });
      } else {
        // Criar novo evento
        await criarNovaFesta(dadosParaEnvio);
        setMessage({ text: '✅ Evento criado com sucesso!', type: 'success' });
      }
      
      // Limpar formulário e estados
      setFormData(initialFormData);
      setDateTimeFields(initialDateTimeFields);
      setIsEditing(false);
      setEventoSelecionado(null);
      
      // Recarregar lista de eventos sempre após edição/criação
      await carregarEventos();
    } catch (error) {
      setMessage({ 
        text: `❌ Erro ao ${isEditing ? 'atualizar' : 'criar'} evento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // EFEITOS E LISTENERS
  // ========================================

  // Auto-ocultar mensagens após 4 segundos
  React.useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  // Função para deletar evento
  const deletarEvento = async (evento: Evento) => {
    if (!window.confirm(`Tem certeza que deseja excluir o evento "${evento.nome}"?\n\nEsta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/festas/${evento.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('adminKey') || 'ChaveDeAcesso-festa17-J8kF%9zWp$rV3hL6sX'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir evento');
      }

      setMessage({ text: '✅ Evento excluído com sucesso!', type: 'success' });
      await carregarEventos(); // Recarregar lista
    } catch (error) {
      setMessage({ 
        text: `❌ Erro ao excluir evento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 
        type: 'error' 
      });
    }
  };

  // ========================================
  // FUNÇÕES DE UPLOAD DE ARQUIVOS
  // ========================================

  // Funções para upload de flyers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFlyer(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFlyer(e.target.files[0]);
    }
  };

  const uploadFlyer = async (file: File) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('flyerImage', file);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/uploads/flyer-image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ text: '✅ Flyer enviado com sucesso!', type: 'success' });
        
        // Adicionar à lista local
        const newFlyer: FlyerImage = {
          id: Date.now().toString(),
          fileName: file.name,
          imageUrl: result.url || URL.createObjectURL(file),
          size: file.size,
          uploadDate: new Date().toISOString()
        };
        
        setFlyers(prev => [...prev, newFlyer]);
      } else {
        const error = await response.json();
        setMessage({ text: `❌ Erro no upload: ${error.error}`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `❌ Erro no upload: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #8b5cf6 75%, #ec4899 100%)',
      overflowX: 'hidden',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {/* Cabeçalho */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FaCog /> Painel Administrativo
            </h1>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.8)',
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaArrowLeft /> Sair
            </button>
          </div>

          {/* Sistema de Abas */}
          <div style={{
            display: 'flex',
            gap: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
            marginTop: '24px'
          }}>
            {[
              { id: 'eventos', label: '📅 Criar Eventos', icon: FaPlus },
              { id: 'gerenciar', label: '📝 Gerenciar Eventos', icon: FaCog },
              { id: 'flyers', label: '🎨 Upload Flyers', icon: FaImage }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as 'eventos' | 'flyers' | 'gerenciar');
                  if (tab.id === 'gerenciar') {
                    carregarEventos();
                  }
                }}
                style={{
                  background: activeTab === tab.id ? 
                    'linear-gradient(135deg, #f59e0b, #f97316)' : 
                    'rgba(255, 255, 255, 0.1)',
                  border: activeTab === tab.id ? '2px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: activeTab === tab.id ? '0 4px 16px rgba(245, 158, 11, 0.3)' : 'none'
                }}
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mensagens - Posicionamento melhorado */}
        {message.text && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: message.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            fontSize: '16px',
            fontWeight: '600',
            animation: 'slideDown 0.3s ease-out'
          }}>
            {message.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
            {message.text}
          </div>
        )}

        {/* Seção de Gerenciar Eventos */}
        {activeTab === 'gerenciar' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isEditing ? '✏️ Editar Evento' : '📝 Gerenciar Eventos'}
            </h2>

            {/* Formulário de Edição (quando estiver editando) */}
            {isEditing && eventoSelecionado && (
              <div style={{
                background: 'rgba(254, 252, 232, 0.8)',
                border: '1px solid #fbbf24',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ✏️ Editando: {eventoSelecionado.nome}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {/* Nome do Evento */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Nome do Evento *
                      </label>
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        placeholder="Ex: Festa de Ano Novo 2024"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Data e Hora */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          Data do Evento *
                        </label>
                        <input
                          type="date"
                          value={dateTimeFields.data}
                          onChange={(e) => setDateTimeFields(prev => ({ ...prev, data: e.target.value }))}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          Hora Início
                        </label>
                        <input
                          type="time"
                          value={dateTimeFields.horaInicio}
                          onChange={(e) => setDateTimeFields(prev => ({ ...prev, horaInicio: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          Hora Fim
                        </label>
                        <input
                          type="time"
                          value={dateTimeFields.horaFim}
                          onChange={(e) => setDateTimeFields(prev => ({ ...prev, horaFim: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Cidade */}
                    <div style={{ position: 'relative' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        <FiMapPin style={{ display: 'inline', marginRight: '6px' }} />
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={formData.cidade}
                        onChange={(e) => handleCitySearch(e.target.value)}
                        placeholder="Ex: São Paulo, SP"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                      />
                      
                      {/* Sugestões de cidade */}
                      {showCitySuggestions && citySuggestions.length > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          zIndex: 1000,
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}>
                          {citySuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              onClick={() => selectCitySuggestion(suggestion)}
                              style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                borderBottom: index < citySuggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                                transition: 'background-color 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f9fafb';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Local */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Local do Evento
                      </label>
                      <input
                        type="text"
                        value={formData.local}
                        onChange={(e) => handleInputChange('local', e.target.value)}
                        placeholder="Ex: Casa de Festas XYZ"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Descrição Curta
                      </label>
                      <textarea
                        value={formData.descricaoCurta}
                        onChange={(e) => handleInputChange('descricaoCurta', e.target.value)}
                        placeholder="Ex: Uma noite inesquecível para celebrar o Ano Novo!"
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Link de Vendas */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Link de Vendas
                      </label>
                      <input
                        type="url"
                        value={formData.linkVendas}
                        onChange={(e) => handleInputChange('linkVendas', e.target.value)}
                        placeholder="Ex: https://www.ticketmaster.com.br/evento"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Destaque */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px',
                      background: 'rgba(249, 250, 251, 0.5)',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <input
                        type="checkbox"
                        id="destaque"
                        checked={formData.destaque}
                        onChange={(e) => handleInputChange('destaque', e.target.checked)}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer'
                        }}
                      />
                      <label htmlFor="destaque" style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151',
                        cursor: 'pointer'
                      }}>
                        Marcar como evento em destaque
                      </label>
                    </div>

                    {/* Botões de Ação */}
                    <div style={{ 
                      display: 'flex',
                      gap: '12px',
                      marginTop: '16px'
                    }}>
                      <button
                        type="button"
                        onClick={cancelarEdicao}
                        style={{
                          background: '#6b7280',
                          border: 'none',
                          color: 'white',
                          padding: '16px 32px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          flex: '1'
                        }}
                      >
                        ❌ Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          color: 'white',
                          padding: '16px 32px',
                          borderRadius: '8px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          flex: '1',
                          boxShadow: loading ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {loading ? <FaSpinner className="animate-spin" /> : '💾'}
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            
            {eventosExistentes.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#6b7280'
              }}>
                <p>Nenhum evento encontrado. Crie um evento primeiro na aba "Criar Eventos".</p>
              </div>
            ) : (
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '20px'
                }}>
                  Eventos Cadastrados ({eventosExistentes.length}):
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '16px',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                }}>
                  {eventosExistentes.map(evento => (
                    <div key={evento.id} style={{
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '12px',
                      padding: '20px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 244, 246, 0.8))',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '12px'
                      }}>
                        {evento.nome}
                      </h4>
                      {evento.data && (
                        <div style={{ marginBottom: '8px' }}>
                          <strong>Data:</strong> {new Date(evento.data).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                      {evento.horaInicio && (
                        <div style={{ marginBottom: '8px' }}>
                          <strong>Horário:</strong> {evento.horaInicio} {evento.horaFim && ` - ${evento.horaFim}`}
                        </div>
                      )}
                      {evento.local && (
                        <div style={{ marginBottom: '8px' }}>
                          <strong>Local:</strong> {evento.local}
                        </div>
                      )}
                      <div style={{ marginBottom: '16px' }}>
                        <strong>Cidade:</strong> {evento.cidade}
                      </div>
                      
                      {/* Botões de Ação */}
                      <div style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <button 
                          onClick={() => iniciarEdicao(evento)}
                          style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                            transition: 'all 0.3s ease',
                            flex: 1
                          }}
                        >
                          ✏️ Editar
                        </button>
                        
                        <button 
                          onClick={() => deletarEvento(evento)}
                          style={{
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                            transition: 'all 0.3s ease',
                            flex: 1
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                          }}
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Seção de Eventos */}
        {activeTab === 'eventos' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isEditing ? (
                <>✏️ Editar Evento</>
              ) : (
                <><FaPlus /> Criar Novo Evento</>
              )}
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Nome do Evento */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Nome do Evento *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Ex: Festa de Ano Novo 2024"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Data */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    📅 Data *
                  </label>
                  <input
                    type="date"
                    value={dateTimeFields.data}
                    onChange={(e) => handleDateTimeChange('data', e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Horário de Início */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    🕐 Hora de Início
                  </label>
                  <input
                    type="time"
                    value={dateTimeFields.horaInicio}
                    onChange={(e) => handleDateTimeChange('horaInicio', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Horário de Fim */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    🕐 Hora de Fim
                  </label>
                  <input
                    type="time"
                    value={dateTimeFields.horaFim}
                    onChange={(e) => handleDateTimeChange('horaFim', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Cidade com Autocomplete */}
                <div style={{ position: 'relative' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    <FiMapPin style={{ display: 'inline', marginRight: '4px' }} />
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => handleCitySearch(e.target.value)}
                    placeholder="Digite uma cidade (ex: São Paulo, Campinas...)"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    onFocus={() => {
                      if (formData.cidade.length >= 2) {
                        setShowCitySuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Delay para permitir click nas sugestões
                      setTimeout(() => setShowCitySuggestions(false), 200);
                    }}
                  />
                  
                  {/* Lista de Sugestões */}
                  {showCitySuggestions && citySuggestions.length > 0 && (
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
                            onClick={() => selectCity(suggestion)}
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
                    </div>
                  )}
                </div>

                {/* Local */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Local do Evento
                  </label>
                  <input
                    type="text"
                    value={formData.local}
                    onChange={(e) => handleInputChange('local', e.target.value)}
                    placeholder="Ex: Casa de Shows XYZ, Rua ABC 123"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>



                {/* Link de Vendas */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Link de Vendas
                  </label>
                  <input
                    type="url"
                    value={formData.linkVendas}
                    onChange={(e) => handleInputChange('linkVendas', e.target.value)}
                    placeholder="https://exemplo.com/ingressos"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Descrição Curta */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Descrição Curta
                  </label>
                  <textarea
                    value={formData.descricaoCurta}
                    onChange={(e) => handleInputChange('descricaoCurta', e.target.value)}
                    placeholder="Descrição breve do evento (máx. 200 caracteres)"
                    maxLength={200}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Destaque */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <input
                    type="checkbox"
                    id="destaque"
                    checked={formData.destaque}
                    onChange={(e) => handleInputChange('destaque', e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <label htmlFor="destaque" style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Marcar como evento em destaque
                  </label>
                </div>

                {/* Botões de Ação */}
                <div style={{ 
                  display: 'flex',
                  gap: '12px',
                  marginTop: '16px'
                }}>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={cancelarEdicao}
                      style={{
                        background: '#6b7280',
                        border: 'none',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        flex: '1'
                      }}
                    >
                      ❌ Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? '#9ca3af' : 'linear-gradient(135deg, #f59e0b, #f97316)',
                      border: 'none',
                      color: 'white',
                      padding: '16px 32px',
                      borderRadius: '12px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      flex: '1',
                      boxShadow: loading ? 'none' : '0 4px 16px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    {loading ? 
                      (isEditing ? 'Salvando...' : 'Criando...') : 
                      (isEditing ? 'Salvar Alterações' : 'Criar Evento')
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Seção de Flyers */}
        {activeTab === 'flyers' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FaImage /> Upload de Flyers para Carrossel
            </h2>

            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '24px'
            }}>
              Envie imagens de flyers que aparecerão no carrossel da página principal.
            </p>

            {/* Área de Upload Drag & Drop */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `3px dashed ${dragActive ? '#8b5cf6' : '#d1d5db'}`,
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: dragActive ? '#f8fafc' : '#fafafa',
                marginBottom: '24px'
              }}
            >
              <div style={{ color: dragActive ? '#8b5cf6' : '#6b7280' }}>
                <FaUpload size={48} style={{ marginBottom: '16px', opacity: 0.6 }} />
                <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {uploading ? 'Enviando...' : 'Arraste e solte uma imagem aqui'}
                </p>
                <p style={{ fontSize: '14px', margin: 0 }}>
                  ou clique para selecionar um arquivo
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
                  Formatos aceitos: JPEG, PNG, WebP (máx. 5MB)
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            {/* Lista de Flyers Enviados */}
            {flyers.length > 0 && (
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '16px'
                }}>
                  Flyers Enviados ({flyers.length})
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '16px'
                }}>
                  {flyers.map((flyer, index) => (
                    <div key={flyer.id || index} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      background: '#f9fafb'
                    }}>
                      <img 
                        src={flyer.imageUrl} 
                        alt={`Flyer ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          marginBottom: '8px'
                        }}
                      />
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: '0 0 4px 0',
                        wordBreak: 'break-word'
                      }}>
                        {flyer.fileName || `flyer_${index + 1}`}
                      </p>
                      {flyer.size && (
                        <p style={{
                          fontSize: '10px',
                          color: '#9ca3af',
                          margin: 0
                        }}>
                          {(flyer.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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