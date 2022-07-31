import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, ActivityIndicator, Image, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'react-native-uuid';
import { createServer, createServerUser } from '../src/graphql/mutations';
//<a href="https://storyset.com/business">Business illustrations by Storyset</a>
//<a href="https://storyset.com/social-media">Social media illustrations by Storyset</a>
//<a href="https://storyset.com/education">Education illustrations by Storyset</a>
//<a href="https://storyset.com/people">People illustrations by Storyset</a>

const CreateForAScreen = ({route}) => {
    const [nameInput, setNameInput] = useState(null);
    const [image, setImage] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    const { typeOfServer } = route.params;

    const navigateBackHome = () => {
        navigation.goBack(); 
    }

    useLayoutEffect (() => {
        navigation.setOptions({
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 15}}
                    activeOpacity={0.5}
                    onPress={navigateBackHome}
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

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            }
        })();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        console.log(result);
        
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const create = async () => {
        if(!nameInput || !image) {
            Alert.alert('Please enter a group name and add a picture.')
            return;
        }
        setLoading(true)
        try {
            // function makeid() {
            //     var text = "";
            //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              
            //     for (var i = 0; i < 6; i++)
            //       text += possible.charAt(Math.floor(Math.random() * possible.length));
              
            //     return text;
            //  }
        
            if(!image) {
                return;
            }
            const blob = await getBlob(image);
            const {key} = await Storage.put(`${uuid.v4()}.png`, blob);

            const newServerData = await API.graphql(
                graphqlOperation(
                    createServer, {
                        input: {
                            name: nameInput,
                            serverPicture: key,
                            typeOfServer: typeOfServer
                            //lastMessageID: "zz7050e7-b24d-4ce1-a048-e57da56ff3e7",
                        }
                    }
                )
            ) 

            if (!newServerData) {
                console.log("Failed to create server")
                return;
            }

            const newServer = newServerData.data.createServer;

            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createServerUser, {
                        input: {
                        role: "Admin",
                        userID: userInfo.attributes.sub,
                        serverID: newServer.id,
                        }
                    }
                )
            )
            setLoading(false)

            navigation.navigate('ChatRoomScreen', {
                // id: newChatRoom.id,
                // name: newChatRoom.name,
                // paramKey: newChatRoom.id
            })

        } catch (e) {
            console.log(e)
            Alert.alert('Oops! A group could not be created', 'Please try again')
            setLoading(false)
            return;
        }
    }
   
    const getBlob = async (uri: string) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    }

    return (
        <KeyboardAvoidingView         
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center", }}
        >

            <Text style={styles.titleText}>
                Customize your server
            </Text>

            <Text style={styles.subHeadingText} >
                Give your new server a personality with a name and an icon. You can always change it later.
            </Text>

            { image ?
                <TouchableOpacity style={{width: 100, height: 100, alignItems: "center", borderRadius: 50, backgroundColor: "white", justifyContent: "center", margin: 25}} onPress={pickImage}>
                    <Image
                        style={styles.uploadedImage}
                        source={ image ? {uri: image }: null }
                    />
                </TouchableOpacity>
            :
                <TouchableOpacity style={{width: 100, height: 100, alignItems: "center", borderRadius: 50, backgroundColor: "white", justifyContent: "center", margin: 25}} onPress={pickImage}>
                    <Ionicons 
                        name='camera'
                        size={30}
                    />
                    <Text>
                        Upload
                    </Text>                
                </TouchableOpacity>
            }

            <TextInput 
                placeholder="Server name" 
                style={{width: "90%", height: 50, backgroundColor: "#E6E6E6", borderRadius: 10, fontSize: 17.5, padding: 10, textAlign: "center", fontFamily: "Avenir Next"}}
                autoFocus
                value={nameInput} 
                maxLength={32}
                onChangeText={(text) => setNameInput(text)}
            />

            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
                onPress={create}
            >
                {loading ? 
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                    :
                    <Text style={styles.createButtonText}>
                        Create!
                    </Text>
                }
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
        margin: 15
    },
    subHeadingText: {
        fontFamily: "Avenir Next",
        fontWeight: "500", 
        fontSize: 17.5,
        width: 400, 
        textAlign: "center"
    },
    uploadedImage: {
        width: 100,
        height: 100, 
        borderRadius: 100,
    },
    createButtonText: {
        fontFamily: "Avenir Next",
        fontWeight: "700", 
        fontSize: 17.5,
        color: "white"
    },
})

export default CreateForAScreen