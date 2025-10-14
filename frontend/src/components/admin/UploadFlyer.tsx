
import React, { useRef, useState, useEffect } from 'react';
import { FiUploadCloud, FiImage, FiTrash2, FiCheckCircle } from 'react-icons/fi';

const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://whatsfest-backend.onrender.com' : 'http://localhost:3000');

interface UploadFlyerProps {
  onAfterUpload?: () => void;
}

const UploadFlyer: React.FC<UploadFlyerProps> = ({ onAfterUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [flyers, setFlyers] = useState<Array<{ filename: string; url: string }>>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFlyers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/flyers`);
      const data = await res.json();
      setFlyers(data);
    } catch {
      setFlyers([]);
    }
  };

  useEffect(() => {
    fetchFlyers();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFileName('');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setSuccess(false);
    const formData = new FormData();
    formData.append('flyer', file);
    try {
      const res = await fetch(`${API_BASE}/api/v1/flyers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
        },
        body: formData
      });
      if (!res.ok) throw new Error('Erro ao enviar flyer');
      setPreview(null);
      setFileName('');
      setFile(null);
      setSuccess(true);
      fetchFlyers();
    } catch {
      alert('Erro ao enviar flyer');
    } finally {
      setUploading(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/flyers/${selected}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`
        }
      });
      if (!res.ok) throw new Error('Erro ao excluir flyer');
      setSelected(null);
      fetchFlyers();
    } catch {
      alert('Erro ao excluir flyer');
    } finally {
      setDeleting(false);
    }
  };

  return (
  <div className="bg-white/90 rounded-2xl shadow-lg p-1 sm:p-3 md:p-6 w-full max-w-lg relative flex flex-col min-h-[350px]" style={{height: '520px', maxHeight: '520px'}}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-700 flex items-center gap-2"><FiUploadCloud /> Gerenciar Flyers</h2>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg text-xs font-bold bg-green-600 text-white hover:bg-green-700 transition"
            onClick={() => setShowUpload(true)}
          >Adicionar Flyer</button>
          <button
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${selected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!selected || deleting}
            onClick={handleDelete}
          >Excluir</button>
        </div>
      </div>

      {/* Modal de Upload */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={() => {
                setShowUpload(false);
                setPreview(null);
                setFileName('');
                setFile(null);
              }}
            >✕</button>
            <div className="p-8 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-pink-600 flex items-center gap-2"><FiUploadCloud /> Upload de Flyer</h3>
              <div
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-pink-400 rounded-xl p-8 bg-pink-50 hover:bg-pink-100 transition cursor-pointer mb-6"
                onClick={() => fileInputRef.current?.click()}
                style={{ minHeight: 180 }}
              >
                {preview ? (
                  <img src={preview} alt="Preview flyer" className="max-h-40 rounded-lg shadow mb-2" />
                ) : (
                  <>
                    <FiImage className="text-5xl text-pink-300 mb-2" />
                    <span className="text-pink-500 font-semibold">Clique para selecionar uma imagem</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              {fileName && (
                <div className="mb-4 text-sm text-gray-700">Arquivo selecionado: <span className="font-bold">{fileName}</span></div>
              )}
              <button
                type="button"
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white font-bold text-lg shadow-md hover:from-pink-600 hover:to-fuchsia-600 transition disabled:opacity-60 disabled:cursor-not-allowed mb-2"
                disabled={!preview || uploading}
                onClick={async () => {
                  await handleUpload();
                  setShowUpload(false);
                }}
              >
                {uploading ? 'Salvando...' : 'Salvar'}
                {success && <FiCheckCircle className="inline ml-2 text-green-500" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Flyers */}
  <div className="w-full flex-1 overflow-y-auto max-h-[340px] scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50 pb-4">
        {flyers.length === 0 ? (
          <div className="text-gray-400 text-center mt-12">Nenhum flyer enviado ainda.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {flyers.map(flyer => (
              <div
                key={flyer.filename}
                className={`relative border-2 rounded-xl p-2 flex flex-row items-center gap-2 cursor-pointer transition ${selected === flyer.filename ? 'border-pink-500 ring-2 ring-pink-400' : 'border-pink-100 hover:border-pink-300'}`}
                onClick={() => setSelected(flyer.filename === selected ? null : flyer.filename)}
              >
                {/* Mini prévia */}
                <img src={`${API_BASE}${flyer.url}`} alt={flyer.filename} className="h-10 w-10 object-cover rounded mr-2 border border-gray-200" />
                <div className="flex-1 flex flex-col items-start justify-center">
                  <div className="text-xs text-gray-600 break-all max-w-[120px]">{flyer.filename}</div>
                </div>
                {selected === flyer.filename && (
                  <button
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-red-600 hover:bg-red-100 shadow"
                    onClick={e => { e.stopPropagation(); handleDelete(); }}
                    disabled={deleting}
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFlyer;
