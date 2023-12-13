import React, { useState, useEffect } from 'react';
import { StatusBar, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const LoginPageScreen = () => {
  //location
  const currentLocation = 'Orchard, Singapore';
  // State variables to manage the modal and input values
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show/hide password
  };

  const [usernameError, setUsernameError] = useState(false); // State to control username error
  const [passwordError, setPasswordError] = useState(false); // State to control password error

  const handleLogin = () => {
    // Existing login logic...

    // Replace this logic with the provided code for role-based navigation
    // Logic for handling login...
    console.log('Username:', username);
    console.log('Password:', password);
    
    // Replace this logic with your actual authentication logic
    // For demonstration purposes, let's assume roles are hardcoded after successful login
    //-----const userRole = 'system_admin'; // Replace this with logic to determine the user's role
    
    // Redirect based on the user's role...
    switch (username.toLowerCase()) {
      case 'sa':
        navigation.navigate('System Admin');
        break;
      case 'bo':
        navigation.navigate('Business Owner');
        break;
      case 'lol':
        navigation.navigate('LOL');
        break;
      case 'nu':
        navigation.navigate('Normal User');
        break;
      default:
        setErrorText('Invalid username'); // Show error if username doesn't match simulated roles
        setUsernameError(true); // Set error state to true for invalid username
        break;
    }

    if (password.toLowerCase() !== 'password') {
      setPasswordError(true); // Set password error state to true for incorrect password
    }
  };

  useEffect(() => {
    if (usernameError || passwordError) {
      // Clear error states after 30 seconds
      const timer = setTimeout(() => {
        setUsernameError(false);
        setPasswordError(false);
      }, 4000); // 40 seconds

      return () => clearTimeout(timer);
    }
  }, [usernameError, passwordError]);

  const handleResetPassword = () => {
      navigation.navigate('Forget Password'); // Navigate to SignUp screen on button press
  };

  const navigation = useNavigation(); // Initialize the navigation object
  //Signup press
  const handleSignUpPress = () => {
    navigation.navigate('Sign Up'); // Navigate to SignUp screen on button press
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={20} color="#FF5733" />
          <Text style={styles.headerText}> {currentLocation}</Text>
        </View>
        <View style={styles.loginContainer}>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />
          <View style={styles.inputContainer}>
            <TextInput
            style={[
              styles.input,
              { color: '#000', borderColor: passwordError || usernameError ? 'red' : '#C4C4C4' },
            ]}              
              placeholder="User Name or Email"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <View style={[
                styles.passwordInput,
                { borderColor: passwordError || usernameError ? 'red' : '#C4C4C4' },
              ]}>
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
            {(usernameError || passwordError) && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error" size={14} color="red" />
                <Text style={styles.errorText}>Wrong Username or Password</Text>
              </View>
            )}


            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={toggleRememberMe} style={styles.rememberMeContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: rememberMe ? '#ABAAAA' : '#F4F4F4',
                      borderWidth: rememberMe ? 0 : 1,
                    },
                  ]}
                >
                  {rememberMe && (
                    <MaterialIcons name="check" size={12} color="#FFF" />
                  )}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleResetPassword}>
                <Text style={styles.forgetText}>Forget Password?</Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            
          </View>
        </View>

        <View style={styles.orLoginWith}>
        <View style={styles.loginLine}>
          <View style={styles.line} />
            <Text style={styles.orText}>Or Login with</Text>
          <View style={styles.line} />
        </View>
            <View style={styles.socialIcons}>
              <TouchableOpacity> 
                <Image
                  source={require('../assets/google-social.png')}
                  style={styles.socialImage}
                />
              </TouchableOpacity>
              <TouchableOpacity> 
                <Image
                  source={require('../assets/fb-social.png')}
                  style={styles.socialImage}
                />
              </TouchableOpacity>
              <TouchableOpacity> 
                <Image
                  source={require('../assets/x-social.png')}
                  style={styles.socialImage}
                />
              </TouchableOpacity>
            </View>
          </View>
            <TouchableOpacity onPress={handleSignUpPress}>
              <View style={styles.accountContainer}>
                <Text style={styles.dhaccountText}>Don’t have an account?  </Text>
                <Text style={styles.signUpText}>Sign up</Text>
              </View>
            </TouchableOpacity>

        <StatusBar style="auto" />
        <View style={styles.footer}>
          <View style={styles.footerImages}>
            <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
          </View>
          <Text>&copy; 2023 TripAid</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  //whole page
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 15,
  },
  //header
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  //footer
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
  //log in with google/fb/x
  orLoginWith: {
    alignItems: 'center',
    marginTop: 0,
  },
  orText: {
    color: '#7A7A7A',
    marginBottom: 0,
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
  //password container
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
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
  line: {
    height: 3,
    width: 101,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 10,
  },
  loginLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  dhaccountText: {
    fontSize: 13,
    color: '#434343',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 13,
    color: '#FB7E3C',
    marginTop: 20,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  bottomContainer: {
    // Styles for the bottom container
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rememberMeContainer: {
    // Styles for the Remember me container
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
    marginTop: 10,
  },
  checkbox: {
    // Styles for the checkbox
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    // Styles for the Remember text
    fontSize: 13,
    color: '#7A7A7A',
    marginRight: 40,
  },
  forgetText: {
    // Styles for the Forget text
    fontSize: 13,
    color: '#7A7A7A',
    marginTop: 10,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10, // Adjust this value for spacing from the top
  },
  inputContainer: {
    width: '80%',
    height: '30%',
    alignItems: 'center',
    borderColor: 'rgba(3, 13, 69, 0.1)',

  },
  input: {
    height: 60,
    width: 326,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1, // Sets the width of the outline
    borderColor: '#C4C4C4',
    backgroundColor: '#F7F7F7',
  },
  loginButton: {
    backgroundColor: '#030D45',
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 20,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
    fontSize: 11,
  }
});

export default LoginPageScreen;
