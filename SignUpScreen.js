import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpScreen = (SignUpScreen) => {
  // remove console.log("App executed");
  console.log("App executed");

  return (
    <LinearGradient
      colors={['#4093CE', '#90CEF3']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.signupContainer}>
          <Text style={styles.signupTitle}>Registration</Text>
        </View>
        <StatusBar style="auto" />
      </View>
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
  signupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30, // Adjust this value for spacing from the top
  },
  signupTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30, // Add spacing between title and content
    textAlign: 'center', // Center the text
    marginTop: -5, // Adjust this value to move the title higher
  },
  signupText: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});

export default SignUpScreen;