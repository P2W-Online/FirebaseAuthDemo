import React, { useContext }from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/authContext';
import { doSignOut } from '../firebase/auth';

export default function Main({ navigation }) {
  const { userLoggedIn, currentUser } = useContext(AuthContext)
  const logout = () => {
    doSignOut()
    navigation.navigate('Main')
  }
  return (
    <LinearGradient
      colors={['#b33939', '#4B0082']} // TAUSTA VÄRIN LAITTO GRADIENTILLA
      style={styles.container}
    >
      <Text style={styles.title}>Demo</Text>
      <View style={styles.buttonContainer}>
        {!userLoggedIn ? (
          <>
            {/* LOG IN NAPPI GRADIENTILLA */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{ width: '100%' }}
            >
              <LinearGradient
                colors={['#8A2BE2', '#DA70D6']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* SIGNIN NAPPI GRADIENTILLA */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Sign')}
              style={{ width: '100%' }}
            >
              <LinearGradient
                colors={['#8A2BE2', '#DA70D6']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <>
          <Text style={styles.label}>{currentUser.email}</Text>
            <TouchableOpacity
              onPress={logout}
              style={{ width: '100%' }}
            >
              <LinearGradient
                colors={['#8A2BE2', '#DA70D6']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Log Out</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b33939',
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
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,

  },
  button: {
    width: '100%',
    marginVertical: 10,
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
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: -4, height: 2 },
    textShadowRadius: 1,
    alignSelf: 'flex-start',
  }
});