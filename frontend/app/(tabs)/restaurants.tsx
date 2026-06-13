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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://unclasp-deceiving-skimming.ngrok-free.dev/api/restaurants', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#15803d" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>God dag! 👋</Text>
        <Text style={styles.title}>Hvad har du lyst til?</Text>
      </View>

      {/* Søgefelt */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Søg restaurant eller kategori..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/menu', params: { restaurantId: item.id, restaurantName: item.name } })}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            {!item.open && (
              <View style={styles.closedOverlay}>
                <Text style={styles.closedOverlayText}>Lukket</Text>
              </View>
            )}
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={[styles.badge, item.open ? styles.badgeOpen : styles.badgeClosed]}>
                  <Text style={[styles.badgeText, item.open ? styles.badgeTextOpen : styles.badgeTextClosed]}>
                    {item.open ? 'Åben' : 'Lukket'}
                  </Text>
                </View>
              </View>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.address}>📍 {item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, backgroundColor: '#15803d', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, paddingBottom: 24 },
  greeting: { fontSize: 14, color: '#bbf7d0', marginBottom: 4 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 20, marginVertical: 16, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#86efac', shadowColor: '#15803d', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#111827' },
  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  image: { width: '100%', height: 180 },
  closedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', height: 180, alignItems: 'center', justifyContent: 'center' },
  closedOverlayText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  info: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 18, fontWeight: '700', color: '#111827' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeOpen: { backgroundColor: '#DCFCE7' },
  badgeClosed: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgeTextOpen: { color: '#15803d' },
  badgeTextClosed: { color: '#dc2626' },
  category: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  address: { fontSize: 13, color: '#9CA3AF' },
});