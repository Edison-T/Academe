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


const IdentitiesScreen = () => {
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

    const [ classProfileName, setClassProfileName ] = useState(classProfile.name);
    const [ publicProfileName, setPublicProfileName ] = useState(publicProfile.name)

    const navigation = useNavigation();

    useLayoutEffect (() => {
        navigation.setOptions({
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                    <Text 
                        style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                            Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                    <Text 
                        style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                            Save
                    </Text>
                  </TouchableOpacity>
                </View>
              )
    }), [navigation]});

    return (
        <View style={{ backgroundColor: '#F4F4F4', flex: 1 }}>
            <Text style={{ alignSelf: "flex-start", marginLeft: "2.5%", fontSize: 15, fontWeight: "700", marginTop: 15, color: "#404040" }}>
                    Class Profile
            </Text>

            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <Image 
                        source={{ uri: classProfile.image }}
                        style={styles.profileImage}
                    />
                    <View style={styles.addIcon}>
                        <MaterialCommunityIcons 
                        name='plus'
                        color={'white'}
                        size={15}
                        />
                    </View>
                </View>
                <View style={{ width: "75%" }}>
                    <TextInput 
                        style={styles.nameTextInput}
                        value={classProfileName}
                        maxLength={32}
                        onChangeText={(text) => setClassProfileName(text)}
                    />
                    <Text style={styles.tagIDText}>
                        #{ classProfile.tagID }
                    </Text>
                </View>
            </View>

            <Text style={{ alignSelf: "flex-start", marginLeft: "2.5%", fontSize: 15, fontWeight: "700", marginTop: 15, color: "#404040" }}>
                    Public Profile
            </Text>

            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <Image 
                        source={{ uri: classProfile.image }}
                        style={styles.profileImage}
                    />
                    <View style={styles.addIcon}>
                        <MaterialCommunityIcons 
                        name='plus'
                        color={'white'}
                        size={15}
                        />
                    </View>
                </View>
                <View style={{ width: "75%" }}>
                    <TextInput 
                        style={styles.nameTextInput}
                        value={publicProfileName}
                        maxLength={32}
                        onChangeText={(text) => setPublicProfileName(text)}
                    />
                    <Text style={styles.tagIDText}>
                        #{ publicProfile.tagID }
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: "5%",
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
    nameTextInput: {
        fontFamily: "Avenir Next", 
        fontSize: 22.5, 
        fontWeight: "700", 
        backgroundColor: "#E6E6E6", 
        padding: 10, 
        borderRadius: 10,
    },
    tagIDText: {
        fontFamily: "Avenir Next", 
        fontSize: 17.5, 
        fontWeight: "700", 
        color: "grey"
    },
    addIcon: {
        width: 25, 
        height: 25, 
        backgroundColor: "#00BDFF", 
        borderRadius: 15, 
        position: "absolute", 
        right: 15, 
        borderWidth: 3, 
        borderColor: "#F4F4F4", 
        alignItems: "center", 
        justifyContent:"center"
    }
});

export default IdentitiesScreen