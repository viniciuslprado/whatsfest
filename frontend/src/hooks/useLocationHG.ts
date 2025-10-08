import { useState, useCallback } from 'react';

// Tipos para dados de localização
export interface LocationData {
  city: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface UseLocationResult {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
  searchCities: (query: string) => Promise<string[]>;
}

// URL da API do backend
const API_BASE_URL = 'http://localhost:3000/api/v1';

const useLocation = (): UseLocationResult => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para obter localização por IP (HG Brasil)
  const getCurrentLocation = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Usar API da HG Brasil via backend para detectar localização por IP
      const response = await fetch(`${API_BASE_URL}/geolocation/location`);

      if (!response.ok) {
        throw new Error('Erro ao obter localização');
      }

      const locationData = await response.json() as LocationData;
      
      // Formato brasileiro: "Cidade, Estado"
      const cityFormatted = `${locationData.city}, ${locationData.region}`;
      
      setLocation({
        ...locationData,
        city: cityFormatted
      });

    } catch (err) {
      console.error('Erro ao obter localização:', err);
      setError('Não foi possível detectar sua localização automaticamente');
      
      // Fallback: definir uma cidade padrão brasileira
      setLocation({
        city: 'São Paulo, SP',
        region: 'São Paulo',
        country: 'Brasil'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Função para buscar cidades brasileiras (autocomplete)
  const searchCities = useCallback(async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];

    try {
      const response = await fetch(
        `${API_BASE_URL}/geolocation/cities?search=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar cidades');
      }

      const cities = await response.json() as string[];
      return cities;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      return [];
    }
  }, []);

  return {
    location,
    isLoading,
    error,
    getCurrentLocation,
    searchCities
  };
};

export default useLocation;