import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Pressable, TextInput, Image, TouchableHighlight } from 'react-native';
import Modal from "react-native-modal";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import ChannelListItem from '../ChannelListItem';
import { useNavigation } from '@react-navigation/native';
import InviteFriendsListItem from '../InviteFriendsListItem';
import { API, graphqlOperation } from 'aws-amplify';
import { getServer } from '../../Screens/queries';
import CategoryListItem from '../CategoryListItem';

const ServerScreenComponent = (props) => {
    const [inviteModalVisible, setInviteModalVisible] = useState(false);
    const [serverOptionModal, setServerOptionModal] = useState(false);

    const { server } = props;
    const categories = server.categories.items;

    const [textInput, setTextInput] = useState('');

    const toggleInviteModal = () => {
        setInviteModalVisible(!inviteModalVisible);
    };

    const toggleServerOptionsModal = () => {
        setServerOptionModal(!serverOptionModal);
    };

    const navigation = useNavigation();

    const navigateToEditServerScreen = () => {
        setServerOptionModal(!serverOptionModal);
        navigation.navigate('EditServerScreens', { screen: 'EditServerScreen' });
    }

    const serverDescription = "This server brings together the best of the web and mobile for making apps that run everywhere"

    const numberOfMembers = 6854

    const friends = [
        {
            name: "Edison Tang",
            image: "https://i.pinimg.com/564x/2f/c3/3f/2fc33fbc2d57c12f130b9c8af498341a.jpg",
        },
        {
            name: "Jared Dewey",
            image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
        },
        {
            name: "Adam Kolgaard",
            image: "https://i.kym-cdn.com/entries/icons/original/000/036/482/cover5.jpg"
        },
    ]

    // useEffect(() => {
    //     let ignoreFlag = false;
    //     const fetchServerInfo = async () => {
    //         try {
    //           const serverInfo = await API.graphql(
    //               graphqlOperation(
    //                   getServer, {
    //                       id: server.id,
    //                   },
    //               ),
    //           )
    //           if(!ignoreFlag) {
    //             setCategories(serverInfo.data.getServer.categories.items)
    //           }
    //       } catch (e) {
    //           console.log(e);
    //           return
    //       }
    //     }
    //     fetchServerInfo()
    //     return () => {
    //         ignoreFlag = true;
    //     }
    // }, [server.id])


    const flatlistAnnouncementHeader = () => (
        <TouchableHighlight 
            style={styles.announcementsMainView}
            activeOpacity={0.5}
            underlayColor="#E6E6E6"
            onPress={() => navigation.navigate('AnnouncementsScreen')}
        >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={styles.announcementsAndTextSubView}>
                    <MaterialCommunityIcons 
                        name="bullhorn-variant"
                        size={ 17 }
                        style={{ margin: 5, marginLeft: 12.5 }}
                        color={'#0BDFFF'}
                    />
                    
                    <Text style={[styles.fonts, { fontSize: 15 }]}>
                        announcements
                    </Text>
                </View>
                <View style={{ width: 17, height: 17, backgroundColor: "red", borderRadius: 17, margin: 5, marginRight: 12.5, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: "white" }}>1</Text>
                </View>
                
            </View>
        </TouchableHighlight>
    )
    
    return (
        <View style={styles.container}>

            <View style={styles.nameAndEllipsisContainer}>
                    <Text style={[styles.fonts, { fontSize: 18 }]}>
                        {server.name}
                    </Text>
                
                <TouchableOpacity 
                    style={{ alignItems: "flex-end" }} 
                    activeOpacity={0.5}
                    onPress={toggleServerOptionsModal}
                >
                    <Ionicons 
                        name="ellipsis-horizontal"
                        size={22.5}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={[styles.inviteButtonView, {backgroundColor: "#E6E6E6"}]} 
                activeOpacity={0.5}
                onPress={toggleInviteModal}
                >
                <View style={styles.inviteButtonIconAndText}>
                    <Ionicons 
                        name="person-add"
                        size={17.5}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.fonts, { fontSize: 12.5 }]}>
                        Invite
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.inviteButtonView, { backgroundColor: "white" }]} 
                activeOpacity={0.5}
                onPress={() => navigation.navigate('EditServerScreens', { 
                    screen: 'CreateCategoriesAndChannelsScreen',
                    params: { 
                        goBackWhere: "ChatRoomScreen", 
                        serverID: server.id,
                        categories: categories
                    },
                })}
                >
                <View style={styles.inviteButtonIconAndText}>
                    <Ionicons 
                        name="add"
                        size={17.5}
                        color="#0BBFFF"
                        style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.fonts, { fontSize: 12.5, color: "#00BFFF" }]}>
                        Create
                    </Text>
                </View>
            </TouchableOpacity>

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
                            {`Invite Friends to ${server}`}
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
                            style={styles.textInput}
                            value={textInput}
                            onChangeText={(text) => setTextInput(text)}
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

            <Modal 
                isVisible={serverOptionModal} 
                backdropOpacity={0.50}
                onBackdropPress={toggleServerOptionsModal}
                style={{ margin: 0 , justifyContent: "flex-end", }}
            >
                    <View style={styles.modalView}>
                        <Pressable 
                            onPress={toggleServerOptionsModal} 
                            style={styles.closeButton} 
                        >
                            <Ionicons
                                name="close" 
                                size={35}
                                color = 'black'
                            />
                        </Pressable>

                        <Image 
                            source={{ uri: "https://png.pngtree.com/png-vector/20200921/ourlarge/pngtree-red-and-black-logo-png-image_2348180.jpg"}}
                            style={styles.serverImageForModal}
                        />

                        <Text 
                            style={[styles.fonts, { fontSize: 25, margin: 10, marginLeft: 15 }]}
                        >
                            {`${server}`}
                        </Text>

                        <Text 
                            style={[styles.fonts, { fontSize: 15, marginLeft: 15, fontWeight: "300" }]}
                        >
                            {`${serverDescription}`}
                        </Text>

                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 60, marginTop: 10}}>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <View style={{ width: 15, height: 15, borderRadius: 10, backgroundColor: "#00BFFF", margin: 5 }}/>
                                <Text style={[styles.fonts, {fontWeight: "400"}]}>{`${numberOfMembers} Members`}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center",}}>
                                <Ionicons 
                                    name='globe-outline'
                                    size={20}
                                    style={{margin: 5}}
                                />
                                <Text>
                                    Public Server
                                </Text>
                            </View>
                        </View>

                        <View 
                            style={[styles.lineSeparator, { margin: 15 }]}
                        />

                        <TouchableOpacity 
                            style={{ alignItems: "center" }}
                            activeOpacity={0.5}
                            //onPress
                        >
                            <Ionicons 
                                name='notifications'
                                size={30}
                            />
                            <Text style={[styles.fonts, { fontWeight: "500" }]}>
                                Notifications
                            </Text>
                        </TouchableOpacity>

                        <View 
                            style={[styles.lineSeparator, { margin: 15 }]}
                        />

                        <TouchableOpacity 
                            style={{ alignItems: "center" }}
                            activeOpacity={0.5}
                            onPress={navigateToEditServerScreen}
                            >
                            <Ionicons 
                                name='cog'
                                size={30}
                            />
                            <Text style={[styles.fonts, { fontWeight: "500" }]}>
                                Edit Server
                            </Text>
                        </TouchableOpacity>

                        <View 
                            style={[styles.lineSeparator, { margin: 15 }]}
                        />

                        <TouchableOpacity style={{ width: "85%", height: 40, backgroundColor: 'red', alignItems: "center", justifyContent: "center", alignSelf: "center", borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "700", color: "white" }}>
                                Leave Server
                            </Text>
                        </TouchableOpacity>

                    </View>
            </Modal>

            { categories.length > 0 ?
                <FlatList 
                    data={categories}
                    renderItem={({ item }) => <CategoryListItem item={item}/>}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={flatlistAnnouncementHeader}
                />
            :
                <View>
                    <Image 
                        source={require("../../assets/folder.png")}
                        style={styles.noCategoriesImage}
                    />
                    <Text style={styles.noCategoriesText}>
                        Your server does not have any categories or channels yet. Press the "+ Create" button to create some!
                    </Text>
                </View>
            }
        </View>
        
    )
}

export default ServerScreenComponent;