import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

// Constants
const RESTAURANTS_ROUTE = '/(tabs)/restaurants' as const;
const DELIVERY_TIME = '30-45 min';

export default function OrderConfirmationScreen() {
  const { total } = useLocalSearchParams();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    playEntranceAnimation();
  }, []);

  const playEntranceAnimation = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBackToHome = () => {
    router.replace(RESTAURANTS_ROUTE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Success icon */}
        <Text style={styles.emoji}>🎉</Text>

        {/* Title */}
        <Text style={styles.title}>Bestilling modtaget!</Text>
        <Text style={styles.subtitle}>Din ordre er på vej.</Text>

        {/* Total */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total betalt</Text>
          <Text style={styles.cardPrice}>{total} kr</Text>
        </View>

        {/* Delivery time */}
        <Text style={styles.info}>
          Estimeret leveringstid: {DELIVERY_TIME} 🚴
        </Text>

        {/* Back to home */}
        <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
          <Text style={styles.buttonText}>Tilbage til forsiden</Text>
        </TouchableOpacity>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 80, marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  card: { backgroundColor: '#DCFCE7', borderRadius: 16, padding: 24, width: '100%', alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#86efac' },
  cardLabel: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  cardPrice: { fontSize: 36, fontWeight: 'bold', color: '#15803d' },
  info: { fontSize: 14, color: '#6B7280', marginBottom: 40 },
  button: { backgroundColor: '#15803d', borderRadius: 16, padding: 18, width: '100%', alignItems: 'center', shadowColor: '#15803d', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});