import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
    collection,
    getDocs,
    query,
    where,
    arrayContains,
    updateDoc,
    doc,
  } from "firebase/firestore/lite";
  import { useAppContext } from "../AppContext";
  import { db } from "../firebaseConfig";

const UserProfile = () => {
    const { user } = useAppContext();

  const [socialLinks, setSocialLinks] = useState({
    facebook: 'www.facebook.com/',
    instagram: 'www.instagram.com/',
    youtube: 'www.youtube.com/',
  });

  const handleChange = (platform, value) => {
    setSocialLinks({ ...socialLinks, [platform]: value });
  };

  const handleOpenLink = (platform) => {
    let urlPrefix = '';
    switch (platform) {
      case 'facebook':
        urlPrefix = 'https://';
        break;
      case 'instagram':
        urlPrefix = 'https://';
        break;
      case 'youtube':
        urlPrefix = 'https://';
        break;
      default:
        console.error('Invalid platform:', platform);
        return;
    }

    const url = socialLinks[platform];
    if (url && url.trim() !== '') {
      Linking.openURL(urlPrefix + url);
    } else {
      console.error('Cannot open empty URL');
    }
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, socialLinks);
      Alert.alert('Success', 'Social links updated successfully');
    } catch (error) {
      console.error('Error updating social links:', error);
      Alert.alert('Error', 'Failed to update social links');
    }
  };

  return (
    <View>
      <Text style={styles.title}>Enter your social links here!</Text>

      <Text style={styles.username}>Facebook:</Text>
      <TextInput
        style={styles.input}
        value={socialLinks.facebook}
        onChangeText={(text) => handleChange('facebook', text)}
      />
      <Text style={styles.username}>Verify link here:</Text>
      <Button
        title="Open Facebook"
        onPress={() => handleOpenLink('facebook')}
      />

      <Text style={styles.username}>Instagram:</Text>
      <TextInput
        style={styles.input}
        value={socialLinks.instagram}
        onChangeText={(text) => handleChange('instagram', text)}
      />
      <Text style={styles.username}>Verify link here:</Text>
      <Button
        title="Open Instagram"
        onPress={() => handleOpenLink('instagram')}
      />

      <Text style={styles.username}>YouTube:</Text>
      <TextInput
        style={styles.input}
        value={socialLinks.youtube}
        onChangeText={(text) => handleChange('youtube', text)}
      />
      <Text style={styles.username}>Verify link here:</Text>
      <Button
        title="Open YouTube"
        onPress={() => handleOpenLink('youtube')}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#030D45' }]}
        onPress={() => handleUpdate()}
      >
        <Text style={styles.buttonText}>Update Social Links</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FB7E3C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#030D45",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C7A9C",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UserProfile;