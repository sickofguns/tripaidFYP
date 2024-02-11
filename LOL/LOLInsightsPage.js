import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import BarGraphAvgUsage from '../StatisticsData/BarGraphAvgUsage';
import LineGraph from '../StatisticsData/LineGraph';
import CircularProgress from '../StatisticsData/CircularProgress';
import * as Location from 'expo-location';
import { useAppContext } from "../AppContext";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore/lite";


const LOLInsightsScreen = () => {
  const [currentLocation, setCurrentLocation] = useState('Loading...'); // Initialize with a loading message
  const [location, setLocation] = useState('');
  const { user } = useAppContext();


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
    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [totalLikesCountPost, setTotalLikesCountPost] = useState(0);
const [totalLikesCountReview, setTotalLikesCountReview] = useState(0);
const [totalLikesCountTrail, setTotalLikesCountTrail] = useState(0);
const [totalLikesCount, setTotalLikesCount] = useState(0);
const [chartData, setChartData] = useState([]);

useEffect(() => {
  const fetchLikesCount = async (collectionName, userIdField) => {
    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(query(collectionRef, where(userIdField, '==', user.id)));

      let likesCount = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        likesCount += data.likes || 0;
      });

      console.log(`Total likes count for ${collectionName}:`, likesCount);
      return likesCount;
    } catch (error) {
      console.error(`Error fetching ${collectionName} data:`, error);
      return 0;
    }
  };

  const fetchPostLikes = async () => {
    const postLikesCount = await fetchLikesCount('posts', 'userId');
    return postLikesCount;
  };

  const fetchReviewLikes = async () => {
    const reviewLikesCount = await fetchLikesCount('reviews', 'userId');
    return reviewLikesCount;
  };

  const fetchTrailLikes = async () => {
    const trailLikesCount = await fetchLikesCount('trails', 'userId');
    return trailLikesCount;
  };

  const fetchData = async () => {
    const postLikes = await fetchPostLikes();
    const reviewLikes = await fetchReviewLikes();
    const trailLikes = await fetchTrailLikes();

    setTotalLikesCountPost(postLikes);
    setTotalLikesCountReview(reviewLikes);
    setTotalLikesCountTrail(trailLikes);

    const totalLikes = postLikes + reviewLikes + trailLikes;

    console.log('Total likes count:', totalLikes);
    setTotalLikesCount(totalLikes);

    setChartData([
      { date: 'Posts', value: postLikes },
      { date: 'Reviews', value: reviewLikes },
      { date: 'Trails', value: trailLikes },
    ]);
  };

  fetchData();
}, [user.id]);

////////////////////////////////////////////////////////////////////////////////

// Define state variables for last week and this week user counts
const [lastWeekUserCount, setLastWeekUserCount] = useState(0);
const [thisWeekUserCount, setThisWeekUserCount] = useState(0);

// Calculate the start and end dates for last week and this week
const currentDate = new Date();
const currentDayOfWeek = currentDate.getDay();
const lastWeekStartDate = new Date(currentDate);
lastWeekStartDate.setDate(currentDate.getDate() - currentDayOfWeek - 6);
lastWeekStartDate.setHours(0, 0, 0, 0);
const lastWeekEndDate = new Date(currentDate);
lastWeekEndDate.setDate(currentDate.getDate() - currentDayOfWeek - 1);
lastWeekEndDate.setHours(23, 59, 59, 999);
const thisWeekStartDate = new Date(currentDate);
thisWeekStartDate.setDate(currentDate.getDate() - currentDayOfWeek);
thisWeekStartDate.setHours(0, 0, 0, 0);
const thisWeekEndDate = new Date(currentDate);
thisWeekEndDate.setHours(23, 59, 59, 999);

// Define the function to fetch user data based on the time range
const fetchUsersByTimeRange = async (startDate, endDate, collectionName) => {
  try {
    const usersCollection = collection(db, collectionName);
    const userQuery = query(
      usersCollection,
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      where('collab', '==', true),
      where('personalUserId', '==', user.id)
    );
    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Define the function to calculate total user count for a given time range
const calculateTotalUserCount = async (startDate, endDate) => {
  try {
    const boUsers = await fetchUsersByTimeRange(startDate, endDate, "boaffiliations");
    const lolUsers = await fetchUsersByTimeRange(startDate, endDate, "lolaffiliations");
    const uniqueUsers = boUsers.filter(boUser => !lolUsers.some(lolUser => lolUser.personalUserId === boUser.personalUserId));
    const totalUsers = uniqueUsers.concat(lolUsers);
    return totalUsers.length;
  } catch (error) {
    console.error("Error calculating total user count:", error);
    return 0;
  }
};

// Fetch user counts when the component mounts
useEffect(() => {
  const fetchCounts = async () => {
    try {
      const lastWeekCount = await calculateTotalUserCount(lastWeekStartDate, lastWeekEndDate);
      const thisWeekCount = await calculateTotalUserCount(thisWeekStartDate, thisWeekEndDate);
      setLastWeekUserCount(lastWeekCount);
      setThisWeekUserCount(thisWeekCount);
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  fetchCounts();
}, []); // Empty dependency array ensures it runs only once on mount

// Calculate percentage increase
let percentageIncrease;

if (lastWeekUserCount !== 0) {
  percentageIncrease = ((thisWeekUserCount - lastWeekUserCount) / lastWeekUserCount) * 100;
} else {
  percentageIncrease = thisWeekUserCount * 100;
}

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
                        <Image source={require('../assets/pfp.png')} style={styles.RightpfpContainer} />
                    </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Account Engagement Section */}
                <View style={styles.insightsSection}>
                <Text style={styles.sectionTitle}>Accounts Business Engagement</Text>
                <Text style={styles.chartTitle}>This Week</Text>
                {/* Add your content related to account engagement here */}
                {/* For example, text, charts, or any other relevant information */}
                <CircularProgress percentageIncrease={percentageIncrease} />

                </View>

                {/* Account Reached Section */}
                <View style={styles.insightsSection}>
                <Text style={styles.sectionTitle}>Accounts Reached</Text>
                <Text style={styles.chartTitle}>Total Likes Count</Text>
                {/* Add your content related to account engagement here */}
                {/* For example, text, charts, or any other relevant information */}
                <LineGraph data={chartData} />

                <Text style={styles.perDayText}>Total Likes</Text>
                <Text style={styles.averageTimeText}>{totalLikesCount} Likes</Text>

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
        width: "100%",
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