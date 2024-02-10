import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import BarGraphAvgUsage from '../StatisticsData/BarGraphAvgUsage';
import LineGraph from '../StatisticsData/LineGraph';
import CircularProgress from '../StatisticsData/CircularProgress';
import * as Location from 'expo-location';


const LOLInsightsScreen = () => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');

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
  
    const navigation = useNavigation(); // Initialize the navigation object
    
    const handleHome = () => {
      navigation.navigate('LOL');
    };

    const handlePOI = () => {
      navigation.navigate('LOL POI');
    };

    const handleProfile = () => {
      navigation.navigate('LOL More');
    };

    const handleCU = () => {
      navigation.navigate('Contact Us');
    }

    const handleLogout = () => {
      navigation.navigate('Landing Page')
    }

    const handlecreate = () => {
      navigation.navigate('LOL Create Itinerary'); // Navigate to SignUp screen on button press
    };

    const handleSearch = () => {
      navigation.navigate('LOL Search User')
    }
    
    //dummy
    const usage = [
        { Monday: 'Mon', avgUsageTime: 6.8 },
        { Tuesday: 'Tue', avgUsageTime: 1.5 },
        { Wednesday: 'Wed', avgUsageTime: 5.0 },
        { Thursday: 'Thu', avgUsageTime: 3.0 },
        { Friday: 'Fri', avgUsageTime: 6.0 },
        { Saturday: 'Sat', avgUsageTime: 8.0 },
        { Sunday: 'Sun', avgUsageTime: 4.2 },
        { Monday: 'Mon', avgUsageTime: 6.8 },
        { Tuesday: 'Tue', avgUsageTime: 1.5 },
        { Wednesday: 'Wed', avgUsageTime: 5.0 },
        { Thursday: 'Thu', avgUsageTime: 3.0 },
        { Friday: 'Fri', avgUsageTime: 6.0 },
        { Saturday: 'Sat', avgUsageTime: 8.0 },
        { Sunday: 'Sun', avgUsageTime: 4.2 },
        { Monday: 'Mon', avgUsageTime: 6.8 },
        { Tuesday: 'Tue', avgUsageTime: 1.5 },
        { Wednesday: 'Wed', avgUsageTime: 5.0 },
        { Thursday: 'Thu', avgUsageTime: 3.0 },
        { Friday: 'Fri', avgUsageTime: 6.0 },
        { Saturday: 'Sat', avgUsageTime: 8.0 },
        { Sunday: 'Sun', avgUsageTime: 4.2 },
        { Monday: 'Mon', avgUsageTime: 6.8 },
        { Tuesday: 'Tue', avgUsageTime: 1.5 },
        { Wednesday: 'Wed', avgUsageTime: 5.0 },
        { Thursday: 'Thu', avgUsageTime: 3.0 },
        { Friday: 'Fri', avgUsageTime: 6.0 },
        { Saturday: 'Sat', avgUsageTime: 8.0 },
        { Sunday: 'Sun', avgUsageTime: 4.2 },
        // Add more objects as needed
      ];    

// Calculate the total average usage time
const totalUsageTime = usage.reduce((sum, day) => sum + day.avgUsageTime, 0);

// Calculate the average per day
const averagePerDay = (totalUsageTime / usage.length).toFixed(1);

