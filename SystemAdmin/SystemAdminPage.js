import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import BarGraphAvgUsage from '../StatisticsData/BarGraphAvgUsage';

const SystemAdminScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation object
    //const [nuCount, setNuCount] = useState(0); // Initialize nuCount with 0
    //const [boCount, setBoCount] = useState(0); // Initialize nuCount with 0
    //const [lolCount, setLolCount] = useState(0); // Initialize nuCount with 0

    // Placeholder counts (replace these with actual counts)
    const nuCount = 1500;
    const boCount = 500;
    const lolCount = 300;
    const totalUserCount = nuCount + boCount + lolCount;


    //dummy
    const nuusage = [
      { id: 100, avgUsageTime: 2.5 },
      { id: 200, avgUsageTime: 6.0 },
      { id: 300, avgUsageTime: 2.0 },
      { id: 200, avgUsageTime: 9.0 },
      { id: 300, avgUsageTime: 7.0 },
      { id: 100, avgUsageTime: 3.5 },
      { id: 200, avgUsageTime: 3.0 },
      { id: 300, avgUsageTime: 8.0 },
      { id: 200, avgUsageTime: 1.0 },
      { id: 300, avgUsageTime: 2.0 },
      { id: 100, avgUsageTime: 5.5 },
      { id: 200, avgUsageTime: 7.0 },
      { id: 300, avgUsageTime: 2.0 },
      { id: 200, avgUsageTime: 6.0 },
      { id: 300, avgUsageTime: 2.0 },
      { id: 100, avgUsageTime: 4.5 },
      { id: 200, avgUsageTime: 3.0 },
      { id: 300, avgUsageTime: 8.0 },
      { id: 200, avgUsageTime: 3.0 },
      { id: 300, avgUsageTime: 9.0 },
      // Add more objects as needed
    ];    

// Calculate the total average usage time
const nutotalUsageTime = nuusage.reduce((sum, day) => sum + day.avgUsageTime, 0);

// Calculate the average per day
const nuaveragePerDay = (nutotalUsageTime / nuusage.length).toFixed(1);

//dummy
const bousage = [
  { id: 100, avgUsageTime: 2.5 },
  { id: 200, avgUsageTime: 6.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 200, avgUsageTime: 9.0 },
  { id: 300, avgUsageTime: 7.0 },
  { id: 100, avgUsageTime: 3.5 },
  { id: 200, avgUsageTime: 3.0 },
  { id: 300, avgUsageTime: 8.0 },
  { id: 200, avgUsageTime: 1.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 100, avgUsageTime: 5.5 },
  { id: 200, avgUsageTime: 7.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 200, avgUsageTime: 6.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 100, avgUsageTime: 4.5 },
  { id: 200, avgUsageTime: 3.0 },
  { id: 300, avgUsageTime: 8.0 },
  { id: 200, avgUsageTime: 3.0 },
  { id: 300, avgUsageTime: 9.0 },
  // Add more objects as needed
];    

// Calculate the total average usage time
const bototalUsageTime = bousage.reduce((sum, day) => sum + day.avgUsageTime, 0);

// Calculate the average per day
const boaveragePerDay = (bototalUsageTime / bousage.length).toFixed(1);

//dummy
const lolusage = [
  { id: 100, avgUsageTime: 2.5 },
  { id: 200, avgUsageTime: 6.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 200, avgUsageTime: 9.0 },
  { id: 300, avgUsageTime: 7.0 },
  { id: 100, avgUsageTime: 3.5 },
  { id: 200, avgUsageTime: 3.0 },
  { id: 300, avgUsageTime: 8.0 },
  { id: 200, avgUsageTime: 1.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 100, avgUsageTime: 5.5 },
  { id: 200, avgUsageTime: 7.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 200, avgUsageTime: 6.0 },
  { id: 300, avgUsageTime: 2.0 },
  { id: 100, avgUsageTime: 4.5 },
  { id: 200, avgUsageTime: 3.0 },
  { id: 300, avgUsageTime: 8.0 },
  { id: 200, avgUsageTime: 3.0 },
  { id: 300, avgUsageTime: 9.0 },
  // Add more objects as needed
];    

// Calculate the total average usage time
const loltotalUsageTime = lolusage.reduce((sum, day) => sum + day.avgUsageTime, 0);

// Calculate the average per day
const lolaveragePerDay = (loltotalUsageTime / lolusage.length).toFixed(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);

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

  const handleDeleteUser = (userId) => {
    Alert.alert(
      'Confirm Delete User?',
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
      <View style={styles.userInfo}>
        <Text>{item.username}</Text>
        {/* Add other user details you want to display */}
      </View>
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
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
          <MaterialIcons name="close" size={20} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

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
                          <Text style={styles.columnTextBold}>Average Usage Time</Text>
                      </View>
                      {/* Bar Graph */}
                      <View style={styles.columnItem}>
                        <BarGraphAvgUsage data={nuusage} />
                      </View>

                      {/* Per Day Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Day</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>{nuaveragePerDay} Hours</Text>
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
                          <Text style={styles.columnTextBold}>Average Usage Time</Text>
                      </View>
                      {/* Bar Graph */}
                      <View style={styles.columnItem}>
                        <BarGraphAvgUsage data={bousage} />
                      </View>

                      {/* Per Day Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Day</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>{boaveragePerDay} Hours</Text>
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
                          <Text style={styles.columnTextBold}>Average Usage Time</Text>
                      </View>
                      {/* Bar Graph */}
                      <View style={styles.columnItem}>
                        <BarGraphAvgUsage data={lolusage} />
                      </View>

                      {/* Per Day Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Day</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>{lolaveragePerDay} Hours</Text>
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