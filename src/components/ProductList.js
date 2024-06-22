import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para carregar os dados dos produtos da API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const navigateToDetails = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)} style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductList;
