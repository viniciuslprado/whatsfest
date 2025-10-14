
import React, { useEffect, useState } from 'react';
import type { Festa } from '../../lib/api';

const GerenciarEventos: React.FC = () => {
  const [eventos, setEventos] = useState<Festa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
    fetchEventos();
  }, []);

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
                  <td className="px-4 py-2 font-semibold text-gray-800">{evento.nome}</td>
                  <td className="px-4 py-2 text-gray-600">{evento.data ? new Date(evento.data).toLocaleDateString('pt-BR') : '-'}</td>
                  <td className="px-4 py-2 text-gray-600">{evento.cidade}</td>
                  <td className="px-4 py-2">
                    {evento.destaque ? <span className="inline-block px-2 py-1 bg-amber-400 text-white rounded text-xs font-bold">Sim</span> : <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">Não</span>}
                  </td>
                  <td className="px-4 py-2">
                    {/* Botões de ação (editar/excluir) podem ser implementados aqui */}
                    <button className="text-xs text-blue-600 hover:underline mr-2">Editar</button>
                    <button className="text-xs text-red-600 hover:underline">Excluir</button>
                  </td>
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
