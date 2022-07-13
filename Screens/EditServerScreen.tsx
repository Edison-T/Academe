import React, {useEffect, useLayoutEffect, useState, useRef, useCallback} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Image, TextInput, FlatList, Text, TouchableHighlight } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { DrawerActions } from '@react-navigation/native';
import SelectCategoryCreateListItem from '../components/SelectCategoryCreateListItem';

const EditServerScreen = () => {
    const imageExample = "https://png.pngtree.com/png-vector/20200921/ourlarge/pngtree-red-and-black-logo-png-image_2348180.jpg"
    const serverNameExample = "Server Example"
    
    const [serverImage, setServerImage] = useState(null);
    const [ serverName, setServerName ] = useState(serverNameExample)

    const navigation = useNavigation();

    const navigateBackHome = () => {
        navigation.goBack();
        navigation.dispatch(DrawerActions.toggleDrawer());
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
              ),
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    activeOpacity={0.5}
                  >
                    <Text 
                        style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                            Save
                    </Text>
                  </TouchableOpacity>
                </View>
              )
        }), [navigation]
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });        
        if (!result.cancelled) {
            setServerImage(result.uri);
        }
    };

    return (
        <View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
                { serverImage ?
                    <TouchableOpacity 
                        style={ styles.imageWrapper } 
                        onPress={pickImage}
                    >
                        <Image
                            style={styles.uploadedImage}
                            source={ serverImage ? {uri: serverImage }: null }
                        />
                    </TouchableOpacity>
                :
                    <TouchableOpacity 
                        style={ styles.imageWrapper } 
                        onPress={pickImage}
                    >
                        <Image 
                            style={styles.uploadedImage}
                            source={{ uri: imageExample }}
                        />               
                    </TouchableOpacity>
                }
                <Text style={{ alignSelf: "flex-start", marginLeft: "5%", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                    Edit Server Name
                </Text>
                <TextInput 
                    style={styles.editServerNameInput}
                    value={serverName}
                    maxLength={32}
                    onChangeText={(text) => setServerName(text)}
                    clearButtonMode="always"
                />
            </View>

            <Text style={{ alignSelf: "flex-start", marginLeft: "5%", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
                    More Settings
            </Text>

            <View>
                <TouchableOpacity 
                    style={styles.buttons} 
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('EditServerScreens', { screen: 'MembersSettingScreen' })}
                >
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <Ionicons 
                            name='people-outline'
                            size={25}
                        />
                        <Text style={styles.membersListItemText}>
                            Members {`&`} Roles
                        </Text>
                    </View>
                    <Ionicons 
                        name='chevron-forward'
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttons} 
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('EditServerScreens', { screen: 'ReOrderServerLayoutScreen' })}
                >
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <Ionicons 
                            name='reorder-three'
                            size={25}
                        />
                        <Text style={styles.membersListItemText}>
                            Server Layout
                        </Text>
                    </View>
                    <Ionicons 
                        name='chevron-forward'
                        size={20}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.buttons, { justifyContent: "center" }]} 
                    activeOpacity={0.5}
                >
                    <Text style={[styles.membersListItemText, { marginLeft: 0, color: "#ff3b30" }]}>
                        Delete Server
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        width: 75, 
        height: 75, 
        alignItems: "center", 
        borderRadius: 50, 
        backgroundColor: "transparent", 
        justifyContent: "center",
    },
    uploadedImage: {
        width: 75, 
        height: 75, 
        aspectRatio: 1, 
        borderRadius: 10, 
    },
    editServerNameInput: {
        backgroundColor: "#E6E6E6",
        width: "90%",
        borderRadius: 5, 
        fontFamily: "Avenir Next",
        padding: 10,
        fontSize: 15, 
        fontWeight: "600",
        marginBottom: 20,
    },
    membersListItemText: {
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 7.5,
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
        marginBottom: 5
    }

})

export default EditServerScreen