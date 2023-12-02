import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const QnAScreen = () => {
  console.log("App executed");

  return (
    <LinearGradient
      colors={['#4093CE', '#90CEF3']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.faqContainer}>
          <Text style={styles.faqTitle}>Frequent Questions Asked</Text>
          <View style={styles.faqText}>
            <Text style={styles.faqQns}>How do I know my reservation is confirmed?</Text>
            <Text style={styles.faqAns}>You will receive an email confirmation.</Text>
          </View>
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
  faqContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30, // Adjust this value for spacing from the top
  },
  faqTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30, // Add spacing between title and content
    textAlign: 'center', // Center the text
    marginTop: -5, // Adjust this value to move the title higher
  },
  faqText: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  faqQns: {
    color: '#283372',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  faqAns: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QnAScreen;
