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
  TextInput,
} from 'react-native';
import { router } from 'expo-router';

type Restaurant = {
  id: number;
  name: string;
  description: string;
  address: string;
  category: string;
  open: boolean;
  imageUrl: string;
};

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filtered, setFiltered] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://unclasp-deceiving-skimming.ngrok-free.dev/api/restaurants', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const result = restaurants.filter(r =>
      r.name.toLowerCase().includes(text.toLowerCase()) ||
      r.category.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#c8102e" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restauranter</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Søg efter restaurant eller kategori..."
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/menu', params: { restaurantId: item.id, restaurantName: item.name } })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.address}>{item.address}</Text>
              <Text style={item.open ? styles.open : styles.closed}>
                {item.open ? '🟢 Åben' : '🔴 Lukket'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Ingen restauranter fundet</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  searchInput: { backgroundColor: '#F9FAFB', borderRadius: 10, padding: 12, fontSize: 15, color: '#111827', borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 },
  card: { backgroundColor: '#F9FAFB', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden' },
  image: { width: '100%', height: 160 },
  info: { padding: 16 },
  name: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 4 },
  category: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  address: { fontSize: 13, color: '#9CA3AF', marginBottom: 8 },
  open: { fontSize: 13, color: '#16a34a', fontWeight: '500' },
  closed: { fontSize: 13, color: '#c8102e', fontWeight: '500' },
  empty: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 40 },
});