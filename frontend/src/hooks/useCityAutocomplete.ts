//lógica de autocomplete de cidades
import { useState, useCallback } from 'react';

export function useCityAutocomplete(apiBaseUrl?: string) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchCities = useCallback(async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];
    try {
      const apiUrl = apiBaseUrl || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(
        `${apiUrl}/api/v1/geolocation/cities?search=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Erro ao buscar cidades');
      const cities = await response.json() as string[];
      return cities;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      return [];
    }
  }, [apiBaseUrl]);

  const handleCityInput = async (value: string) => {
    if (value.length >= 2) {
      try {
        const results = await searchCities(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: string, onSelect: (value: string) => void) => {
    onSelect(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return {
    showSuggestions,
    suggestions,
    handleCityInput,
    selectSuggestion,
    setShowSuggestions,
    setSuggestions,
  };
}
