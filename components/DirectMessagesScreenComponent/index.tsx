import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import ChannelListItem from '../ChannelListItem';
import DirectMessagesListItem from '../DirectMessagesListItem';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import InviteFriendsListItem from '../InviteFriendsListItem';
import CreateNewDMListItem from '../CreateNewDMListItem';


const DirectMessagesScreenComponent = () => {
    const [ createDMModal, setCreateDMModal ] = useState(false);
    const [ addFriendsModal, setAddFriendsModal ] = useState(false);
    const [ searchFriendTextInput, setSearchFriendTextInput ] = useState('');
    const [ addFriendTextInput, setAddFriendTextInput ] = useState('');

    const navigation = useNavigation();

    const friends = [
        {
            name: "Ruwbix",
            image: "https://imageio.forbes.com/blogs-images/insertcoin/files/2018/06/cayde-destiny.jpg?format=jpg&width=1200",
            status: "Online"
        },
        {
            name: "Anthony Rizz",
            image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
            status: "Online"
        },
        {
            name: "polarity",
            image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
            status: "Offline"
        },
    ]; 

    const toggleCreateDMModal = () => {
        setCreateDMModal(!createDMModal);
    };
    const toggleAddFriendsModal = () => {
        setAddFriendsModal(!addFriendsModal);
    };
           
    return (
        <View style={styles.container}>
            <View style={styles.nameAndEllipsisContainer}>
                <Text style={[styles.fonts, { fontSize: 18 }]}>
                    Direct Messages
                </Text>
                <TouchableOpacity 
                    style={{ alignItems: "flex-end" }} 
                    activeOpacity={0.5}
                    onPress={toggleCreateDMModal}
                >
                    <Ionicons 
                        name="create-outline"
                        size={22.5}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.inviteButtonView} 
                activeOpacity={0.5}
                onPress={toggleAddFriendsModal}
            >
                <View style={styles.inviteButtonIconAndText}>
                    <Ionicons 
                        name="person-add"
                        size={17.5}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.fonts, { fontSize: 12.5 }]}>
                        Add Friends
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal 
                isVisible={createDMModal} 
                backdropOpacity={0.50}
                onBackdropPress={toggleCreateDMModal}
                style={{ margin: 0 , justifyContent: "flex-end", }}
            >
                    <View style={styles.modalView}>
                        <Pressable 
                            onPress={toggleCreateDMModal} 
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
                            Invite friends to message
                        </Text>

                        <View style={styles.searchFriendTextInputWrapper}>
                            <TextInput 
                                placeholder={`Search friends`}
                                style={styles.searchFriendTextInput}
                                value={searchFriendTextInput}
                                onChangeText={(text) => setSearchFriendTextInput(text)}
                            />
                            <Ionicons 
                                name='search'
                                size={20}
                            />
                        </View>

                        <FlatList 
                            data={friends}
                            renderItem={({ item }) => <CreateNewDMListItem item={item}/> }
                            keyExtractor={(item) => item.name}
                            showsVerticalScrollIndicator={true}
                            style={{ marginBottom: 20 }}
                        />
                    </View>
            </Modal>

            <Modal 
                isVisible={addFriendsModal} 
                backdropOpacity={0.50}
                onBackdropPress={toggleAddFriendsModal}
                style={{ margin: 0 , justifyContent: "flex-end" }}
            >
                    <View style={styles.modalView}>
                        <Pressable 
                            onPress={toggleAddFriendsModal} 
                            style={styles.closeButton} 
                        >
                            <Ionicons
                                name="close" 
                                size={35}
                                color = 'black'
                            />
                        </Pressable>

                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.titleText}>
                                Add your friend on Academe
                            </Text>

                            <Text style={styles.subHeadingText} >
                                You will need both their username and a tag. Keep in mind that username is case sensitive
                            </Text>

                            <TextInput 
                                placeholder="Username#0000" 
                                style={styles.addFriendTextInput}
                                autoFocus
                                value={addFriendTextInput} 
                                maxLength={32}
                                onChangeText={(text) => setAddFriendTextInput(text)}
                            />

                            <TouchableOpacity style={styles.buttons} activeOpacity={0.5}>
                                <Text style={styles.createButtonText}>
                                    Send Friend Request
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>

            <FlatList 
                data={friends}
                renderItem={({ item }) => <DirectMessagesListItem item={item}/>}
                showsVerticalScrollIndicator={false}
            />
        </View>
        
    )
}

export default DirectMessagesScreenComponent;