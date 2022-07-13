import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Button, Image, Text, KeyboardAvoidingView, Pressable, SectionList, TouchableHighlight } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import EditNotificationsServerListItem from '../components/EditNotificationsServerListItem';
import ReorderCategoriesListItem from '../components/ReorderCategoriesListItem';
import EditChannelNotificationsListItem from '../components/EditChannelNotificationsListItem';

const EditServerNotificationsScreen = ({route}) => {
    const [selectedMainOptions, setSelectedMainOptions] = useState(null); //when adding api, change initial value
    const handleSelected = (value) => {
        setSelectedMainOptions(value);
    };

    const navigation = useNavigation();

    const channelsAndCategoriesData = [
        {
            category: "Science",
            data: [
                {
                    channelName: "Lab Report",
                },
            ]
        },
        {
            category: "Physics",
            data: [
                {
                    channelName: "Lab Report",
                },
                {
                    channelName: "Homework",
                }
            ]
        },
        {
            category: "Math",
            data: [
                {
                    channelName: "Lab Report",
                },
                {
                    channelName: "Homework",
                }
            ]
        },
        {
            category: "College Preparation",
            data: [
                {
                    channelName: "Financial Aid",
                },
                {
                    channelName: "Scholarships",
                },
                {
                    channelName: "College Application Process"
                }
            ]
        },
    ]; 

    const { item } = route.params

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
                    //onPress={doSomething}
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
        <View style={styles.container}>
            <Text style={{ alignSelf: "flex-start", marginLeft: "5%", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                Server Notifications Settings
            </Text>
            
            <View>
            <MainOption
                option={'All Messages'}
                onPress={handleSelected}
                value={selectedMainOptions}
            />
            <MainOption
                option={'Only @mentions'}
                onPress={handleSelected}
                value={selectedMainOptions}
            />
            <MainOption
                option={'Nothing'}
                onPress={handleSelected}
                value={selectedMainOptions}
            />
            <MainOption
                option={'Edit My Own Preferences'}
                onPress={handleSelected}
                value={selectedMainOptions}
            />
            </View>

            { selectedMainOptions === "Edit My Own Preferences" ?
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginHorizontal: "5%", marginVertical: "2.5%" }}>
                        <Text style={{ alignSelf: "flex-start", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                            Categories {`&`} Channels
                        </Text>
                        <Text style={{ alignSelf: "flex-start", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                            All
                        </Text>
                        <Text style={{ alignSelf: "flex-start", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                            Mentions
                        </Text>
                        <Text style={{ alignSelf: "flex-start", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                            None
                        </Text>
                    </View>     

                    <SectionList 
                        showsVerticalScrollIndicator={true}
                        style={styles.scrollList}
                        ItemSeparatorComponent={ItemSeparator}
                        sections={channelsAndCategoriesData}
                        stickySectionHeadersEnabled={false}
                        keyExtractor={(item) => item.channelName}
                        renderItem={({ item }) => <EditChannelNotificationsListItem item={item} />}
                        renderSectionHeader={({ section: { category } }) => (
                            RenderSectionHeader(category)
                        )}
                    />
                </View>
            :
                null
            }
        </View>
    );
};

function MainOption({ option, onPress, value }) {
    return (
      <View>
        <TouchableOpacity 
            style={styles.buttons} 
            activeOpacity={0.5}
            onPress={() => onPress(option)}
        >
            <Text style={styles.buttonText}>
                {option}
            </Text>
            { value === option ?
                <Ionicons 
                name='checkmark'
                size={20}
                color={'#00BDFF'}
                />
            :
                null
            }
        </TouchableOpacity>
        <View style={{ height: 1 }}/>
      </View>
    );
}

function RenderSectionHeader(category) {
    return (
        <View style={{flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons 
                name="folder-pound-outline"
                size={ 22.5 }
                color='black'
                style={{ margin: 10, marginLeft: "5%" }}
            />
            <Text style={styles.categoryFont}>
                {category}
            </Text>
        </View>
    )
}

function ItemSeparator () {
    return (
        <View style={{ height: 0.5, backgroundColor: "grey", marginLeft: "13.5%" }}/>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4', 
        flex: 1, 
        marginTop: "5%"
    },
    buttons: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    buttonText: {
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: "3%"
    },
    ///////////////
    categoryFont: {
        fontFamily: "Avenir Next", 
        fontWeight: "700", 
        fontSize: 15,
    },
    scrollList: {
        backgroundColor: "transparent", 
        flexDirection: "column", 
        alignSelf: "flex-start", 
        borderTopRightRadius: 12.5, 
        borderBottomRightRadius: 12.5,
        height: "100%",
        width: "100%",
    },
});

export default EditServerNotificationsScreen