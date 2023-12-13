import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const OTPScreen = () => {
    const currentLocation = 'Orchard, Singapore';
    const [otp, setOTP] = useState('');
    const [errorText, setErrorText] = useState('');

    const [time, setTime] = useState(300); // 300 seconds = 5 minutes
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerActive) {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        setTimerActive(false);
                        // You may add additional logic for when the timer ends
                        return prevTime;
                    }
                    return prevTime - 1;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };



    const navigation = useNavigation(); // Initialize the navigation object

    const handleSignInPress = () => {
        navigation.navigate('Log In'); // Navigate to SignUp screen on button press
    };

    const handleSignUpPress = () => {
        navigation.navigate('Sign Up'); // Navigate to SignUp screen on button press
    };

    const handleResendPress = () => {
        null;                           //resend email 

        // Reset timer
        setTime(300); // Set the time back to 5 minutes
        setTimerActive(true); // Start the timer again
    };

    const handleSend = () => {
        console.log('Entered OTP:', otpValues.join('')); // Output OTP values in the console
    
        let isValidOTP = false;
    
        const enteredOTP = otpValues.join(''); // Combine OTP values into a single string
    
        switch (enteredOTP) {
            case '123456':
                isValidOTP = true;
                break;
            default:
                setErrorText('Invalid OTP');
                break;
        }
    
        if (!isValidOTP) {
            setErrorText('Invalid OTP');
        } else {
            // Navigate to RegistrationSuccessScreen on successful signup
            navigation.navigate('Change Password');
        }
    
        setTimeout(() => {
            setOTP(''); // Reset email state
            setErrorText(''); // Clear the error message
            setOtpValues(['-', '-', '-', '-', '-', '-']); // Reset OTP input values
        }, 4000); // Change the duration (in milliseconds) as needed
    };

    const [otpValues, setOtpValues] = useState(['-', '-', '-', '-', '-', '-']); // Array to store OTP values
    const refs = Array(6).fill(0).map((_, i) => useRef(null)); // Refs for OTP input boxes

    const handleOtpInputChange = (index, value) => {
        if (!isNaN(value) && value !== '') {
            setOtpValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = value;
                return updatedValues;
            });
    
            // Move focus to the next input box when a character is entered
            if (index < 5) {
                refs[index + 1].current.focus();
            }
        } else if (value === '') {
            setOtpValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = '-';
                return updatedValues;
            });
        }
    };




    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <MaterialIcons name="location-on" size={20} color="#FF5733" />
              <Text style={styles.headerText}> {currentLocation}</Text>
            </View>
            <View style={styles.midContainer}>
                <Image source={require('../assets/LOGO.png')} style={styles.logo} />
                
                <Text style={styles.forgetpwText}>Forget Password</Text>
                <Text style={styles.verifText}>Enter Verification Code</Text>
                <Text style={styles.timer}>{formatTime()}</Text>

                <View style={styles.otpContainer}>
                    {otpValues.map((value, index) => (
                        <View key={index} style={[styles.otpBox, { borderColor: errorText ? 'red' : '#C4C4C4' }]}>
                            <TextInput
                                ref={refs[index]}
                                style={styles.otpInput}
                                maxLength={1}
                                value={value === '-' ? '' : value}
                                onChangeText={(text) => handleOtpInputChange(index, text)}
                            />
                        </View>
                    ))}
                </View>

                <Text style={[styles.errorText, { color: 'red' }]}>{errorText}</Text>

                    <View style={styles.resendContainer}>
                        <Text style={styles.dhotpText}>If you didn’t receive a code,  </Text>
                      <TouchableOpacity onPress={handleResendPress}>
                        <Text style={styles.resendText}>Resend</Text>
                      </TouchableOpacity>

                    </View>


                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>

                <View style={styles.orStyle}>
                    <View style={styles.loginLine}>
                    <View style={styles.line} />
                        <Text style={styles.orText}>Or</Text>
                    <View style={styles.line} />
                    </View>
                        <View style={styles.socialIcons}>
                        <TouchableOpacity> 
                            <Image
                            source={require('../assets/google-social.png')}
                            style={styles.socialImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity> 
                            <Image
                            source={require('../assets/fb-social.png')}
                            style={styles.socialImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity> 
                            <Image
                            source={require('../assets/x-social.png')}
                            style={styles.socialImage}
                            />
                        </TouchableOpacity>
                        </View>
                </View>

                <TouchableOpacity onPress={handleSignUpPress}>
                    <View style={styles.accountContainer}>
                        <Text style={styles.dhaccountText}>Don’t have an account?  </Text>
                        <Text style={styles.signUpText}>Sign up</Text>
                    </View>
                </TouchableOpacity>
                            

                
            </View>

            <View style={styles.footer}>
          <View style={styles.footerImages}>
            <Image source={require('../assets/HILTON.jpg')} style={styles.footerImageHilton} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/SIA.jpg')} style={styles.footerImageSIA} />
            <View style={styles.spacerfooter} />
            <Image source={require('../assets/GBB.jpg')} style={styles.footerImageGBB} />
          </View>
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
      marginBottom: 60,
    },
    footer: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    footerImages: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    footerImageHilton: {
      width: 53.84,
      height: 20,
      resizeMode: 'cover',
    },
    footerImageSIA: {
      width: 195.03,
      height: 20,
      resizeMode: 'cover',
      marginLeft: 17,
      marginRight: 17,
    },
    footerImageGBB: {
      width: 50,
      height: 47,
      resizeMode: 'cover',
    },

    midContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
      },
    forgetpwText: {
        color: '#FB7E3C',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    verifText: {
        color: '#434343',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    timer: {
        color: '#434343',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 60,
        width: 326,
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1, // Sets the width of the outline
        borderColor: '#C4C4C4',
        backgroundColor: '#F7F7F7',
    },
    sendButton: {
        backgroundColor: '#FB7E3C',
        borderRadius: 5,
        height: 50,
        width: 320,
        marginTop: 20,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        marginBottom: 50,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backText: {
        fontSize: 13,
        color: '#757575',
        marginTop: 10,
        marginBottom: 10,
    },
    //log in with google/fb/x
    orStyle: {
        alignItems: 'center',
        marginTop: 0,
    },
    orText: {
        color: '#7A7A7A',
        marginBottom: 0,
    },
    socialImage: {
        width: 30, // Adjust width and height according to your design
        height: 30,
        marginHorizontal: 20,
    },
    socialIcons: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    line: {
        height: 3,
        width: 101,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 45,
    },
    loginLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    dhaccountText: {
        fontSize: 13,
        color: '#434343',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 13,
        color: '#FB7E3C',
        marginTop: 20,
        fontWeight: 'bold',
    },
    accountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    dhotpText: {
        fontSize: 13,
        color: '#434343',
    },
    resendText: {
        fontSize: 13,
        color: 'red',
        fontWeight: 'bold',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        marginLeft: 5,
        fontSize: 11,
    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginTop: 20,
        marginVertical: 5,
    },
    otpBox: {
        width: 48,
        height: 48,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpInput: {
        fontSize: 24,
        color: '#252525',
        textAlign: 'center',
        width: '100%',
    },
});

export default OTPScreen;