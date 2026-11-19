// src/services/usuarioService.ts
import api from './api';

export const usuarioService = {
  // ⚠️ Verifique no Swagger do seu Java a rota exata para atualizar dados do usuário
  atualizarPerfil: async (id: number, dados: any) => {
    const { data } = await api.put(`/usuarios/${id}`, dados);
    return data;
  },
};