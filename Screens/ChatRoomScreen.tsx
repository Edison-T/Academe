import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl, Text, Modal, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessageInputBox from '../components/MessageInputBox';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ChatMessage from '../components/ChatMessage';
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { getChannel, getUser, listMessages, listSchools, messagesByDate } from '../src/graphql/queries';
import { S3Image } from 'aws-amplify-react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import * as mutations from '../src/graphql/mutations';

import { useDispatch, useSelector } from 'react-redux';
import { addMessage, selectMessageItems } from '../redux/features/messageSlice';
import { login, selectUser } from '../redux/features/userSlice';


const ChatRoomScreen = ({route}) => {
const user = useSelector(selectUser);
const [selectedPerson, setSelectedPerson] = useState("Regular User"); //when adding api, change initial value
const [ publicName, setPublicname ] = useState(null);
const [ className, setClassName ] = useState(null);
const [ school, setSchool ] = useState(null);
const [publicProfilePicture, setPublicProfilePicture] = useState(null);
const [classProfilePicture, setClassProfilePicture] = useState(null);
// used for searching schools on first account set up
const [ originalData, setOriginalData ] = useState();
const [ editedData, setEditedData ] = useState();
const [ search, setSearch ] = useState('');
const [ showFlatlist, setShowFlatlist ] = useState(false);
const [ loading, setLoading ] = useState(false);

const [messageReplyTo, setMessageReplyTo] = useState(null);
const [ messages, setMessages ] = useState([]);
const [ nextToken, setNextToken ] = useState('firstPage') //sets nextToken for the next page of messages

const { item } = route.params;
const handleSelected = (value) => {
  setSelectedPerson(value);
};

// useEffect(() => {
//   async function fetchMessages() {
//     try {
//       let filter = {
//         channelID: {
//             eq: item.id // filter priority = 1
//         }
//       };
//       const messagesData = await API.graphql({ query: listMessages, variables: { filter: filter }});
//       setMessages(messagesData.data.listMessages.items)
//     } catch(e) {
//       console.log(e);
//       return;
//     }
//   } fetchMessages();
// }, [item.id]) //in dep array, it rerenders whenever the channel id changes. When you click on new channel, new message info is fetched again.

const fetchMessages = async () => {
  if (nextToken == "firstPage") {
    const messagesData = await API.graphql(
      graphqlOperation(
        messagesByDate, {
          channelID: item.id,
          sortDirection: "DESC",
          limit: 7,
        }
      )
    )
    setMessages(messagesData.data.messagesByDate.items);
    setNextToken(messagesData.data.messagesByDate.nextToken)
  }
  else {
    return;
  }
}

const fetchMessagesPage = async () => {
  if (nextToken) {
    const messagesData = await API.graphql(
      graphqlOperation(
        messagesByDate, {
          channelID: item.id,
          sortDirection: "DESC",
          limit: 7,
          nextToken
        }
      )
    )
    setNextToken(messagesData.data.messagesByDate.nextToken)
    const newMessages = messagesData.data.messagesByDate.items

      const newArrayOfMessages = messages.concat(newMessages);
      setMessages(newArrayOfMessages)
  } else {
    console.log('No more messages are left to fetch')
    return
  }
}

useEffect(() => {
  let ignoreFlag = false;
  if(!ignoreFlag) {
    fetchMessages();
  }
  return () => {
    ignoreFlag = true;
  }
}, [item.id])

useEffect(() => {
  let ignoreFlag = false;
  if(user.typeOfUser === null) {
    async function getSchools() {
      try {
        const schoolsData = await API.graphql({
          query: listSchools
        })
        if(!ignoreFlag) {
          setOriginalData(schoolsData.data.listSchools.items)
          setEditedData(schoolsData.data.listSchools.items)
        }
      } catch (err) {
        console.log({ err });
      }
    }
    getSchools()
    return () => {
      ignoreFlag = true;
    }
  } else {
    return;
  }
}, [])
  
const dispatch = useDispatch();
// const items = useSelector(selectMessageItems);
const navigation = useNavigation();

useEffect(() => {
  (async () => {
    if (Platform.OS !== "web") {
      const libraryResponse =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const photoResponse = 
        await ImagePicker.requestCameraPermissionsAsync();
      if (
        libraryResponse.status !== "granted" || 
        photoResponse.status !== "granted"
      ) {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  })();
}, []);

const pickPublicProfilePicture = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    setPublicProfilePicture(result.uri);
  }
};

const pickClassProfilePicture = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    setClassProfilePicture(result.uri);
  }
};

