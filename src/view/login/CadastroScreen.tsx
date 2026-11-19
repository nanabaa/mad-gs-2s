import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, ActivityIndicator, ImageBackground, Modal, Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../../services/authService'; 

const formatarCPF = (texto: string) => {
  const apenasNumeros = texto.replace(/\D/g, '');
  return apenasNumeros
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const formatarData = (texto: string) => {
  const apenasNumeros = texto.replace(/\D/g, '');
  return apenasNumeros
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1');
};

export default function CadastroScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tipoConta, setTipoConta] = useState('VOLUNTARIO'); 
  
  const [modalTipoVisible, setModalTipoVisible] = useState(false);
  const [modalPoliticaVisible, setModalPoliticaVisible] = useState(false);
  const [aceitouPolitica, setAceitouPolitica] = useState(false);

  const handleCadastrar = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !telefone || !cpf || !dataNascimento || !estado || !cidade) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios (*).');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    if (senha.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (!aceitouPolitica) {
      Alert.alert('Atenção', 'Você precisa aceitar a Política de Uso para continuar.');
      return;
    }

    setLoading(true);
    try {
      await authService.cadastrar({
        nome,
        email,
        telefone,
        senha,
        confirmarSenha,
        perfil: 'VOLUNTARIO',
        aceitouPolitica: true,
        cpf,
        dataNascimento,
        estado,
        cidade,
        bairro,
      });

      Alert.alert('Sucesso', 'Cadastro realizado! Faça login para continuar.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.log('Erro no cadastro:', error.response?.data || error);
      const msg = error.response?.data?.message || error.response?.data?.erro || 'Não foi possível cadastrar. Verifique os dados.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/loginBG.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>

        {}
        <Text style={styles.label}>Como você quer participar?</Text>
        <TouchableOpacity 
          style={styles.selectInput} 
          onPress={() => setModalTipoVisible(true)}
        >
          <Text style={{ color: '#333', fontSize: 16 }}>
            {tipoConta === 'VOLUNTARIO' ? 'Quero ser voluntário' : 'Selecione seu tipo de conta'}
          </Text>
          <Text style={{ color: '#999' }}>▼</Text>
        </TouchableOpacity>

        {}
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>CPF *</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          placeholderTextColor="#999"
          value={cpf}
          onChangeText={(t) => setCpf(formatarCPF(t))}
          keyboardType="numeric"
          maxLength={14}
        />

        <Text style={styles.label}>Data de Nascimento *</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#999"
          value={dataNascimento}
          onChangeText={(t) => setDataNascimento(formatarData(t))}
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Telefone *</Text>
        <TextInput
          style={styles.input}
          placeholder="(11) 99999-9999"
          placeholderTextColor="#999"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        {}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Estado (UF) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: SP"
              placeholderTextColor="#999"
              value={estado}
              onChangeText={setEstado}
              autoCapitalize="characters"
              maxLength={2}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Cidade *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: São Paulo"
              placeholderTextColor="#999"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>
        </View>

        <Text style={styles.label}>Bairro (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu bairro"
          placeholderTextColor="#999"
          value={bairro}
          onChangeText={setBairro}
        />

        <Text style={styles.label}>Senha *</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar Senha *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha novamente"
          placeholderTextColor="#999"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        {}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => {
            if (!aceitouPolitica) {
              setModalPoliticaVisible(true);
            } else {
              setAceitouPolitica(false); 
            }
          }}
        >
          <View style={[styles.checkbox, aceitouPolitica && styles.checkboxChecked]}>
            {aceitouPolitica && <Text style={{ color: '#FFF', fontSize: 12 }}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>Li e concordo com a Política de Uso.</Text>
        </TouchableOpacity>

        {}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#F9F9F9' }]} 
          onPress={handleCadastrar} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#E85D2A" /> 
          ) : (
            <Text style={[styles.buttonText, { color: '#E85D2A' }]}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>

      {}
      <Modal visible={modalTipoVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalTipoVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione seu tipo de conta</Text>
            
            <TouchableOpacity 
              style={[styles.modalOption, { borderBottomWidth: 1, borderBottomColor: '#EEE' }]}
              onPress={() => {
                setTipoConta('VOLUNTARIO');
                setModalTipoVisible(false);
              }}
            >
              <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>Quero ser voluntário</Text>
            </TouchableOpacity>

            <View style={[styles.modalOption, styles.modalOptionDisabled, { borderBottomWidth: 1, borderBottomColor: '#EEE' }]}>
              <Text style={{ color: '#AAA', fontSize: 16 }}>Estou buscando ajuda - Indisponível no momento</Text>
            </View>

            <View style={[styles.modalOption, styles.modalOptionDisabled]}>
              <Text style={{ color: '#AAA', fontSize: 16 }}>Sou uma organização (ONG) - Indisponível no momento</Text>
            </View>
          </View>
        </Pressable>
      </Modal>

      {}
      <Modal visible={modalPoliticaVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { padding: 0, maxHeight: '80%' }]}>
            
            <View style={{ backgroundColor: '#FFF5ED', padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
              <Text style={{ color: '#E85D2A', fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>ANTES DE CONTINUAR</Text>
              <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 22 }}>Política de Uso</Text>
              <Text style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Queremos manter uma comunidade segura, respeitosa e confiável.</Text>
            </View>

            <ScrollView style={{ padding: 20 }}>
              <Text style={styles.politicaTitulo}>Seus dados e sua privacidade</Text>
              <Text style={styles.politicaTexto}>
                Ao criar uma conta, você concorda em fornecer informações verdadeiras e manter seus dados de contato atualizados.
              </Text>
              <Text style={styles.politicaTexto}>
                Seus dados cadastrais serão utilizados para autenticação, segurança e conexão entre ONGs, voluntários e beneficiários. CPF e CNPJ não serão exibidos publicamente.
              </Text>

              <Text style={styles.politicaTitulo}>Convivência na plataforma</Text>
              <Text style={styles.politicaTexto}>
                Não publique conteúdo ilegal, discriminatório ou enganoso, nem exponha dados pessoais de terceiros. A plataforma poderá moderar conteúdos que violem essas regras.
              </Text>

              <Text style={styles.politicaTitulo}>Segurança da conta</Text>
              <Text style={styles.politicaTexto}>
                Você é responsável pela segurança da sua senha e pelo uso da sua conta. A política deverá ser revisada e aprovada formalmente antes da publicação do sistema.
              </Text>
            </ScrollView>

            <View style={{ flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'flex-end', gap: 10 }}>
              <TouchableOpacity 
                style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, borderColor: '#DDD' }}
                onPress={() => setModalPoliticaVisible(false)}
              >
                <Text style={{ color: '#666', fontWeight: 'bold' }}>Não aceito</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#E85D2A' }}
                onPress={() => {
                  setAceitouPolitica(true);
                  setModalPoliticaVisible(false);
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Aceito a Política de Uso</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  scrollContainer: { flex: 1 },
  content: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#e7edfd', textAlign: 'center', marginBottom: 30 },
  
  label: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 5 },
  
  input: {
    borderWidth: 1, borderColor: '#fff', padding: 14, marginBottom: 5,
    borderRadius: 8, fontSize: 16, backgroundColor: '#fff', color: '#333',
  },

  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  halfInputContainer: { flex: 1 },

  selectInput: {
    borderWidth: 1, borderColor: '#fff', padding: 14, marginBottom: 10,
    borderRadius: 8, backgroundColor: '#fff',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },

  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  checkboxChecked: { backgroundColor: '#E85D2A', borderColor: '#E85D2A' },
  checkboxText: { color: '#FFF', fontSize: 14 },

  button: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 20, elevation: 3 },
  buttonText: { fontWeight: 'bold', fontSize: 16 },

  linkButton: { padding: 15, alignItems: 'center', marginTop: 10 },
  linkText: { color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 16, width: '100%', padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' },
  
  modalOption: { paddingVertical: 15 },
  modalOptionDisabled: { opacity: 0.5 }, 

  politicaTitulo: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 5 },
  politicaTexto: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 10 },
});