import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Auth } from 'aws-amplify';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


export default function ConfirmSignUpScreen() {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');

  const navigation = useNavigation();

  useLayoutEffect (() => {
    navigation.setOptions({
          headerLeft: () => (
            <View>
              <TouchableOpacity
                style={{marginLeft: 15}}
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
              <Ionicons
                    name="chevron-back" 
                    size={35}
                    color = 'white'
                />
            </TouchableOpacity>
            </View>
          )
    }), [navigation]}); 


  async function confirmSignUp() {
    if(!email) {
      Alert.alert('Please enter your email');
      return;
    } else if (!authCode) {
      Alert.alert('Please enter your 6-digit verification code');
      return;
    }
    // try {
    //   await Auth.confirmSignUp(username, authCode);
    //   Alert.alert('Code confirmed','Sign-up was successful!')
    //   navigation.navigate('Login');
    // } catch (error) {
    //   console.log(
    //     'Verification code does not match. Please enter a valid verification code.',
    //     error.code
    //   );
    //   Alert.alert('Verification code and username do not match', 'Please enter a valid verification code.')
    // }
    await Auth.confirmSignUp(email, authCode)
      .then(() => {
        navigation.navigate('AuthenticationScreens', {screen: 'LoginScreen'});
      })
      .catch((e) => {
        Alert.alert('Verification code and username do not match', 'Please enter a valid verification code.')
        setAuthCode(null)
        console.log(e)
      })
  }
  return (
    <KeyboardAvoidingView behavior= 'padding' style={styles.container}>
      <StatusBar style="light"/>

    <Text style={styles.titleText}>
        Confirm sign up
    </Text>

    <Text style={styles.subHeadingText} >
        Check your email for your verification code
    </Text>

    <View style={styles.textInput}>
        <Ionicons 
            name='mail-outline'
            size={15}
        />
        <TextInput 
            style={{ fontSize: 15, fontFamily: "Avenir Next", marginLeft: 10, width: "100%" }}
            placeholder="Email" 
            value={email} 
            onChangeText={(text) => setEmail(text)}
        />
    </View>

    <View style={styles.textInput}>
        <Ionicons 
            name='shield-checkmark-outline'
            size={15}
        />
        <TextInput 
            style={{ fontSize: 15, fontFamily: "Avenir Next", marginLeft: 10, width: "100%" }}
            placeholder="Verfication code" 
            value={authCode} 
            maxLength={8}
            keyboardType="numeric"
            onChangeText={(text) => setAuthCode(text)}
        />
    </View>

    <TouchableOpacity 
        activeOpacity={0.5}
        style={styles.buttons}
        onPress={confirmSignUp}
    >
        <Text style={[styles.text,{color: "#00BDFF", fontWeight: "600", fontSize: 18 }]}>
            Confirm
        </Text>
    </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "#00BDFF",
    },
    textInput: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    buttons: {
        backgroundColor: "white",
        fontSize: 16,
        borderRadius: 10,
        paddingVertical: 13,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: "100%",
        margin: 15
    },
    titleText: {
        fontFamily: "Avenir Next",
        fontWeight: "700",
        fontSize: 30,
        color: "white"
    },
    subHeadingText: {
        fontFamily: "Avenir Next",
        fontWeight: "500", 
        fontSize: 17.5,
        width: 400, 
        textAlign: "center",
        color: "white",
        margin: 15
    },
      text: {
        fontFamily: "Avenir Next",
        color: "#1D2029"
      },
    });