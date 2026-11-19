import api from './api';

export type CadastroPayload = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  perfil: string;
  telefone?: string;
  aceitouPolitica: boolean;
  cpf?: string;
  dataNascimento?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
};

export const authService = {
  login: async (email: string, senha: string) => {
    const { data } = await api.post('/auth/login', { email, senha });
    return data;
  },

  cadastrar: async (payload: CadastroPayload) => {
    let dataFormatadaParaJava = payload.dataNascimento || '';
    if (dataFormatadaParaJava.includes('/')) {
      const [dia, mes, ano] = dataFormatadaParaJava.split('/');
      dataFormatadaParaJava = `${ano}-${mes}-${dia}`;
    }

    const body = {
      nome: payload.nome,
      email: payload.email,
      senha: payload.senha,
      confirmarSenha: payload.confirmarSenha,
      perfil: payload.perfil, 
      telefone: payload.telefone || '',
      aceitouPolitica: payload.aceitouPolitica,
      cpf: payload.cpf || '',
      dataNascimento: dataFormatadaParaJava, 
      estado: payload.estado || '',
      cidade: payload.cidade || '',
      bairro: payload.bairro || '',
    };

    console.log("JSON ENVIADO PARA O JAVA:", body);

    const { data } = await api.post('/auth/register', body);
    return data;
  },
};