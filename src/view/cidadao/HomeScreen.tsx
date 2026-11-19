// src/view/cidadao/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../../control/ThemeContext';
import { useCampanhas } from '../../hooks/useCampanhas';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { data: campanhas, isLoading, isError, refetch } = useCampanhas();

  const renderCard = (item: any) => (
    <View key={item.id} style={[styles.campaignCard, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.imagemUrl || 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=500&auto=format&fit=crop' }} style={styles.campaignImage} />
      
      <View style={styles.cardContent}>
        <View style={styles.ongRow}>
          <View style={styles.ongIconContainer}><Text style={{ fontSize: 10 }}>🤝</Text></View>
          <Text style={[styles.ongText, { color: colors.textSecondary }]}>{item.ongNome || 'ONG Verificada'}</Text>
          <Text style={styles.verifiedText}>✓</Text>
        </View>

        <Text style={[styles.campaignTitle, { color: colors.text }]}>{item.titulo}</Text>
        <Text style={[styles.campaignDesc, { color: colors.textSecondary }]} numberOfLines={3}>{item.descricao}</Text>

        <View style={[styles.metaRow, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
          <View style={[styles.tagText, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.tagTextLabel, { color: colors.textSecondary }]}>{item.regiao}</Text>
          </View>
          <View style={[styles.tagText, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.tagTextLabel, { color: colors.textSecondary }]}>{item.categoria}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cardFooter}>
          <Text style={[styles.cardButtonText, { color: colors.textSecondary }]}>Conheça essa causa</Text>
          <Text style={[styles.cardButtonText, { color: colors.primary }]}>✓ Interesse registrado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1593113589914-07599018dd2a?q=80&w=1000&auto=format&fit=crop' }} style={styles.heroBanner} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.overlay}>
          <Text style={styles.heroTag}>CONECTANDO BOAS AÇÕES</Text>
          <Text style={styles.heroTitle}>Uma conexão pode {'\n'}<Text style={styles.heroTitleHighlight}>transformar o mundo.</Text></Text>
          <Text style={styles.heroSubtitle}>Descubra iniciativas, encontre pessoas e faça parte de mudanças reais na sua comunidade.</Text>
          <TouchableOpacity style={styles.heroButton}><Text style={styles.heroButtonText}>Explorar campanhas →</Text></TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Campanhas em destaque</Text>
        
        {isLoading && <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />}
        
        {isError && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#ef4444', marginBottom: 10 }}>Erro ao carregar as campanhas.</Text>
            <TouchableOpacity onPress={() => refetch()} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !isError && campanhas?.length === 0 && (
          <Text style={{ textAlign: 'center', color: colors.textSecondary, marginTop: 20 }}>Nenhuma campanha encontrada no momento.</Text>
        )}

        {!isLoading && !isError && campanhas?.map((item) => renderCard(item))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBanner: { margin: 16, borderRadius: 16, overflow: 'hidden', minHeight: 320 },
  overlay: { flex: 1, backgroundColor: 'rgba(255, 240, 235, 0.9)', padding: 24, justifyContent: 'center' },
  heroTag: { fontSize: 12, fontWeight: 'bold', color: '#8C7A6B', letterSpacing: 1, marginBottom: 10 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', lineHeight: 34 },
  heroTitleHighlight: { color: '#E85D2A' },
  heroSubtitle: { fontSize: 14, color: '#555', marginTop: 12, marginBottom: 20, lineHeight: 20 },
  heroButton: { backgroundColor: '#E85D2A', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignSelf: 'flex-start' },
  heroButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  campaignCard: { borderRadius: 16, marginBottom: 20, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  campaignImage: { width: '100%', height: 180 },
  cardContent: { padding: 16 },
  ongRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ongIconContainer: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#F0E6E1', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  ongText: { fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, marginRight: 6 },
  verifiedText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
  campaignTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  campaignDesc: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  metaRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 8, alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 12 },
  tagText: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1 },
  tagTextLabel: { fontSize: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardButtonText: { fontSize: 12, fontWeight: '600' },
});