import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, FlatList, TextInput, Image, Text, KeyboardAvoidingView, Pressable, SectionList } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { DrawerActions } from '@react-navigation/native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { SafeAreaView } from 'react-native-safe-area-context';
import InviteFriendsListItem from '../components/InviteFriendsListItem';
import CreateNewDMListItem from '../components/CreateNewDMListItem';


const FriendsScreen = () => {
  const [ createDMModal, setCreateDMModal ] = useState(false);
  const [ addFriendsModal, setAddFriendsModal ] = useState(false);
  const [ searchFriendTextInput, setSearchFriendTextInput ] = useState('');
  const [ addFriendTextInput, setAddFriendTextInput ] = useState('');

    const navigation = useNavigation();

    const toggleCreateDMModal = () => {
      setCreateDMModal(!createDMModal);
    };
    const toggleAddFriendsModal = () => {
        setAddFriendsModal(!addFriendsModal);
    };

    useLayoutEffect (() => {
        navigation.setOptions({
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    activeOpacity={0.5}
                    onPress={toggleAddFriendsModal}
                  >
                    <MaterialCommunityIcons 
                    name='account-plus-outline'
                    size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    activeOpacity={0.5}
                    onPress={toggleCreateDMModal}
                  >
                    <MaterialCommunityIcons 
                    name='comment-plus-outline'
                    size={30}
                    />
                  </TouchableOpacity>
                </View>
              )
        }), [navigation]
    });

    const friends = [
      {
          status: "Online",
          data: [
              {
                  name: "Dr. Seuss",
                  image: "https://imageio.forbes.com/blogs-images/insertcoin/files/2018/06/cayde-destiny.jpg?format=jpg&width=1200",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 0",
                  image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                  tagID: 9054,
                  status: "Online",
              },
              {
                  name: "Example 1",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 2",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 3",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 4",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 5",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 6",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 7",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 8",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 9",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 10",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
              {
                  name: "Example 11",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Online"
              },
          ] 
      },
      {
          status: "Offline",
          data: [
              {
                  name: "Thing 1",
                  image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 2",
                  image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 3",
                  image: "https://destiny.wiki.gallery/images/e/e3/Pulled_Pork_Destiny.PNG",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 4",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 5",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 6",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 7",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Offline"
              },
              {
                  name: "Thing 8",
                  image: "https://i.pinimg.com/originals/dd/39/81/dd39810812f373e112e763aa6684de9d.jpg",
                  tagID: 9054,
                  status: "Offline"
              },
          ]
      }
    ]; 
    const numberInSection  = (status) => (friends.filter(i => i.status===status).map(i => i.data).map(i => i.length))

    const simplerFriends = [
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

    return (
        <SafeAreaView style={styles.container}>
          <SectionList 
            sections={friends}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <CreateNewDMListItem item={item} />}
            renderSectionHeader={({ section: { status } }) => (
              <Text style={styles.sectionListHeader}>
                { status } - {numberInSection(status)}
              </Text>
            )}
          />

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
                    style={{alignSelf: "center", fontSize: 20, fontFamily: 'Avenir Next', fontWeight: "700"}}
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
                    data={simplerFriends}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#F4F4F4",
      marginTop: "-5%"
  },
  sectionListHeader: {
    fontFamily: "Avenir Next", 
    fontWeight: "700", 
    padding: 10,
    color: "#404040",
    marginHorizontal: 0,
    backgroundColor: "transparent",
  },
  /////////////////////////////////
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
    marginTop: "40%"
    },
  closeButton: {
    padding: 10, 
    borderRadius: 10, 
    width: 60
  },
  searchFriendTextInputWrapper: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%", 
    backgroundColor: "#E6E6E6", 
    paddingHorizontal: 10, 
    alignSelf: "center", 
    maxWidth: "95%", 
    borderRadius: 5, 
    marginVertical: 20
  },
  searchFriendTextInput: {
    flex: 1,
    borderRadius: 5, 
    fontSize: 17.5, 
    fontFamily: "Avenir Next",
    alignSelf: "center",
    paddingVertical: 10,
  },
  ////////////////////////////
  buttons: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#00BFFF",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
},
titleText: {
    fontFamily: "Avenir Next",
    fontWeight: "700",
    fontSize: 30,
    margin: 10,
    textAlign: "center"
},
subHeadingText: {
    fontFamily: "Avenir Next",
    fontWeight: "500", 
    fontSize: 17.5,
    width: 400, 
    textAlign: "center",
},
addFriendTextInput: {
    width: "90%", 
    height: 50, 
    backgroundColor: "#E6E6E6", 
    borderRadius: 10, 
    fontSize: 17.5, 
    padding: 10, 
    textAlign: "center", 
    fontFamily: "Avenir Next",
    marginTop: 15,
},
createButtonText: {
    fontFamily: "Avenir Next",
    fontWeight: "700", 
    fontSize: 17.5,
    color: "white"
},
});

export default FriendsScreen