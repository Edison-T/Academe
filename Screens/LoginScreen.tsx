import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Alert, Image, Text, KeyboardAvoidingView, Pressable } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";


const LoginScreen = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigation = useNavigation();

    async function signIn() {
        if(!email) {
            Alert.alert('Enter your email')
            return;
        } else if (!password) {
            Alert.alert('Enter your password')
            return;
        }
        try {
            await Auth.signIn(email, password);
        } catch (error) {
            Alert.alert('Login failed', 'Email and password did not match ')
            console.log(error)
            }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light"/>
            
            <Image
                source={require('../assets/official-academe-logo.png')}
                style={{width: 250, height: 250, marginTop: "-10%", marginBottom: "-20%" }}
            />

            <View style={styles.textInput}>
                <Ionicons 
                    name='mail-outline'
                    size={15}
                />
                <TextInput 
                    style={{ fontSize: 15, fontFamily: "Avenir Next", marginLeft: 10, width: "100%" }}
                    placeholder="Email" 
                    autoFocus 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
    
            <View style={styles.textInput}>
                <Ionicons 
                    name='lock-closed-outline'
                    size={15}
                />
                <TextInput 
                    style={{ fontSize: 15, fontFamily: "Avenir Next", marginLeft: 10, width: "86.5%" }}
                    placeholder="Password" 
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
                onPress={signIn}
                activeOpacity={0.5}
                style={styles.buttons}
            >
                <Text style={[styles.text,{color: "#00BDFF", fontWeight: "600", fontSize: 18 }]}>
                    Login
                </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={styles.orTextLineWrappers}/>
                <Text style={styles.orText}>or</Text>
                <View style={styles.orTextLineWrappers} />
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('AuthenticationScreens', {screen: 'SignUpScreen'})}
                activeOpacity={0.5}
                style={styles.buttons}
            >
                <Text style={[styles.text, {color: "#00BDFF", fontWeight: "600", fontSize: 18 }]}>
                    Create an account
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => 
                    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
                } 
                activeOpacity={0.5}
                style={[styles.buttons, { flexDirection: "row", alignItems: "center" }]}
            >
                <Ionicons 
                    name='logo-google'
                    color={'#00BDFF'}
                    size={30}
                    style={{ marginRight: 20 }}
                />
                <Text style={[styles.text, {color: "grey", fontWeight: "600", fontSize: 18 }]}>
                    Sign in with Google
                </Text>
            </TouchableOpacity>

            <View style={{ height: 100 }}/>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: "5%",
        backgroundColor: "#00BDFF"
    },
    textInput: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
        width: "100%",
        margin: 15,
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
    orTextLineWrappers: {
        height: 1.5, 
        backgroundColor: "white", 
        width: "45%"
    },
    orText: {
        fontFamily: "Avenir Next",
        color: "white", 
        fontSize: 20, 
        textAlign: "center", 
        marginVertical: 20, 
        marginHorizontal: 10
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
    text: {
        fontFamily: "Avenir Next",
        color: "#1D2029"
      },
});

export default LoginScreen