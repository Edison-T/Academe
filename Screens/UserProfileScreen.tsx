import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Button, Image, Text, KeyboardAvoidingView, Pressable, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native'
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';


const UserProfileScreen = () => {

    const user = useSelector(selectUser)
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            { user.typeOfUser === 'Student' || 'Teacher' ?
                <>
                <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                    <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <S3Image
                            imgKey={user.classProfilePicture}
                            style={styles.profileImage}
                        />
                        <View style={styles.typeOfProfileIcon}>
                            <Ionicons 
                            name='school-outline'
                            color={'black'}
                            size={17.5}
                            />
                        </View>
                    </View>
                <View>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 22.5, fontWeight: "700" }}>
                        { user.className }
                    </Text>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 17.5, fontWeight: "700", color: "grey" }}>
                        #{ user.classTagNumber }
                    </Text>
                </View>
                </View>
                <View style={{ width: "100%", height: 0.5, backgroundColor: "grey", marginLeft: "24.5%", marginRight: 60 }}/>
                </>
            :
                null
            }  

            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <S3Image
                        imgKey={user.publicProfilePicture}
                        style={styles.profileImage}
                    />
                    <View style={styles.typeOfProfileIcon}>
                        <Ionicons 
                        name='globe-outline'
                        color={'black'}
                        size={17.5}
                        />
                    </View>
                </View>
                    <View>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 22.5, fontWeight: "700" }}>
                        { user.publicName }
                    </Text>
                    <Text style={{ fontFamily: "Avenir Next", fontSize: 17.5, fontWeight: "700", color: "grey" }}>
                        #{ user.publicTagNumber }
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
    },
    typeOfProfileIcon: {
        width: 30, 
        height: 30, 
        backgroundColor: "#F4F4F4", 
        borderRadius: 30, 
        position: "absolute", 
        right: 10, 
        borderWidth: 3, 
        borderColor: "#F4F4F4", 
        alignItems: "center", 
        justifyContent:"center"
    }
});

export default UserProfileScreen