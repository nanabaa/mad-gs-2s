import api from './api';

export type Campanha = {
  id: number;
  titulo: string;
  descricao: string;
  regiao: string;
  categoria: string;
  imagemUrl: string;
  ongNome: string;
};

export const campanhaService = {
  getAll: async (): Promise<Campanha[]> => {
    // ⚠️ Verifique se a rota no Java é /campanhas ou /causas, etc.
    const { data } = await api.get('/campanhas');
    
    // Tratamento para Page (Spring Boot)
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    
    return [];
  },
};