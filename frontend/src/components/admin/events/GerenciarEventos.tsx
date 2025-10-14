import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import type { Festa } from '../../../lib/api';
import CriarEventoForm from '../forms/CriarEventoForm';
import EventosTable from '../tables/EventosTable';
import EditarEventoForm from '../forms/EditarEventoForm';
import PrimaryButton from '../../button/PrimaryButton';
import SecondaryButton from '../../button/SecondaryButton';
import DangerButton from '../../button/DangerButton';

const GerenciarEventos: React.FC = () => {

  const [showCriar, setShowCriar] = useState(false);

  const [eventos, setEventos] = useState<Festa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Festa>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);


  const fetchEventos = async () => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/festas`
        : (import.meta.env.PROD ? 'https://whatsfest-backend.onrender.com/api/v1/festas' : 'http://localhost:3000/api/v1/festas');
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Erro ao buscar eventos');
      const data = await response.json();
      setEventos(data);
    } catch {
      setError('Erro ao buscar eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  // Função para recarregar eventos após criar novo
  const handleEventoCriado = () => {
    setShowCriar(false);
    fetchEventos();
  };

  // Exclusão de evento
  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/festas/${id}`
        : (import.meta.env.PROD ? `https://whatsfest-backend.onrender.com/api/v1/festas/${id}` : `http://localhost:3000/api/v1/festas/${id}`);
      await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
        }
      });
      setEventos(evts => evts.filter(e => e.id !== id));
    } catch {
      alert('Erro ao excluir evento');
    }
  };

  // Abrir modal de edição
  const startEdit = (evento: Festa) => {
    setEditId(evento.id);
    setEditData({ ...evento });
  };
  const handleSelect = (evento: Festa) => {
    setSelectedId(evento.id === selectedId ? null : evento.id);
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };


  return (
  <div className="bg-white/90 rounded-2xl shadow-lg p-1 sm:p-3 md:p-6 w-full max-w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Gerenciar Eventos</h2>
        <div className="flex gap-2">
          <PrimaryButton
            className="text-xs"
            onClick={() => setShowCriar(true)}
            type="button"
          >Adicionar Evento</PrimaryButton>
          <SecondaryButton
            className={`text-xs ${!selectedId || editId !== null ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' : ''}`}
            disabled={!selectedId || editId !== null}
            onClick={() => {
              const evento = eventos.find(e => e.id === selectedId);
              if (evento) startEdit(evento);
            }}
            type="button"
          >Editar</SecondaryButton>
          <DangerButton
            className={`text-xs ${!selectedId || editId !== null ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' : ''}`}
            disabled={!selectedId || editId !== null}
            onClick={() => {
              if (selectedId) handleDelete(selectedId);
            }}
            type="button"
          >Excluir</DangerButton>
        </div>
      </div>

      {/* Modal Criar Evento */}
      {showCriar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-3xl w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={() => setShowCriar(false)}
            ><FiX /></button>
            <CriarEventoForm onCreated={handleEventoCriado} />
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center text-gray-500 py-8">Carregando eventos...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <EventosTable eventos={eventos} selectedId={selectedId} onSelect={handleSelect} />
      )}
      {/* Modal Editar Evento */}
      {editId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-lg sm:max-w-2xl w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={cancelEdit}
            ><FiX /></button>
            <EditarEventoForm
              eventId={editId}
              initialData={editData as any}
              onUpdated={async () => {
                await fetchEventos();
                setEditId(null);
                setEditData({});
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarEventos;
