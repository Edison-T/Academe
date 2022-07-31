import React, { useLayoutEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet,View, Text, Pressable } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUser } from '../src/graphql/mutations';
import * as mutations from '../src/graphql/mutations';




const SignUpScreen = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

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

    

    async function signUp() {
        try {
            const newUserInformation  = await Auth.signUp({
                username,
                password,
            });

            function makeTagNumber() {
                var tagNumber = "";
                var possible = "0123456789";
              
                for (var i = 0; i < 4; i++)
                  tagNumber += possible.charAt(Math.floor(Math.random() * possible.length));
                return tagNumber;
            }
          
            const randomProfilePictures = [
                "icons8-bird-96.png",
                "icons8-duck-96.png",
                "icons8-dove-96.png",
                "icons8-dog-96.png",
                "icons8-hummingbird-96-2.png",
                "icons8-hummingbird-96.png",
                "icons8-parrot-96.png",
                "icons8-pelican-96.png",
                "icons8-penguin-96.png",
                "icons8-puffin-bird-96.png",
                "icons8-snail-96.png",
            ]
            
        
            function makeRandomProfilePicture() {
            return randomProfilePictures[Math.floor(Math.random() * randomProfilePictures.length)]
            }
          
            const newUser = {
                id: newUserInformation.userSub,
                className: "Classmate",
                classTagNumber: makeTagNumber(),
                classProfilePicture: makeRandomProfilePicture(),
                publicName: "Member",
                publicTagNumber: makeTagNumber(),
                publicProfilePicture: makeRandomProfilePicture(),
                typeOfUser: null,
                schoolID: null,
                status: null,
                lastOnlineAt: null,
            }

            const item = (await API.graphql({
                query: mutations.createUser,
                variables: { input: newUser },
                authMode: 'AWS_IAM',
            }));

            console.log(item)

            navigation.navigate('AuthenticationScreens', {screen: 'ConfirmSignUpScreen'});
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>

            <Text style={styles.titleText}>
                Let's get started!
            </Text>

            <Text style={styles.subHeadingText} >
                Create an account to start using Academe!
            </Text>

            <View style={styles.textInput}>
                <Ionicons 
                    name='mail-outline'
                    size={15}
                />
                <TextInput 
                    style={{ fontSize: 15, fontFamily: "Avenir Next", marginLeft: 10, width: "100%" }}
                    placeholder="Email" 
                    keyboardType='email-address'
                    value={username} 
                    onChangeText={(text) => setUsername(text)}
                />
            </View>

            <View style={styles.textInput}>
                <Ionicons 
                    name='lock-closed-outline'
                    size={15}
                />
                <TextInput 
                    style={{ fontSize: 15, fontFamily: "Avenir Next", marginLeft: 10, width: "86.5%" }}
                    placeholder="Password (8 characters min)" 
                    secureTextEntry={!passwordVisible}
                    maxLength={32}
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                    //onSubmitEditing= {signIn}
                />
                <Pressable
                    hitSlop={15}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    { passwordVisible ?
                        <Ionicons 
                        name='eye-outline'
                        size={20}
                        />
                    :
                        <Ionicons 
                        name='eye-off-outline'
                        size={20}
                        />
                    }
                    
                </Pressable>                
            </View>

            <TouchableOpacity 
                activeOpacity={0.5}
                style={styles.buttons}
                onPress={signUp}
            >
                <Text style={[styles.text,{color: "#00BDFF", fontWeight: "600", fontSize: 18 }]}>
                    Sign up
                </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
}

export default SignUpScreen

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