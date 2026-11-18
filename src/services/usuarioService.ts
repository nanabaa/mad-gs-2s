// src/services/usuarioService.ts
import api from './api';

export const usuarioService = {
  uploadFoto: async (userId: number, uri: string) => {
    const formData = new FormData();
    
    // Pega a extensão do arquivo (jpg, png, etc)
    const fileExtension = uri.split('.').pop();
    const fileName = `profile.${fileExtension}`;
    const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

    // No React Native, o FormData exige esse formato de objeto
    formData.append('foto', {
      uri,
      name: fileName,
      type: mimeType,
    } as any);

    // ⚠️ Verifique a rota correta no seu Swagger. Ex: `/usuarios/${userId}/foto` ou `/upload`
    const { data } = await api.post(`/usuarios/${userId}/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data; // O Java deve retornar a URL da foto salva
  },
};