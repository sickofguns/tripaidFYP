import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchPersonalScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object

    const nuCount = 1500;

  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, username: 'sa', isLocked: false, isFlagged: false },
    { id: 2, username: 'lol', isLocked: true, isFlagged: true },
    { id: 3, username: 'nu', isLocked: false, isFlagged: false },
    { id: 4, username: 'bo', isLocked: true, isFlagged: false },
    { id: 5, username: 'bb', isLocked: false, isFlagged: true },
    { id: 11, username: 'sa', isLocked: false, isFlagged: false },
    { id: 21, username: 'lol', isLocked: true, isFlagged: true },
    { id: 31, username: 'nu', isLocked: false, isFlagged: false },
    { id: 41, username: 'bo', isLocked: true, isFlagged: false },
    { id: 51, username: 'bb', isLocked: false, isFlagged: true },
    { id: 12, username: 'sa', isLocked: false, isFlagged: false },
    { id: 22, username: 'lol', isLocked: true, isFlagged: true },
    { id: 32, username: 'nu', isLocked: false, isFlagged: false },
    { id: 42, username: 'bo', isLocked: true, isFlagged: false },
    { id: 52, username: 'bb', isLocked: false, isFlagged: true },
    { id: 13, username: 'sa', isLocked: false, isFlagged: false },
    { id: 23, username: 'lol', isLocked: true, isFlagged: true },
    { id: 33, username: 'nu', isLocked: false, isFlagged: false },
    { id: 43, username: 'bo', isLocked: true, isFlagged: false },
    { id: 53, username: 'bb', isLocked: false, isFlagged: true },
  ]);
  const [noUserFound, setNoUserFound] = useState(false);

  // Dummy database of users
  const dummyDatabase = [
    { id: 1, username: 'sa' },
    { id: 2, username: 'lol' },
    { id: 3, username: 'nu' },
    { id: 4, username: 'bo' },
    { id: 5, username: 'bb' },
    { id: 12, username: 'sa' },
    { id: 22, username: 'lol' },
    { id: 32, username: 'nu' },
    { id: 42, username: 'bo' },
    { id: 52, username: 'bb' },
    { id: 11, username: 'sa' },
    { id: 21, username: 'lol' },
    { id: 31, username: 'nu' },
    { id: 41, username: 'bo' },
    { id: 51, username: 'bb' },
    { id: 13, username: 'sa' },
    { id: 23, username: 'lol' },
    { id: 33, username: 'nu' },
    { id: 43, username: 'bo' },
    { id: 53, username: 'bb' },
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
  
    console.log("SearchUser: ", searchQuery);
  };

  const handleLockPress = (userId) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isLocked: !user.isLocked } : user
      )
    );
  };

  const handleFlagPress = (userId) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFlagged: !user.isFlagged } : user
      )
    );
  };

  const handleDeleteUser = (userId, username) => {
    Alert.alert(
      'Confirm Delete User ' + (username) + '?',
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteUser(userId),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const deleteUser = (userId) => {
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
    <TouchableOpacity onPress={() => navigateToUserProfile(item.username)}>
      <View style={styles.userInfo}>
        <Text>{item.username}</Text>
        {/* Add other user details you want to display */}
      </View>
      </TouchableOpacity>
      <View style={styles.userIcons}>
        <TouchableOpacity onPress={() => handleLockPress(item.id)}>
          {item.isLocked ? (
            <MaterialIcons name="lock" size={20} color="black" style={styles.icon} />
          ) : (
            <MaterialIcons name="lock-open" size={20} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFlagPress(item.id)}>
          {item.isFlagged ? (
            <MaterialIcons name="flag" size={20} color="red" style={styles.icon} />
          ) : (
            <MaterialIcons name="outlined-flag" size={20} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id, item.username)}>
          <MaterialIcons name="close" size={20} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToUserProfile = (userId) => {
    // Navigate to the UserProfile screen, passing the userId as a parameter
    navigation.navigate('User Profile - Normal User', { userId });
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


  return (
    <View style={styles.container}>
            
        <View style={styles.midContainer}>
            <Text style={styles.selectText}>Personal User</Text>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={20} color="#757575" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search User"
                            placeholderTextColor="#757575"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            onSubmitEditing={handleSearch} // Trigger search on Enter press
                        />
                </View>
        </View>
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

            <View style={styles.footer}>
                  {/* Display NU Count */}
                  <View style={styles.rightColumn}>
                        {/* Top Section */}
                        <View style={styles.columnItem}>
                            <Text style={[styles.columnTextBold]}>Active Personal Accounts</Text>
                        {/* Total Personal Account Count */}
                            <Text style={styles.columnTextExtraLarge}>{nuCount}</Text>
                        </View>
                  </View>
                <TouchableOpacity onPress={navigation.goBack}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                <Text>&copy; 2023 TripAid</Text>
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

  userListContainer: {
    flex: 8,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    height: 300,
  },
  userList: {
    flexGrow: 0,
  },
  userItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noUserText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },

  rightColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
backText: {
  fontSize: 13,
  color: '#757575',
  marginTop: 10,
  marginBottom: 10,
  alignSelf: 'center',
},
});

export default SearchPersonalScreen;
