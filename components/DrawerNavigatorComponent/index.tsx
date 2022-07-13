import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, SectionList, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServerScreenComponent from '../ServerScreenComponent';
import { useNavigation } from '@react-navigation/native';
import DirectMessagesScreenComponent from '../DirectMessagesScreenComponent';
import ServerListItem from '../ServerListItem';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../Screens/queries';

import { addServer, selectServerItems } from '../../redux/features/serverSlice';
import { useDispatch, useSelector } from 'react-redux';

const DrawerNavigatorComponent = ({route}) => {
    const [ toggleDirectMessagesComponent, setToggleDirectMessagesComponent ] = useState(false);
    const [ server, setServer ] = useState(null);
    const [ fetchedServers, setFetchedServers] = useState([])
    
    const navigation = useNavigation();  

    useEffect(() => {
        let ignoreFlag = false;
        const fetchServers = async () => {
            try {
              const userInfo = await Auth.currentAuthenticatedUser();
              const userData = await API.graphql(
                  graphqlOperation(
                      getUser, {
                          id: userInfo.attributes.sub,
                      },
                  ), 
              )
              if(!ignoreFlag) {
                setFetchedServers(userData.data.getUser.serverUsers.items.map((object) => object.server))
              }
          } catch (e) {
              console.log(e);
              return
          }
        }
        fetchServers()
        return () => {
            ignoreFlag = true;
        }
    }, [])

    const servers = [
        {
            serverIconName: "school-outline" as const,
            data: fetchedServers.filter((server) => server.typeOfServer === "Class")
        },
        {
            serverIconName: "people-outline" as const,
            data: fetchedServers.filter((server) => server.typeOfServer === "Group")
        },
        {
            serverIconName: "planet-outline" as const,
            data: fetchedServers.filter((server) => server.typeOfServer === "Public")
        }
    ];

    const sectionListHeaderDMComponent = () => (
        <TouchableOpacity
            onPress={() => { setToggleDirectMessagesComponent(true) }}
            activeOpacity={0.5} 
            style={styles.directMessageIcon}
        >
            <Ionicons 
                name='chatbox'
                color='#00BFFF'
                size={30}
            />
        </TouchableOpacity>
    );

    const sectionListFooterAddComponent = () => (
        <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() => navigation.navigate('AddAndJoinServerScreens', { screen: 'LookingForMoreScreen' })}
            style={styles.addNewServerButton}
        >
            <Ionicons 
                name='add'
                color='#00BFFF'
                size={35}
                style={{left: 1.5}}
            />
         </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark"/>
             {/* <View style={styles.serverNavigator} >
                <TouchableOpacity
                    onPress={() => { setToggleDirectMessagesComponent(!toggleDirectMessagesComponent) }}
                    activeOpacity={0.5} 
                    style={styles.directMessageIcon}
                >
                    <Ionicons 
                        name='chatbox'
                        color='#00BFFF'
                        size={30}
                    />
                </TouchableOpacity>

                <Ionicons
                    name="school-outline" 
                    style={styles.schoolIcon}
                    size={30}
                    color = 'black'
                />
                <View
                    style={{
                        backgroundColor: 'black',
                        height: 3,
                        borderRadius: 10,
                        margin: 5
                    }}
                />
                <FlatList
                    //ItemSeparatorComponent={renderSeparator}
                    data={images}
                    renderItem={({ item }) => <ImageListItem item={item}/> } //onLongPress={() => confirmDelete(item.chatRoom)}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                />
                
                <Ionicons
                    name="people-outline" 
                    style={styles.schoolIcon}
                    size={30}
                    color = 'black'
                />
                <View
                    style={{
                        backgroundColor: 'black',
                        height: 3,
                        borderRadius: 10,
                        margin: 5
                    }}
                />
                <FlatList
                    //ItemSeparatorComponent={renderSeparator}
                    data={images}
                    renderItem={({ item }) => <ImageListItem item={item}/> } //onLongPress={() => confirmDelete(item.chatRoom)}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                />

                <Ionicons
                    name="planet-outline" 
                    style={styles.schoolIcon}
                    size={30}
                    color = 'black'
                />
                <View
                    style={{
                        backgroundColor: 'black',
                        height: 3,
                        borderRadius: 10,
                        margin: 5
                    }}
                />
                <FlatList
                    //ItemSeparatorComponent={renderSeparator}
                    data={images}
                    renderItem={({ item }) => <ImageListItem item={item}/> } //onLongPress={() => confirmDelete(item.chatRoom)}
                    keyExtractor={(item) => item}
                    showsVerticalScrollIndicator={false}
                />

                <TouchableOpacity 
                    activeOpacity={0.5} 
                    onPress={() => navigation.navigate('AddAndJoinServerScreens', { screen: 'LookingForMoreScreen' })}
                    style={styles.addNewServerButton}
                >
                    <Ionicons 
                        name='add'
                        color='#00BFFF'
                        size={35}
                        style={{left: 1.5}}
                    />
                </TouchableOpacity>
            </View> */}

            <SectionList 
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={sectionListHeaderDMComponent}
                ListFooterComponent={sectionListFooterAddComponent}
                style={styles.serverNavigator}
                sections={servers}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <ServerListItem item={item} setServer={() => setServer(item)} setToggleDirectMessagesComponent={() => setToggleDirectMessagesComponent(false)}/>}
                renderSectionHeader={({ section: { serverIconName } }) => (
                    <View>
                        <Ionicons
                        name={serverIconName}
                        style={styles.schoolIcon}
                        size={30}
                        color = 'black'
                        />
                        <View
                        style={{
                            backgroundColor: 'black',
                            height: 3,
                            borderRadius: 10,
                            margin: 5
                        }}
                        />
                    </View>
                    
                )}
            />
            
            { toggleDirectMessagesComponent || !server ?
                <DirectMessagesScreenComponent />
            :
                <ServerScreenComponent server={server} />
            }
            {/* <View style={{width: "15%", height: "97.5%", backgroundColor: "white", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginLeft: 10 }}>
                    
            </View> */}
             {/* {role === 'none' ? <ChooseYourRoleButton/> : <NewMessageButton role={role}/>} */}
        </SafeAreaView>
    );
};

export default DrawerNavigatorComponent