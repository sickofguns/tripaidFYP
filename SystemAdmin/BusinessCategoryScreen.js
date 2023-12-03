import React from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BusinessCategoryScreen = () => {
    console.log("App executed");

  
    return (
      <LinearGradient
        colors={['#CE8440', '#F3B490']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.businesscatTitle}>Business Category</Text>
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
    businesscatTitle: {
      color: '#FFF',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10, // Add spacing between title and content
      textAlign: 'center', // Center the text
    },
  });

export default BusinessCategoryScreen;
