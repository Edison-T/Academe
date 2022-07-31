import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Button, Image, Text, KeyboardAvoidingView, Pressable, SectionList } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import EditNotificationsServerListItem from '../components/EditNotificationsServerListItem';


const EditAllNotificationsScreen = () => {

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

    const servers = [
        {
            serverIconName: "school-outline" as const,
            data: [
                {
                    name: "Programmer's Hangout",
                    image: "https://www.logodesignlove.com/wp-content/uploads/2022/01/logo-wave-symbol-01.jpg",
                },
                {
                    name: "Mythology",
                    image: "https://www.nicepng.com/png/detail/61-613644_logo-design-ideas-for-graphic-designers-png-logo.png",
                }
            ]
        },
        {
            serverIconName: "people-outline" as const,
            data: [
                {
                    name: "Nazareth News Club",
                    image: "https://i.pinimg.com/736x/de/a0/f3/dea0f3b7f480b1151c08db4a402a43b9.jpg",
                },
                {
                    name: "Side Hustles",
                    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png",
                }
            ]
        },
        {
            serverIconName: "planet-outline" as const,
            data: [
                {
                    name: "College Craves",
                    image: "https://png.pngtree.com/png-vector/20200921/ourlarge/pngtree-red-and-black-logo-png-image_2348180.jpg",
                },
                {
                    name: "Programming Programs",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Open_Broadcaster_Software_Logo.png/2048px-Open_Broadcaster_Software_Logo.png",
                },
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <SectionList 
                showsVerticalScrollIndicator={true}
                style={styles.scrollList}
                sections={servers}
                stickySectionHeadersEnabled={false}
                //ItemSeparatorComponent={() => (<View style={{height: 0.5, marginHorizontal: 10, backgroundColor: "grey"}}/>)}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <EditNotificationsServerListItem item={item} />}
                renderSectionHeader={({ section: { serverIconName } }) => (
                    <View>
                        <Ionicons
                        name={serverIconName}
                        style={styles.serverTypeIcon}
                        size={30}
                        color = 'black'
                        />
                        <View
                        style={{
                            backgroundColor: 'black',
                            height: 2,
                            borderRadius: 10,
                            marginVertical: 5,
                            marginHorizontal: 10
                        }}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4', 
        flex: 1, 
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
        marginRight: 20
    },
    scrollList: {
        backgroundColor: "transparent", 
        flexDirection: "column", 
        alignSelf: "flex-start", 
        borderTopRightRadius: 12.5, 
        borderBottomRightRadius: 12.5,
        height: "100%",
        width: "100%"
    },
    serverTypeIcon: {
        alignSelf: "center",
        marginTop: 5,
    },
});

export default EditAllNotificationsScreen