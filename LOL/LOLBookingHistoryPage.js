import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';



const LOLBookingHistoryScreen = () => {

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
      navigation.navigate('POI');
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

    const handleSearchUser = () => {
      navigation.navigate('LOL Search User')
    };
  
  const handleViewContent = (item) => {
    return () => {
      navigation.navigate('LOL View Booking', { bookingData: item });
    };
  };

  const handleViewHistoryContent = (item) => {
    return () => {
      navigation.navigate('LOL View History Booking', { bookingData: item });
    };
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, username: 'sa',  isReachOut: false },
    { id: 2, username: 'lol',  isReachOut: false },
    { id: 3, username: 'nu',  isReachOut: false },
    { id: 4, username: 'bo',  isReachOut: false },
    { id: 5, username: 'bb',  isReachOut: false },
  ]);
  const [noUserFound, setNoUserFound] = useState(false);

  // Dummy database of users
  const dummyDatabase = [
    { id: 1, username: 'sa' },
    { id: 2, username: 'lol' },
    { id: 3, username: 'nu' },
    { id: 4, username: 'bo' },
    { id: 5, username: 'bb' },
  ];

  const fetchUsersFromDatabase = async (query) => {
    try {
      // Simulating API call with dummy data
      const filteredUsers = dummyDatabase.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      return filteredUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const [filteredBookingData, setFilteredBookingData] = useState([]);
  const [filteredHistoryData, setFilteredHistoryData] = useState([]);
  

  const handleSearch = () => {
    try {
      if (searchQuery.trim() === '') {
        setFilteredBookingData([]);
        setFilteredHistoryData([]);
        setNoUserFound(false);
        return;
      }
  
      const filteredBookings = bookingData.filter(
        (item) =>
          item.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      const filteredHistory = historyData.filter(
        (item) =>
          item.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setFilteredBookingData(filteredBookings);
      setFilteredHistoryData(filteredHistory);
      setNoUserFound(filteredBookings.length === 0 && filteredHistory.length === 0);
    } catch (error) {
      console.error('Error searching bookings:', error);
    }
  };


  const handleFollowToggle = (userId) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user,  isReachOut: !user. isReachOut } : user
      )
    );
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text>{item.username}</Text>
        {/* Add other user details you want to display */}
      </View>
      <TouchableOpacity onPress={() => handleFollowToggle(item.id)}>
        <Text style={[styles.followButton, { backgroundColor: item. isReachOut ? '#030D45' : '#FB7E3C' }]}>
          {item. isReachOut ? 'Pending' : 'Reach Out'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    // Load all users from the database initially
    async function loadAllUsers() {
      try {
        const allUsers = await fetchUsersFromDatabase('');
        setUserList(allUsers);
        setNoUserFound(allUsers.length === 0);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }

    loadAllUsers(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs only once on mount


  const handleNewBooking = () => {
    navigation.navigate('LOL Booking Page'); // Navigate to SignUp screen on button press
  }; 


  const bookingData = [
    {
      place: 'Dancing Crab',
      category: 'Food',
      time: '8:00 pm',
      date: '10-01-2024',
      bookingid: '004',
      request: 'nil',
      location: 'Orchard',
    },
    {
      place: 'Din Tai Fung',
      category: 'Food',
      time: '7:00 pm',
      date: '12-01-2024',
      bookingid: '005',
      request: 'nil',
      location: 'MBS',
    },
    {
      place: 'Universal Studio Singapore',
      category: 'Attraction',
      time: '10:00 am',
      date: '11-01-2024',
      bookingid: '006',
      request: 'fast pass',
      location: 'Sentosa',
    },
    {
      place: 'Parkroyal Collection @ Marina Bay',
      category: 'Accommodation',
      time: '10:00 am',
      date: '10-01-2024',
      bookingid: '007',
      request: 'extra bed',
      location: 'Marina',
    },
    {
      place: 'Wild Wild Wet',
      category: 'Attraction',
      time: '10:00 am',
      date: '12-01-2024',
      bookingid: '008',
      request: 'nil',
      location: 'Pasir Ris',
    },
    // Add more itinerary items as needed
  ];

  const historyData = [
    {
      place: 'Hai Di Lao @ MBS',
      category: 'Food',
      time: '8:00 pm',
      date: '10-01-2024',
      bookingid: '001',
      request: 'nil',
      location: 'MBS',
    },
    {
      place: 'Adventure Cove',
      category: 'Attraction',
      time: '10:00 am',
      date: '11-01-2024',
      bookingid: '002',
      request: 'fast pass',
      location: 'Sentosa',
    },
    {
      place: 'Marina Bay Sands Singapore',
      category: 'Accommodation',
      time: '10:00 am',
      date: '10-01-2024',
      bookingid: '003',
      request: 'extra bed',
      location: 'MBS',
    },
    // Add more itinerary items as needed
  ];

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
                            <Text style={styles.mainText}>Booking</Text>
                            <Text style={[styles.mainText, {color : '#FB7E3C' }]}>History</Text>
                        </View>
                        {/* Profile Picture Icon */}
                        <Image source={require('../assets/NU.jpg')} style={styles.RightpfpContainer} />
                    </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <MaterialIcons
            name="search"
            size={20}
            color="#757575"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Bookings"
            placeholderTextColor="#757575"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch} // Trigger search on Enter press
          />
        </View>

            <TextInput style={styles.secondaryText}>Current Bookings</TextInput>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

            {/* Mapping through filteredBookingData array */}
            {(searchQuery.trim() === '' ? bookingData : filteredBookingData).length > 0 ? (
              (searchQuery.trim() === '' ? bookingData : filteredBookingData).map((item, index) => (
                <View key={index} style={[styles.itineraryContainer, { backgroundColor: '#E5F4FF' }]}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.place}</Text>
                    <Text style={styles.subText}>{item.category}</Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.arrowContainer} onPress={handleViewContent(item)}>
                      <Text style={styles.viewContentText}>View Booking</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>
                {searchQuery.trim() === '' ? 'No bookings found' : 'No bookings found'}
              </Text>
            )}
            </ScrollView>

            <TextInput style={styles.secondaryText}>Past Transactions/Bookings</TextInput>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

            {/* Mapping through filteredHistoryData array */}
            {(searchQuery.trim() === '' ? historyData : filteredHistoryData).length > 0 ? (
              (searchQuery.trim() === '' ? historyData : filteredHistoryData).map((item, index) => (
                <View key={index} style={[styles.itineraryContainer, { backgroundColor: '#FFF6ED' }]}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.place}</Text>
                    <Text style={styles.subText}>{item.category}</Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.arrowContainer} onPress={handleViewHistoryContent(item)}>
                      <Text style={styles.viewContentText}>View Booking</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>
                {searchQuery.trim() === '' ? 'No history found' : 'No history found'}
              </Text>
            )}

            </ScrollView>


            {/* Business Category Button */}
            <TouchableOpacity style={styles.ReqButton} onPress={handleNewBooking}>
                <Text style={styles.ReqButtonText}>New Booking</Text>
              </TouchableOpacity>

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
    <TouchableOpacity style={styles.footerItem} onPress={handleSearchUser}>
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
    

    ReqButton: {
        backgroundColor: '#030D45',
        borderRadius: 5,
        height: 50,
        width: 320,
        marginBottom: 30,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
      },
      ReqButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      noDataText: {
        marginTop: 10,
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
      },
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingTop: 15,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 10,
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
      marginBottom: 20,
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
        marginTop: 10,
      },
      selectText: {
        color: '#0A2753',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
  
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 10,
        marginBottom: 5,
        width: '90%',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        fontSize: 15,
        color: '#757575',
        flex: 1,
    },  
    secondaryText: {
        fontSize: 18,
        color: '#FB7E3C',
        fontWeight: '500',
        marginTop: 5,
    },  

  userListContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  userList: {
    flexGrow: 0,
  },
  noUserText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },

  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
},
columnItem: {
  marginBottom: 10,
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
},
columnTextBold: {
    color: '#0A2753',
    fontSize: 24,
    fontWeight: 'bold',
},
columnTextExtraLarge: {
    color: '#FB7E3C',
    fontSize: 28,
},

userItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
userInfo: {
  flex: 1,
},
userIcons: {
  flexDirection: 'row',
  alignItems: 'center',
},
icon: {
  marginLeft: 10,
},userItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
userInfo: {
  flex: 1,
},
userIcons: {
  flexDirection: 'row',
  alignItems: 'center',
},
icon: {
  marginLeft: 10,
},

userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flex: 1,
  },
  followButton: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FB7E3C',
    color: '#FFF',
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
    width: '73%', // 70% width for the text details
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#030D45',
    marginBottom: 5,
    flexWrap: 'wrap',
    maxWidth: '70%', // Adjust the maximum width as needed
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
    width: '40%', // 30% width for the image
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
    marginBottom: 5,
  },
  arrowContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
    flexDirection: 'row',
  },
});

export default LOLBookingHistoryScreen;
