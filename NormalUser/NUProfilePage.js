import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NUProfilePage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      source: require('../assets/newton.jpg'), // Assuming NU.jpg is in the assets folder
      likes: 150,
      comments: 20,
    },
    // Add more posts as needed
  ]);

  const following = 1000;
  const followers = 982;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
      <View style={styles.followCounts}>

        <View style={styles.followCountsinner}>
          <Text style={styles.followCountNumber}>{followers}</Text>
          <Text style={styles.followText}>Followers</Text>
        </View>
          <Image style={styles.profileImage} source={require('../assets/NU.jpg')} />
        <View style={styles.followCountsinner}>
          <Text style={styles.followCountNumber}>{following}</Text>
          <Text style={styles.followText}>Following</Text>
        </View>
      </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>Catherine13</Text>
          <Text style={styles.bio}>
            My name is Catherine. I like dancing in the rain and travelling all around the world.
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postItem}>
            <Image style={styles.postImage} source={require('../assets/newton.jpg')} />
            <View style={styles.postStats}>
              <View style={styles.postActions}>
                <TouchableOpacity>
                  <MaterialIcons name="favorite-border" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="chat-bubble-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <View style={styles.likesComments}>
                <Text>{post.likes} Likes</Text>
                <Text>{post.comments} Comments</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  followCounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followText: {
    fontSize: 16,
    marginRight: 40,
    marginLeft: 40,
    color: '#030D45',
  },
  followCountsinner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  followCountNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#030D45',
    marginBottom: 5,
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#030D45',
    alignSelf: 'center',
  },
  bio: {
    color: '#555',
    marginTop: 5,
    color: '#6C7A9C',
    textAlign: 'center',    
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editProfileButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    marginRight: 10,
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
  postItem: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postStats: {
    padding: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  likesComments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NUProfilePage;
