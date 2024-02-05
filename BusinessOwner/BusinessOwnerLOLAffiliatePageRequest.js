import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BOLOLAffiliateRequestScreen = () => {
  const BOCount = 3;
  const navigation = useNavigation(); // Initialize the navigation object


  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, username: 'peishi', isLocked: false, isFlagged: false },
    { id: 2, username: 'sneakysushi', isLocked: true, isFlagged: true },
    { id: 3, username: 'denise', isLocked: false, isFlagged: false },
    { id: 4, username: 'charlie', isLocked: true, isFlagged: false },
    { id: 5, username: 'tom', isLocked: false, isFlagged: true },
  ]);
  const [noUserFound, setNoUserFound] = useState(false);
  const [pendingList, setPendingList] = useState([
    { id: 6, username: 'xiaxue', canUpgrade: false },
    { id: 7, username: 'debbie', canUpgrade: false },
    // Add more pending users as needed
  ]);

  const dummyDatabase = [
    { id: 1, username: 'peishi', isLocked: false },
    { id: 2, username: 'sneakysushi', isLocked: false },
    { id: 3, username: 'denise', isLocked: false },
    { id: 4, username: 'charlie', isLocked: false },
    { id: 5, username: 'tom', isLocked: false },
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



const handleDeleteUser = (userId, username) => {
  Alert.alert(
    'Confirm Remove User ' + (username) + ' from Collaboration?',
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
    <Text style={styles.usernamecontent}>{item.username}</Text>
      {/* Add other user details you want to display */}
    </View>
    </TouchableOpacity>
    <View style={styles.userIcons}>
      
      <TouchableOpacity onPress={() => handleDeleteUser(item.id, item.username)}>
        <MaterialIcons name="close" size={20} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const navigateToUserProfile = (userId) => {
  navigation.navigate('View LOL Profile', { userId });
};


const handleUpgradeUser = (userId, username) => {
  Alert.alert(
    `Confirm Collaborate with User ${username} ?`,
    '',
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => confirmUpgrade(userId),
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

const handleDenyUser = (userId, username) => {
  Alert.alert(
    `Confirm Deny Collaboration User ${username} ?`,
    '',
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => denyUpgrade(userId),
        style: 'destructive',
      },
    ],
    { cancelable: false }
  );
};

const confirmUpgrade = (userId) => {
  const userToUpgrade = pendingList.find((user) => user.id === userId);
  if (userToUpgrade) {
    setUserList((prevUsers) => [...prevUsers, { ...userToUpgrade }]);
    setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));
    Alert.alert('User Confirmed', `User ${userToUpgrade.username} collaboration successfully.`);
  } else {
    Alert.alert('User Not Found', 'The user to collaborate was not found.');
  }
};

const denyUpgrade = (userId) => {
  const userToDeny = pendingList.find((user) => user.id === userId);
  if (userToDeny) {
    setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));
    Alert.alert('User Denied', `User ${userToDeny.username} collaboration failed.`);
  } else {
    Alert.alert('User Not Found', 'The user to deny collaboration was not found.');
  }
};

const renderPendingItem = ({ item }) => (
  <View style={styles.pendingItem}>
    <TouchableOpacity onPress={() => navigateToUserProfile(item.username)}>
    <View style={styles.pendingInfo}>
    <Text style={styles.usernamecontent}>{item.username}</Text>
      {/* Add other user details you want to display */}
    </View>
    </TouchableOpacity>
    <View style={styles.pendingIcons}>
      <TouchableOpacity onPress={() => handleUpgradeUser(item.id, item.username)}>
        <MaterialIcons name="check" size={20} color="green" style={[styles.icon, styles.tickIcon]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDenyUser(item.id, item.username)}>
        <MaterialIcons name="close" size={20} color="red" style={[styles.icon, styles.crossIcon]} />
      </TouchableOpacity>
    </View>
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
          
          {/* Search Bar */}
          <View style={styles.searchBar}>
                      <MaterialIcons name="search" size={20} color="#757575" style={styles.searchIcon} />
                      <TextInput
                          style={styles.searchInput}
                          placeholder="Search Businesses"
                          placeholderTextColor="#757575"
                          value={searchQuery}
                          onChangeText={(text) => setSearchQuery(text)}
                          onSubmitEditing={handleSearch} // Trigger search on Enter press
                      />
              </View>

              <Text style={styles.secondaryText}>Business Collaboration Accounts</Text>

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

          <View style={styles.pendingContainer}>
            
            <Text style={styles.OtherselectText}>Pending Collaboration</Text>
            <FlatList
              data={pendingList}
              renderItem={renderPendingItem}
              keyExtractor={(item) => item.id.toString()} // Ensure key is a string
              style={styles.userList}
            />
          </View>
        
        </View>

        
          {/* Display LOL Count */}
          <View style={styles.rightColumn}>
          
                {/* Top Section */}
                <View style={styles.columnItem}>
                    <Text style={[styles.columnTextBold]}>LOL Affiliates</Text>
                {/* Total Personal Account Count */}
                    <Text style={styles.columnTextExtraLarge}>{BOCount}</Text>
                </View>

                <TouchableOpacity onPress={navigation.goBack}>
                      <Text style={styles.backText}>Back</Text>
                  </TouchableOpacity>
                  <Text style={{ marginBottom: 20 }}>&copy; 2024 TripAid</Text>
          </View>

          <StatusBar style="auto" />
      </View>
);
};

const styles = StyleSheet.create({
  secondaryText: {
      fontSize: 20,
      color: '#FB7E3C',
      fontWeight: '700',
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
    OtherselectText: {
      color: '#0A2753',
      fontSize: 18,
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
  },
  
  pendingContainer: {
    flex: 8,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    height: 300,
  },
  
userList: {
  flex: 1,
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
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 10,
},
columnTextExtraLarge: {
  color: '#FB7E3C',
  fontSize: 24,
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
pendingItem: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingVertical: 10,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
},
pendingInfo: {
flex: 1,
},
pendingIcons: {
flexDirection: 'row',
alignItems: 'center',
},
tickIcon: {
marginRight: 5,
},
crossIcon: {
marginLeft: 5,
},
usernamecontent: {
color: '#0A2753',
fontSize: 20,
fontWeight: '600',
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

export default BOLOLAffiliateRequestScreen;