const accountReachedData = [
    { date: 'Sun', value: 1 },
    { date: 'Mon', value: 1 },
    { date: 'Tue', value: 0 },
    { date: 'Wed', value: 3 },
    { date: 'Thu', value: 4 },
    { date: 'Fri', value: 8 },
    { date: 'Sat', value: 0 },
  ];

  const totalUsersReached = accountReachedData.reduce((sum, day) => sum + day.value, 0);

  const lastWeekAccountEngagement = 150; // Replace with your actual data
  const thisWeekAccountEngagement = 205; // Replace with your actual data

  const percentageIncrease = ((thisWeekAccountEngagement - lastWeekAccountEngagement) / lastWeekAccountEngagement) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
            <Image source={require('../assets/LOGO.png')} style={styles.logo} />


                
              {/* Account Information */}
                    <View style={styles.accountInfo}>
                        <View style={styles.accountTextContainer}>
                            <Text style={styles.mainText}>Your</Text>
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>Insights</Text>
                            <MaterialIcons name="bar-chart" size={28} color="#FB7E3C" />
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                    </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Account Engagement Section */}
                <View style={styles.insightsSection}>
                <Text style={styles.sectionTitle}>Accounts Engagement</Text>
                <Text style={styles.chartTitle}>This Week</Text>
                {/* Add your content related to account engagement here */}
                {/* For example, text, charts, or any other relevant information */}
                <CircularProgress percentageIncrease={percentageIncrease} />

                </View>

                {/* Account Reached Section */}
                <View style={styles.insightsSection}>
                <Text style={styles.sectionTitle}>Accounts Reached</Text>
                <Text style={styles.chartTitle}>Account Reached in the Past 7 Days</Text>
                {/* Add your content related to account engagement here */}
                {/* For example, text, charts, or any other relevant information */}
                <LineGraph data={accountReachedData}/>

                <Text style={styles.perDayText}>Total User</Text>
                <Text style={styles.averageTimeText}>{totalUsersReached} Users</Text>

                </View>

                {/* Usage Time Section */}
                <View style={styles.insightsSection}>
                <Text style={styles.sectionTitle}>Usage Time</Text>
                {/* Add your content related to account engagement here */}
                {/* For example, text, charts, or any other relevant information */}
                <BarGraphAvgUsage data={usage} />

                {/* Add Per Day and Average Time text */}
                <Text style={styles.perDayText}>Per Day</Text>
                <Text style={styles.averageTimeText}>{averagePerDay} Hours</Text>

                </View>

                
                

                </ScrollView>
                    
                    

              
                <Text style={{ marginBottom: 45 }}>&copy; 2024 TripAid</Text>

            </View>
            <View style={styles.footer}>
        {/* Footer Container */}
        <View style={styles.footerContainer}>
                {/* Home */}
                <TouchableOpacity style={styles.footerItem} onPress={handleHome}>
                  <MaterialIcons name="home" size={32} color="#FFF" />
                  <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>

                {/* Search user */}
                <TouchableOpacity style={styles.footerItem} onPress={handleSearch}>
                  <MaterialIcons name="search" size={32} color="#FFF" />
                  <Text style={styles.footerText}>Search</Text>
                </TouchableOpacity>

                {/* Middle Circle */}
                <TouchableOpacity style={styles.middleCircle}>
                  <View style={styles.circle}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>

                {/* POI */}
                <TouchableOpacity style={styles.footerItem} onPress={handlePOI}>
                  <MaterialIcons name="place" size={32} color="#FFF" />
                  <Text style={styles.footerText}>POI</Text>
                </TouchableOpacity>

                {/* More */}
                <TouchableOpacity style={styles.footerItem} onPress={handleProfile}>
                  <MaterialIcons name="person" size={32} color="#FFF" />
                  <Text style={styles.footerText}>More</Text>
                </TouchableOpacity>
              </View>
          
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
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
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
      marginBottom: 10,
      marginTop: -25,
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    
    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
        flexDirection: 'column',
      },
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FB7E3C',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 75,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      footerItem: {
        alignItems: 'center',
        marginBottom: 10,
      },
      footerText: {
        color: '#FFF',
        fontSize: 11,
      },
      middleCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      circle: {
        backgroundColor: '#FDCA60',
        width: 50,
        height: 50,
        borderRadius: 50, // Increased to make the circle more rounded
        alignItems: 'center',
        justifyContent: 'center',
      },
      plus: {
        color: '#093D89',
        fontSize: 50,
        fontWeight: 'bold',
        marginTop: -5,
      },
      iconList: {
        alignItems: "flex-start",
        paddingHorizontal: 20,
        width: "100%", // Occupy full width
    },
    iconItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns items to the left
        marginBottom: 20,
        width: "100%", // Occupy full width
    },
    iconText: {
        marginLeft: 10,
        fontSize: 18,
        color: "#093D89",
        width: "80%", // Adjust text width for proper alignment
    },
    
    accountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Aligns items to the left
        paddingHorizontal: 20,
        marginBottom: 20,
        height: 30, // Increased height for better alignment
    },
    accountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
    },
    RightpfpContainer: {
        width: 65,
        height: 65,
        borderRadius: 60,
        resizeMode: 'cover',
        marginLeft: 130,
    },

    logoutButton: {
      backgroundColor: '#FB7E3C',
      borderRadius: 5,
      height: 50,
      width: 320,
      marginTop: 20,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
    },
    logoutButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itineraryContainer: {
        paddingHorizontal: 50,
        paddingTop: 20,
        flexDirection: 'row',
        borderTopWidth: 3,
        borderTopColor: '#6C7A9C',
        marginTop: 5,
        marginBottom:5,
      },
      textContainer: {
        marginBottom: 10,
        flexDirection: 'column',
        maxWidth: '100%',
      },
      title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#030D45',
        marginBottom: 5,
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      subText: {
        fontSize: 12,
        color: '#6C7A9C',
        flexWrap: 'wrap',
        maxWidth: '80%', // Adjust the maximum width as needed
      },
      imageContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: -40,
      },
      image: {
        width: 120,
        height: 80,
        borderRadius: 8,
        marginRight: 20,
      },
      viewContentButton: {
        backgroundColor: '#FB7E3C',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
      },
      viewContentText: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 3,
      },
      arrowContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        flexDirection: 'row',
      },
      createButton: {
        backgroundColor: '#030D45',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginBottom: 10,
      },
      createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      insightsSection: {
        marginVertical: 20,
        paddingHorizontal: 20,
        width: "90%",
        marginBottom: 30,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#093D89',
        marginBottom: 10,
        textAlign: 'center',
      },
      chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#093D89',
        marginBottom: 10,
        alignSelf: 'center',
      },
      perDayText: {
        fontSize: 14,
        color: '#6C7A9C',
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold',
      },
      
      averageTimeText: {
        fontSize: 18,
        color: '#6C7A9C',
        marginBottom: 10,
        fontWeight: 'bold',
      },
      
});

export default LOLInsightsScreen;