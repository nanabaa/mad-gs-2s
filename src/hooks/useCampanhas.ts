import { useQuery } from '@tanstack/react-query';
import { campanhaService } from '../services/campanhaService';

export function useCampanhas() {
  return useQuery({ 
    queryKey: ['campanhas'], 
    queryFn: campanhaService.getAll 
  });
}