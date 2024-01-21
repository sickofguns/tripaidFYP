import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PieChart from '../StatisticsData/BOPieChart';
import { useNavigation } from '@react-navigation/native';

const SearchBusinessScreen = () => {
  const navigation = useNavigation(); // Initialize the navigation object

    const boCount = 500;

    const categoryData = [
      { label: 'Sports & Recreation', value: 46 },
      { label: 'Food & Beverage', value: 25 },
      { label: 'Hospitality', value: 16 },
      { label: 'Retail', value: 8 },
    ];
    const pieChartColors = ['#FB7E3C', '#FAC28B', '#F1E7EC', '#C49E92'];

  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, username: 'sa', isLocked: false, isFlagged: false },
    { id: 2, username: 'lol', isLocked: true, isFlagged: true },
    { id: 3, username: 'nu', isLocked: false, isFlagged: false },
    { id: 4, username: 'bo', isLocked: true, isFlagged: false },
    { id: 5, username: 'bb', isLocked: false, isFlagged: true },
  ]);
  const [noUserFound, setNoUserFound] = useState(false);
  const [pendingList, setPendingList] = useState([
    { id: 6, username: 'business1', canUpgrade: false },
    { id: 7, username: 'BO2', canUpgrade: false },
    { id: 16, username: 'business1', canUpgrade: false },
    { id: 17, username: 'BO2', canUpgrade: false },
    { id: 26, username: 'business1', canUpgrade: false },
    { id: 27, username: 'BO2', canUpgrade: false },
    { id: 36, username: 'business1', canUpgrade: false },
    { id: 37, username: 'BO2', canUpgrade: false },
    { id: 46, username: 'business1', canUpgrade: false },
    { id: 47, username: 'BO2', canUpgrade: false },
    { id: 56, username: 'business1', canUpgrade: false },
    { id: 57, username: 'BO2', canUpgrade: false },
    // Add more pending users as needed
  ]);

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
    navigation.navigate('User Profile - LOL', { userId });
  };


  const handleUpgradeUser = (userId, username) => {
    Alert.alert(
      `Confirm Verify Business User ${username} to be verified?`,
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
      `Confirm Deny Business User ${username} to be verified?`,
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
      Alert.alert('User Verified', `Business User ${userToUpgrade.username} verified successfully.`);
    } else {
      Alert.alert('User Not Found', 'The user to verify was not found.');
    }
  };
  
  const denyUpgrade = (userId) => {
    const userToDeny = pendingList.find((user) => user.id === userId);
    if (userToDeny) {
      setPendingList((prevPendingList) => prevPendingList.filter((user) => user.id !== userId));
      Alert.alert('Verified Denied', `Business User ${userToDeny.username} verified denied.`);
    } else {
      Alert.alert('User Not Found', 'The user to deny verification was not found.');
    }
  };
  
  const renderPendingItem = ({ item }) => (
    <View style={styles.pendingItem}>
      <TouchableOpacity onPress={() => handleUsernameClick(item)}>
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


      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{selectedUser?.username || 'N/A'} Details:</Text>
            </View>
            <Text style={styles.modaltext}>Business Name:</Text>
            <Text style={styles.modaltext}>{selectedUser?.username || 'N/A'}</Text>
            <Text style={styles.modaltext}>ACRA Number:</Text>
            <Text style={styles.modaltext}>{selectedUser?.acraNumber || 'N/A'}</Text>

            {/* Add other ACRA validation UI components here */}

            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUsernameClick = (user) => {
    // Set the selected user and show the modal
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    // Close the modal
    setModalVisible(false);
    // Reset the selected user when the modal is closed
    setSelectedUser(null);
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
            <Text style={styles.selectText}>Business User</Text>

            <View style={styles.BigRowContainer}>
            <View style={styles.statsContainer}>
                <View style={styles.pieChartContainer}>
                    <PieChart data={categoryData} colors={pieChartColors} />
                </View>

                <View style={styles.statsContent}>
                    <Text style={styles.labelText}>Business Category</Text>

                    {categoryData.map((data, index) => (
                    <View key={index} style={styles.rowContainer}>
                        <View style={[styles.colorBox, { backgroundColor: pieChartColors[index] }]} />
                        <Text style={styles.dataText}>{data.label}: {data.value}% </Text>
                    </View>
                    ))}
                </View>
            </View>
            </View>

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
              <Text style={styles.OtherselectText}>Pending Business Verification</Text>
              <FlatList
                data={pendingList}
                renderItem={renderPendingItem}
                keyExtractor={(item) => item.id.toString()} // Ensure key is a string
                style={styles.userList}
              />
            </View>
            </View>

            <View style={styles.footer}>
              {/* Display BO Count */}
            <View style={styles.rightColumn}>
                  {/* Top Section */}
                  <View style={styles.columnItem}>
                      <Text style={[styles.columnTextBold]}>Active Business Accounts</Text>
                  {/* Total Personal Account Count */}
                      <Text style={styles.columnTextExtraLarge}>{boCount}</Text>
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
    color: '#FB7E3C',
    fontSize: 16,
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
    marginTop: 10,
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

statsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: -120,
},
pieChartContainer: {
  marginRight: -200,
  marginLeft: -50,
},
statsContent: {
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: -110,
},
labelText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
dataText: {
  fontSize: 16,
  marginBottom: 5,
  marginLeft: 8,
},
colorBox: {
  width: 20,
  height: 20,
  borderRadius: 5,
  marginBottom: 5,
},
rowContainer: {
  flexDirection: 'row',
  alignItems: 'flex-start',
},
BigRowContainer: {
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: 30,
  marginTop: -20,
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
});

export default SearchBusinessScreen;
