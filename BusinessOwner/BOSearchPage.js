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
  doc,
} from "firebase/firestore/lite";


const BOSearchUserScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAppContext();

  const [userList, setUserList] = useState([]);
  
  const [noUserFound, setNoUserFound] = useState(false);

  const fetchUsersFromDatabase = async (inputQuery) => {
    try {
      const usersCollection = collection(db, "users");

      let userQuery;

      if (inputQuery) {
        // If there's a search query, include it in the query
        userQuery = query(
          usersCollection,
          where('username', '==', inputQuery),
        );
      } else {
        // If no search query, only filter by 'type'
        userQuery = query(
          usersCollection,
        );
      }

      const userSnapshot = await getDocs(userQuery);
      const users = userSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(({ id, type }) => id !== user.id && type !== 'admin'); // Exclude users with type 'admin'

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const fetchFollowingStatus = async (userId) => {
    try {
      const followsCollection = collection(db, "follows");
      const followsQuery = query(
        followsCollection,
        where("userId", "==", userId)
      );

      const followsSnapshot = await getDocs(followsQuery);
      const followingList = followsSnapshot.docs[0]?.data()?.following || [];

      return followingList;
    } catch (error) {
      console.error("Error fetching following status:", error);
      return [];
    }
  };

  const handleSearching = async () => {
    try {
      if (searchQuery.trim() === "") {
        const users = await fetchUsersFromDatabase(searchQuery);

        setUserList(users); // Clear the user list
        setNoUserFound(false); // Ensure no "No user found" message is displayed
        return; // Exit the function early if the search query is empty
      }

      const users = await fetchUsersFromDatabase(searchQuery);

      // Fetch and update isFollowing status
      const updatedUsers = await Promise.all(
        users.map(async (userL) => {
          const followingList = await fetchFollowingStatus(user.id);
          return { ...userL, isFollowing: followingList.includes(userL.id) };
        })
      );

      setUserList(updatedUsers);
      setNoUserFound(updatedUsers.length === 0);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleFollowToggle = async (userId) => {
    try {
      const followsCollection = collection(db, "follows");
      const followsQuery = query(
        followsCollection,
        where("userId", "==", user.id)
      );

      const followsSnapshot = await getDocs(followsQuery);
      const followsDoc = followsSnapshot.docs[0];

      if (followsDoc) {
        // If the user is already following someone, update the "following" array
        const followingList = followsDoc.data().following || [];

        if (followingList.includes(userId)) {
          // User is already following, remove from following list
          followingList.splice(followingList.indexOf(userId), 1);
        } else {
          // User is not following, add to following list
          followingList.push(userId);
        }

        await deleteDoc(doc(followsCollection, followsDoc.id)); // Delete existing document
        await addDoc(followsCollection, {
          userId: user.id,
          following: followingList,
        }); // Add updated document
      } else {
        // If the user has no follows document yet, create a new one
        await addDoc(followsCollection, {
          userId: user.id,
          following: [userId],
        });
      }

      // Update the isFollowing status in the user list
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <TouchableOpacity onPress={() => navigateToUserProfile(item.id, item.type, item.verify, item.username)}>
      <View style={styles.userInfo}>
        <Text style={styles.usernamecontent}>{item.username}</Text>
        {/* Add other user details you want to display */}
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFollowToggle(item.id)}>
        <Text style={[styles.followButton, { backgroundColor: item.isFollowing ? '#030D45' : '#FB7E3C' }]}>
          {item.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToUserProfile = (userId, userType, verify, username) => {
    if (userType === "business") {
      navigation.navigate("View Business Profile", { userId, username });
    } else if (userType === "personal" && verify) {
      navigation.navigate("View LOL Profile", { userId, username });
    } else if (userType === "personal") {
      navigation.navigate("View Normal User Profile", { userId, username });
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

    loadAllUsers(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures it runs only once on mount

  const navigation = useNavigation(); // Initialize the navigation object

  const handleHome = () => {
    navigation.navigate('Business Owner');
  };

  const handlePOI = () => {
    navigation.navigate('Business Owner POI');
  };

  const handleProfile = () => {
    navigation.navigate('Business Owner More');
  };

  const handleSearch = () => {
    navigation.navigate('Business Owner Search User');
  };

  const handleCreate = () => {
    navigation.navigate('Business Owner Create');
  };

  const handleShop = () => {
    navigation.navigate('Business Owner Shop');
  }

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
            onSubmitEditing={handleSearching} // Trigger search on Enter press
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

      <Text style={{marginBottom: 45}}>&copy; 2024 TripAid</Text>   

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
                <TouchableOpacity style={styles.middleCircle} onPress={handleCreate}>
                  <View style={styles.circle}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                </TouchableOpacity>

                {/* Shop */}
                <TouchableOpacity style={styles.footerItem} onPress={handleShop}>
                  <MaterialIcons name="shopping-bag" size={32} color="#FFF" />
                  <Text style={styles.footerText}>Shop</Text>
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
  footer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
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
usernamecontent: {
  color: '#0A2753',
  fontSize: 15,
  fontWeight: '600',
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

export default BOSearchUserScreen;
