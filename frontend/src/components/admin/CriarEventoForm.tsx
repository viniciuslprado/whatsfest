
import React, { useState, useCallback } from 'react';
import { criarNovaFesta } from '../../lib/api';
import type { FestaData } from '../../lib/api';
import { FiMapPin } from 'react-icons/fi';

const initialFormData: FestaData = {
  nome: '',
  data: undefined,
  horaInicio: undefined,
  horaFim: undefined,
  cidade: '',
  local: '',
  urlImagemFlyer: '',
  linkVendas: '',
  descricaoCurta: '',
  destaque: false,
};

interface CriarEventoFormProps {
  onCreated?: () => void;
  initialData?: Partial<FestaData>;
  isEdit?: boolean;
  eventId?: number;
}

const CriarEventoForm: React.FC<CriarEventoFormProps> = ({ onCreated, initialData, isEdit, eventId }) => {
  const [formData, setFormData] = useState<FestaData>({ ...initialFormData, ...initialData });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);

  // Busca cidades na API do backend (ajuste a rota se necessário)
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

  const handleInputChange = (key: keyof FestaData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCitySearch = async (value: string) => {
    handleInputChange('cidade', value);
    if (value.length >= 2) {
      try {
        const suggestions = await searchCities(value);
        setCitySuggestions(suggestions);
        setShowCitySuggestions(true);
      } catch {
        setShowCitySuggestions(false);
        setCitySuggestions([]);
      }
    } else {
      setShowCitySuggestions(false);
      setCitySuggestions([]);
    }
  };

  const selectCitySuggestion = (suggestion: string) => {
    handleInputChange('cidade', suggestion);
    setShowCitySuggestions(false);
    setCitySuggestions([]);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      if (!formData.nome || !formData.data || !formData.cidade) {
        setMessage({ text: 'Preencha todos os campos obrigatórios.', type: 'error' });
        setLoading(false);
        return;
      }
      if (isEdit && eventId) {
        // Editar evento existente
        const apiUrl = import.meta.env.VITE_API_BASE_URL
          ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/festas/${eventId}`
          : (import.meta.env.PROD ? `https://whatsfest-backend.onrender.com/api/v1/festas/${eventId}` : `http://localhost:3000/api/v1/festas/${eventId}`);
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Erro ao editar evento');
        setMessage({ text: 'Evento editado com sucesso!', type: 'success' });
      } else {
        // Criar novo evento
        await criarNovaFesta(formData);
        setMessage({ text: 'Evento criado com sucesso!', type: 'success' });
        setFormData(initialFormData);
      }
      if (onCreated) onCreated();
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : 'Erro ao criar evento', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
  <form onSubmit={handleSubmit} className="max-w-lg sm:max-w-2xl w-full mx-auto bg-white/90 rounded-2xl shadow-lg p-2 sm:p-4 md:p-8 mt-4 sm:mt-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 text-xs sm:text-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Criar Novo Evento</h2>

      {/* Nome do Evento */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Evento *</label>
        <input
          type="text"
          value={formData.nome}
          onChange={e => handleInputChange('nome', e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
          placeholder="Ex: Festa de Ano Novo"
        />
      </div>

      {/* Data do Evento */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Data *</label>
        <input
          type="date"
          value={formData.data || ''}
          onChange={e => handleInputChange('data', e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
        />
      </div>

      {/* Horário de Início */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Horário de Início</label>
        <input
          type="time"
          value={formData.horaInicio || ''}
          onChange={e => handleInputChange('horaInicio', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
        />
      </div>

      {/* Horário de Fim */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Horário de Fim</label>
        <input
          type="time"
          value={formData.horaFim || ''}
          onChange={e => handleInputChange('horaFim', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
        />
      </div>

      {/* Cidade (com autocomplete) */}
      <div className="mb-5 relative">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
          <FiMapPin /> Cidade *
        </label>
        <input
          type="text"
          value={formData.cidade}
          onChange={e => handleCitySearch(e.target.value)}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
          placeholder="Ex: São Paulo, SP"
          autoComplete="off"
        />
        {showCitySuggestions && citySuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {citySuggestions.map((suggestion, idx) => (
              <div
                key={idx}
                onClick={() => selectCitySuggestion(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-purple-100"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Local do Evento */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Local do Evento</label>
        <input
          type="text"
          value={formData.local}
          onChange={e => handleInputChange('local', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
          placeholder="Ex: Casa de Festas XYZ"
        />
      </div>

      {/* Link de Vendas */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Link de Vendas</label>
        <input
          type="url"
          value={formData.linkVendas}
          onChange={e => handleInputChange('linkVendas', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition"
          placeholder="Ex: https://www.ticketmaster.com.br/evento"
        />
      </div>

      {/* Descrição Curta */}
      <div className="mb-5">
        <label className="block text-sm font-bold text-gray-700 mb-2">Descrição Curta</label>
        <textarea
          value={formData.descricaoCurta}
          onChange={e => handleInputChange('descricaoCurta', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-400 transition resize-vertical"
          placeholder="Ex: Uma noite inesquecível para celebrar o Ano Novo!"
        />
      </div>

      {/* Destaque */}
      <div className="mb-5 flex items-center gap-3">
        <input
          type="checkbox"
          id="destaque"
          checked={formData.destaque}
          onChange={e => handleInputChange('destaque', e.target.checked)}
          className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="destaque" className="text-sm font-medium text-gray-700 cursor-pointer">
          Marcar como evento em destaque
        </label>
      </div>

      {/* Mensagem de sucesso/erro */}
      {message.text && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-center font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Botão de Enviar */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <span className="animate-spin mr-2">⏳</span>}
        Criar Evento
      </button>
    </form>
  );
};

export default CriarEventoForm;
