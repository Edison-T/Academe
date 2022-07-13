import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Button, Image, Text, KeyboardAvoidingView, Pressable, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";


const UserProfileScreen = () => {

    const navigation = useNavigation();

    const classProfile = {
        name: "Edison Tang",
        image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
        tagID: 9054   
    };
    const publicProfile = {
        name: "Myself Perfected",
        image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
        tagID: 2344   
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <Image 
                    source={{ uri: classProfile.image }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 22.5, fontWeight: "700" }}>
                        { classProfile.name }
                    </Text>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 17.5, fontWeight: "700", color: "grey" }}>
                        #{ classProfile.tagID }
                    </Text>
                </View>
            </View>
            <View style={{ width: "100%", height: 0.5, backgroundColor: "grey", marginLeft: "24.5%", marginRight: 60 }}/>
            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <Image 
                    source={{ uri: publicProfile.image }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 22.5, fontWeight: "700" }}>
                        { publicProfile.name }
                    </Text>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 17.5, fontWeight: "700", color: "grey" }}>
                        #{ publicProfile.tagID }
                    </Text>
                </View>
            </View>

            <Text style={{ alignSelf: "flex-start", marginLeft: "5%", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                    Settings
            </Text>

            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('UserProfileScreens', { screen: 'IdentitiesScreen' })}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <MaterialCommunityIcons 
                        name='shield-account-outline'
                        size={25}
                    />
                    <Text style={styles.buttonText}>
                        Identities
                    </Text>
                </View>
                <Ionicons 
                    name='chevron-forward'
                    size={20}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('UserProfileScreens', { screen: 'AccountInformationScreen' })}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='shield-outline'
                        size={25}
                    />
                    <Text style={styles.buttonText}>
                        Account Information
                    </Text>
                </View>
                <Ionicons 
                    name='chevron-forward'
                    size={20}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('UserProfileScreens', { screen: 'EditAllNotificationsScreen' })}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='notifications-outline'
                        size={25}
                    />
                    <Text style={styles.buttonText}>
                        Notifications
                    </Text>
                </View>
                <Ionicons 
                    name='chevron-forward'
                    size={20}
                />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() =>  Alert.alert('Coming soon!', 'We are still working on making a website for all your questions and concerns! Thank you for your patience!')}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='information-circle-outline'
                        size={25}
                    />
                    <Text style={styles.buttonText}>
                        Help {'&'} Documentation
                    </Text>
                </View>
                <Ionicons 
                    name='chevron-forward'
                    size={20}
                />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.logOutButton}
                onPress={() => Auth.signOut()}
            >
                <Text style={styles.logOutText}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4', 
        flex: 1, 
        paddingVertical: "10%"
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
        marginRight: 20
    },
    buttons: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 7.5,
    },
    logOutButton: {
        width: "90%", 
        height: 40, 
        backgroundColor: 'white', 
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
        borderRadius: 5, 
        marginTop: 5
    },
    logOutText: {
        fontSize: 15, 
        fontWeight: "700", 
        color: "red"
    }
});

export default UserProfileScreen