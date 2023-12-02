import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import ExclusiveDealsPop from './ExclusiveDealsPop';

const HomeScreen = (HomeScreen) => {
  // remove console.log("App executed");
  console.log("App executed");

  // match it back with the backend - total user count
  // Mock data for the total users and current date
  const count = 1000; // Replace this with your actual count
  const currentDate = new Date().toLocaleDateString('en-GB'); // Get current date in dd/mm/yy format

  // match it back with the backend - reviews of the application
  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      comment: 'Great app! Very user-friendly.',
    },
    {
      id: 2,
      user: 'Jane Smith',
      comment: 'Nice features, I love it!,this is a very long long long long chunk of message xxxx xxxx xxxx xxxxx',
    },
    // Add more reviews as needed...
  ];

  const navigation = useNavigation(); // Initialize the navigation object
  //Signup press
  const handleSignUpPress = () => {
    navigation.navigate('Registration'); // Navigate to SignUp screen on button press
  };
  //Login press
  const handleLogInPress = () => {
    navigation.navigate('Log In');
  }
  //Qna press
  const handleQnAPress = () => {
    navigation.navigate('Q&A'); 
  };

  //Exclusive Deals Popup
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <LinearGradient
      colors={['#4093CE', '#90CEF3']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome To</Text>
        </View>
        <View style={styles.circleContainer}>
          <Image
            source={require('./assets/logo.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <View style={{ width: 24 }} />
          <TouchableOpacity style={styles.button} onPress={handleLogInPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userIcon}>
              <MaterialIcons name="people" size={50} color="#000" />
            </View>
            <View style={styles.userText}>
            <Text style={styles.userTitle}>
              Total Users as of{' '}
              <Text style={{ fontWeight: 'bold' }}>{currentDate}</Text>:{' '}
            </Text>
            <Text style={styles.userContent}>
              <Text style={{ fontWeight: 'bold' }}>{count}</Text>
            </Text>
            </View>
          </View>
          <View style={styles.exclusiveDealsContainer}>
            <View style={styles.starIcon}>
              <MaterialIcons name="star" size={50} color="#FEE370" />
            </View>
            <View style={styles.exclusiveDealsText}>
              <TouchableOpacity onPress={openModal}>
                <Text style={styles.dealsTitle}>Exclusive Deals:</Text>
                <Text style={styles.dealsContent}>10% off first transaction              </Text>
              </TouchableOpacity>
              <ExclusiveDealsPop isVisible={modalVisible} onClose={closeModal} />
            </View>
          </View>
          <View style={styles.POIContainer}>
            <View style={styles.mapIcon}>
              <MaterialIcons name="map" size={50} color="#000" />
            </View>
            <View style={styles.POIText}>
              <Text style={styles.POITitle}>Point-of-Interest</Text>
              <Text style={styles.POIContent}>Nature Historical Attraction Food</Text>
            </View>
          </View>
          <View style={styles.reviewContainer}>
            <View style={styles.reviewIcon}>
              <MaterialIcons name="message" size={50} color="#000" />
            </View>
            <View style={styles.reviewText}>
              <Text style={styles.reviewTitle}>Reviews</Text>
              <Text style={styles.reviewContent}>
                <Swiper style={styles.swiper} showsPagination={false}>
                  {reviews.map((review) => (
                    <View key={review.id} style={styles.reviewItem}>
                      <Text style={styles.reviewUser}>{review.user}</Text>
                      <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                  ))}
                </Swiper>
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.questionButton} onPress={handleQnAPress}>
          <MaterialIcons name="help-outline" size={40} color="#000" />
          <Text style={styles.questionText}>Q&A</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
    paddingTop: 5, // Add padding to shift content below the status bar
  },
  // background
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // welcome + logo
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 0, // Add margin for separation
  },
  welcomeText: {
    color: '#FEE370',
    fontSize: 50,
    fontWeight: 'bold',
  },
  circleContainer: {
    width: 200,
    height: 181,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  //sign up / log in buttons
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: 138,
    height: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: '#4093CE',
    fontSize: 25,
    fontWeight: 'bold'
  },
  // infomations 
  infoContainer: {
    marginTop: 1,
    alignItems: 'center',
  },
  // total user
  userContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 10,
  },
  userText: {
    flexDirection: 'column',
  },
  totalUserText: {
    flexDirection: 'column',
  },
  userTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userContent: {
    color: '#FFF',
    fontSize: 30,
    textAlign: 'center',
  },
  // deals
  exclusiveDealsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starIcon: {
    marginRight: 10,
  },
  exclusiveDealsText: {
    flexDirection: 'column',
  },
  dealsTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dealsContent: {
    color: '#FFF',
    fontSize: 20,
  },
  // POI
  POIContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  mapIcon: {
    marginTop: 10,
  },
  POIText: {
    flexDirection: 'column',
  },
  POITitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  POIContent: {
    color: '#FFF',
    fontSize: 20,
  },
  // reviews
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'right',
    marginTop: 5,
    marginLeft: 65,
  },
  reviewIcon: {
    marginTop: 10,
  },
  reviewText: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  reviewTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewContent: {
    color: '#FFF',
    fontSize: 20, //nothing
    marginBottom: 10,
  },
  swiper: {
    height: 180,
  },
  reviewItem: {
    width: '90%', // Adjusted width
    height: 140, // Adjusted height
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9FCFC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  reviewUser: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  reviewComment: {
    fontSize: 16,
    textAlign: 'center',
  },
  // Q&A Button Styles
  questionButton: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default HomeScreen;