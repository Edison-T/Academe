import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, ActivityIndicator, Image, Text, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
//<a href="https://storyset.com/business">Business illustrations by Storyset</a>
//<a href="https://storyset.com/social-media">Social media illustrations by Storyset</a>
//<a href="https://storyset.com/education">Education illustrations by Storyset</a>
//<a href="https://storyset.com/people">People illustrations by Storyset</a>

const FindFriendsScreen = ({route}) => {
    const [userNameInput, setUserNameInput] = useState('');

    const navigation = useNavigation();

    const navigateBackHome = () => {
        navigation.goBack(); 
    }

    useLayoutEffect (() => {
        navigation.setOptions({
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 15}}
                    activeOpacity={0.5}
                    onPress={navigateBackHome}
                  >
                  <Ionicons
                        name="chevron-back" 
                        size={35}
                        color = 'black'
                    />
                </TouchableOpacity>
                </View>
              )
    }), [navigation]});

    return (
        <KeyboardAvoidingView         
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center" }}
        >

            <Text style={styles.titleText}>
                Add your friend on Academe
            </Text>

            <Text style={styles.subHeadingText} >
                You will need both their username and a tag. Keep in mind that username is case sensitive
            </Text>

            <TextInput 
                placeholder="Username#0000" 
                style={styles.textInput}
                autoFocus
                value={userNameInput} 
                maxLength={32}
                onChangeText={(text) => setUserNameInput(text)}
            />

            <TouchableOpacity style={styles.buttons} activeOpacity={0.5}>
                <Text style={styles.createButtonText}>
                    Send Friend Request
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    buttons: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#00BFFF",
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontFamily: "Avenir Next",
        fontWeight: "700",
        fontSize: 30,
        margin: 10,
        textAlign: "center"
    },
    subHeadingText: {
        fontFamily: "Avenir Next",
        fontWeight: "500", 
        fontSize: 17.5,
        width: 400, 
        textAlign: "center",
    },
    textInput: {
        width: "90%", 
        height: 50, 
        backgroundColor: "#E6E6E6", 
        borderRadius: 10, 
        fontSize: 17.5, 
        padding: 10, 
        textAlign: "center", 
        fontFamily: "Avenir Next",
        marginTop: 15
    },
    createButtonText: {
        fontFamily: "Avenir Next",
        fontWeight: "700", 
        fontSize: 17.5,
        color: "white"
    },
})

export default FindFriendsScreen