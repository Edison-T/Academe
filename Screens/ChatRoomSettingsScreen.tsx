import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, StyleSheet, Alert, SectionList, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import CreateNewDMListItem from '../components/CreateNewDMListItem';
import ServerSettingsMemberListItem from '../components/ServerSettingsMembersListItem';
import InviteFriendsListItem from '../components/InviteFriendsListItem';


const ChatRoomSettingsScreen = () => {
    const [ textInput, setTextInput ] = useState('');
    const [ modalTextInput, setModalTextInput ] = useState('');
    const [ inviteModalVisible, setInviteModalVisible ] = useState(false);
    const [ userProfileModal, setUserProfileModal ] = useState(false);
    const [ userProfile, setUserProfile ] = useState(null);

    const navigation = useNavigation();

    const members = [
        {
            typeOfMembers: "Mentors",
            data: [
                {
                    name: "Dr. Seuss",
                    image: "https://imageio.forbes.com/blogs-images/insertcoin/files/2018/06/cayde-destiny.jpg?format=jpg&width=1200",
                    tagID: 9054
                },
                {
                    name: "Example 0",
                    image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                    tagID: 9054
                },
                {
                    name: "Example 1",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 2",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 3",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 4",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 5",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 6",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 7",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 8",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 9",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 10",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Example 11",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
            ] 
        },
        {
            typeOfMembers: "Members",
            data: [
                {
                    name: "Thing 1",
                    image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                    tagID: 9054
                },
                {
                    name: "Thing 2",
                    image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                    tagID: 9054
                },
                {
                    name: "Thing 3",
                    image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                    tagID: 9054
                },
                {
                    name: "Thing 4",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Thing 5",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Thing 6",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Thing 7",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
                {
                    name: "Thing 8",
                    image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                    tagID: 9054
                },
            ]
        }
    ]; 

    const friends = [
        {
            name: "Dr. Seuss",
            image: "https://imageio.forbes.com/blogs-images/insertcoin/files/2018/06/cayde-destiny.jpg?format=jpg&width=1200"
        },
        {
            name: "DaBaby",
            image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG"
        },
        {
            name: "Mommy Milkers",
            image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg"
        },
    ]

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

    const toggleInviteModal = () => {
        setInviteModalVisible(!inviteModalVisible);
    };

    const toggleUserModal = () => {
        setUserProfileModal(!userProfileModal);
    }

    const leaveServer = () => {
        Alert.alert(
            "Delete Channel",
            `Are you sure you want to delete this channel? This is not undoable!`,
            [
                {
                    text: "Delete",
                    //onPress: () => deleteUser(user),
                    style: "destructive"
                },
                {
                    text: "Cancel"
                }
            ]
        )    
    }
           
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
                <MaterialCommunityIcons 
                    name="pound"
                    color={"#E0E0E0"}
                    size={ 25 }
                    style={{ marginRight: 10 }}
                    />
                <Text 
                    style={[styles.fonts, {alignSelf: "center", fontSize: 20}]}
                >
                    Server Example
                </Text>
            </View>

            <View style={styles.lineSeparator} />

            <View style={styles.threeIconsWrapperView}>
                <TouchableOpacity 
                    style={styles.iconAndTextButtons}
                    onPress={toggleInviteModal}
                >
                    <Ionicons 
                        name='person-add'
                        size={25}
                    />
                    <Text style={{ fontFamily: "Avenir Next", fontWeight: "500" }}>
                        Invite
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconAndTextButtons}>
                    <Ionicons 
                        name='notifications'
                        size={25}
                    />
                    <Text style={{ fontFamily: "Avenir Next", fontWeight: "500" }}>
                        Notifications
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.iconAndTextButtons}
                    onPress={leaveServer}
                >
                    <Ionicons 
                        name='close-circle'
                        size={25}
                        color='#ff3b30'
                    />
                    <Text style={{ fontFamily: "Avenir Next", fontWeight: "500", color: "#ff3b30" }}>
                        Delete
                    </Text>
                </TouchableOpacity>
                
            </View>

            <Modal 
                isVisible={inviteModalVisible} 
                backdropOpacity={0.50}
                onBackdropPress={toggleInviteModal}
                style={{ margin: 0 , justifyContent: "flex-end", }}
            >
                <View style={styles.modalView}>
                    <Pressable 
                        onPress={toggleInviteModal} 
                        style={styles.closeButton} 
                    >
                        <Ionicons
                            name="close" 
                            size={35}
                            color = 'black'
                        />
                    </Pressable>

                    <Text 
                        style={[styles.fonts, {alignSelf: "center", fontSize: 20}]}
                    >
                        {`Invite Friends to ServerExample`}
                    </Text>

                    <View style={styles.shareButtonsRowView}>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={[styles.shareCircleButtons, { backgroundColor: "#00BFFF" }]}>
                                <Ionicons 
                                    name='share-outline'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text style={[styles.fonts, { fontWeight: "600", marginTop: 5 }]}>
                                Share
                            </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={[styles.shareCircleButtons, { backgroundColor: "#D0D0D0" }]}>
                                <Ionicons 
                                    name='link-outline'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text style={[styles.fonts, { fontWeight: "600", marginTop: 5 }]}>
                                Copy Link
                            </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={[styles.shareCircleButtons, { backgroundColor: "#39FF5A" }]}>
                                <Ionicons 
                                    name='chatbox-outline'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text style={[styles.fonts, { fontWeight: "600", marginTop: 5 }]}>
                                Messages
                            </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={[styles.shareCircleButtons, { backgroundColor: "#218AFF" }]}>
                                <Ionicons 
                                    name='mail-outline'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <Text style={[styles.fonts, { fontWeight: "600", marginTop: 5 }]}>
                                Email
                            </Text>
                        </View>  
                    </View>

                    <View 
                        style={styles.lineSeparator}
                    />

                    <TextInput 
                        placeholder={`Search Friends`}
                        style={styles.modalTextInput}
                        value={modalTextInput}
                        onChangeText={(text) => setModalTextInput(text)}
                    />
                    <FlatList 
                        data={friends}
                        renderItem={({ item }) => <InviteFriendsListItem item={item}/> }
                        keyExtractor={(item) => item.name}
                        showsVerticalScrollIndicator={true}
                        style={{ marginBottom: 20 }}
                    />
                </View>
            </Modal>

            <View style={styles.textInputWrapper}>
                <TextInput 
                    placeholder={`Search members`}
                    style={styles.textInput}
                    value={textInput}
                    onChangeText={(text) => setTextInput(text)}
                />
                <Ionicons 
                    name='search'
                    size={20}
                />
            </View>

            <SectionList 
                sections={members}
                //stickySectionHeadersEnabled={false}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <ServerSettingsMemberListItem item={item} toggleUserModal={toggleUserModal} setUserProfile={() => setUserProfile(item)} />}
                renderSectionHeader={({ section: { typeOfMembers } }) => (
                  <Text style={styles.sectionListHeader}>
                    { typeOfMembers }
                  </Text>
                )}
            />

            <Modal 
                isVisible={userProfileModal} 
                backdropOpacity={0.50}
                onBackdropPress={() => { toggleUserModal(); setUserProfile(null) }}
                style={{ margin: 0, justifyContent: "flex-end" }}
            >
                {/* <View style={styles.modalView}>
                    <Pressable 
                        onPress={toggleUserModal} 
                        style={styles.closeButton} 
                    >
                        <Ionicons
                            name="close" 
                            size={35}
                            color = 'black'
                        />
                    </Pressable>
                </View> */}
                    { userProfile ?
                        <View style={{ backgroundColor: 'white', flex: 1, marginTop: "100%", borderRadius: 10 }}>
                            <View style={{ alignItems: "center", padding: 20, flexDirection: "row" }}>
                                <Image 
                                    source={{ uri: userProfile.image }}
                                    style={styles.profileImage}
                                />
                                <View>
                                    <Text style={{ fontFamily: "Avenir Next", fontSize: 22.5, fontWeight: "700" }}>
                                        { userProfile.name }
                                    </Text>
                                    <Text style={{ fontFamily: "Avenir Next", fontSize: 17.5, fontWeight: "700", color: "grey" }}>
                                        #{ userProfile.tagID }
                                    </Text>
                                </View>
                            </View>

                            <View style={{ height: 0.5, marginHorizontal: 12.5, backgroundColor: "#E0E0E0" }}/>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: "22.5%", marginVertical: 10 }}>
                                <TouchableOpacity style={{ alignItems: "center" }}>
                                    <Ionicons 
                                        name='chatbox'
                                        size={25}
                                    />
                                    <Text style={{ fontFamily: "Avenir Next", fontWeight: "300" }}>
                                        Message
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ alignItems: "center" }}>
                                    <Ionicons 
                                        name='person-add'
                                        size={25}
                                    />
                                    <Text style={{ fontFamily: "Avenir Next", fontWeight: "300" }}>
                                        Add Friend
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 0.5, marginHorizontal: 12.5, backgroundColor: "#E0E0E0" }}/>

                            <Text style={{ fontFamily: "Avenir Next", fontWeight: "700", margin: 10 }}>
                                About Me
                            </Text>
                            <View style={{ flex:1, backgroundColor: "#E6E6E6", marginHorizontal: 10, marginBottom: 20, borderRadius: 10, padding: 10 }}>
                                <Text style={{ fontFamily: "Avenir Next" }}>
                                    Here is a sample description about me!
                                </Text>
                            </View>
                        </View>
                    :
                        <Text>Error</Text>
                    }
            </Modal>

            {/* <FlatList 
                data={friends}
                renderItem={({ item }) => <ServerSettingsMemberListItem item={item}/> }
                keyExtractor={(item) => item.name}
                showsVerticalScrollIndicator={true}
                style={{ flexGrow: 0 }}
            /> */}
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
///////////////////////////////////////////
    shareButtonsRowView: {
        flexDirection: "row", 
        justifyContent: "space-between",
        margin: 20
    },
    shareCircleButtons: {
        width: 60, 
        height: 60, 
        borderRadius: 60, 
        alignItems: "center", 
        justifyContent: "center", 
        alignContent: "space-between"
    },
    modalTextInput: {
        width: "95%", 
        height: 50, 
        backgroundColor: "#E6E6E6", 
        borderRadius: 5, 
        fontSize: 17.5, 
        fontFamily: "Avenir Next",
        alignSelf: "center",
        paddingHorizontal: 10,
        margin: 20,
    },
///////////////////////////////////////////
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
    },
    closeButton: {
        padding: 10, 
        borderRadius: 10, 
        width: 60
    },
    modalLineSeparator: {
        backgroundColor: 'grey',
        height: 0.5,
        marginLeft: 7.5,
        marginRight: 7.5
    },
///////////////////////////////////////////
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

export default ChatRoomSettingsScreen;
