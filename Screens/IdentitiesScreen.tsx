import React, {useEffect, useLayoutEffect, useContext, useRef, useCallback, useState} from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, TextInput, Button, Image, Text, KeyboardAvoidingView, Pressable, ActivityIndicator } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, Auth, Storage, API } from 'aws-amplify';
import uuid from 'react-native-uuid';
import { S3Image } from 'aws-amplify-react-native';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useSelector } from 'react-redux';
import userSlice, { selectUser } from '../redux/features/userSlice';
import * as mutations from '../src/graphql/mutations';


const IdentitiesScreen = () => {
    const user = useSelector(selectUser)
    const [ classProfileName, setClassProfileName ] = useState(user.className);
    const [ publicProfileName, setPublicProfileName ] = useState(user.publicName);
    const [ publicProfilePicture, setPublicProfilePicture ] = useState(null);
    const [ classProfilePicture, setClassProfilePicture ] = useState(null);
    const [  loading, setLoading ] = useState(false);

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

    useLayoutEffect (() => {
        navigation.setOptions({
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                    <Text 
                        style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                            Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                <View>
                    { loading ?
                        <ActivityIndicator style={{ marginRight: 20 }} size="small" color="black" />
                    :
                        <TouchableOpacity
                            style={{marginRight: 20}}
                            activeOpacity={0.5}
                            onPress={() => {updateUserIdentities().then(navigation.goBack).catch((e) => { console.log(e); return })}}
                        >
                            <Text 
                                style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                                    Save
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
              )
    }), [navigation]});

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

    // updates user's profiles
    const updateUserIdentities = async () => {
        setLoading(true);
        if(publicProfilePicture && !classProfilePicture) {
        try {
            const blob = await getBlob(publicProfilePicture);
            const {key} = await Storage.put(`${uuid.v4()}.png`, blob);
    
            const userDetails = {
            id: user.id,
            className: classProfileName,
            //classProfilePicture: classProfilePicture,
            publicName: publicProfileName,
            publicProfilePicture: key,
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
                className: classProfileName,
                classProfilePicture: classProfilePicture,
                publicName: publicProfileName,
                //publicProfilePicture: key,
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
                className: classProfileName,
                classProfilePicture: key,
                publicName: publicProfileName,
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
                className: classProfileName,
                publicName: publicProfileName,
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
        <View style={{ backgroundColor: '#F4F4F4', flex: 1 }}>
            <Text style={{ alignSelf: "flex-start", marginLeft: "2.5%", fontSize: 15, fontWeight: "700", marginTop: 15, color: "#404040" }}>
                    Class Profile
            </Text>

            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <TouchableOpacity 
                    style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                    activeOpacity={0.5}
                    onPress={pickClassProfilePicture}
                >
                    <S3Image 
                        imgKey={user.classProfilePicture}
                        style={styles.profileImage}
                    />
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
                        value={classProfileName}
                        maxLength={32}
                        clearButtonMode='always'
                        onChangeText={(text) => setClassProfileName(text)}
                    />
                    <Text style={styles.tagIDText}>
                        #{user.classTagNumber}
                    </Text>
                </View>
            </View>

            <Text style={{ alignSelf: "flex-start", marginLeft: "2.5%", fontSize: 15, fontWeight: "700", marginTop: 15, color: "#404040" }}>
                    Public Profile
            </Text>

            <View style={{ alignItems: "center", padding: 10, flexDirection: "row" }}>
                <TouchableOpacity 
                    style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                    activeOpacity={0.5}
                    onPress={pickPublicProfilePicture}
                >                    
                    <S3Image 
                        imgKey={user.publicProfilePicture}
                        style={styles.profileImage}
                    />
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
                        value={publicProfileName}
                        maxLength={32}
                        clearButtonMode='always'
                        onChangeText={(text) => setPublicProfileName(text)}
                    />
                    <Text style={styles.tagIDText}>
                        #{user.publicTagNumber}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: "5%",
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 60,
        marginRight: 20
    },
    buttons: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 7.5,
    },
    logOutButton: {
        width: "90%", 
        height: 40, 
        backgroundColor: 'white', 
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
        borderRadius: 5, 
        marginTop: 5
    },
    logOutText: {
        fontSize: 15, 
        fontWeight: "700", 
        color: "red"
    },
    nameTextInput: {
        fontFamily: "Avenir Next", 
        fontSize: 22.5, 
        fontWeight: "700", 
        backgroundColor: "#E6E6E6", 
        padding: 10, 
        borderRadius: 10,
        paddingRight: 0
    },
    tagIDText: {
        fontFamily: "Avenir Next", 
        fontSize: 17.5, 
        fontWeight: "700", 
        color: "grey"
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
    }
});

export default IdentitiesScreen