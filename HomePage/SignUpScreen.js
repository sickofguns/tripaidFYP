import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigation = useNavigation(); // Initialize the navigation object

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Perform signup logic here
    // ...

    // Reset the error message after successful signup or other operations
    setError('');
    // Proceed with signup or other actions
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Navigate to RegistrationSuccessScreen on successful signup
    navigation.navigate('Registration');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  return (
    <LinearGradient colors={['#4093CE', '#90CEF3']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.signupContainer}>
          <Text style={styles.signupTitle}>Create an Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showPassword}
          />
          <View style={styles.showPasswordContainer}>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide Password' : 'Show Password'}
              </Text>
            </TouchableOpacity>
          </View>
          {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.orSignUpWith}>
            <Text style={styles.orText}>Or sign up with</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}> 
                <Image
                  source={require('../assets/google-social.png')}
                  style={styles.socialImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}> 
                <Image
                  source={require('../assets/fb-social.png')}
                  style={styles.socialImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}> 
                <Image
                  source={require('../assets/x-social.png')}
                  style={styles.socialImage}
                />
              </TouchableOpacity>
              {/* Add other social images similarly */}
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  signupTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    width: 250, // Set a fixed width in pixels
    height: 40,
    backgroundColor: '#FFF',
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signupButton: {
    backgroundColor: '#283372',
    padding: 10,
    borderRadius: 5,
    marginTop: 25,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  showPasswordContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  },
  showPasswordText: {
    color: '#283372',
  },
  orSignUpWith: {
    alignItems: 'center',
    marginTop: 235,
  },
  orText: {
    color: '#283372',
    marginBottom: 15,
  },
  socialImage: {
    width: 30, // Adjust width and height according to your design
    height: 30,
    marginHorizontal: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

export default SignUpScreen;
