import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert, ActivityIndicator, Image, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessageInputBox from '../components/MessageInputBox';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
//<a href="https://storyset.com/business">Business illustrations by Storyset</a>
//<a href="https://storyset.com/social-media">Social media illustrations by Storyset</a>
//<a href="https://storyset.com/education">Education illustrations by Storyset</a>
//<a href="https://storyset.com/people">People illustrations by Storyset</a>

const CreateServerScreen = ({route}) => {

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
        <View style={{ flex: 1, alignItems: "center", }}>

            <Text style={[styles.texts, { fontSize: 30, marginLeft: 15, margin: 15 }]}>
                Create a Server
            </Text>

            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('AddAndJoinServerScreens', { 
                    screen: 'CreateForAScreen',
                    params: { typeOfServer: "Class" } 
                })}
            >
                <Image 
                    source={require("../assets/lightBulbTeam.png")}
                    style={styles.tinyButtonImages}
                />
                <Text style={styles.texts}>
                    For a class
                </Text>
                <Ionicons 
                    name='chevron-forward'
                    size={25}
                />
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('AddAndJoinServerScreens', { 
                    screen: 'CreateForAScreen',
                    params: { typeOfServer: "Group" } 
                })}            
            >
                <Image 
                    source={require("../assets/happyStudents.png")}
                    style={styles.tinyButtonImages}
                />
                <Text style={styles.texts}>
                    For a club or group
                </Text>
                <Ionicons 
                    name='chevron-forward'
                    size={25}
                />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('AddAndJoinServerScreens', { 
                    screen: 'CreateForAScreen',
                    params: { typeOfServer: "Public" } 
                })}            
            >                
                <Image 
                    source={require("../assets/Chat-rafiki.png")}
                    style={styles.tinyButtonImages}
                />
                <Text style={styles.texts}>
                    For a large community
                </Text>
                <Ionicons 
                    name='chevron-forward'
                    size={25}
                />
            </TouchableOpacity>
           
            <Image
                source={require("../assets/lightBulbTeam.png")}
                style={{width: 350, height: 350, marginTop: -50}}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        width: "90%",
        height: 80,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    texts: {
        fontFamily: "Avenir Next",
        fontWeight: "700",
        fontSize: 17.5,
        marginLeft: 70
    },
    tinyButtonImages: {
        width: 70, 
        height: 70, 
        position: "absolute", 
        margin: 5
    }
})

export default CreateServerScreen