import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';  // Importer la navigation
import { auth } from "../config/firebase";  // Importation de l'instance auth
import { sendPasswordResetEmail } from "firebase/auth";  // Importer la fonction pour envoyer le lien de réinitialisation

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();  // Initialiser la navigation

  const handleResetPassword = async () => {
    try {
      // Envoi du lien de réinitialisation de mot de passe
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Check your email for the reset link!✅");
      navigation.goBack();  // Rediriger vers la page de connexion
    } catch (error: any) {
      Alert.alert("Error", error?.message || "An error occurred");
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
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Enter your email to reset your password</Text>
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
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerLink} onPress={() => navigation.goBack()}>  
            <Text style={styles.link}>Back to Login</Text>
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
    backgroundColor: "#000", // Fond noir
  },
  headerContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 40, // Plus grand
    fontWeight: "bold",
    color: "#fff", // Titre en blanc
    textAlign: "left",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#888", // Texte gris
    textAlign: "left",
    marginBottom: 30,
  },
  form: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20, // Espace réduit avec le footer
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
    borderColor: "#444", // Contour foncé
  },
  button: {
    backgroundColor: "#0f0", // Bouton vert
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#0f0", // Ombre verte
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12, // Pour Android
  },
  buttonText: {
    color: "#000", // Texte noir
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
    color: "#fff", // Liens blancs
    fontSize: 16,
    fontWeight: "500",
  },
  backButton: {
    position: "absolute",
    top: 50, // Ajuste selon l'affichage
    left: 20,
    zIndex: 10,
  },
});
