import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, Text, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessageInputBox from '../components/MessageInputBox';
import { DrawerActions } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ChatMessage from '../components/ChatMessage';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from '../src/graphql/queries';

import { useDispatch, useSelector } from 'react-redux';
import { addMessage, selectMessageItems } from '../redux/features/messageSlice';


const ChatRoomScreen = ({route}) => {
  
const dispatch = useDispatch();
const items = useSelector(selectMessageItems);
const navigation = useNavigation();

const { item } = route.params

function addItemToMessage() {
  dispatch(
    addMessage(
      {
        name: "Redux_User",
        profileImage: "https://pbs.twimg.com/media/Bp8jS-vIQAEu4Hp.jpg",
        time: "12:30 p.m",
        messageContent: "Hey, this is a redux data test."
      }
    )
  )
}

const messages = [
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


    return (
        <View style={{ flex: 1, padding: 5 }}>
            <FlatList
                data={messages} //items
                renderItem={({ item }) => <ChatMessage item={item}/> }
                inverted
                showsVerticalScrollIndicator={false}
            />
            {/* <Button title='Add Message' onPress={addItemToMessage} /> */}
            <MessageInputBox />
        </View>
    );
}; 

const styles = StyleSheet.create({
    
})

export default ChatRoomScreen