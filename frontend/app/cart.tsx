import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CartScreen() {
  const { cartItems, restaurantId } = useLocalSearchParams();
  const items: CartItem[] = cartItems ? JSON.parse(cartItems as string) : [];
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://unclasp-deceiving-skimming.ngrok-free.dev/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          totalPrice: total,
          restaurant: { id: restaurantId }
        })
      });

      if (response.ok) {
        router.replace({
          pathname: '/orderconfirmation',
          params: { total: total, restaurantName: restaurantId }
        });
      }
    } catch (err) {
      Alert.alert('Fejl', 'Noget gik galt. Prøv igen.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Tilbage</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Din kurv 🛒</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.empty}>Kurven er tom</Text>
          <Text style={styles.emptySubtext}>Tilføj nogle lækre retter!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardLeft}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.quantity}>Antal: {item.quantity}</Text>
                </View>
                <Text style={styles.price}>{item.price * item.quantity} kr</Text>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalText}>{total} kr</Text>
            </View>
            <TouchableOpacity style={styles.orderButton} onPress={placeOrder} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.orderButtonText}>Bestil nu 🍽️</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  header: { backgroundColor: '#15803d', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backText: { fontSize: 16, color: '#bbf7d0', fontWeight: '500', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  empty: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#6B7280' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  cardLeft: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 },
  quantity: { fontSize: 13, color: '#6B7280' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#15803d' },
  totalContainer: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  totalText: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  orderButton: { backgroundColor: '#15803d', borderRadius: 16, padding: 18, alignItems: 'center', shadowColor: '#15803d', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  orderButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});