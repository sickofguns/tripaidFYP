import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LOLSearchUserScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, username: 'sa', isLocked: false, isFlagged: false, isFollowing: false },
    { id: 2, username: 'lol', isLocked: true, isFlagged: true, isFollowing: false },
    { id: 3, username: 'nu', isLocked: false, isFlagged: false, isFollowing: false },
    { id: 4, username: 'bo', isLocked: true, isFlagged: false, isFollowing: false },
    { id: 5, username: 'bb', isLocked: false, isFlagged: true, isFollowing: false },
  ]);
  const [noUserFound, setNoUserFound] = useState(false);

  // Dummy database of users
  const dummyDatabase = [
    { id: 1, username: 'sa' },
    { id: 2, username: 'lol' },
    { id: 3, username: 'nu' },
    { id: 4, username: 'bo' },
    { id: 5, username: 'bb' },
    { id: 6, username: 'a' },
    { id: 7, username: 'cc' },
    { id: 8, username: 'de' },
    { id: 9, username: 'fg' },
    { id: 10, username: 'hi' },
    { id: 11, username: 'sa' },
    { id: 12, username: 'lol' },
    { id: 13, username: 'nu' },
    { id: 14, username: 'bo' },
    { id: 15, username: 'bb' },
    { id: 16, username: 'a' },
    { id: 17, username: 'cc' },
    { id: 18, username: 'de' },
    { id: 19, username: 'fg' },
    { id: 20, username: 'hi' },

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
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
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
        <Text style={[styles.followButton, { backgroundColor: item.isFollowing ? '#030D45' : '#FB7E3C' }]}>
          {item.isFollowing ? 'Following' : 'Follow'}
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

  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        <Text style={styles.selectText}>Search User to Follow!</Text>

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
            placeholder="Search User"
            placeholderTextColor="#757575"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch} // Trigger search on Enter press
          />
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

      <Text style={{marginBottom: 30}}>&copy; 2023 TripAid</Text>   

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
    flex: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
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
});

export default LOLSearchUserScreen;
