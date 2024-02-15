import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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

const SearchLOLScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);

  const { user } = useAppContext();

  const fetchUsersFromDatabase = async (inputQuery) => {
    try {
      const usersCollection = collection(db, "users");

      let userQuery;

      if (inputQuery) {
        // If there's a search query, include it in the query
        userQuery = query(
          usersCollection,
          where('username', '==', inputQuery),
          where('type', '==', 'personal'),
          where('lol', '==', true),
          where('verify', '==', true)
        );
      } else {
        // If no search query, only filter by 'type'
        userQuery = query(
          usersCollection,
          where('type', '==', 'personal'),
          where('lol', '==', true),
          where('verify', '==', true)
        );
      }

      const userSnapshot = await getDocs(userQuery);
      const users = userSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(({ type }) => type !== 'admin'); // Exclude users with type 'admin'

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() === "") {
        const users = await fetchUsersFromDatabase(searchQuery);

        setUserList(users); // Clear the user list
        setNoUserFound(false); // Ensure no "No user found" message is displayed
        return; // Exit the function early if the search query is empty
      }

      const users = await fetchUsersFromDatabase(searchQuery);
      setUserList(users);
      setNoUserFound(users.length === 0);
    } catch (error) {
      console.error("Error searching users:", error);
    }
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

    // Fetch pending users when the component mounts
    fetchPendingUsersFromDatabase();

    loadAllUsers(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs only once on mount

  // User count
  const [lolCount, setLolCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);

        const lolUsers = snapshot.docs.filter(doc => {
          const userRole = doc.data().type; // Adjust this based on your actual data structure
          return userRole === 'personal' && doc.data().lol && doc.data().verify;
        });

        setLolCount(lolUsers.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // No need to include userData in the dependency array if it's not changing during the component's lifecycle

  // Handle suspend, ban, delete user
  const handleUnlockPress = (userId, suspend, username) => {
    Alert.alert(
      `Confirm ${suspend ? 'Unsuspend' : 'Suspend'} ${username}?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => updateLockStatus(userId, false),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleLockPress = (userId, suspend, username) => {
    Alert.alert(
      `Confirm ${suspend ? 'Unsuspend' : 'Suspend'} ${username}?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => updateLockStatus(userId, true),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const updateLockStatus = async (userId, newLockStatus) => {
    try {
      await updateDoc(doc(db, 'users', userId), { suspend: newLockStatus });

      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isSuspend: newLockStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating lock status:', error);
    }
  };

  const handleFlagPress = (userId, ban, username) => {
    Alert.alert(
      `Confirm ${ban ? 'Unban' : 'Ban'} ${username}?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => updateFlagStatus(userId, true),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const updateFlagStatus = async (userId, newFlagStatus) => {
    try {
      await updateDoc(doc(db, 'users', userId), { ban: newFlagStatus });

      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBan: newFlagStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating flag status:', error);
    }
  };

  const handleUnflagPress = (userId, ban, username) => {
    Alert.alert(
      `Confirm ${ban ? 'Unban' : 'Ban'} ${username}?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => updateFlagStatus(userId, false),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteUser = (userId, username) => {
    Alert.alert(
      `Confirm Delete User ${username}?`,
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

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));

      setUserList((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity onPress={() => navigateToUserProfileLOL(item.id, item.username)}>
        <View style={styles.userInfo}>
          <Text>{item.username}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.userIcons}>
        <TouchableOpacity onPress={() => (item.isSuspend ? handleUnlockPress(item.id, item.isSuspend, item.username) : handleLockPress(item.id, item.isSuspend, item.username))}>
          {item.isSuspend ? (
            <MaterialIcons name="lock" size={20} color="red" style={styles.icon} />
          ) : (
            <MaterialIcons name="lock-open" size={20} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => (item.isBan ? handleUnflagPress(item.id, item.isBan, item.username) : handleFlagPress(item.id, item.isBan, item.username))}>
          {item.isBan ? (
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

  // Handle accept/reject user to become LOL
 
  const navigateToUserProfile = (userId, username) => {
    navigation.navigate('User Profile - Normal User', { userId, username });

  };

  const navigateToUserProfileLOL = (userId, username) => {
    // Navigate to the UserProfile screen, passing the userId as a parameter
    navigation.navigate('User Profile - LOL', { userId, username });
  };

  const handleUpgradeUser = (userId, username) => {
    Alert.alert(
      `Confirm Upgrade User ${username} to be LOL?`,
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
      `Confirm Deny User ${username} to be LOL?`,
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

  const confirmUpgrade = async (userId) => {
    try {
      const userToUpgrade = pendingList.find((user) => user.id === userId);

      if (userToUpgrade) {
        // Update the user in the database
        await updateDoc(doc(db, 'users', userId), { lol: true, verify: true, pending: false });

        // Update local state
        setUserList((prevUsers) => [...prevUsers, { ...userToUpgrade }]);
        setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));

        Alert.alert('User Upgraded', `User ${userToUpgrade.username} upgraded to LOL successfully.`);
      } else {
        Alert.alert('User Not Found', 'The user to upgrade was not found.');
      }
    } catch (error) {
      console.error('Error confirming upgrade:', error);
      Alert.alert('Error', 'An error occurred while confirming the upgrade.');
    }
  };

  const denyUpgrade = async (userId) => {
    try {
      const userToDeny = pendingList.find((user) => user.id === userId);

      if (userToDeny) {
        // Update the user in the database
        // For deny, you might want to perform additional actions or update different fields
        // Adjust the following line based on your actual requirements
        await updateDoc(doc(db, 'users', userId), { lol: false, verify: false, pending: false });

        // Update local state
        setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));

        Alert.alert('Upgrade Denied', `User ${userToDeny.username} upgrade to LOL denied.`);
      } else {
        Alert.alert('User Not Found', 'The user to deny upgrade was not found.');
      }
    } catch (error) {
      console.error('Error denying upgrade:', error);
      Alert.alert('Error', 'An error occurred while denying the upgrade.');
    }
  };

  // Add these state variables at the beginning of your component
const [modalVisible, setModalVisible] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

  const renderPendingItem = ({ item }) => (
    <View style={styles.pendingItem}>
        <TouchableOpacity
          onPress={() => {
            setSelectedUser(item);
            setModalVisible(true);
            // Comment out the following line if you don't want to navigate to the profile immediately
            navigateToUserProfile(item.id, item.username);
          }}
        >
        <View style={styles.pendingInfo}>
          <Text>{item.username}</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{selectedUser?.username || 'N/A'} Details:</Text>
            </View>
            <Text style={styles.modaltext}>Username:</Text>
            <Text style={styles.modaltextz}>{selectedUser?.username || 'N/A'}</Text>
            <Text style={styles.modaltext}>About Me:</Text>
            <Text style={styles.modaltextz}>{selectedUser?.description || 'N/A'}</Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );

  const [pendingList, setPendingList] = useState([]);

  const fetchPendingUsersFromDatabase = async () => {
    try {
      const usersCollection = collection(db, "users");

      // Include verify === false in the query
      const userQuery = query(
        usersCollection,
        where('type', '==', 'personal'),
        where('lol', '==', true),
        where('verify', '==', false),
        where('pending', '==', true)
      );

      const userSnapshot = await getDocs(userQuery);
      const users = userSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setPendingList(users);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      setPendingList([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        <Text style={styles.selectText}>LOL User</Text>

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
          <Text style={styles.OtherselectText}>Pending Upgrade to LOL</Text>
          <FlatList
            data={pendingList}
            renderItem={renderPendingItem}
            keyExtractor={(item) => item.id.toString()} // Ensure key is a string
            style={styles.userList}
          />
        </View>
      </View>

      <View style={styles.footer}>
        {/* Display LOL Count */}
        <View style={styles.rightColumn}>
          {/* Top Section */}
          <View style={styles.columnItem}>
            <Text style={styles.columnTextBold}>Active LOLs Accounts</Text>
            {/* Total Personal Account Count */}
            <Text style={styles.columnTextExtraLarge}>{lolCount}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text>&copy; 2024 TripAid</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#030D45',
    borderRadius: 10,
    padding: 20,
    width: 355,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalHeaderText: {
    color: '#FB7E3C',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
  },
  modaltext: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 8,
  },
  modaltextz: {
    color: '#FB7E3C',
    fontSize: 18,
    marginLeft: 10,
    marginTop: 8,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    flex: 1,
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

pendingContainer: {
  flex: 1,
  width: '100%',
  marginTop: 20,
  paddingHorizontal: 20,
  height: 300,
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
backText: {
  fontSize: 13,
  color: '#757575',
  marginTop: 10,
  marginBottom: 10,
  alignSelf: 'center',
},
});

export default SearchLOLScreen;
