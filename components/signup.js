import React from 'react';
import { useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

export default function SignUp({ navigation }) {

  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [verifyPassword, setVerifyPassword] = useState();

  const handleSignUp = () => {
    if (password == verifyPassword) {
      try {
        doCreateUserWithEmailAndPassword(email, password)
        console.log("User account created succesfully")
        /* Käyttäjälle pitäisi kertoa jollain tavalla, että tili on luotu onnistuneesti, ja että sillä voi nyt kirjautua sisään */
        navigation.navigate('Main')
      } catch (error) {
        // Firebase tarkastaa salasanan vahvuuden. Mikäli salasana ei ole riittävän vahva, pitää täst ilmoittaa käyttäjälle. Muutkin virheet olisi syytä näyttää
        console.error('Authentication error: ', error.message)
      }
    } else {
      // Salasanat eivät täsmää
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#b33939', '#4B0082']} // TAUSTA VÄRIN LAITTO GRADIENTILLA
        style={styles.container}
      >
        <Text style={styles.title}>Demo</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassWord}
            secureTextEntry={true}
          />
          <Text style={styles.label}>Verify Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Verify password"
            value={verifyPassword}
            onChangeText={setVerifyPassword}
            secureTextEntry={true}
          />
        </View>
        <View>
          {/* CREATE ACCOUNT NAPPI GRADIENTILLA */}
          <TouchableOpacity
            onPress={handleSignUp}
            style={{ width: '100%' }}
          >
            <LinearGradient
              colors={['#8A2BE2', '#DA70D6']}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
    textShadowColor: '#000000',
    textShadowOffset: { width: -4, height: 2 },
    textShadowRadius: 1,
    marginTop: -200,
  },
  form: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: -4, height: 2 },
    textShadowRadius: 1,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  button: {
    width: '100%',
    marginVertical: 20,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#8a2be2',
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
  },
});