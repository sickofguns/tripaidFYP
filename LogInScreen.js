import React, { useState } from 'react';
import { StatusBar, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LogInScreen = () => {
  // State variables to manage the modal and input values
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

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
        break;
    }
  };

  const handleResetPassword = () => {
    console.log('Username:', username);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
  
    // Add your password reset logic here (without validation)
  
    // Close the modal after resetting the password
    setModalVisible(false);
  };

  const navigation = useNavigation(); // Initialize the navigation object
  //Signup press
  const handleSignUpPress = () => {
    navigation.navigate('Registration'); // Navigate to SignUp screen on button press
  };

  return (
    <LinearGradient
      colors={['#4093CE', '#90CEF3']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Welcome Back</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username (Enter your email)                "
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password                                                "
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.linkText}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.linkText}>No account? Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>

      {/* Modal for password reset */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <Text style={styles.errorText}>{errorText}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Username (Enter your email)                          "
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="New Password                                                 "
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
                secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Confirm New Password                                   "
                onChangeText={(text) => setConfirmNewPassword(text)}
                value={confirmNewPassword}
                secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state on press
              >
                <Text style={styles.showHideText}>
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleResetPassword}>
              <Text style={styles.modalButtonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

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
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30, // Adjust this value for spacing from the top
  },
  loginTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30, // Add spacing between title and content
    textAlign: 'center', // Center the text
    marginTop: -5, // Adjust this value to move the title higher
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#4093CE',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 20,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#4093CE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LogInScreen;
