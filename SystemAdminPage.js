import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import BarGraphAvgUsage from './BarGraphAvgUsage'; // Import your BarGraph component


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
    const NUARRAY = [
      { nuCount: 100, avgUsageTime: 2.5 },
      { nuCount: 200, avgUsageTime: 3.0 },
      { nuCount: 300, avgUsageTime: 2.0 },
      { nuCount: 200, avgUsageTime: 3.0 },
      { nuCount: 300, avgUsageTime: 2.0 },
      // Add more objects as needed
    ];    

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

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{item.username}</Text>
      {/* Add other user details you want to display */}
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
                        <BarGraphAvgUsage data={NUARRAY} />
                      </View>

                      {/* Per Day Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Day</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>3.5 Hours</Text>
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
                        <BarGraphAvgUsage data={NUARRAY} />
                      </View>

                      {/* Per Day Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Day</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>3.5 Hours</Text>
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
                        <BarGraphAvgUsage data={NUARRAY} />
                      </View>

                      {/* Per Day Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextSmall}>Per Day</Text>
                          {/* Add any necessary text or component */}
                      </View>
                      {/* Total Average Usage Section */}
                      <View style={styles.columnItem}>
                          <Text style={styles.columnTextLarge}>3.5 Hours</Text>
                      </View>
                  </View>
                  
                <TouchableOpacity onPress={handleLOLSearch}>
                  {/* Right Column Container */}
                  <View style={styles.rightColumn}>
                      {/* Top Section */}
                      <View style={styles.columnItem}>
                          <Text style={[styles.columnTextBold, {marginTop: 80}]}>Active LOLs Accounts</Text>
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







          </View>
          </ScrollView>
          <View style={styles.footer}>
              <Text>&copy; 2023 TripAid</Text>
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
});

export default SystemAdminScreen;