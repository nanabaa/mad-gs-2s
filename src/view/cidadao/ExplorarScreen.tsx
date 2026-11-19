// src/view/cidadao/ExplorarScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '../../control/ThemeContext';
import { useCampanhas } from '../../hooks/useCampanhas';

const categorias = [
  { id: 'Todas', label: 'Todas', emoji: '🌍' },
  { id: 'Ajuda animal', label: 'Ajuda animal', emoji: '🐾' },
  { id: 'Educação', label: 'Educação', emoji: '📚' },
  { id: 'Alimentação', label: 'Alimentação', emoji: '🥫' },
  { id: 'Saúde', label: 'Saúde', emoji: '❤️' },
  { id: 'Moradia', label: 'Moradia', emoji: '🏠' },
  { id: 'Apoio social', label: 'Apoio social', emoji: '🤝' },
];

export default function ExplorarScreen() {
  const { colors } = useTheme();
  const { data: campanhas, isLoading, isError, refetch } = useCampanhas();
  
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [regiao, setRegiao] = useState('');

  const campanhasFiltradas = useMemo(() => {
    if (!campanhas) return [];

    return campanhas.filter((item) => {
      const matchTexto = item.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                         item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                         item.nomeOng?.toLowerCase().includes(busca.toLowerCase());
      
      const matchCategoria = categoriaAtiva === 'Todas' || item.categoria === categoriaAtiva;
      const matchRegiao = item.local?.toLowerCase().includes(regiao.toLowerCase());

      return matchTexto && matchCategoria && matchRegiao;
    });
  }, [campanhas, busca, categoriaAtiva, regiao]);

  const renderCard = (item: any) => {
    return (
      <View key={item.id} style={[styles.campaignCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=500&auto=format&fit=crop' }} style={styles.campaignImage} />
        <View style={styles.cardContent}>
          <View style={styles.ongRow}>
            <Text style={{ fontSize: 10 }}>🤝</Text>
            <Text style={[styles.ongText, { color: colors.textSecondary }]}>{item.nomeOng || 'ONG Verificada'}</Text>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
          <Text style={[styles.campaignTitle, { color: colors.text }]}>{item.titulo}</Text>
          <Text style={[styles.campaignDesc, { color: colors.textSecondary }]} numberOfLines={2}>{item.descricao}</Text>
          
          <View style={styles.metaRow}>
            <View style={[styles.tagText, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={[styles.tagTextLabel, { color: colors.textSecondary }]}>{item.local}</Text>
            </View>
            <View style={[styles.tagText, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={[styles.tagTextLabel, { color: colors.textSecondary }]}>{item.categoria}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Barra de Busca */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TextInput 
          style={[styles.searchInput, { color: colors.text }]} 
          placeholder="Buscar campanhas, ONGs ou causas..." 
          placeholderTextColor={colors.textSecondary}
          value={busca}
          onChangeText={setBusca}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* Categorias */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore por categoria</Text>
      
      {/* CORREÇÃO: altura fixa no wrapper e alignItems center */}
      <View style={{ height: 50, marginBottom: 20 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
        >
          {categorias.map((cat) => {
            const isActive = categoriaAtiva === cat.id;
            return (
              <TouchableOpacity 
                key={cat.id} 
                style={[
                  styles.categoryChip, 
                  { 
                    backgroundColor: isActive ? colors.primaryLight : colors.card, 
                    borderColor: isActive ? colors.primary : colors.border 
                  }
                ]}
                onPress={() => setCategoriaAtiva(cat.id)}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={[styles.categoryText, { color: isActive ? colors.primary : colors.textSecondary }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filtros de Localização */}
      <View style={styles.filterContainer}>
        <View style={[styles.locationInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={styles.locationIcon}>📍</Text>
          <TextInput 
            style={[styles.locationInput, { color: colors.text }]} 
            placeholder="Filtrar por região (Ex: São Paulo)" 
            placeholderTextColor={colors.textSecondary}
            value={regiao}
            onChangeText={setRegiao}
          />
        </View>
        <TouchableOpacity onPress={() => { setBusca(''); setCategoriaAtiva('Todas'); setRegiao(''); }}>
          <Text style={[styles.clearFilterText, { color: colors.primary }]}>↺ Limpar filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Resultados */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {isLoading && <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />}
        
        {isError && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#ef4444', marginBottom: 10 }}>Erro ao carregar campanhas.</Text>
            <TouchableOpacity onPress={() => refetch()} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 8 }}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !isError && campanhasFiltradas.length === 0 && (
          <Text style={[styles.resultsText, { color: colors.textSecondary }]}>Nenhuma campanha encontrada com esses filtros.</Text>
        )}

        {!isLoading && !isError && campanhasFiltradas.map((item) => renderCard(item))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 16, borderRadius: 12, paddingHorizontal: 16, borderWidth: 1 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 15 },
  searchIcon: { fontSize: 18, color: '#999' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginBottom: 12 },
  
  categoryChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderRadius: 20, 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    marginRight: 10,
    height: 40, // Altura fixa para as tags
  },
  categoryEmoji: { marginRight: 6, fontSize: 16 },
  categoryText: { fontSize: 14, fontWeight: '500' },

  filterContainer: { paddingHorizontal: 16, marginBottom: 20 },
  locationInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  locationIcon: { marginRight: 8 },
  locationInput: { flex: 1, paddingVertical: 12, fontSize: 14 },
  clearFilterText: { fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  campaignCard: { borderRadius: 12, marginBottom: 16, overflow: 'hidden', borderWidth: 1 },
  campaignImage: { width: '100%', height: 140 },
  cardContent: { padding: 12 },
  ongRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  ongText: { fontSize: 10, fontWeight: 'bold', marginLeft: 6, marginRight: 6 },
  verifiedText: { color: '#2E7D32', fontSize: 10, fontWeight: 'bold' },
  campaignTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  campaignDesc: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EEE' },
  tagText: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1 },
  tagTextLabel: { fontSize: 11 },
  resultsText: { textAlign: 'center', marginTop: 20 }
});