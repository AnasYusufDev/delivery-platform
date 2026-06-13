import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState, useRef } from 'react';
import { Text, StyleSheet, Animated, Platform } from 'react-native';

if (Platform.OS !== 'web') {
  require('react-native-reanimated');
}

export const unstable_settings = {
  anchor: 'login',
};

function SplashScreen({ onDone }: { onDone: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 900,
          duration: 600,
          useNativeDriver: Platform.OS !== 'web',
        }).start(() => onDone());
      }, 1000);
    });
  }, []);

  return (
    <Animated.View style={[styles.splash, { transform: [{ translateY: slideAnim }] }]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
        <Text style={styles.logoText}>
          <Text style={styles.logoGreen}>All</Text>
          <Text style={styles.logoWhite}> Eats</Text>
        </Text>
        <Text style={styles.tagline}>Mad leveret med hjerte 🇩🇰</Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="next" options={{ headerShown: false }} />
        <Stack.Screen name="menu" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="orderconfirmation" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoGreen: {
    color: '#ffffff',
  },
  logoWhite: {
    color: '#ffffff',
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.85,
  },
});