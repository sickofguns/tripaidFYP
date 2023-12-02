import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExclusiveDealsPop = ({ isVisible, onClose }) => {
    const navigation = useNavigation();
  
    const handleSignUpPress = () => {
      navigation.navigate('Registration');
      onClose(); // Close the modal after navigating to SignUp
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
            {/* Content of your exclusive deals */}
            <Text style={styles.modalText}>Deals</Text>
            <Text style={styles.dealsText}>10% off first transaction</Text>
            <Text style={styles.dealsText}>25% off attractions</Text>
            <Text style={styles.dealsText}>10% off food</Text>
            <Text style={styles.dealsText}>5% off tour-guide</Text>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.buttonText}>Sign Up Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#A5E7FF', 
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    dealsText: {
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 18,
    },
    buttonText: {
      marginTop: 10,
      color: '#4093CE',
      fontWeight: 'bold',
      fontSize: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: '#283372',
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default ExclusiveDealsPop;