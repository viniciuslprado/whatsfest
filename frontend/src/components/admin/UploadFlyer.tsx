import React, { useRef, useState } from 'react';
import { FiUploadCloud, FiImage } from 'react-icons/fi';

const UploadFlyer: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFileName('');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600 flex items-center gap-2">
        <FiUploadCloud className="text-3xl" /> Upload de Flyer
      </h2>
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
        className="w-full py-3 px-6 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white font-bold text-lg shadow-md hover:from-pink-600 hover:to-fuchsia-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={!preview}
      >
        Enviar Flyer
      </button>
    </div>
  );
};

export default UploadFlyer;