// const { item } = route.params
// function addItemToMessage() {
//   dispatch(
//     addMessage(
//       {
//         name: "Redux_User",
//         profileImage: "https://pbs.twimg.com/media/Bp8jS-vIQAEu4Hp.jpg",
//         time: "12:30 p.m",
//         messageContent: "Hey, this is a redux data test."
//       }
//     )
//   )
// }

const dummyMessages = [
  {
    name: "eddyTang",
    profileImage: "https://schoolassets.s3.amazonaws.com/logos/2067/2067.png",
    time: "12:25 p.m",
    messageContent: "for real"
  },
  {
    name: "myaKarll",
    profileImage: "https://pbs.twimg.com/media/Bp8jS-vIQAEu4Hp.jpg",
    time: "12:22 p.m",
    messageContent: "vic, you are the best"
  },
  {
    name: "Vic",
    profileImage: "https://preview.redd.it/wrxbxq6t3d721.jpg?auto=webp&s=64112884908d0253ccce20f6dff45dcfd9e63c89",
    time: "12:20 p.m",
    messageContent: "Copy that, it's opened!"
  },
  {
    name: "eddyTang",
    profileImage: "https://schoolassets.s3.amazonaws.com/logos/2067/2067.png",
    time: "12:16 p.m",
    messageContent: "Hey Vic! Nice to meet you! So I just wanted to ask if you can open up/create a new channel for possible scholarships for computer programming?"
  },
  {
    name: "notAnNPC",
    profileImage: "http://assets.stickpng.com/images/5ec287be6add2c0004e5326b.png",
    time: "12:15 p.m",
    messageContent: "this app really about to solve all my life's problems"
  },
  {
    name: "mynameisjeff",
    profileImage: "https://i.pinimg.com/550x/b4/d7/75/b4d7757fbdf9d5609dcadadf460853a8.jpg",
    time: "12:11 p.m",
    messageContent: "Thank you!"
  },
  {
    name: "Vic!",
    profileImage: "https://preview.redd.it/wrxbxq6t3d721.jpg?auto=webp&s=64112884908d0253ccce20f6dff45dcfd9e63c89",
    time: "12:10 p.m",
    messageContent: "Welcome everyone! My name is Victor Chun (call me Vic) and I'm one of the mentors for this server. Make sure to keep this chat clean, and we'll help you in any way possible! Just tag us!"
  },
  {
    name: "notAnNPC",
    profileImage: "http://assets.stickpng.com/images/5ec287be6add2c0004e5326b.png",
    time: "12:09 p.m",
    messageContent: "that's true, that's true"
  },
  {
    name: "dababy",
    profileImage: "https://s4.anilist.co/file/anilistcdn/character/large/b63845-43rWjycWhYFF.png",
    time: "12:08 p.m",
    messageContent: "lolll, facts but hey that's why we're here"
  },
  {
    name: "myaKarll",
    profileImage: "https://pbs.twimg.com/media/Bp8jS-vIQAEu4Hp.jpg",
    time: "12:07 p.m",
    messageContent: "agreed"
  },
  {
    name: "notAnNPC",
    profileImage: "http://assets.stickpng.com/images/5ec287be6add2c0004e5326b.png",
    time: "12:06 p.m",
    messageContent: "college is a pain"
  },
  {
    name: "jonnyRamm",
    profileImage: "https://wikiofcelebs.com/wp-content/uploads/2021/07/Noel-Deyzel.jpg",
    time: "12:05 p.m",
    messageContent: "Heyyy, whats up!"
  },
  {
    name: "eddyTang",
    profileImage: "https://schoolassets.s3.amazonaws.com/logos/2067/2067.png",
    time: "12:01 p.m",
    messageContent: "Hello everyone!"
  },

]

