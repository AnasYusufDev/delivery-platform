import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

// Constants
const API_BASE_URL = 'https://unclasp-deceiving-skimming.ngrok-free.dev';
const API_HEADERS = { 'ngrok-skip-browser-warning': 'true' };

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function MenuScreen() {
  const { restaurantId, restaurantName } = useLocalSearchParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu/${restaurantId}`, {
        headers: API_HEADERS,
      });
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const handleViewCart = () => {
    router.push({
      pathname: '/cart',
      params: {
        cartItems: JSON.stringify(cart),
        restaurantId: restaurantId,
      },
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#15803d" />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#dc2626', fontSize: 16 }}>
          Could not load menu. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Tilbage</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{restaurantName}</Text>
      </View>

      {/* Menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>🍽️</Text>
              </View>
            )}
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>{item.price} kr</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Cart button */}
      {cartCount > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={handleViewCart}>
          <Text style={styles.cartButtonText}>🛒 Se kurv ({cartCount})</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  header: { backgroundColor: '#15803d', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backText: { fontSize: 16, color: '#bbf7d0', fontWeight: '500', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  image: { width: 75, height: 75, borderRadius: 12 },
  imagePlaceholder: { width: 75, height: 75, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  imagePlaceholderText: { fontSize: 28 },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  description: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  category: { fontSize: 12, color: '#15803d', fontWeight: '500' },
  right: { alignItems: 'center', gap: 8 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#15803d' },
  addButton: { backgroundColor: '#15803d', borderRadius: 20, width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  cartButton: { position: 'absolute', bottom: 24, left: 20, right: 20, backgroundColor: '#15803d', borderRadius: 16, padding: 18, alignItems: 'center', shadowColor: '#15803d', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  cartButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});