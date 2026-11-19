import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useTheme } from '../../control/ThemeContext';

const COMMIT_HASH = "5c5e528353f43eb1fe7db437937ca19511d71e80";

export default function SobreScreen() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Conectando pessoas, ONGs e oportunidades para transformar realidades.
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.text }]}>Versão do App:</Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>
            {Constants.expoConfig?.version || '1.0.0'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: colors.text }]}>Ambiente:</Text>
          <Text style={[styles.value, { color: colors.textSecondary }]}>
            {Constants.expoConfig?.hostUri ? 'Desenvolvimento' : 'Produção'}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.hashContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Hash do Commit (Versão Publicada):</Text>
          <View style={[styles.hashBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.hashText, { color: colors.primary }]}>
              {COMMIT_HASH}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        {}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Desenvolvido por:</Text>
        <Text style={[styles.devText, { color: colors.textSecondary }]}>Ana Clara de Oliveira Nascimento</Text>
        <Text style={[styles.devText, { color: colors.textSecondary }]}>Augusto Bonomo Junior</Text>
        <Text style={[styles.devText, { color: colors.textSecondary }]}>Isis Macedo</Text>
        <Text style={[styles.devText, { color: colors.textSecondary }]}>Henrique Pereira</Text>
        <Text style={[styles.devText, { color: colors.textSecondary }]}>Rafael Carvalho Meireles</Text>

        <View style={[styles.divider, { backgroundColor: colors.border, marginTop: 20 }]} />

        {}
        <Text style={[styles.sectionTitle, { color: colors.primary, fontSize: 14, letterSpacing: 1 }]}>POLÍTICA DE USO</Text>
        <Text style={[styles.subtitle, { color: colors.text, textAlign: 'left', fontWeight: 'bold', marginBottom: 15 }]}>
          Queremos manter uma comunidade segura, respeitosa e confiável.
        </Text>

        <Text style={[styles.politicaTitulo, { color: colors.text }]}>Seus dados e sua privacidade</Text>
        <Text style={[styles.politicaTexto, { color: colors.textSecondary }]}>
          Ao criar uma conta, você concorda em fornecer informações verdadeiras e manter seus dados de contato atualizados.
        </Text>
        <Text style={[styles.politicaTexto, { color: colors.textSecondary }]}>
          Seus dados cadastrais serão utilizados para autenticação, segurança e conexão entre ONGs, voluntários e beneficiários. CPF e CNPJ não serão exibidos publicamente.
        </Text>

        <Text style={[styles.politicaTitulo, { color: colors.text }]}>Convivência na plataforma</Text>
        <Text style={[styles.politicaTexto, { color: colors.textSecondary }]}>
          Não publique conteúdo ilegal, discriminatório ou enganoso, nem exponha dados pessoais de terceiros. A plataforma poderá moderar conteúdos que violem essas regras.
        </Text>

        <Text style={[styles.politicaTitulo, { color: colors.text }]}>Segurança da conta</Text>
        <Text style={[styles.politicaTexto, { color: colors.textSecondary }]}>
          Você é responsável pela segurança da sua senha e pelo uso da sua conta. A política deverá ser revisada e aprovada formalmente antes da publicação do sistema.
        </Text>

      </View>

      <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.goBack()}>
        <Text style={[styles.btnVoltarText, { color: colors.primary }]}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, elevation: 2 },
  logoContainer: { alignItems: 'center', marginBottom: 15 },
  logo: { width: 180, height: 60 },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 10, lineHeight: 20 },
  divider: { height: 1, width: '100%', marginVertical: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 14, fontWeight: 'bold' },
  value: { fontSize: 14 },
  hashContainer: { marginTop: 5 },
  hashBox: { padding: 15, borderRadius: 8, borderWidth: 1, marginTop: 8, alignItems: 'center' },
  hashText: { fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  devText: { fontSize: 14, marginBottom: 4 },
  
  politicaTitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  politicaTexto: { fontSize: 14, lineHeight: 22, marginBottom: 10 },

  btnVoltar: { padding: 15, alignItems: 'center', marginBottom: 30 },
  btnVoltarText: { fontSize: 16, fontWeight: 'bold' },
});