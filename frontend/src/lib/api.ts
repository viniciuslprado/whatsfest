// frontend/src/lib/api.ts

// Define a URL base do seu Back-end
const BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/festas`
  : (import.meta.env.PROD ? '/api/v1/festas' : 'http://localhost:3000/api/v1/festas'); 

// Função para obter a chave de admin do localStorage
// Em uma aplicação real, você usaria um sistema de login com JWT tokens
const getAdminKey = () => {
  return localStorage.getItem('adminKey') || import.meta.env.VITE_ADMIN_KEY || "ChaveDeAcesso-festa17-J8kF%9zWp$rV3hL6sX";
};

// Interface (Tipo) para os dados da Festa que vamos enviar
export interface FestaData {
  nome: string;
  dataHora: string; // Enviamos como string ISO
  cidade: string;
  local?: string; // Opcional
  urlImagemFlyer?: string; // Opcional
  linkVendas?: string; // Opcional
  descricaoCurta?: string; // Opcional
  destaque: boolean;
}

/**
 * Envia os dados de uma nova festa para o Back-end (rota protegida).
 * @param festaData Os dados da festa a ser criada.
 */
export async function criarNovaFesta(festaData: FestaData) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Passa a chave secreta no cabeçalho 'Authorization'
        'Authorization': getAdminKey() 
      },
      body: JSON.stringify(festaData),
    });

    if (!response.ok) {
      // Se o status não for 2xx (ex: 401 Unauthorized, 500 Internal Server Error)
      const errorData = await response.json();
      console.error('Detalhes do erro do servidor:', errorData);
      throw new Error(errorData.message || errorData.error || `Falha ao cadastrar festa. Status: ${response.status}`);
    }

    // Retorna os dados da festa que foram criados no DB
    return response.json();

  } catch (error) {
    console.error("Erro na API de criação de festa:", error);
    // Relança o erro para o componente Admin poder exibir a mensagem
    throw error; 
  }
}

const PUBLIC_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/festas`
  : (import.meta.env.PROD ? 'https://whatsfest-backend.onrender.com/api/v1/festas' : 'http://localhost:3000/api/v1/festas');
    

// Interface para os dados da Festa que vêm do Back-end
export interface Festa {
  id: number;
  nome: string;
  dataHora: string; // Vem como string ISO 8601
  cidade: string;
  local?: string; // Opcional
  urlImagemFlyer?: string; // Opcional
  linkVendas?: string;
  descricaoCurta?: string; // Opcional
  destaque: boolean;
}

/**
 * Busca as festas da API, aplicando ordenação por localização.
 * @param cidadeUsuario Cidade do usuário para priorizar eventos.
 */
export async function buscarFestas(cidadeUsuario?: string): Promise<Festa[]> {
  let url = PUBLIC_BASE_URL;

  if (cidadeUsuario) {
    // Adiciona o parâmetro de geolocalização à URL
    url += `?cidadeUsuario=${encodeURIComponent(cidadeUsuario)}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Falha ao buscar festas. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Erro na API de busca de festa:", error);
    return []; // Retorna um array vazio em caso de falha
  }
}