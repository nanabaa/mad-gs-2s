import api from './api';

// Tipagem baseada no que esperamos que o Java retorne
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
    const { data } = await api.get('/campanhas');
    
    // Tratamento para caso a API use paginação (Spring Boot Page)
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    
    return [];
  },
};