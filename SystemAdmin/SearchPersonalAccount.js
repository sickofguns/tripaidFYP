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
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";

const SearchPersonalScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object
  const { user } = useAppContext();

  //////////////////////////////////////////////////////////////////////////////// search
  const [searchQuery, setSearchQuery] = useState('');
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
          where('type', '==', 'personal'),
          where('verify', '==', false)
        );
      } else {
        // If no search query, only filter by 'type'
        userQuery = query(
          usersCollection,
          where('type', '==', 'personal'),
          where('verify', '==', false)
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

  ////////////////////////////////////////////////////////////////////////////////
  const [nuCount, setNuCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);

        const personalUsers = snapshot.docs.filter(doc => {
          const userRole = doc.data().type;
          return userRole === 'personal' && !doc.data().verify;
        });

        setNuCount(personalUsers.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  //////////////////////////////////////////////////////////////////////////////// handle suspend ban delete user
  const handleUnlockPress = (userId, suspend, username) => {
    Alert.alert(
      `Confirm ${suspend ? 'Unsuspend' : 'Suspend'} ` + (username) + `?`,
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
      `Confirm ${suspend ? 'Unsuspend' : 'Suspend'} ` + (username) + `?`,
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
      `Confirm ${ban ? 'Unban' : 'Ban'} ` + (username) + `?`,
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
      `Confirm ${ban ? 'Unban' : 'Ban'} ` + (username) + `?`,
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
      <TouchableOpacity onPress={() => navigateToUserProfile(item.id, item.username)}>
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

  //////////////////////////////////////////////////////////////////////////////////////

  const navigateToUserProfile = (userId, username) => {
    navigation.navigate('User Profile - Normal User', { userId, username });
  };

  useEffect(() => {
    async function loadAllUsers() {
      try {
        const allUsers = await fetchUsersFromDatabase('');
        setUserList(allUsers);
        setNoUserFound(allUsers.length === 0);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }

    loadAllUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        <Text style={styles.selectText}>Personal User</Text>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search User"
            placeholderTextColor="#757575"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
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
            keyExtractor={(item) => item.id.toString()}
            style={styles.userList}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.rightColumn}>
          <View style={styles.columnItem}>
            <Text style={[styles.columnTextBold]}>Active Personal Accounts</Text>
            <Text style={styles.columnTextExtraLarge}>{nuCount}</Text>
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
