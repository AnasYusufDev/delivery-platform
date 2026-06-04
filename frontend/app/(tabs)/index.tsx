import { Link } from "expo-router";
import { router } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '811079976207-38tkf94k0cl010r7onjqu01unguhn8mg.apps.googleusercontent.com',
    webClientId: '811079976207-8ovpih9jv8fal5v3olonp95nuje3hf5s.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      router.push("/next");
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              <Text style={styles.logoRed}>All</Text>
              <Text style={styles.logoBlack}> Eats</Text>
            </Text>
            <Text style={styles.subtitle}>
              Del et måltid med en{'\n'}familie i Danmark
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1766592817657-fc61d166f06f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjByZXN0YXVyYW50JTIwbWVhbHxlbnwxfHx8fDE3NzQ0NDEwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080' }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.impactContainer}>
            <Text style={styles.impactText}>
              <Text style={styles.impactBold}>Hver ordre tæller.</Text> Vi donerer et måltid til en dansk familie for hver bestilling.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Telefonnummer</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇩🇰</Text>
                <Text style={styles.prefix}>+45</Text>
              </View>
              <TextInput
                style={[styles.phoneInput, Platform.OS === 'web' && styles.phoneInputWeb]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="12 34 56 78"
                keyboardType="phone-pad"
                maxLength={10}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <Link href="/next" asChild>
            <TouchableOpacity
              style={[styles.continueButton, phoneNumber.length < 8 && styles.continueButtonDisabled]}
              disabled={phoneNumber.length < 8}
            >
              <Text style={[styles.continueButtonText, phoneNumber.length < 8 && styles.continueButtonTextDisabled]}>
                Fortsæt
              </Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>eller</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync({ useProxy: true })}>
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.googleButtonText}>Fortsæt med Google</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            Ved at fortsætte accepterer du vores{' '}
            <Text style={styles.termsLink}>Betingelser</Text>
            {' '}og{' '}
            <Text style={styles.termsLink}>Privatlivspolitik</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: '#111827' },
  content: { flex: 1, paddingHorizontal: 24 },
  logoContainer: { marginBottom: 32, marginTop: 8 },
  logoText: { fontSize: 48, fontWeight: 'bold', marginBottom: 12 },
  logoRed: { color: '#c8102e' },
  logoBlack: { color: '#111827' },
  subtitle: { fontSize: 16, color: '#374151', lineHeight: 24 },
  imageContainer: { width: '100%', height: 224, marginBottom: 32, borderRadius: 8, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  impactContainer: { marginBottom: 32, padding: 16, backgroundColor: '#FEF2F2', borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#c8102e' },
  impactText: { fontSize: 14, color: '#1F2937', lineHeight: 20 },
  impactBold: { fontWeight: '600', color: '#c8102e' },
  inputSection: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', color: '#1F2937', marginBottom: 12 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#F9FAFB', borderRadius: 8, borderWidth: 2, borderColor: '#E5E7EB' },
  flag: { fontSize: 16 },
  prefix: { fontSize: 16, fontWeight: '500', color: '#111827' },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#111827',
  },
  phoneInputWeb: {
    // @ts-ignore
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  continueButton: { width: '100%', paddingVertical: 16, backgroundColor: '#c8102e', borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  continueButtonDisabled: { backgroundColor: '#E5E7EB' },
  continueButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  continueButtonTextDisabled: { color: '#9CA3AF' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { paddingHorizontal: 16, fontSize: 14, color: '#6B7280' },
  socialButtons: { gap: 12, marginBottom: 32 },
  googleButton: { width: '100%', paddingVertical: 14, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 2, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  googleIcon: { fontSize: 20, fontWeight: 'bold' },
  googleButtonText: { color: '#111827', fontSize: 15, fontWeight: '500' },
  termsText: { fontSize: 12, color: '#6B7280', textAlign: 'center', lineHeight: 18, marginBottom: 24 },
  termsLink: { color: '#c8102e', textDecorationLine: 'underline' },
});