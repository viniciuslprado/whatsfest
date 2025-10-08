import React, { useState, useEffect, useRef } from 'react';
import { criarNovaFesta } from '../lib/api'; 
import type { FestaData } from '../lib/api';
import { FaPlus, FaSave, FaSpinner, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaUpload, FaTrash, FaImage, FaCog } from 'react-icons/fa'; 

// Estado inicial do formulário (limpo)
const initialFormData: FestaData = {
  nome: '',
  dataHora: '', 
  cidade: '',
  local: '',
  urlImagemFlyer: '',
  linkVendas: '',
  descricaoCurta: '',
  destaque: false,
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
  const [formData, setFormData] = useState<FestaData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | '' }>({ text: '', type: '' });
  const [uploadedImages, setUploadedImages] = useState<FlyerImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para gerenciamento de flyers
  const [flyers, setFlyers] = useState<FlyerImage[]>([]);
  const [flyerForm, setFlyerForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    linkVendas: '',
    destaque: false,
    dataEvento: '',
    cidade: ''
  });
  const [editingFlyer, setEditingFlyer] = useState<string | null>(null);
  
  // Estado para controle das abas
  const [activeTab, setActiveTab] = useState<'eventos' | 'flyers'>('eventos');

  // 1. Lida com a mudança de qualquer campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Lida com o checkbox 'destaque'
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData({ ...formData, [name]: finalValue });
  };

  // 2. Lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    try {
      // Ajusta o formato da data para o DB
      const dataParaEnvio = { 
        ...formData, 
        // Converte a string local para um formato ISO que o Prisma entende
        dataHora: new Date(formData.dataHora).toISOString() 
      };

      await criarNovaFesta(dataParaEnvio);
      
      setMessage({ text: '🎉 Festa cadastrada com sucesso!', type: 'success' });
      setFormData(initialFormData); // Limpa o formulário
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
      setMessage({ text: `❌ Erro: ${errorMessage}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar imagens existentes
  const loadExistingImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/uploads/flyer-images');
      if (response.ok) {
        const data = await response.json();
        setUploadedImages(data.images || []);
      }
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  // Carregar imagens e flyers ao montar o componente
  useEffect(() => {
    loadExistingImages();
    loadFlyers();
  }, []);

  // Função para carregar flyers existentes
  const loadFlyers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/flyers');
      if (response.ok) {
        const data = await response.json();
        setFlyers(data.flyers || []);
      }
    } catch (error: unknown) {
      console.error('Erro ao carregar flyers:', error);
    }
  };

  // Função para fazer upload da imagem
  const uploadImage = async (file: File) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('flyerImage', file);

    try {
      const response = await fetch('http://localhost:5000/api/v1/uploads/flyer-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await response.json();
        setMessage({ text: '✅ Imagem enviada com sucesso!', type: 'success' });
        loadExistingImages(); // Recarregar lista de imagens
      } else {
        const error = await response.json();
        setMessage({ text: `❌ Erro no upload: ${error.error}`, type: 'error' });
      }
    } catch {
      setMessage({ text: '❌ Erro ao enviar imagem', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  // Função para deletar imagem
  const deleteImage = async (fileName: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta imagem?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/uploads/flyer-image/${fileName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ text: '🗑️ Imagem excluída com sucesso!', type: 'success' });
        loadExistingImages(); // Recarregar lista de imagens
      } else {
        const error = await response.json();
        setMessage({ text: `❌ Erro ao excluir: ${error.error}`, type: 'error' });
      }
    } catch {
      setMessage({ text: '❌ Erro ao excluir imagem', type: 'error' });
    }
  };

  // Manipuladores de drag & drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        uploadImage(file);
      } else {
        setMessage({ text: '❌ Apenas imagens são permitidas', type: 'error' });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        uploadImage(file);
      } else {
        setMessage({ text: '❌ Apenas imagens são permitidas', type: 'error' });
      }
    }
  };

  // Funções para gerenciamento de flyers
  const handleFlyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flyerForm.title || !flyerForm.imageUrl) {
      setMessage({ text: '❌ Título e imagem são obrigatórios', type: 'error' });
      return;
    }

    try {
      const url = editingFlyer 
        ? `http://localhost:5000/api/v1/flyers/${editingFlyer}`
        : 'http://localhost:5000/api/v1/flyers';
      
      const method = editingFlyer ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flyerForm)
      });

      if (response.ok) {
        setMessage({ 
          text: editingFlyer ? '✅ Flyer atualizado!' : '✅ Flyer criado!', 
          type: 'success' 
        });
        setFlyerForm({
          title: '',
          description: '',
          imageUrl: '',
          linkVendas: '',
          destaque: false,
          dataEvento: '',
          cidade: ''
        });
        setEditingFlyer(null);
        loadFlyers();
      } else {
        const error = await response.json();
        setMessage({ text: `❌ Erro: ${error.error}`, type: 'error' });
      }
    } catch {
      setMessage({ text: '❌ Erro ao salvar flyer', type: 'error' });
    }
  };

  const editFlyer = (flyer: FlyerImage) => {
    setFlyerForm({
      title: flyer.title || '',
      description: flyer.description || '',
      imageUrl: flyer.imageUrl,
      linkVendas: flyer.linkVendas || '',
      destaque: flyer.destaque || false,
      dataEvento: flyer.dataEvento || '',
      cidade: flyer.cidade || ''
    });
    setEditingFlyer(flyer.id || null);
  };

  const deleteFlyer = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este flyer?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/v1/flyers/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage({ text: '🗑️ Flyer excluído com sucesso!', type: 'success' });
        loadFlyers();
      } else {
        const error = await response.json();
        setMessage({ text: `❌ Erro: ${error.error}`, type: 'error' });
      }
    } catch {
      setMessage({ text: '❌ Erro ao excluir flyer', type: 'error' });
    }
  };

  const selectImageForFlyer = (imageUrl: string) => {
    setFlyerForm({ ...flyerForm, imageUrl: `http://localhost:5000${imageUrl}` });
    setMessage({ text: '✅ Imagem selecionada para o flyer!', type: 'success' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FaCog /> Painel Administrativo
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
              Gerencie eventos, flyers e conteúdo da plataforma
            </p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <FaArrowLeft /> Sair
            </button>
          )}
        </div>

        {/* Sistema de Abas */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '24px'
        }}>
          {[
            { id: 'eventos', label: '📅 Criar Eventos', icon: FaPlus },
            { id: 'flyers', label: '🎨 Upload Flyers', icon: FaImage }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'eventos' | 'flyers')}
              style={{
                background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mensagem de Feedback */}
      {message.text && (
        <div style={{ 
          padding: '16px', 
          margin: '0 0 24px 0', 
          borderRadius: '12px',
          background: message.type === 'success' ? '#f0f9ff' : '#fef2f2',
          border: `2px solid ${message.type === 'success' ? '#3b82f6' : '#ef4444'}`,
          color: message.type === 'success' ? '#1e40af' : '#dc2626',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          {message.type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />}
          {message.text}
        </div>
      )}

      {/* Seção removida - upload integrado nas outras abas */}

        
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

        {/* Lista de Imagens Enviadas */}
        {uploadedImages.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#374151',
              marginBottom: '16px'
            }}>
              Imagens Enviadas ({uploadedImages.length})
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {uploadedImages.map((image) => (
                <div key={image.fileName} style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  background: '#f9fafb'
                }}>
                  <img
                    src={`http://localhost:5000${image.imageUrl}`}
                    alt="Flyer"
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '8px'
                    }}
                  />
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '4px 0',
                    wordBreak: 'break-word'
                  }}>
                    {image.fileName}
                  </p>
                  <p style={{
                    fontSize: '10px',
                    color: '#9ca3af',
                    marginBottom: '8px'
                  }}>
                    {image.size ? (image.size / 1024).toFixed(1) + ' KB' : 'Tamanho desconhecido'}
                  </p>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => selectImageForFlyer(image.imageUrl)}
                      style={{
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flex: 1,
                        justifyContent: 'center'
                      }}
                    >
                      <FaCheckCircle size={10} /> Selecionar
                    </button>
                    <button
                      type="button"
                      onClick={() => image.fileName && deleteImage(image.fileName)}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flex: 1,
                        justifyContent: 'center'
                      }}
                    >
                      <FaTrash size={10} /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      )}

      {/* Seção de Gestão de Flyers */}
      {activeTab === 'flyers' && (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FaImage /> {editingFlyer ? 'Editar Flyer' : 'Criar Novo Flyer'}
        </h2>

        {/* Formulário de Flyer */}
        <form onSubmit={handleFlyerSubmit} style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Título do Flyer *
              </label>
              <input
                type="text"
                value={flyerForm.title}
                onChange={(e) => setFlyerForm({ ...flyerForm, title: e.target.value })}
                placeholder="Ex: Festa de Verão 2024"
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

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Cidade
              </label>
              <input
                type="text"
                value={flyerForm.cidade}
                onChange={(e) => setFlyerForm({ ...flyerForm, cidade: e.target.value })}
                placeholder="Ex: São Paulo, SP"
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
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Descrição
            </label>
            <textarea
              value={flyerForm.description}
              onChange={(e) => setFlyerForm({ ...flyerForm, description: e.target.value })}
              placeholder="Descrição do evento..."
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                minHeight: '80px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Imagem Selecionada *
              </label>
              <input
                type="text"
                value={flyerForm.imageUrl}
                onChange={(e) => setFlyerForm({ ...flyerForm, imageUrl: e.target.value })}
                placeholder="URL da imagem (selecione uma imagem acima)"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: flyerForm.imageUrl ? '#f0f9ff' : 'white'
                }}
                readOnly
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Link de Vendas
              </label>
              <input
                type="url"
                value={flyerForm.linkVendas}
                onChange={(e) => setFlyerForm({ ...flyerForm, linkVendas: e.target.value })}
                placeholder="https://..."
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Data do Evento
              </label>
              <input
                type="date"
                value={flyerForm.dataEvento}
                onChange={(e) => setFlyerForm({ ...flyerForm, dataEvento: e.target.value })}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="destaque"
                checked={flyerForm.destaque}
                onChange={(e) => setFlyerForm({ ...flyerForm, destaque: e.target.checked })}
                style={{ transform: 'scale(1.2)' }}
              />
              <label htmlFor="destaque" style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                ⭐ Destacar
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FaSave /> {editingFlyer ? 'Atualizar Flyer' : 'Criar Flyer'}
            </button>

            {editingFlyer && (
              <button
                type="button"
                onClick={() => {
                  setEditingFlyer(null);
                  setFlyerForm({
                    title: '',
                    description: '',
                    imageUrl: '',
                    linkVendas: '',
                    destaque: false,
                    dataEvento: '',
                    cidade: ''
                  });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Lista de Flyers Existentes */}
        {flyers.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#374151',
              marginBottom: '16px',
              borderTop: '2px solid #f3f4f6',
              paddingTop: '24px'
            }}>
              Flyers Cadastrados ({flyers.length})
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {flyers.map((flyer) => (
                <div key={flyer.id} style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  background: '#f9fafb'
                }}>
                  <img
                    src={flyer.imageUrl}
                    alt={flyer.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginBottom: '12px'
                    }}
                  />
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    {flyer.title} {flyer.destaque && '⭐'}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                  }}>
                    {flyer.description || 'Sem descrição'}
                  </p>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    marginBottom: '12px'
                  }}>
                    {flyer.cidade && `📍 ${flyer.cidade}`}
                    {flyer.dataEvento && ` | 📅 ${new Date(flyer.dataEvento).toLocaleDateString()}`}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => editFlyer(flyer)}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => flyer.id && deleteFlyer(flyer.id)}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      <FaTrash size={10} /> Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      )}

      {/* Formulário */}
      {activeTab === 'eventos' && (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
          
          {/* Nome da Festa */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Nome da Festa *
            </label>
            <input 
              type="text" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Ex: Festa de Ano Novo 2026"
            />
          </div>
          
          {/* Data e Hora */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Data e Hora de Início *
            </label>
            <input 
              type="datetime-local" 
              name="dataHora" 
              value={formData.dataHora} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Cidade */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Cidade *
              </label>
              <input 
                type="text" 
                name="cidade" 
                value={formData.cidade} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="Ex: São Paulo"
              />
            </div>
            
            {/* Local */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Local *
              </label>
              <input 
                type="text" 
                name="local" 
                value={formData.local} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="Ex: Clube Atlético"
              />
            </div>
          </div>

          {/* URL do Flyer */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              URL da Imagem/Flyer *
            </label>
            <input 
              type="url" 
              name="urlImagemFlyer" 
              value={formData.urlImagemFlyer} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              placeholder="https://exemplo.com/flyer.jpg"
            />
          </div>
          
          {/* Link de Vendas */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Link de Vendas (Opcional)
            </label>
            <input 
              type="url" 
              name="linkVendas" 
              value={formData.linkVendas} 
              onChange={handleChange} 
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              placeholder="https://exemplo.com/ingressos"
            />
          </div>
          
          {/* Descrição Curta */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Descrição Curta *
            </label>
            <textarea 
              name="descricaoCurta" 
              value={formData.descricaoCurta} 
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLTextAreaElement>)} 
              required 
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              placeholder="Uma breve descrição do evento..."
            />
          </div>
          
          {/* Destaque */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <input 
              type="checkbox" 
              name="destaque" 
              checked={formData.destaque} 
              onChange={handleChange} 
              style={{ marginRight: '12px', transform: 'scale(1.2)' }} 
            />
            <label style={{ fontSize: '16px', fontWeight: '500', color: '#374151' }}>
              Marcar como Destaque (Flyer Principal no Calendário)
            </label>
          </div>
          
          {/* Botão de Envio */}
          <button 
            type="submit" 
            disabled={loading} 
            style={{
              padding: '16px 32px',
              background: loading 
                ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            {loading ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                Salvando...
              </>
            ) : (
              <>
                <FaSave />
                Cadastrar Festa
              </>
            )}
          </button>
        </form>
      </div>
      )}

      {/* CSS para animações */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;