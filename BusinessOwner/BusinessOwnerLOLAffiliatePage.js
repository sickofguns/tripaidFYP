import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { useAppContext } from "../AppContext";
//REQUESTING PAGE THE REACH OUT PAGE 
const BOLOLAffiliateScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);
  const { user } = useAppContext();

  const fetchBusinessUsersFromDatabase = async (inputQuery) => {
    try {
      const usersCollection = collection(db, "users");
  
      let userQuery;
  
      if (inputQuery) {
        // If there's a search query, include it in the query
        userQuery = query(
          usersCollection,
          where('type', '==', 'personal'),
          where('verify', '==', true),
          where('lol', '==', true),
          where('username', '==', inputQuery),
        );
      } else {
        // If no search query, only filter by 'type' and 'verify'
        userQuery = query(
          usersCollection,
          where('type', '==', 'personal'),
          where('verify', '==', true),
          where('lol', '==', true)
        );
      }
  
      const userSnapshot = await getDocs(userQuery);
      const users = await Promise.all(
        userSnapshot.docs.map(async (doc) => {
          const id = doc.id;
          const data = doc.data();
          const isReachOut = await fetchAffiliationStatus(id);
          return { id, ...data, isReachOut };
        })
      );
  
      return users.filter(({ id }) => id !== user.id);
    } catch (error) {
      console.error("Error fetching personal users:", error);
      return [];
    }
  };
  

  const fetchAffiliationStatus = async (personalUserId) => {
    try {
      const affiliationsCollection = collection(db, "boaffiliations");
      const affiliationsQuery = query(
        affiliationsCollection,
        where("businessUserId", "==", user.id),
        where("personalUserId", "==", personalUserId),
      );

      const affiliationsSnapshot = await getDocs(affiliationsQuery);
      const affiliationDoc = affiliationsSnapshot.docs[0];

      return affiliationDoc?.data()?.reached || false;
    } catch (error) {
      console.error("Error fetching affiliation status:", error);
      return false;
    }
  };

  const handleSearching = async () => {
    try {
      if (searchQuery.trim() === "") {
        const businessUsers = await fetchBusinessUsersFromDatabase(searchQuery);
        setUserList(businessUsers); // Clear the user list
        setNoUserFound(false); // Ensure no "No user found" message is displayed
        return; // Exit the function early if the search query is empty
      }

      const businessUsers = await fetchBusinessUsersFromDatabase(searchQuery);

      // Fetch and update affiliation status
      const updatedUsers = await Promise.all(
        businessUsers.map(async (businessUser) => {
          const reachedStatus = await fetchAffiliationStatus(businessUser.id);
          return { ...businessUser, isReachOut: reachedStatus };
        })
      );

      setUserList(updatedUsers);
      setNoUserFound(updatedUsers.length === 0);
    } catch (error) {
      console.error("Error searching personal users:", error);
    }
  };

  const handleReachOutToggle = async (personalUserId) => {
    try {
      // Fetch usernames for personal and LOL accounts
      const [businessUsername, lolUsername] = await fetchUsernames([
        personalUserId,
        user.id,
      ]);
  
      const affiliationsCollection = collection(db, "boaffiliations");
      const affiliationsQuery = query(
        affiliationsCollection,
        where("businessUserId", "==", user.id),
        where("personalUserId", "==", personalUserId)
      );
  
      const affiliationsSnapshot = await getDocs(affiliationsQuery);
      const affiliationsDocs = affiliationsSnapshot.docs;
  
      if (affiliationsDocs.length > 0) {
        // If there are existing boaffiliations, update each one
        const updatedAffiliations = affiliationsDocs.map((affiliationDoc) => {
          const reachedStatus = affiliationDoc.data().reached || false;
          const pendingStatus = affiliationDoc.data().pending || false;
  
          return {
            ...affiliationDoc.data(),
            reached: !reachedStatus, // Toggle the "reached" status
            pending: !pendingStatus, // Toggle the "pending" status
            collab: false, // Always set "collab" to false
          };
        });
  
        // Delete all existing documents
        affiliationsDocs.forEach(async (affiliationDoc) => {
          await deleteDoc(doc(affiliationsCollection, affiliationDoc.id));
        });
  
        // Add updated documents
        updatedAffiliations.forEach(async (updatedAffiliation) => {
          await addDoc(affiliationsCollection, {
            businessUserId: user.id,
            businessUsername: businessUsername.username,
            lolUsername: lolUsername.username,
            personalUserId,
            ...updatedAffiliation,
          });
        });
      } else {
        // If there are no existing boaffiliations, create a new one
        await addDoc(affiliationsCollection, {
          businessUserId: user.id,
          businessUsername: businessUsername.username,
          lolUsername: lolUsername.username,
          personalUserId,
          reached: true, // Set "reached" to true for a new affiliation
          pending: true, // Set "pending" to true for a new affiliation
          collab: false, // Set "collab" to false for a new affiliation
        });
      }
  
      // Update the statuses in the user list
      setUserList((prevUsers) =>
        prevUsers.map((userItem) =>
          userItem.id === personalUserId
            ? {
                ...userItem,
                isReachOut: !userItem.isReachOut,
                // You can also update other properties based on your requirements
              }
            : userItem
        )
      );
    } catch (error) {
      console.error("Error toggling reach out status:", error);
    }
  };
  
  
    
  const fetchUsernames = async (userIds) => {
    try {
      const usersCollection = collection(db, "users");
      const usernamesQuery = query(usersCollection, where("id", "in", userIds));
      const usernamesSnapshot = await getDocs(usernamesQuery);
  
      return usernamesSnapshot.docs.map((doc) => ({
        id: doc.data().id,
        username: doc.data().username,
      }));
    } catch (error) {
      console.error("Error fetching usernames:", error);
      return [];
    }
  };
  

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity onPress={() => navigateToUserProfile(item.id)}>
        <View style={styles.userInfo}>
          <Text style={styles.usernamecontent}>{item.username}</Text>
          {/* Add other user details you want to display */}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleReachOutToggle(item.id)}>
        <Text
          style={[
            styles.reachOutButton,
            { backgroundColor: item.isReachOut ? '#030D45' : '#FB7E3C' },
          ]}
        >
          {item.isReachOut ? 'Pending' : 'Reach Out'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToUserProfile = (userId) => {
    navigation.navigate("View LOL Profile", { userId });
  };

  useEffect(() => {
    // Load all personal users from the database initially
    async function loadAllBusinessUsers() {
      try {
        const businessUsers = await fetchBusinessUsersFromDatabase('');
        setUserList(businessUsers);
        setNoUserFound(businessUsers.length === 0);
      } catch (error) {
        console.error('Error loading personal users:', error);
      }
    }

    loadAllBusinessUsers(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleRequest = () => {
    navigation.navigate('LOL Affiliate Request'); // Navigate to SignUp screen on button press
  };

  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        <Text style={styles.selectText}>Find Local Opinion Leaders</Text>

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
            placeholder="Search Local Opinion Leaders"
            placeholderTextColor="#757575"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearching} // Trigger search on Enter press
          />
        </View>

        <Text style={styles.secondaryText}>Top LOLs Accounts</Text>

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
  reachOutButton: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#FB7E3C',
    color: '#FFF',
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
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default BOLOLAffiliateScreen;
