import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { AuthContext } from '../navigation';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/side-icon.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email input"
        accessibilityHint="Enter your email address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password input"
        accessibilityHint="Enter your password"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity 
        style={styles.button} 
        onPress={async () => {
          if (!email || !password) {
            setError("Please fill in both email and password");
            return;
          }
          if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address (e.g., user@example.com)");
            return;
          }
          if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
          }

          setLoading(true);
          setError("");

          try {
            // Replace with your actual authentication API endpoint
            const response = await fetch('https://your-api.com/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password
              })
            });

            const data = await response.json();

            if (response.ok) {
            // Use authContext to sign in
            const { signIn } = useContext(AuthContext);
            signIn(data.token);

            } else {
              setError(data.message || 'Login failed. Please try again.');
            }
          } catch (err) {
            setError('Network error. Please check your connection.');
          } finally {
            setLoading(false);
          }
        }}

        accessibilityRole="button"
        accessibilityLabel="Login button"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}

      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate("Signup")}
        accessibilityRole="button"
        accessibilityLabel="Sign up navigation"
      >
        <Text style={styles.switchText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: "70%",
    height: 50,
    backgroundColor: "rgba(19, 65, 105, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    fontSize: 16,
    color: "#007bff",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 0,
    marginBottom: 100,
    resizeMode: 'contain',
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginScreen;
