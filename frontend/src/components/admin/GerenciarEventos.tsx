


import React, { useEffect, useState } from 'react';
import type { Festa } from '../../lib/api';
import CriarEventoForm from './CriarEventoForm';

const GerenciarEventos: React.FC = () => {

  const [showCriar, setShowCriar] = useState(false);

  const [eventos, setEventos] = useState<Festa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Festa>>({});
  const [saving, setSaving] = useState(false);
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

  // Edição inline
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
  const handleEditChange = <K extends keyof Festa>(key: K, value: Festa[K]) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };
  const saveEdit = async () => {
    if (!editId) return;
    setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/festas/${editId}`
        : (import.meta.env.PROD ? `https://whatsfest-backend.onrender.com/api/v1/festas/${editId}` : `http://localhost:3000/api/v1/festas/${editId}`);
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
        },
        body: JSON.stringify(editData)
      });
      if (!response.ok) throw new Error('Erro ao salvar edição');
      await fetchEventos();
      setEditId(null);
      setEditData({});
    } catch {
      alert('Erro ao salvar edição');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg p-8 w-full relative">
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
            >✕</button>
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
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Nome do Evento *</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Data *</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Horário de Início</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Horário de Fim</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Cidade *</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Local do Evento</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Link de Vendas</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Descrição Curta</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Destaque</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {eventos.map((evento) => (
                <tr
                  key={evento.id}
                  className={`transition cursor-pointer ${selectedId === evento.id ? 'bg-purple-100/60 ring-2 ring-purple-400' : 'hover:bg-purple-50'}`}
                  onClick={() => handleSelect(evento)}
                >
                  {editId === evento.id ? (
                    <>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-40" value={editData.nome || ''} onChange={e => handleEditChange('nome', e.target.value)} required /></td>
                      <td className="px-4 py-2"><input type="date" className="border rounded px-2 py-1 w-36" value={editData.data ? String(editData.data).slice(0,10) : ''} onChange={e => handleEditChange('data', e.target.value)} required /></td>
                      <td className="px-4 py-2"><input type="time" className="border rounded px-2 py-1 w-28" value={editData.horaInicio || ''} onChange={e => handleEditChange('horaInicio', e.target.value)} /></td>
                      <td className="px-4 py-2"><input type="time" className="border rounded px-2 py-1 w-28" value={editData.horaFim || ''} onChange={e => handleEditChange('horaFim', e.target.value)} /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-32" value={editData.cidade || ''} onChange={e => handleEditChange('cidade', e.target.value)} required /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-32" value={editData.local || ''} onChange={e => handleEditChange('local', e.target.value)} /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-40" value={editData.linkVendas || ''} onChange={e => handleEditChange('linkVendas', e.target.value)} /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-48" value={editData.descricaoCurta || ''} onChange={e => handleEditChange('descricaoCurta', e.target.value)} /></td>
                      <td className="px-4 py-2">
                        <select className="border rounded px-2 py-1" value={editData.destaque ? 'sim' : 'nao'} onChange={e => handleEditChange('destaque', e.target.value === 'sim')}>
                          <option value="nao">Não</option>
                          <option value="sim">Sim</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-xs text-green-700 font-bold hover:underline" onClick={saveEdit} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
                        <button className="text-xs text-gray-500 hover:underline" onClick={cancelEdit}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 font-semibold text-gray-800">{evento.nome}</td>
                      <td className="px-4 py-2 text-gray-600">{evento.data ? new Date(evento.data).toLocaleDateString('pt-BR') : '-'}</td>
                      <td className="px-4 py-2 text-gray-600">{evento.horaInicio || '-'}</td>
                      <td className="px-4 py-2 text-gray-600">{evento.horaFim || '-'}</td>
                      <td className="px-4 py-2 text-gray-600">{evento.cidade}</td>
                      <td className="px-4 py-2 text-gray-600">{evento.local || '-'}</td>
                      <td className="px-4 py-2 text-blue-700 underline break-all max-w-[180px]">{evento.linkVendas ? <a href={evento.linkVendas} target="_blank" rel="noopener noreferrer">{evento.linkVendas}</a> : '-'}</td>
                      <td className="px-4 py-2 text-gray-600 max-w-[220px] truncate" title={evento.descricaoCurta}>{evento.descricaoCurta || '-'}</td>
                      <td className="px-4 py-2">
                        {evento.destaque ? <span className="inline-block px-2 py-1 bg-amber-400 text-white rounded text-xs font-bold">Sim</span> : <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">Não</span>}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {/* Botões removidos da linha, agora fixos no topo */}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GerenciarEventos;
