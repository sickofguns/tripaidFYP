import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
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
  writeBatch,
  getDoc,
} from "firebase/firestore/lite";
//ACCEPTING/REJECTING PAGE PENDING LIST  

const BORequestsScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);

  const { user } = useAppContext();

  const fetchUsersFromDatabase = async (inputQuery) => {
    try {
      const usersCollection = collection(db, "boaffiliations");

      let userQuery;

      if (inputQuery) {
        // If there's a search query, include it in the query
        userQuery = query(
          usersCollection,
          where('businessUsername', '==', inputQuery),
          where('collab', '==', true),
          where('personalUserId', '==', user.id) // Add this line to filter by businessUserId
        );
      } else {
        // If no search query, only filter by 'type'
        userQuery = query(
          usersCollection,
          where('collab', '==', true),
          where('personalUserId', '==', user.id) // Add this line to filter by businessUserId
        );
      }

      const userSnapshot = await getDocs(userQuery);
      const users = await Promise.all(userSnapshot.docs.map(async (doc) => ({ id: doc.id, ...doc.data() })));

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const fetchUsersFromDatabase2 = async (inputQuery) => {
    try {
      const usersCollection = collection(db, "lolaffiliations");

      let userQuery;

      if (inputQuery) {
        // If there's a search query, include it in the query
        userQuery = query(
          usersCollection,
          where('businessUsername', '==', inputQuery),
          where('collab', '==', true),
          where('personalUserId', '==', user.id) // Add this line to filter by businessUserId
        );
      } else {
        // If no search query, only filter by 'type'
        userQuery = query(
          usersCollection,
          where('collab', '==', true),
          where('personalUserId', '==', user.id) // Add this line to filter by businessUserId
        );
      }

      const userSnapshot = await getDocs(userQuery);
      const users = await Promise.all(userSnapshot.docs.map(async (doc) => ({ id: doc.id, ...doc.data() })));

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
        const users2 = await fetchUsersFromDatabase2(searchQuery);
        const unique = users.filter(users => !users2.some(users2 => users2.personalUserId === users.personalUserId));

        const usersall = unique.concat(users2);

        setUserList(usersall); // Clear the user list
        setNoUserFound(false); // Ensure no "No user found" message is displayed
        return; // Exit the function early if the search query is empty
      }

      const users = await fetchUsersFromDatabase(searchQuery);
      const users2 = await fetchUsersFromDatabase2(searchQuery);
      const unique = users.filter(users => !users2.some(users2 => users2.personalUserId === users.personalUserId));

      const usersall = unique.concat(users2);

      setUserList(usersall);
      setNoUserFound(usersall.length === 0);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  useEffect(() => {
    // Load all users from the database initially
    async function loadAllUsers() {
      try {
        const allUsers = await fetchUsersFromDatabase('');
        const allUsers2 = await fetchUsersFromDatabase2('');

        // Filter out duplicates from allUsers2
        const uniqueUsers2 = allUsers2.filter(user2 => !allUsers.some(user => user.businessUserId === user2.businessUserId));

        // Concatenate uniqueUsers2 with allUsers
        const usersAll = allUsers.concat(uniqueUsers2);
    
        setUserList(usersAll);
        setNoUserFound(usersAll.length === 0);
        setBOCount(usersAll.length);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }
    
    

    // Fetch pending users when the component mounts
    fetchPendingUsersFromDatabase();

    loadAllUsers(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs only once on mount

   // User count
const [BOCount, setBOCount] = useState(0);

  const [pendingList, setPendingList] = useState([]);

  const fetchPendingUsersFromDatabase = async () => {
    try {
      const usersCollection = collection(db, "boaffiliations");

      // Include verify === false in the query
      const userQuery = query(
        usersCollection,
        where('collab', '==', false),
        where('reached', '==', true),
        where('pending', '==', true),
        where('personalUserId', '==', user.id) // Add this line to filter by businessUserId
      );

      const userSnapshot = await getDocs(userQuery);
      const users = await Promise.all(userSnapshot.docs.map(async (doc) => ({ id: doc.id, ...doc.data() })));

      setPendingList(users);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      setPendingList([]);
    }
  };

  const handleDeleteUser = (userId, businessUsername, collab) => {
    Alert.alert(
      `Confirm Remove User ${businessUsername} from Collaboration?`,
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteUser(userId, businessUsername, collab),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  
  const deleteUser = async (userId, businessUsername, collab) => {
    try {
      const batch = writeBatch(db); // Initialize a batched write

      if (!collab) {
        // If collab is false, update the user's documents in both collections
        const boAffiliationDocRef = doc(db, 'boaffiliations', userId);
        const lolAffiliationDocRef = doc(db, 'lolaffiliations', userId);

        // Update the document in boaffiliations collection if it exists
        if ((await getDoc(boAffiliationDocRef)).exists()) {
          batch.update(boAffiliationDocRef, { collab: false, pending: false, reached: false });
        }

        // Update the document in lolaffiliations collection if it exists
        if ((await getDoc(lolAffiliationDocRef)).exists()) {
          batch.update(lolAffiliationDocRef, { collab: false, pending: false, reached: false });
        }
      }

      // Commit the batched write
      await batch.commit();

      // Display success message or perform additional actions
      Alert.alert('User Removed from Collaboration', `User ${businessUsername} removed from collaboration successfully.`);
    } catch (error) {
      console.error('Error removing user from collaboration:', error);
      Alert.alert('Error', 'An error occurred while removing the user from collaboration.');
    }
};


  

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity onPress={() => navigateToUserProfile(item.businessUsername)}>
        <View style={styles.userInfo}>
          <Text style={styles.usernamecontent}>{item.businessUsername}</Text>
          {/* Add other user details you want to display */}
        </View>
      </TouchableOpacity>
      <View style={styles.userIcons}>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id, item.businessUsername)}>
          <MaterialIcons name="close" size={20} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToUserProfile = (userId) => {
    navigation.navigate('View Business Profile', { userId });
  };

  const handleUpgradeUser = (userId, businessUsername) => {
    Alert.alert(
      `Confirm Collaborate with User ${businessUsername} ?`,
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

  const handleDenyUser = (userId, businessUsername) => {
    Alert.alert(
      `Confirm Deny Collaboration User ${businessUsername} ?`,
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
        const affiliationDocRef = doc(db, 'boaffiliations', userId);
  
        // Update the user's affiliation status in the database
        await updateDoc(affiliationDocRef, { collab: true, pending: false, reached: true, date: new Date() });
  
        // Update local state for collaboration container
        setUserList((prevUsers) => [...prevUsers, { ...userToUpgrade }]);
        
        // Update local state for pending container (remove user)
        setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));
  
        // Display success message
        Alert.alert('User Confirmed', `User ${userToUpgrade.businessUsername} collaboration successfully.`);
      } else {
        Alert.alert('User Not Found', 'The user to collaborate was not found.');
      }
    } catch (error) {
      console.error('Error confirming upgrade:', error);
      Alert.alert('Error', 'An error occurred while confirming the acceptance.');
    }
  };
  

  const denyUpgrade = async (userId) => {
    try {
      const userToDeny = pendingList.find((user) => user.id === userId);

      if (userToDeny) {
        const affiliationDocRef = doc(db, 'boaffiliations', userId); // Assuming the document ID in the boaffiliations collection is the same as the user ID

        await updateDoc(affiliationDocRef, { collab: false, pending: false, reached: false });

        // Update local state
        setUserList((prevUsers) => [...prevUsers, { ...userToDeny }]);
        setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));

        Alert.alert('User Denied', `User ${userToDeny.businessUsername} collaboration failed.`);
      } else {
        Alert.alert('User Not Found', 'The user to deny collaboration was not found.');
      }
    } catch (error) {
      console.error('Error denying upgrade:', error);
      Alert.alert('Error', 'An error occurred while confirming the rejection.');
    }
  };

  const renderPendingItem = ({ item }) => (
    <View style={styles.pendingItem}>
      <TouchableOpacity onPress={() => navigateToUserProfile(item.businessUsername)}>
        <View style={styles.pendingInfo}>
          <Text style={styles.usernamecontent}>{item.businessUsername}</Text>
          {/* Add other user details you want to display */}
        </View>
      </TouchableOpacity>
      <View style={styles.pendingIcons}>
        <TouchableOpacity onPress={() => handleUpgradeUser(item.id, item.businessUsername)}>
          <MaterialIcons name="check" size={20} color="green" style={[styles.icon, styles.tickIcon]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDenyUser(item.id, item.businessUsername)}>
          <MaterialIcons name="close" size={20} color="red" style={[styles.icon, styles.crossIcon]} />
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Text style={[styles.columnTextBold]}>Business Affiliates</Text>
          {/* Total Personal Account Count */}
          <Text style={styles.columnTextExtraLarge}>{BOCount}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
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

export default BORequestsScreen;
