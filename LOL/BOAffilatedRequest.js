import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const LOLAffilateBOScreen = () => {
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
    { id: 11, username: 'sa' },
    { id: 21, username: 'lol' },
    { id: 31, username: 'nu' },
    { id: 41, username: 'bo' },
    { id: 51, username: 'bb' },
    { id: 12, username: 'sa' },
    { id: 22, username: 'lol' },
    { id: 32, username: 'nu' },
    { id: 42, username: 'bo' },
    { id: 52, username: 'bb' },
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
        setUserList(dummyDatabase); // Assuming dummyDatabase contains all users
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
      <TouchableOpacity onPress={() => navigateToUserProfile(item.username)}>
      <View style={styles.userInfo}>
      <Text style={styles.usernamecontent}>{item.username}</Text>
        {/* Add other user details you want to display */}
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFollowToggle(item.id)}>
        <Text style={[styles.followButton, { backgroundColor: item. isReachOut ? '#030D45' : '#FB7E3C' }]}>
          {item. isReachOut ? 'Pending' : 'Reach Out'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToUserProfile = (userId) => {
      navigation.navigate('View Business Profile', { userId });
  };

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


  const handleRequest = () => {
    navigation.navigate('Business Affiliate Request Page'); // Navigate to SignUp screen on button press
  }; 

  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        <Text style={styles.selectText}>Find Businesses</Text>

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
            placeholder="Search Businesses"
            placeholderTextColor="#757575"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch} // Trigger search on Enter press
          />
        </View>

            <Text style={styles.secondaryText}>Top Business Accounts</Text>

      <View style={styles.userListContainer}>
        {noUserFound ? (
          <Text style={styles.noUserText}>No user found</Text>
        ) : (
          <FlatList
            data={userList}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id.toString()} // Ensure key is a string
            style={styles.userList}
          />
        )}
      </View>

            {/* Business Category Button */}
            <TouchableOpacity style={styles.ReqButton} onPress={handleRequest}>
                <Text style={styles.ReqButtonText}>Requests</Text>
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
        paddingVertical: 20,
        paddingTop: 20,
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
        fontSize: 32,
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
        fontSize: 20,
        color: '#FB7E3C',
        fontWeight: '700',
    },  

    userListContainer: {
      flex: 1,
      width: '100%',
      marginTop: 20,
      paddingHorizontal: 20,
      height: 900,
      marginBottom: 20,
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
  usernamecontent: {
    color: '#0A2753',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default LOLAffilateBOScreen;
