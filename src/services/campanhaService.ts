import api from './api';

export type Campanha = {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  local: string;
  nomeOng: string;
  status: string;
  dataCriacao: string;
  ongId: number;
};

export const campanhaService = {
  getAll: async (): Promise<Campanha[]> => {
    const { data } = await api.get('/campanhas');
    
    if (data && Array.isArray(data.conteudo)) {
      return data.conteudo;
    }
    
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  },
};