useLayoutEffect (() => {
    navigation.setOptions({
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons 
                name='menu'
                color="#00BFFF"
                size={30}
                style={{ marginLeft: 10 }}
              />
            </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('ChatRoomSettingsScreen')}
              >
              <MaterialCommunityIcons
                    name="account-cog-outline" 
                    size={30}
                    color = 'black'
                />
            </TouchableOpacity>
            </View>
          )
}), [navigation]});

// function updateUserRedux() {
//   dispatch(login({
//     id: userData.data.getUser.id,
//     className: userData.data.getUser.className,
//     classTagNumber: userData.data.getUser.classTagNumber,
//     classProfilePicture: userData.data.getUser.classProfilePicture,
//     publicName: userData.data.getUser.publicName,
//     publicTagNumber: userData.data.getUser.publicTagNumber,
//     publicProfilePicture: userData.data.getUser.publicProfilePicture,
//     status: userData.data.getUser.status,
//     typeOfUser: userData.data.getUser.typeOfUser,
//     lastOnlineAt: userData.data.getUser.lastOnlineAt,
//     schoolID: userData.data.getUser.schoolID,
//     email: email,
//   }));
// }

// items in schools flatlist
const ItemView = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => { setShowFlatlist(false); setSchool(item); }}
      style={{ padding: 10 }}
    >
      <Text style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
        {item.schoolName}
      </Text>
    </TouchableOpacity>
  )
};
// item separator
const ItemSeparatorComponent = () => {
  return (
    <View style={{ height: 0.5, backgroundColor: 'grey', marginHorizontal: "2.5%", }}
    />
  )
}
// function used to search schools
const searchFilter = (text) => {
  if(text) {
    const newData = originalData.filter((item) => {
      const itemData = item.schoolName ? item.schoolName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    })
    setEditedData(newData);
    setSearch(text)
  } else {
    setEditedData(originalData);
    setSearch(text)
  }
}
// updates user on first sign up
const updateUserSetUp = async () => {
  setLoading(true);
  if(publicProfilePicture && !classProfilePicture) {
    try {
      const blob = await getBlob(publicProfilePicture);
      const {key} = await Storage.put(`${uuid.v4()}.png`, blob);

      const userDetails = {
        id: user.id,
        className: className,
        //classProfilePicture: classProfilePicture,
        publicName: publicName,
        publicProfilePicture: key,
        typeOfUser: selectedPerson,
        schoolID: school.id,
      };
      await API.graphql({ query: mutations.updateUser, variables: {input: userDetails}})
      setLoading(false)
    } catch (e) {
      console.log(e)
      return
    }
  } else if (classProfilePicture && !publicProfilePicture) {
    try {
      const blob = await getBlob(classProfilePicture);
      const {key} = await Storage.put(`${uuid.v4()}.png`, blob);

      const userDetails = {
        id: user.id,
        className: className,
        classProfilePicture: key,
        publicName: publicName,
        //publicProfilePicture: publicProfilePicture,
        typeOfUser: selectedPerson,
        schoolID: school.id,
      };
      await API.graphql({ query: mutations.updateUser, variables: {input: userDetails}})
      setLoading(false)
    } catch (e) {
      console.log(e)
      return
    }
  } else if (publicProfilePicture && classProfilePicture) {
    try {
      async function first() {
        const blob = await getBlob(classProfilePicture);
        const {key} = await Storage.put(`${uuid.v4()}.png`, blob);
        const userDetails = {
          id: user.id,
          className: className,
          classProfilePicture: key,
          publicName: publicName,
          //publicProfilePicture: key,
          typeOfUser: selectedPerson,
          schoolID: school.id,
        };
        await API.graphql({ query: mutations.updateUser, variables: {input: userDetails}})
      };
      async function second() {
        const blob = await getBlob(publicProfilePicture);
        const {key} = await Storage.put(`${uuid.v4()}.png`, blob);
        const userDetails = {
          id: user.id,
          publicProfilePicture: key,
        };
        await API.graphql({ query: mutations.updateUser, variables: {input: userDetails}})
        setLoading(false)
        console.log('finished')
      }
      first().then(() => second()).catch((e) => {console.log(e); return})
    } catch (e) {
      console.log(e)
      return
    }
  } else if (!publicProfilePicture && !classProfilePicture) {
    try {
      const userDetails = {
        id: user.id,
        className: className,
        publicName: publicName,
        typeOfUser: selectedPerson,
        schoolID: school.id,
      };
      await API.graphql({ query: mutations.updateUser, variables: {input: userDetails}})
      setLoading(false)
    } catch (e) {
      console.log(e)
      return
    }
  }
};

