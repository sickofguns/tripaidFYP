import React from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const SystemAdminScreen = () => {
  console.log("App executed");

  const navigation = useNavigation();
  
    // Handle button press to navigate to InsightScreen
    const navigateToInsight = () => {
      navigation.navigate('Insight');
    };
  
    // Handle button press to navigate to BusinessCategoryScreen
    const navigateToBusinessCategory = () => {
      navigation.navigate('Business Category');
    };
  
    // Handle button press to navigate to SearchUserScreen
    const navigateToSearchUser = () => {
      navigation.navigate('Search User');
    };
  

  return (
    <LinearGradient
      colors={['#CE8440', '#F3B490']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.saTitle}>Welcome</Text>
          <Text style={styles.saTitle}>System Admin</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToInsight}>
            <Text style={styles.buttonText}>View Insight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToBusinessCategory}>
            <Text style={styles.buttonText}>Business Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToSearchUser}>
            <Text style={styles.buttonText}>Search User</Text>
          </TouchableOpacity>
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
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30, // Adjust this value for spacing from the top
  },
  saTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10, // Add spacing between title and content
    textAlign: 'center', // Center the text
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  buttonText: {
    color: '#CE8440',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SystemAdminScreen;
