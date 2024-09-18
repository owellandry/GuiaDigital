import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomNavBar from './BottomNavBar';

const mockPromotions = [
  { id: '1', title: 'Promoción 1', details: 'Detalles de la promoción 1' },
  { id: '2', title: 'Promoción 2', details: 'Detalles de la promoción 2' },
  { id: '3', title: 'Promoción 3', details: 'Detalles de la promoción 3' },
  // Agrega más promociones aquí
];

const Promotions: React.FC = () => {
  const renderPromotion = ({ item }: { item: { title: string; details: string } }) => (
    <TouchableOpacity style={styles.promotionContainer}>
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionDetails}>{item.details}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Promociones</Text>
      <FlatList
        data={mockPromotions}
        renderItem={renderPromotion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  list: {
    paddingHorizontal: 20,
  },
  promotionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  promotionDetails: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default Promotions;
