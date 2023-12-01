import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const QnAScreen = (QnAScreen) => {
  // remove console.log("App executed");
  console.log("App executed");

  return (
    <LinearGradient
      colors={['#4093CE', '#90CEF3']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View>
          <Text>Frequent Question Asked</Text>
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
    justifyContent: 'flex-start', // Align items to the top
    paddingTop: 50, // Add padding to shift content below the status bar
  },
// background
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QnAScreen;