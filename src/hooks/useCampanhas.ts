// src/hooks/useCampanhas.ts
import { useQuery } from '@tanstack/react-query';
import { campanhaService } from '../services/campanhaService';

export function useCampanhas() {
  return useQuery({ 
    queryKey: ['campanhas'], 
    queryFn: campanhaService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}