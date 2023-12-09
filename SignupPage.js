import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const SignUpScreen = () => {
  const currentLocation = 'Orchard, Singapore';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigation = useNavigation(); // Initialize the navigation object

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError('The password you entered don’t match');
      return;
    }

    // Perform signup logic here
    // ...

    // Reset the error message after successful signup or other operations
    setError('');
    // Proceed with signup or other actions
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Phone Number:', phone);

    // Navigate to RegistrationSuccessScreen on successful signup
    navigation.navigate('Registration');
  };

  const handleSignInPress = () => {
    navigation.navigate('Log In'); // Navigate to SignUp screen on button press
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.signupContainer}>
          <Image source={require('./assets/LOGO.png')} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <View style={
                styles.passwordInput
                }>
              <TextInput
              style={[
                styles.passwordTextInput,
                { color: '#000' }
              ]}
                placeholder="Enter Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="#ABAAAA"
                />
              </TouchableOpacity>
            </View>

          <TextInput
            style={[
                styles.input, 
                { borderColor: error ? 'red' : '#C4C4C4' },
            ]}
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showPassword}
          />
          {error !== '' && <Text style={styles.errorText}>{error}</Text>}


          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
          
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignInPress}>
              <View style={styles.accountContainer}>
                <Text style={styles.haccountText}>Already have an account?  </Text>
                <Text style={styles.signInText}>Sign In</Text>
              </View>
          </TouchableOpacity>
        
        </View>
      </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerImages}>
            <Image source={require('./assets/HILTON.jpg')} style={styles.footerImageHilton} />
            <View style={styles.spacerfooter} />
            <Image source={require('./assets/SIA.jpg')} style={styles.footerImageSIA} />
            <View style={styles.spacerfooter} />
            <Image source={require('./assets/GBB.jpg')} style={styles.footerImageGBB} />
          </View>
          <Text>&copy; 2023 TripAid</Text>
        </View>
        
    <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: 15,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 14,
      color: '#6A778B',
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    footerImages: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    footerImageHilton: {
      width: 53.84,
      height: 20,
      resizeMode: 'cover',
    },
    footerImageSIA: {
      width: 195.03,
      height: 20,
      resizeMode: 'cover',
      marginLeft: 17,
      marginRight: 17,
    },
    footerImageGBB: {
      width: 50,
      height: 47,
      resizeMode: 'cover',
    },


  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  signupTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    height: 60,
    width: 326,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1, // Sets the width of the outline
    borderColor: '#C4C4C4',
    backgroundColor: '#F7F7F7',
  },
  //password container
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    height: 60,
    width: 326,
  },
  passwordTextInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#ABAAAA',
  },
  eyeIcon: {
    padding: 10,
  },

  signupButton: {
    backgroundColor: '#FB7E3C',
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
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

  haccountText: {
    fontSize: 13,
    color: '#434343',
    marginTop: 20,
  },
  signInText: {
    fontSize: 13,
    color: '#FB7E3C',
    marginTop: 20,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
