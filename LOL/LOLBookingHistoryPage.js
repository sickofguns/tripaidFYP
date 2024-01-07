import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const LOLBookingHistoryScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation object
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

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === '') {
        setUserList([]); // Clear the user list
        setNoUserFound(false); // Ensure no "No user found" message is displayed
        return; // Exit the function early if the search query is empty
      }

      const users = await fetchUsersFromDatabase(searchQuery);
      setUserList(users);
      setNoUserFound(users.length === 0);
    } catch (error) {
      console.error('Error searching users:', error);
    }

    console.log('SearchUser: ', searchQuery);
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
      category: 'Accomodation',
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
      category: 'Accomodation',
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
      <View style={styles.midContainer}>
        <Text style={styles.selectText}>Booking History</Text>

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

            {/* Mapping through bookingData array */}
            {bookingData.map((item, index) => (
    <View key={index} style={[styles.itineraryContainer, { backgroundColor: '#E5F4FF' }]}>
                <View style={styles.textContainer}>
                <Text style={styles.title}>{item.place}</Text>
                <Text style={styles.subText}>{item.category}</Text>
                </View>
                <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.arrowContainer} onPress={null}>
                    <Text style={styles.viewContentText}>View Full Content</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                </TouchableOpacity>
                </View>
            </View>
            ))}

            </ScrollView>

            <TextInput style={styles.secondaryText}>Past Transactions/Bookings</TextInput>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

            {/* Mapping through bookingData array */}
            {historyData.map((item, index) => (
    <View key={index} style={[styles.itineraryContainer, { backgroundColor: '#FFF6ED' }]}>
                <View style={styles.textContainer}>
                <Text style={styles.title}>{item.place}</Text>
                <Text style={styles.subText}>{item.category}</Text>
                </View>
                <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.arrowContainer} onPress={null}>
                    <Text style={styles.viewContentText}>View Full Content</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#FB7E3C" style={{ marginTop: 5 }} />
                </TouchableOpacity>
                </View>
            </View>
            ))}

            </ScrollView>


            {/* Business Category Button */}
            <TouchableOpacity style={styles.ReqButton} onPress={handleNewBooking}>
                <Text style={styles.ReqButtonText}>New Booking</Text>
              </TouchableOpacity>

      <StatusBar style="auto" />

    </View>

    </View>

  );

  
};

const styles = StyleSheet.create({

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
        marginBottom: 20,
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
        marginTop: 20,
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
    width: '80%', // 70% width for the text details
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
    marginBottom: 3,
  },
  arrowContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
    flexDirection: 'row',
  },
});

export default LOLBookingHistoryScreen;
