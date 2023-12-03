import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SearchUserScreen = () => {
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
      const users = await fetchUsersFromDatabase(searchQuery);
      setUserList(users);
      setNoUserFound(users.length === 0);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{item.username}</Text>
      {/* Add other user details you want to display */}
    </View>
  );

  return (
    <LinearGradient colors={['#CE8440', '#F3B490']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.searchUserTitle}>Search User</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number or username"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
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
        <StatusBar style="auto" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  searchUserTitle: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    width: '70%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#F3B490',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
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
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchUserScreen;
