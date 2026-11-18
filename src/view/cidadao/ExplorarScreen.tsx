// src/view/cidadao/ExplorarScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const categorias = [
  { id: '1', nome: 'Todas', emoji: '🌍' },
  { id: '2', nome: 'Ajuda animal', emoji: '🐾' },
  { id: '3', nome: 'Educação', emoji: '📚' },
  { id: '4', nome: 'Alimentação', emoji: '🥫' },
  { id: '5', nome: 'Saúde', emoji: '❤️' },
  { id: '6', nome: 'Moradia', emoji: '🏠' },
  { id: '7', nome: 'Apoio social', emoji: '🤝' },
];

export default function ExplorarScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('1');

  return (
    <View style={styles.container}>
      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar campanhas, ONGs ou causas..." 
          placeholderTextColor="#999"
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Explore por categoria</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {categorias.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={[styles.categoryChip, categoriaAtiva === cat.id && styles.categoryChipActive]}
            onPress={() => setCategoriaAtiva(cat.id)}
          >
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <Text style={[styles.categoryText, categoriaAtiva === cat.id && styles.categoryTextActive]}>{cat.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filtros de Localização */}
      <View style={styles.filterContainer}>
        <View style={styles.locationInputContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <TextInput 
            style={styles.locationInput} 
            placeholder="Localização (Ex: São Paulo)" 
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.clearFilterText}>↺ Limpar filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Área de Resultados (placeholder) */}
      <View style={styles.resultsArea}>
         <Text style={styles.resultsText}>Nenhuma campanha encontrada para os filtros selecionados.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', margin: 16, borderRadius: 12, paddingHorizontal: 16 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 15, color: '#333' },
  searchIcon: { fontSize: 18, color: '#999' },
  
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 16, marginBottom: 12 },
  categoriesScroll: { marginBottom: 20, maxHeight: 50 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, marginRight: 10 },
  categoryChipActive: { backgroundColor: '#FFF1EB', borderColor: '#E85D2A' },
  categoryEmoji: { marginRight: 6, fontSize: 16 },
  categoryText: { fontSize: 14, color: '#666', fontWeight: '500' },
  categoryTextActive: { color: '#E85D2A', fontWeight: 'bold' },

  filterContainer: { paddingHorizontal: 16, marginBottom: 20 },
  locationInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEE', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  locationIcon: { marginRight: 8 },
  locationInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#333' },
  clearFilterText: { color: '#E85D2A', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },

  resultsArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  resultsText: { color: '#999', textAlign: 'center' }
});