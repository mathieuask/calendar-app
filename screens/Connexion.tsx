import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Vérification de l'état de l'utilisateur dès le démarrage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // Si l'utilisateur est connecté, on le redirige vers Home
        navigation.navigate("Home");
      }
    });

    return unsubscribe; // Désinscription à l'écoute lorsque le composant est démonté
  }, [navigation]); // Ajout de navigation comme dépendance

  
  const validateForm = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Une fois l'utilisateur connecté, on le redirige vers Home
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Calendar.AI</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Input Fields and Button Section */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            accessibilityLabel="Email Address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              accessibilityLabel="Password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Don't have an account? <Text style={styles.boldLink}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  headerContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#888",
    textAlign: "left",
    marginBottom: 30,
  },
  form: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#444",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 18,
    top: 18,
  },
  button: {
    backgroundColor: "#0f0",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#0f0",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerLink: {
    marginVertical: 8,
  },
  link: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  boldLink: {
    fontWeight: "bold",
  },
});
