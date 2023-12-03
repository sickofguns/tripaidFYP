import React from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo

const InsightScreen = () => {
  console.log("App executed");

  const currentDate = new Date().toLocaleDateString('en-GB'); // Get current date in dd/mm/yy format

  // Placeholder counts (replace these with actual counts)
  const normalUserCount = 1500;
  const businessOwnerCount = 500;
  const lolsCount = 300;
  const totalUserCount = normalUserCount + businessOwnerCount + lolsCount;

  return (
    <LinearGradient
      colors={['#CE8440', '#F3B490']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.insightTitle}>Insight</Text>
          <Text style={styles.countContent}>Total User: {totalUserCount}</Text>
          
          <View style={styles.userCounts}>
            <Text style={styles.userText}>
              <MaterialIcons name="person" size={50} color="#3B3434" />
              {' Normal Users: '}
            </Text>
            <Text style={styles.countText}>{normalUserCount}</Text>
            <Text style={styles.userText}>
              <MaterialIcons name="store" size={50} color="#3B3434" />
              {' Business Owners: '}
            </Text>
            <Text style={styles.countText}>{businessOwnerCount}</Text>
            <Text style={styles.userText}>
              <MaterialIcons name="stars" size={50} color="#3B3434" />
              {' Local Opinion Leaders: '}
            </Text>
            <Text style={styles.countText}>{lolsCount}</Text>
          </View>
          <Text style={styles.dateText}>Last Updated: {currentDate}</Text>
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
  insightTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 80, // Add spacing between title and content
    textAlign: 'center', // Center the text
  },
  countContent: {
    color: '#61231A',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userCounts: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  userText: {
    fontSize: 30, // Increase the font size for Normal Users count
    color: '#61231A',
    marginBottom: 20,
  },
  countText: {
    fontSize: 30, // Increase the font size for Normal Users count
    color: '#61231A',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#000',
    fontSize: 16,
    marginTop: 100,
    textAlign: 'right',
  }
});

export default InsightScreen;
