import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Button, Image, Text, KeyboardAvoidingView, Pressable } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/features/userSlice';


const AccountInformationScreen = () => {

    const user = useSelector(selectUser)

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
                        color = 'black'
                    />
                </TouchableOpacity>
                </View>
              ),
        }), [navigation]
    });

    return (
        <View style={{ backgroundColor: '#F4F4F4', flex: 1, paddingVertical: "10%" }}>
            <Text style={{ alignSelf: "flex-start", marginLeft: "5%", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                Account Information
            </Text>

            <View style={styles.fieldView} >
                <Text style={styles.fieldText}>
                    Class Username
                </Text>
                <Text style={styles.infoText}>
                    {user.className}
                </Text>
            </View>

            <View style={styles.fieldView} >
                <Text style={styles.fieldText}>
                    Public Username
                </Text>
                <Text style={styles.infoText}>
                    {user.publicName}
                </Text>
            </View>

            <View style={styles.fieldView} >
                <Text style={styles.fieldText}>
                    Email
                </Text>
                <Text style={styles.infoText}>
                    {user.email}
                </Text>
            </View>

            <TouchableOpacity 
                style={styles.fieldView} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('UserProfileScreens', { screen: 'ChangePasswordScreen' })}
            >
                <Text style={styles.fieldText} >
                    Password
                </Text>
                <Ionicons 
                name='chevron-forward'
                size={20}
                />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.deleteAccountButton}
                onPress={() => Auth.signOut()}
            >
                <Text style={styles.deleteAccountText}>
                    Delete Account
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: "5%",
        backgroundColor: "white"
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
        marginRight: 20
    },
    fieldView: {
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
    fieldText: {
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
    },
    infoText: {
        fontFamily: "Avenir Next",
        fontWeight: "500",
        fontSize: 15,
        color: "#404040"
    },
    deleteAccountButton: {
        width: "90%", 
        height: 40, 
        backgroundColor: 'white', 
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
        borderRadius: 5, 
        marginTop: 5
    },
    deleteAccountText: {
        fontSize: 15, 
        fontWeight: "700", 
        color: "red"
    }
});

export default AccountInformationScreen