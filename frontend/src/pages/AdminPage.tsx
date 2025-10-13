  // ...existing code...
import React, { useState, useRef, useCallback } from 'react';
import { criarNovaFesta } from '../lib/api';
import type { FestaData } from '../lib/api';
import { FaPlus, FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaUpload, FaImage, FaCog } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import CriarEventoForm from '../components/admin/CriarEventoForm';
import GerenciarEventos from '../components/admin/GerenciarEventos';
import UploadFlyer from '../components/admin/UploadFlyer';

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
  // Função para lidar com mudanças na cidade (autocomplete)
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
    setFormData((prev: FestaData) => ({ ...prev, [key]: value }));
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

  // Função para selecionar uma sugestão de cidade
  const selectCitySuggestion = (suggestion: string) => {
    handleInputChange('cidade', suggestion);
    setShowCitySuggestions(false);
    setCitySuggestions([]);
  };

  // Função para selecionar uma cidade das sugestões
  const carregarEventos = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/festas`);
      if (response.ok) {
        const eventos = await response.json();
        setEventosExistentes(eventos);
      }
    } catch {
      // erro ao carregar eventos
    }
  };

  // Função para iniciar edição de um evento
  const iniciarEdicao = (evento: Evento) => {
    setEventoSelecionado(evento);
    setIsEditing(true);

    // Mudar para a aba de gerenciar para mostrar o formulário de edição
    setActiveTab('gerenciar');

    // Formatar data para YYYY-MM-DD se necessário
    let dataFormatada = '';
    if (evento.data) {
      const d = new Date(evento.data);
      // Ajuste para fuso horário local
      const off = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - off * 60 * 1000);
      dataFormatada = localDate.toISOString().slice(0, 10);
    }

    setFormData({
      nome: evento.nome,
      data: dataFormatada,
      horaInicio: evento.horaInicio,
      horaFim: evento.horaFim,
      cidade: evento.cidade,
      local: evento.local || '',
      urlImagemFlyer: evento.urlImagemFlyer || '',
      linkVendas: evento.linkVendas || '',
      descricaoCurta: evento.descricaoCurta || '',
      destaque: evento.destaque || false,
    });

    setDateTimeFields({
      data: dataFormatada,
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
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
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
        // NÃO limpar formulário ao editar
      } else {
        // Criar novo evento
        await criarNovaFesta(dadosParaEnvio);
        setMessage({ text: '✅ Evento criado com sucesso!', type: 'success' });
        // Limpar formulário ao criar novo evento
        setFormData(initialFormData);
        setDateTimeFields(initialDateTimeFields);
        setIsEditing(false);
        setEventoSelecionado(null);
      }
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
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir evento');
      }
      await carregarEventos(); // Recarregar lista
    } catch {
      setMessage({ 
        text: '❌ Erro ao excluir evento',
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
  <div className="min-h-screen w-full m-0 p-0 box-border bg-gradient-to-br from-blue-900 via-purple-500 to-pink-400 overflow-x-hidden overflow-y-auto">
      <div className="max-w-3xl mx-auto p-5 box-border">
        {/* Cabeçalho */}
        <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white m-0 flex items-center gap-3">
              <FaCog /> Painel Administrativo
            </h1>
            <button
              onClick={onLogout}
              className="bg-red-600/80 border-none text-white px-6 py-3 rounded-lg cursor-pointer text-sm font-bold flex items-center gap-2 hover:bg-red-700/90 transition"
            >
              <FaArrowLeft /> Sair
            </button>
          </div>

          {/* Sistema de Abas */}
          <div className="flex gap-2 border-t border-white/20 pt-6 mt-6">
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
                className={
                  `${activeTab === tab.id
                    ? 'bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white/40 font-bold shadow-lg'
                    : 'bg-white/10 border border-white/20 font-normal'} text-white px-5 py-3 rounded-xl cursor-pointer text-sm flex items-center gap-2 transition-all duration-300`
                }
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mensagens - Posicionamento melhorado */}
        {message.text && (
          <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-6 py-4 rounded-xl shadow-2xl text-white text-lg font-semibold animate-slideDown ${message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}> 
            {message.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
            {message.text}
          </div>
        )}


        {/* Seção de Gerenciar Eventos */}
        {activeTab === 'gerenciar' && (
          <GerenciarEventos />
        )}

        {/* Seção de Criar Evento */}
        {activeTab === 'eventos' && (
          <CriarEventoForm />
        )}

        {/* Seção de Upload de Flyers */}
        {activeTab === 'flyers' && (
          <UploadFlyer />
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