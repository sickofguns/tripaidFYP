import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import BarGraphAvgUsage from '../StatisticsData/BarGraphAvgUsage';
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


const SystemAdminScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation object

    const [searchQuery, setSearchQuery] = useState('');
    const [userList, setUserList] = useState([]);
    const [noUserFound, setNoUserFound] = useState(false);

    const { user } = useAppContext();

    //////////////////////////////////////////////////////////////////////////////// search
    const fetchUsersFromDatabase = async (inputQuery) => {
      try {
        const usersCollection = collection(db, "users");
    
        // Convert the input query to lowercase for a case-insensitive search
        const lowerCaseQuery = inputQuery.toLowerCase();
    
        // Query for partial match with case-insensitivity
        const userQuery = query(
          usersCollection,
          where("username", "==", inputQuery)
        );
    
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

    const handleSearch = async () => {
      try {
        if (searchQuery.trim() === "") {
          setUserList([]); // Clear the user list
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
    //////////////////////////////////////////////////////////////////////////////// user count
    const [nuCount, setNuCount] = useState(0);
    const [boCount, setBoCount] = useState(0);
    const [lolCount, setLolCount] = useState(0);
    const [totalUserCount, setTotalUserCount] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const usersCollection = collection(db, 'users');
          const snapshot = await getDocs(usersCollection);
    
          const personalUsers = snapshot.docs.filter(doc => {
            const userRole = doc.data().type; // Adjust this based on your actual data structure
            return userRole === 'personal' && !doc.data().verify;
          });
    
          const businessUsers = snapshot.docs.filter(doc => {
            const userRole = doc.data().type; // Adjust this based on your actual data structure
            return userRole === 'business' && doc.data().verify;
          });
    
          const lolUsers = snapshot.docs.filter(doc => {
            const userRole = doc.data().type; // Adjust this based on your actual data structure
            return userRole === 'personal' && doc.data().lol && doc.data().verify;
          });
    
          setNuCount(personalUsers.length);
          setBoCount(businessUsers.length);
          setLolCount(lolUsers.length);
          setTotalUserCount(personalUsers.length + businessUsers.length + lolUsers.length);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchData();

      
      // Clean up resources if needed
    }, []); // No need to include userData in the dependency array if it's not changing during the component's lifecycle
    
    //////////////////////////////////////////////////////////////////////////////// BAR GRAPH 
    const [newNUSignUpData, setNewNUSignUpData] = useState(Array(7).fill(0));
const [newBOSignUpData, setNewBOSignUpData] = useState(Array(7).fill(0));
const [newLOLSignUpData, setNewLOLSignUpData] = useState(Array(7).fill(0));

// Additional state variables for user counts
const [newNUCount, setNewNUCount] = useState(0);
const [newBOCount, setNewBOCount] = useState(0);
const [newLOLCount, setNewLOLCount] = useState(0);
const [newTotalUserCount, setNewTotalUserCount] = useState(0);

useEffect(() => {
  const usersCollection = collection(db, 'users');

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(usersCollection);

      // Initialize arrays to store sign-up data for each category
      const newNUSignUpDataArray = Array(7).fill(0);
      const newBOSignUpDataArray = Array(7).fill(0);
      const newLOLSignUpDataArray = Array(7).fill(0);

      // Initialize counts for each user category
      let newNUCount = 0;
      let newBOCount = 0;
      let newLOLCount = 0;

      // Iterate through the user documents
snapshot.docs.forEach((doc) => {
  const user = doc.data();
  const signUpDate = user.signUpDate; // Assuming you have a field named signUpDate

  if (signUpDate) {
    const dayOfWeek = new Date(signUpDate.toDate()).getDay();

    // Check the user category and update the corresponding array
    if (user.type === 'personal' && user.lol) {
      newLOLSignUpDataArray[dayOfWeek]++;
      newLOLCount++;
    } else if (user.type === 'personal') {
      newNUSignUpDataArray[dayOfWeek]++;
      newNUCount++;
    } else if (user.type === 'business') {
      newBOSignUpDataArray[dayOfWeek]++;
      newBOCount++;
    } 
  }
});

      console.log('New NU Sign Up Data:', newNUSignUpDataArray); // Add this line for logging
      console.log('New BO Sign Up Data:', newBOSignUpDataArray); // Add this line for logging
      console.log('New LOL Sign Up Data:', newLOLSignUpDataArray); // Add this line for logging

      // Set state with the calculated values
      setNewNUSignUpData(newNUSignUpDataArray);
      setNewBOSignUpData(newBOSignUpDataArray);
      setNewLOLSignUpData(newLOLSignUpDataArray);

      // Set state with user counts
      setNewNUCount(newNUCount);
      setNewBOCount(newBOCount);
      setNewLOLCount(newLOLCount);
      setNewTotalUserCount(newNUCount + newBOCount + newLOLCount);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchData();

// Clean up resources if needed

  // Reset data at the beginning of each week
  const interval = setInterval(() => {
    // Reset the state variables here
    setNewNUSignUpData(Array(7).fill(0));
    setNewBOSignUpData(Array(7).fill(0));
    setNewLOLSignUpData(Array(7).fill(0));
    setNewNUCount(0);
    setNewBOCount(0);
    setNewLOLCount(0);
    setNewTotalUserCount(0);
  }, 604800000); // 604800000 milliseconds = 1 week

  return () => clearInterval(interval); // Cleanup the interval on unmount
}, []);

    ////////////////////////////////////////////////////////////////////////////////


  const handleBCPress = () => {
    navigation.navigate('Business Category'); // Navigate to SignUp screen on button press
  }; 

  const handleNUSearch = () => {
    navigation.navigate('Personal Accounts'); // Navigate to SignUp screen on button press
  }; 
  const handleBOSearch = () => {
    navigation.navigate('Business Accounts'); // Navigate to SignUp screen on button press
  }; 
  const handleLOLSearch = () => {
    navigation.navigate('LOL Accounts'); // Navigate to SignUp screen on button press
  }; 

  const handleLogoutPress = () => {
    navigation.navigate('Landing Page')
  }

    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>Insights</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.midContainer}>

          <Text style={styles.welcomeText}>
            Welcome Back System Admin
            {'\n'}
            What would you like to do today?
          </Text>


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
            {/* Display User */}
                <View style={styles.userListContainer}>
                  {noUserFound ? (
                    <Text style={styles.noUserText}>No user found</Text>
                  ) : (
                    userList.map((user) => (
                      <View key={user.id} style={styles.userItem}>
                        <Text>{user.username}</Text>
                      </View>
                    ))
                  )}
                </View>


            {/* Total User Count */}
                  <View style={styles.rightColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={[styles.totalUserText, {marginTop: 80}]}>Total Active Users</Text>
                      {/* Total Personal Account Count */}
                          <Text style={styles.totalCountText}>{totalUserCount}</Text>
                      </View>
                  </View>


            {/* NU Insights Bar */}
              <View style={styles.rowContainer}>
                  {/* Left Column Container */}
                  <View style={styles.leftColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextBold}>New Users Sign Up This Week</Text>
                      </View>
                      {/* Bar Graph */}
                      <View style={styles.columnItem}>
                        <BarGraphAvgUsage data={newNUSignUpData} />
                      </View>

                      {/* Per Week Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Week</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>{newNUCount} New Users</Text>
                      </View>
                  </View>
                  
                <TouchableOpacity onPress={handleNUSearch}>
                  {/* Right Column Container */}
                  <View style={styles.rightColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={[styles.columnTextBold, {marginTop: 80}]}>Active Personal Accounts</Text>
                      {/* Total Personal Account Count */}
                          <Text style={styles.columnTextExtraLarge}>{nuCount}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              </View>


              {/* BO Insights Bar */}
              <View style={styles.rowContainer}>
                  {/* Left Column Container */}
                  <View style={styles.leftColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextBold}>New Users Sign Up This Week</Text>
                      </View>
                      {/* Bar Graph */}
                      <View style={styles.columnItem}>
                        <BarGraphAvgUsage data={newBOSignUpData} />
                      </View>

                      {/* Per Week Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Week</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>{newBOCount} New Users</Text>
                      </View>
                  </View>
                  
                <TouchableOpacity onPress={handleBOSearch}>
                  {/* Right Column Container */}
                  <View style={styles.rightColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={[styles.columnTextBold, {marginTop: 80}]}>Active Business Accounts</Text>
                      {/* Total Personal Account Count */}
                          <Text style={styles.columnTextExtraLarge}>{boCount}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              </View>


              {/* LOL Insights Bar */}
              <View style={styles.rowContainer}>
                  {/* Left Column Container */}
                  <View style={styles.leftColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextBold}>New Users Sign Up This Week</Text>
                      </View>
                      {/* Bar Graph */}
                      <View style={styles.columnItem}>
                        <BarGraphAvgUsage data={newLOLSignUpData} />
                      </View>

                      {/* Per Week Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Week</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>{newLOLCount} New Users</Text>
                      </View>
                  </View>
                  
                <TouchableOpacity onPress={handleLOLSearch}>
                  {/* Right Column Container */}
                  <View style={styles.rightColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={[styles.columnTextBold, {marginTop: 80}]}>    Active LOLs Accounts    </Text>
                      {/* Total Personal Account Count */}
                          <Text style={styles.columnTextExtraLarge}>{lolCount}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Business Category Button */}
              <TouchableOpacity style={styles.BCButton} onPress={handleBCPress}>
                <Text style={styles.BCButtonText}>Business Category</Text>
              </TouchableOpacity>

              {/* Log Out */}
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>







          </View>
          </ScrollView>
          <View style={styles.footer}>
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
      fontSize: 20,
      color: '#0A2753',
      fontWeight: '800',
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 60,
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

    welcomeText: {
      fontSize: 20,
      color: '#FB7E3C',
      fontWeight: '500',
      textAlign: 'center', // Align the text in the middle horizontally
      marginBottom: 20, // Add some bottom margin for spacing
    },


    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 350,
      height: 166,
      paddingVertical: 10,
      marginBottom: 50,
  },
  leftColumn: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingRight: 10,
  },
  rightColumn: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingLeft: 10,
  },
  columnItem: {
    marginBottom: 10,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  columnTextBold: {
      color: '#0A2753',
      fontSize: 12,
      fontWeight: 'bold',
  },
  columnTextSmall: {
      color: '#969393',
      fontSize: 10,
  },
  columnTextLarge: {
      color: '#242425',
      fontSize: 13,
  },
  columnTextExtraLarge: {
      color: '#FB7E3C',
      fontSize: 20,
  },

  userListContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
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

  totalUserText: {
    color: '#0A2753',
    fontSize: 28,
    fontWeight: 'bold',
},
totalCountText: {
    color: '#FB7E3C',
    fontSize: 32,
},

BCButton: {
  backgroundColor: '#FB7E3C',
  borderRadius: 5,
  height: 50,
  width: 320,
  marginTop: 20,
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
},
BCButtonText: {
  color: '#FFF',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},

logoutButton: {
  backgroundColor: '#0A2753',
  borderRadius: 5,
  height: 50,
  width: 320,
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  marginTop: 25,
},
logoutButtonText: {
  color: '#FFF',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
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
});

export default SystemAdminScreen;