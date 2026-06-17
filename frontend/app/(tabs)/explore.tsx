import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

// Note: User data is currently hardcoded for demo purposes
const MOCK_USER = {
  name: 'Anas Yusuf',
  email: 'anas@email.com',
  phone: '+45 12 34 56 78',
  initials: 'A',
};

const MOCK_ORDERS = [
  {
    id: '1',
    itemName: 'Classic Burger',
    restaurant: 'Burger House',
    price: '89 kr',
    status: '✅ Leveret',
  },
];

export default function ProfileScreen() {

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{MOCK_USER.initials}</Text>
          </View>
          <Text style={styles.name}>{MOCK_USER.name}</Text>
          <Text style={styles.email}>{MOCK_USER.email}</Text>
        </View>

        {/* User info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mine oplysninger</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Navn</Text>
            <Text style={styles.value}>{MOCK_USER.name}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{MOCK_USER.email}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Telefon</Text>
            <Text style={styles.value}>{MOCK_USER.phone}</Text>
          </View>
        </View>

        {/* Order history */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seneste ordrer</Text>
          {MOCK_ORDERS.map(order => (
            <View key={order.id} style={styles.card}>
              <Text style={styles.orderName}>{order.itemName}</Text>
              <Text style={styles.orderDetails}>{order.restaurant} • {order.price}</Text>
              <Text style={styles.orderStatus}>{order.status}</Text>
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log ud</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  header: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#15803d', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#15803d' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  email: { fontSize: 14, color: '#bbf7d0' },
  section: { padding: 16, marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  label: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  value: { fontSize: 15, fontWeight: '500', color: '#111827' },
  orderName: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 4 },
  orderDetails: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  orderStatus: { fontSize: 13, color: '#15803d' },
  logoutButton: { margin: 16, backgroundColor: '#15803d', borderRadius: 12, padding: 16, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});