import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const ChangePasswordScreen = () => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        let locationData = await Location.getCurrentPositionAsync({});
        setLocation(locationData);

        let address = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });
        
        // Extract relevant information (street name and country)
        const street = address[0]?.name || '';
        const country = address[0]?.country || '';
        
        // Set the location state with the obtained information
        setCurrentLocation(`${street}, ${country}`);
        
      } catch (error) {
        console.error('Error fetching location:', error.message);
        // Handle the error as needed
      }
    };

    fetchLocation();
  }, []); // Empty dependency array to run the effect only once

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigation = useNavigation(); // Initialize the navigation object

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError('The password you entered don’t match');
      return;
    }

    // Perform signup logic here
    // Reset the error message after successful signup or other operations
    setError('');
    // Proceed with signup or other actions
 
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Navigate to RegistrationSuccessScreen on successful signup
    navigation.navigate('Password Successfully Changed');
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
        <View style={styles.signupContainer}>
          <Image source={require('../assets/LOGO.png')} style={styles.logo} />

          <Text style={styles.forgetpwText}>Forget Password</Text>

          <Text style={styles.enterText}>Enter New Password</Text>

          <View style={
                styles.passwordInput
                }>
              <TextInput
              style={[
                styles.passwordTextInput,
                { color: '#000' }
              ]}
                placeholder="Enter New Password"
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

            <Text style={styles.enterText}>Confirm New Password</Text>

          <TextInput
            style={[
                styles.input, 
                { borderColor: error ? 'red' : '#C4C4C4' },
            ]}
            placeholder="Confirm New Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showPassword}
          />
          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        
        </View>

        <View style={styles.footer}>
          <View style={styles.footerImages}>
            <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
          </View>
          <Text>&copy; 2024 TripAid</Text>
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
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 60,
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
  forgetpwText: {
      color: '#FB7E3C',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
  },
  enterText:{
    color: '#434343',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 35,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
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
  submitButton: {
    backgroundColor: '#FB7E3C',
    borderRadius: 5,
    height: 50,
    width: 320,
    marginTop: 60,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
