


import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import type { Festa } from '../../lib/api';
import CriarEventoForm from './CriarEventoForm';

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
          <button
            className="px-4 py-2 rounded-lg text-xs font-bold bg-green-600 text-white hover:bg-green-700 transition"
            onClick={() => setShowCriar(true)}
          >Adicionar Evento</button>
          <button
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${selectedId ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!selectedId || editId !== null}
            onClick={() => {
              const evento = eventos.find(e => e.id === selectedId);
              if (evento) startEdit(evento);
            }}
          >Editar</button>
          <button
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${selectedId ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!selectedId || editId !== null}
            onClick={() => {
              if (selectedId) handleDelete(selectedId);
            }}
          >Excluir</button>
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
      ) : eventos.length === 0 ? (
        <div className="text-center text-gray-400 py-8">Nenhum evento cadastrado.</div>
      ) : (
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
                  onClick={() => handleSelect(evento)}
                >
                  <td className="px-2 py-2 font-semibold text-gray-800 rounded-l-xl bg-white/80">{evento.nome}</td>
                  <td className="px-2 py-2 text-gray-600 rounded-r-xl bg-white/80">{evento.data ? new Date(evento.data).toLocaleDateString('pt-BR') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal Editar Evento */}
      {editId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-lg sm:max-w-2xl w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={cancelEdit}
            ><FiX /></button>
            <CriarEventoForm
              initialData={editData}
              onCreated={async () => {
                await fetchEventos();
                setEditId(null);
                setEditData({});
              }}
              isEdit
              eventId={editId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarEventos;
