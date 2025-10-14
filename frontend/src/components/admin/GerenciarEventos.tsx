

import React, { useEffect, useState } from 'react';
import type { Festa } from '../../lib/api';

const GerenciarEventos: React.FC = () => {

  const [eventos, setEventos] = useState<Festa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Festa>>({});
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);


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
    } catch (err) {
      setError('Erro ao buscar eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  // Exclusão de evento
  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;
    setDeletingId(id);
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
    } finally {
      setDeletingId(null);
    }
  };

  // Edição inline
  const startEdit = (evento: Festa) => {
    setEditId(evento.id);
    setEditData({ ...evento });
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };
  const handleEditChange = (key: keyof Festa, value: any) => {
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
    <div className="bg-white/90 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Gerenciar Eventos</h2>
      {loading ? (
        <div className="text-center text-gray-500 py-8">Carregando eventos...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : eventos.length === 0 ? (
        <div className="text-center text-gray-400 py-8">Nenhum evento cadastrado.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Nome</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Data</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Cidade</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Destaque</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {eventos.map((evento) => (
                <tr key={evento.id} className="hover:bg-purple-50 transition">
                  {editId === evento.id ? (
                    <>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-32" value={editData.nome || ''} onChange={e => handleEditChange('nome', e.target.value)} /></td>
                      <td className="px-4 py-2"><input type="date" className="border rounded px-2 py-1 w-32" value={editData.data ? String(editData.data).slice(0,10) : ''} onChange={e => handleEditChange('data', e.target.value)} /></td>
                      <td className="px-4 py-2"><input className="border rounded px-2 py-1 w-32" value={editData.cidade || ''} onChange={e => handleEditChange('cidade', e.target.value)} /></td>
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
                      <td className="px-4 py-2 text-gray-600">{evento.cidade}</td>
                      <td className="px-4 py-2">
                        {evento.destaque ? <span className="inline-block px-2 py-1 bg-amber-400 text-white rounded text-xs font-bold">Sim</span> : <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">Não</span>}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline mr-2" onClick={() => startEdit(evento)}>Editar</button>
                        <button className={`text-xs text-red-600 hover:underline ${deletingId === evento.id ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => handleDelete(evento.id)} disabled={deletingId === evento.id}>{deletingId === evento.id ? 'Excluindo...' : 'Excluir'}</button>
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
