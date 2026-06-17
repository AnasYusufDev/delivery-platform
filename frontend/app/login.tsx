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
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Constants
const RESTAURANTS_ROUTE = '/(tabs)/restaurants' as const;
const MIN_PHONE_LENGTH = 8;

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const [, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '811079976207-38tkf94k0cl010r7onjqu01unguhn8mg.apps.googleusercontent.com',
    webClientId: '811079976207-8ovpih9jv8fal5v3olonp95nuje3hf5s.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      router.push(RESTAURANTS_ROUTE);
    }
  }, [response]);

  const isPhoneValid = phoneNumber.length >= MIN_PHONE_LENGTH;

  const handleContinue = () => {
    router.push(RESTAURANTS_ROUTE);
  };

  const handleGoogleLogin = () => {
    promptAsync({ useProxy: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.header}>
            <Text style={styles.logo}>
              <Text style={styles.logoGreen}>All</Text>
              <Text style={styles.logoBlack}> Eats</Text>
            </Text>
            <Text style={styles.tagline}>Mad leveret med hjerte 🇩🇰</Text>
          </View>

          {/* Impact message */}
          <View style={styles.impactContainer}>
            <Text style={styles.impactEmoji}>🌱</Text>
            <Text style={styles.impactText}>
              <Text style={styles.impactBold}>Hver ordre tæller. </Text>
              Vi donerer et måltid til en dansk familie for hver bestilling.
            </Text>
          </View>

          {/* Phone input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Telefonnummer</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇩🇰</Text>
                <Text style={styles.prefix}>+45</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="12 34 56 78"
                keyboardType="phone-pad"
                maxLength={10}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Continue button */}
          <TouchableOpacity
            style={[styles.continueButton, !isPhoneValid && styles.continueButtonDisabled]}
            disabled={!isPhoneValid}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Fortsæt</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>eller</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google login */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Fortsæt med Google</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            Ved at fortsætte accepterer du vores{' '}
            <Text style={styles.termsLink}>Betingelser</Text>
            {' '}og{' '}
            <Text style={styles.termsLink}>Privatlivspolitik</Text>
          </Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0FDF4' },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 52, fontWeight: 'bold', marginBottom: 8 },
  logoGreen: { color: '#15803d' },
  logoBlack: { color: '#111827' },
  tagline: { fontSize: 16, color: '#6B7280' },
  impactContainer: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 32, borderWidth: 1, borderColor: '#86efac', gap: 12 },
  impactEmoji: { fontSize: 24 },
  impactText: { flex: 1, fontSize: 14, color: '#1F2937', lineHeight: 20 },
  impactBold: { fontWeight: '700', color: '#15803d' },
  inputSection: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 12 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#86efac' },
  flag: { fontSize: 16 },
  prefix: { fontSize: 16, fontWeight: '500', color: '#111827' },
  phoneInput: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#86efac', fontSize: 16, color: '#111827' },
  continueButton: { width: '100%', paddingVertical: 18, backgroundColor: '#15803d', borderRadius: 14, alignItems: 'center', marginBottom: 20, shadowColor: '#15803d', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  continueButtonDisabled: { backgroundColor: '#111827', shadowOpacity: 0 },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { paddingHorizontal: 16, fontSize: 14, color: '#6B7280' },
  googleButton: { width: '100%', paddingVertical: 14, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#E5E7EB', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 },
  googleIcon: { fontSize: 20, fontWeight: 'bold' },
  googleButtonText: { color: '#111827', fontSize: 15, fontWeight: '500' },
  termsText: { fontSize: 12, color: '#6B7280', textAlign: 'center', lineHeight: 18 },
  termsLink: { color: '#15803d', textDecorationLine: 'underline' },
});