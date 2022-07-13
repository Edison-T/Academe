import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, StyleSheet, Alert, SectionList, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import CreateNewDMListItem from '../components/CreateNewDMListItem';
import ServerSettingsMemberListItem from '../components/ServerSettingsMembersListItem';
import InviteFriendsListItem from '../components/InviteFriendsListItem';
import EditServerMemberListItem from '../components/EditServerMemberListItem';


const MembersSettingScreen = () => {
    const [ searchTextInput, setSearchTextInput ] = useState('');

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
              )
    }), [navigation]});

    const members = [
        {
            name: "Example 0",
            image: "https://imageio.forbes.com/blogs-images/insertcoin/files/2018/06/cayde-destiny.jpg?format=jpg&width=1200",
            tagID: 9055,
            role: "Mentor"
        },
        {
            name: "Example 1",
            image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
            tagID: 9052,
            role: "Mentor",
        },
        {
            name: "Example 2",
            image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
            tagID: 4234,
            role: null
        },
        {
            name: "Example 3",
            image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
            tagID: 9050,
            role: null,
        },
        {
            name: "Example 4",
            image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
            tagID: 9051,
            role: "Mentor",
        },
    ];
    function sortMembersAlphabetically(x, y) {
        return x.name.localeCompare(y.name);
    }
    const sortedMembersArray = members.sort(sortMembersAlphabetically);
           
    return (
        <View style={styles.container}>
            <View style={styles.textInputWrapper}>
                <TextInput 
                    placeholder={`Search members`}
                    style={styles.textInput}
                    value={searchTextInput}
                    onChangeText={(text) => setSearchTextInput(text)}
                />
                <Ionicons 
                    name='search'
                    size={20}
                />
            </View>

            <FlatList 
                data={sortedMembersArray}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <EditServerMemberListItem item={item} />}
                showsVerticalScrollIndicator={true}
            />
        </View>
        
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    textInputWrapper: {
        flexDirection: "row", 
        alignItems: "center", 
        width: "100%", 
        backgroundColor: "#E6E6E6", 
        paddingHorizontal: 10, 
        alignSelf: "center", 
        maxWidth: "95%", 
        borderRadius: 5, 
        marginVertical: 10
    },
    textInput: {
        flex: 1,
        borderRadius: 5, 
        fontSize: 17.5, 
        fontFamily: "Avenir Next",
        alignSelf: "center",
        paddingVertical: 10,
    },
    lineSeparator: {
        backgroundColor: '#E0E0E0',
        height: 0.5,
        margin: 12.5,
    },
    threeIconsWrapperView: {
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginHorizontal: 60,
        marginVertical: 10,
    },
    iconAndTextButtons: {
        alignItems: "center",
    },
    sectionListHeader: {
        fontFamily: "Avenir Next", 
        fontWeight: "700", 
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: "#E6E6E6",
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
        marginRight: 20
    },
    messageUserTextInput: {
        width: "82.5%", 
        height: 40,
        backgroundColor: "white", 
        borderRadius: 5, 
        fontSize: 17.5, 
        fontFamily: "Avenir Next",
        alignSelf: "center",
        paddingHorizontal: 10,
        marginRight: 7.5,
        marginBottom: 10
    },

    fonts: {
        fontFamily: "Avenir Next", 
        fontWeight: "700", 
    }

})

export default MembersSettingScreen;
