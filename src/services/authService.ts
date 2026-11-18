import api from './api';

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    role: string; 
  }
};

export const authService = {
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const { data } = await api.post('/auth/login', {
      email,
      senha,
    });
    return data;
  },

  cadastrar: async (payload: any) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  },
};