import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, Text, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessageInputBox from '../components/MessageInputBox';
import { DrawerActions } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ChatMessage from '../components/ChatMessage';
import { Auth } from 'aws-amplify';
import AnnouncementListItem from '../components/AnnouncementListItem';


const AnnouncementsScreen = ({route}) => {

const navigation = useNavigation();

const messages = [
  {
    name: "Edison Tang",
    profileImage: "https://schoolassets.s3.amazonaws.com/logos/2067/2067.png",
    time: "12:01 P.M",
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            renderItem={({ item }) => <AnnouncementListItem item={item}/> }
            inverted
            showsVerticalScrollIndicator={false}
          />
          <MessageInputBox />
        </View>
    );
}; 

const styles = StyleSheet.create({
    
})

export default AnnouncementsScreen