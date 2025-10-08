import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Rota de teste simples  
router.get('/test', (req, res) => {
  console.log('🧪 Rota de teste chamada! VERSÃO FINAL');
  res.json({ message: 'API RECARREGADA! VERSÃO FINAL', timestamp: new Date().toISOString() });
});

// Interface para resposta de geolocalização
interface GeolocationResponse {
  city: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

// Interface para resposta da HG Brasil
interface HGBrasilResponse {
  results: {
    city: string;
    region: string;
    country_name: string;
    latitude: number;
    longitude: number;
  };
  valid_key: boolean;
}

// Rota para obter localização por IP (HG Brasil)
router.get('/location', async (req, res) => {
  try {
    const HG_BRASIL_API_KEY = process.env.HG_BRASIL_API_KEY || '995ebb85';

    // Fazer chamada para HG Brasil API para obter localização por IP
    const response = await fetch(
      `https://api.hgbrasil.com/geoip?key=${HG_BRASIL_API_KEY}&address=remote&format=json`
    );

    if (!response.ok) {
      throw new Error('Erro na resposta da API da HG Brasil');
    }

    const data = await response.json() as HGBrasilResponse;

    if (!data.valid_key) {
      return res.status(401).json({
        error: 'Chave da API HG Brasil inválida'
      });
    }

    const locationData: GeolocationResponse = {
      city: data.results.city,
      region: data.results.region,
      country: data.results.country_name,
      latitude: data.results.latitude,
      longitude: data.results.longitude
    };

    res.json(locationData);

  } catch (error) {
    console.error('Erro ao obter localização:', error);
    res.status(500).json({
      error: 'Erro interno do servidor ao processar localização'
    });
  }
});

// Interfaces para a API do IBGE
interface IBGEMunicipio {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
        regiao: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

// Cache simples para melhorar performance
let municipiosCache: IBGEMunicipio[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos em ms

// Função para buscar municípios da API do IBGE
async function buscarMunicipiosIBGE(): Promise<IBGEMunicipio[]> {
  const agora = Date.now();
  
  // Verifica se o cache ainda é válido
  if (municipiosCache && (agora - cacheTimestamp) < CACHE_DURATION) {
    return municipiosCache;
  }

  try {
    console.log('Buscando municípios da API do IBGE...');
    
    const response = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
      {
        headers: {
          'User-Agent': 'WhatsFest/1.0',
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API do IBGE: ${response.status} ${response.statusText}`);
    }

    const municipios = await response.json() as IBGEMunicipio[];
    
    // Atualiza o cache
    municipiosCache = municipios;
    cacheTimestamp = agora;
    
    console.log(`${municipios.length} municípios carregados do IBGE`);
    return municipios;

  } catch (error) {
    console.error('Erro ao buscar municípios do IBGE:', error);
    
    // Se houve erro e temos cache antigo, usa o cache
    if (municipiosCache) {
      console.log('Usando cache antigo devido a erro na API');
      return municipiosCache;
    }
    
    throw error;
  }
}

// Rota para buscar cidades brasileiras (para autocomplete)
router.get('/cities', async (req, res) => {
  console.log('🚀 ROTA /cities CHAMADA!');
  console.log('URL completa:', req.url);
  console.log('Query params:', req.query);
  
  try {
    const { search } = req.query;
    console.log('🔍 Busca recebida:', search);

    if (!search || typeof search !== 'string') {
      console.log('❌ Parâmetro de busca inválido');
      return res.status(400).json({
        error: 'Parâmetro de busca é obrigatório'
      });
    }

    const searchTerm = search.toLowerCase().trim();
    console.log('📝 Termo de busca processado:', searchTerm);
    
    if (searchTerm.length < 2) {
      console.log('❌ Termo muito curto:', searchTerm.length);
      return res.status(400).json({
        error: 'Termo de busca deve ter pelo menos 2 caracteres'
      });
    }

    // Buscar municípios da API do IBGE
    console.log('🏛️ Buscando na API do IBGE...');
    
    const municipios = await buscarMunicipiosIBGE();
    console.log(`📊 Total de municípios carregados: ${municipios.length}`);
    
    // Filtrar e formatar os resultados
    const resultadosIBGE = municipios
      .filter(municipio => {
        // Verificar se todas as propriedades necessárias existem
        if (!municipio || !municipio.nome || !municipio.microrregiao || 
            !municipio.microrregiao.mesorregiao || !municipio.microrregiao.mesorregiao.UF ||
            !municipio.microrregiao.mesorregiao.UF.sigla) {
          return false;
        }
        
        const nomeCompleto = `${municipio.nome} (${municipio.microrregiao.mesorregiao.UF.sigla})`.toLowerCase();
        return nomeCompleto.includes(searchTerm);
      })
      .sort((a, b) => {
        // Prioriza matches que começam com o termo de busca
        const nomeA = a.nome.toLowerCase();
        const nomeB = b.nome.toLowerCase();
        const aStartsWith = nomeA.startsWith(searchTerm);
        const bStartsWith = nomeB.startsWith(searchTerm);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return nomeA.localeCompare(nomeB);
      })
      .slice(0, 10) // Limitar a 10 resultados para performance
      .map(municipio => `${municipio.nome} (${municipio.microrregiao.mesorregiao.UF.sigla})`);
    
    console.log(`✅ Resultados encontrados: ${resultadosIBGE.length}`);
    console.log('🎯 Primeiros resultados:', resultadosIBGE.slice(0, 3));
    
    res.json(resultadosIBGE);

  } catch (error) {
    console.error('❌ ERRO na rota /cities:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    // Se a API do IBGE falhar, retorna erro (sem fallback estático)
    res.status(503).json({ 
      error: 'Serviço de consulta de cidades temporariamente indisponível. Tente novamente em alguns momentos.' 
    });
  }
});

export default router;