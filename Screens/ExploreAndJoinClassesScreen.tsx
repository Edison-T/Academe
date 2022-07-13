import React, {useEffect, useLayoutEffect, useState, useRef, useCallback} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Platform, TextInput, Image, Text, SafeAreaView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessageInputBox from '../components/MessageInputBox';
import { DrawerActions } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ExploreServersListItem from '../components/ExploreServersListItem';
//<a href="https://storyset.com/business">Business illustrations by Storyset</a>
//<a href="https://storyset.com/social-media">Social media illustrations by Storyset</a>
//<a href="https://storyset.com/education">Education illustrations by Storyset</a>
//<a href="https://storyset.com/people">People illustrations by Storyset</a>

const ExploreAndJoinClassesScreen = ({route}) => {
    const [codeInput, setCodeInput] = useState('');

    const subjects = [
        {
            subject: "Electives",
            image: require("../assets/electives.png")
        },
        {
            subject: "Foreign Languages",
            image: require("../assets/foreign-languages.png")
        },
        {
            subject: "Language Arts",
            image: require("../assets/language-arts.png")
        },
        {
            subject: "Mathematics",
            image: require("../assets/mathematics.png")
        },
        {
            subject: "Science",
            image: require("../assets/science.png")
        },
        {
            subject: "Social Studies",
            image: require("../assets/social-studies.png")
        },
    ]

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
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.titleText}>
                            Explore classes
                        </Text>
                        <Text style={[styles.subHeadingText, { marginBottom: 20 }]} >
                            Welcome to the class explorer! Below are different subjects. Clicking on them brings you to a list of your school's classes. 
                        </Text>
                    </View>
                }
                
                data={subjects}
                renderItem={({ item }) => <ExploreServersListItem item={item}/> }
                keyExtractor={(item) => item.subject}
                showsVerticalScrollIndicator={true}
            />
            <View style={styles.joinButtonWrapper}>
                <Text style={[styles.subHeadingText, { fontWeight: "700", marginTop: 20 }]}>
                    Already have a class code?
                </Text>
                <TouchableOpacity 
                    style={styles.buttons} 
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("JoinServerWithCodeScreen")}
                >
                    <Text style={styles.joinButtonText}>
                        Join a class
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttons: {
        width: "90%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "#00BFFF",
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontFamily: "Avenir Next",
        fontWeight: "700",
        fontSize: 30,
        margin: 15
    },
    subHeadingText: {
        fontFamily: "Avenir Next",
        fontWeight: "500", 
        fontSize: 17.5,
        width: 400, 
        textAlign: "center"
    },
    joinButtonWrapper: {
        width: "100%", 
        backgroundColor: "white", 
        justifyContent: "flex-end"
    },
    joinButtonText: {
        fontFamily: "Avenir Next",
        fontWeight: "700", 
        fontSize: 17.5,
        color: "white"
    },
})

export default ExploreAndJoinClassesScreen