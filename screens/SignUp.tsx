import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { auth } from "../config/firebase";  // Importation de l'instance Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";  // Importation de la fonction pour créer un utilisateur

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }
        try {
            // Création d'un nouvel utilisateur avec email et mot de passe
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Account created successfully!");
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
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
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
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#bbb"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        returnKeyType="done"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        placeholderTextColor="#bbb"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        returnKeyType="done"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
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