const getBlob = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
}

    return (
        <KeyboardAvoidingView
         style={{ flex: 1, padding: 5 }}
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         keyboardVerticalOffset={77}
        >
            <FlatList
                onEndReachedThreshold={0}
                onEndReached={fetchMessagesPage}
                data={messages} //items
                renderItem={({ item }) => 
                  <ChatMessage item={item} setAsMessageReply={() => setMessageReplyTo(item)}/> 
                }
                inverted
                showsVerticalScrollIndicator={false}
            />
            
            <MessageInputBox 
              channelID={item.id}
              messageReplyTo={messageReplyTo} 
              removeMessageReplyTo={() => setMessageReplyTo(null)}
            />

            { user.typeOfUser === null ? 
              <View style={styles.modalView}>
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                  <Text style={styles.welcomeText} >
                    Welcome to Academe. Let's get you set up!
                  </Text>

                  <Text style={styles.subHeaderText}>
                      Create Public Profile
                  </Text>
                  <View style={{ alignItems: "center", padding: 5, flexDirection: "row" }}>
                      <TouchableOpacity 
                        style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                        activeOpacity={0.5}
                        onPress={pickPublicProfilePicture}
                      >
                          { publicProfilePicture ?
                              <Image 
                                style={styles.profileImage}
                                source={{ uri: publicProfilePicture }}
                              />
                            :
                              <S3Image 
                                imgKey={user.publicProfilePicture}
                                style={styles.profileImage}
                              />
                          }
                          <View style={styles.addIcon}>
                              <MaterialCommunityIcons 
                              name='plus'
                              color={'white'}
                              size={15}
                              />
                          </View>
                      </TouchableOpacity>
                      <View style={{ width: "75%" }}>
                          <TextInput 
                              style={styles.nameTextInput}
                              value={publicName}
                              maxLength={32}
                              placeholder='Your name in public'
                              onChangeText={(text) => setPublicname(text)}
                          />
                      </View>
                  </View>

                  <Text style={[styles.subHeaderText, { marginTop: 20, marginBottom: 10 }]}>
                    What are you?
                  </Text>
                  <View style={styles.optionWrapper}>
                    <Option
                        option={'Student'}
                        onPress={handleSelected}
                        value={selectedPerson}
                    />
                    <Option
                        option={'Teacher'}
                        onPress={handleSelected}
                        value={selectedPerson}
                    />
                    <Option
                        option={'Regular User'}
                        onPress={handleSelected}
                        value={selectedPerson}
                    />
                  </View>

                  { selectedPerson !== "Regular User" ?
                    <View style={{ borderWidth: 0.5, width: "95%", marginTop: 20, padding: 10, borderRadius: 10, alignItems: "center", borderColor: "#F0F0F0"}} >
                      <Text style={[styles.subHeaderText, { marginLeft: 0, marginBottom: 10}]}>
                        Which school district do you attend?
                      </Text>

                      { school ? 
                        <View style={{ flexDirection: 'row', alignItems: "center", backgroundColor: "#e6e6e6", width: "75%", justifyContent: "space-between", borderRadius: 10, padding: 10, marginVertical: "2.5%" }}>
                          <Text style={[styles.subHeaderText, { marginLeft: 0 }]}>
                            {school.schoolName}
                          </Text>
                          <Pressable 
                            onPress={() => { setSchool(null); setShowFlatlist(true) }}
                          >
                            <Ionicons 
                              name='close-circle-outline'
                              size={25}
                              color='#00BDFF'
                            />
                          </Pressable>
                        </View>
                      :
                        <TextInput 
                          style={{ backgroundColor: '#E6E6E6', width: "100%", borderRadius: 5, padding: 10}}
                          value={search}
                          placeholder='Search'
                          onChangeText={(text) => searchFilter(text)}
                          onFocus={() => setShowFlatlist(true)}
                          clearButtonMode='always'
                        />
                      }

                      { showFlatlist ?
                        <FlatList 
                        data={editedData}
                        keyExtractor={(item) => item.schooName}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        renderItem={ItemView}
                        style={{ width: "100%", maxHeight: "40%", marginVertical: "2.5%" }}
                        />
                      :
                        null
                      }

                      <Text style={[styles.subHeaderText, { marginLeft: 0, marginTop: 10 }]}>
                        Create Class Profile
                      </Text>
                      <View style={{ alignItems: "center", padding: 5, flexDirection: "row" }}>
                          <TouchableOpacity 
                            style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                            activeOpacity={0.5}
                            onPress={pickClassProfilePicture}
                          >
                              { classProfilePicture ?
                                  <Image 
                                    style={styles.profileImage}
                                    source={{ uri: classProfilePicture }}
                                  />
                                :
                                  <S3Image 
                                    imgKey={user.classProfilePicture}
                                    style={styles.profileImage}
                                  />
                              }
                              <View style={styles.addIcon}>
                                  <MaterialCommunityIcons 
                                  name='plus'
                                  color={'white'}
                                  size={15}
                                  />
                              </View>
                          </TouchableOpacity>
                          <View style={{ width: "77.5%" }}>
                              <TextInput 
                                  style={styles.nameTextInput}
                                  value={className}
                                  maxLength={32}
                                  placeholder='Your name for class'
                                  onChangeText={(text) => setClassName(text)}
                              />
                          </View>
                      </View>


                    </View>
                  :
                    null
                  }

                  <TouchableOpacity 
                      style={styles.confirmSetUpButton}
                      onPress={updateUserSetUp}
                  >
                    { loading ?
                      <ActivityIndicator size="small" color="white" />
                    :
                      <>
                      <Ionicons 
                        name='checkmark'
                        size={30}
                        color='white'
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.confirmSetUpText}>
                          Confirm Set Up
                      </Text>
                      </>
                    }
                  </TouchableOpacity>
                </ScrollView>
              </View>  
            :
              null
            }
      </KeyboardAvoidingView>
    );
}; 

