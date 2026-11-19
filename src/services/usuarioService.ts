import api from './api';

export const usuarioService = {
  atualizarPerfil: async (id: number, dados: any) => {
    const { data } = await api.put(`/usuarios/${id}`, dados);
    return data;
  },
};