function Option({ option, onPress, value }) {
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
              style={{ marginLeft: 10 }}
              />
          :
              null
          }
      </TouchableOpacity>
      <View style={{ height: 1 }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  subHeaderText: {
    alignSelf: "flex-start", 
    marginLeft: "2.5%", 
    fontSize: 15, 
    fontWeight: "600", 
    marginVertical: 5, 
    color: "#404040",
  },
  welcomeText: {
    fontFamily: "Avenir Next", 
    fontWeight: "700", 
    alignSelf: "center", 
    fontSize: 25,
    marginHorizontal: "15%",
    textAlign: "center",
    marginVertical: "5%",
  },
  nameTextInput: {
    fontFamily: "Avenir Next", 
    fontSize: 20, 
    fontWeight: "600", 
    backgroundColor: "#E6E6E6", 
    padding: 10, 
    borderRadius: 10,
  },
  editClassNameInput: {
    backgroundColor: "#E6E6E6",
    width: "100%",
    borderRadius: 5, 
    fontFamily: "Avenir Next",
    padding: 10,
    fontSize: 15, 
    fontWeight: "600",
    alignSelf: "center"
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 15
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
  },
  buttons: {
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontFamily: "Avenir Next",
    fontWeight: "600",
    fontSize: 15,
  },
  optionWrapper: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "95%", 
    justifyContent: "space-between",
  },
  confirmSetUpButton: {
    width: "95%", 
    height: 50, 
    backgroundColor: '#00BDFF', 
    alignItems: "center", 
    justifyContent: "center", 
    alignSelf: "center", 
    borderRadius: 5, 
    marginVertical: 20,
    flexDirection: 'row',
  },
  confirmSetUpText: {
    fontSize: 17.5, 
    fontWeight: "700", 
    color: "white"
  },
})

export default ChatRoomScreen