import React, {useEffect, useLayoutEffect, useState, useRef, useCallback} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Platform, TextInput, FlatList, Text, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MessageInputBox from '../components/MessageInputBox';
import { DrawerActions } from '@react-navigation/native';
import SelectCategoryCreateListItem from '../components/SelectCategoryCreateListItem';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createCategory, createChannel } from '../src/graphql/mutations';
import { ScrollView } from 'react-native-gesture-handler';
//<a href="https://storyset.com/business">Business illustrations by Storyset</a>
//<a href="https://storyset.com/social-media">Social media illustrations by Storyset</a>
//<a href="https://storyset.com/education">Education illustrations by Storyset</a>
//<a href="https://storyset.com/people">People illustrations by Storyset</a>

const CreateCategoriesAndChannelsScreen = ({route}) => {
    const [codeInput, setCodeInput] = useState('');
    const [ channelRadioButton, setChannelRadioButton ] = useState(false);
    const [ categoryRadioButton, setCategoryRadioButton ] = useState(true);
    const [ categoryInput, setCategoryInput ] = useState('');
    const [ channelInput, setChannelInput ] = useState('');
    //const [ categoryID, setCategoryID ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState(null);


    const { goBackWhere, serverID, categories } = route.params;

    const navigation = useNavigation();

    const handleSelected = (value) => {
        setSelectedCategory(value);
    };

    const navigateBackHome = () => {
        if (goBackWhere == "ChatRoomScreen") {
            navigation.navigate('ChatRoomScreen'); 
            navigation.dispatch(DrawerActions.openDrawer()); 
        } else if (goBackWhere == "ReOrderServerLayoutScreen") {
            navigation.navigate("ReOrderServerLayoutScreen")
        }
    }

    async function clickCreateCategory() {
        setLoading(true)
        try {
            await API.graphql(
                graphqlOperation(
                    createCategory, {
                    input : {
                        serverID: serverID,
                        name: categoryInput
                    }
                    },
                ),
            );
            setLoading(false);
            navigateBackHome();
        } catch (e) {
          console.log(e);
          setLoading(false);
          Alert.alert('Oops, something went wrong!')
          return
        }
    }

    async function clickCreateChannel() {
        setLoading(true)
        try {
            await API.graphql(
                graphqlOperation(
                    createChannel, {
                    input : {
                        categoryID: selectedCategory,
                        name: channelInput
                    }
                    },
                ),
            );
            setLoading(false);
            navigateBackHome();
        } catch (e) {
          console.log(e);
          setLoading(false);
          Alert.alert('Oops, something went wrong!')
          return
        }
    }

    useLayoutEffect (() => {
        navigation.setOptions({
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    activeOpacity={0.5}
                    onPress={navigateBackHome}
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
                        <View style={{marginRight: 20}}>
                            <ActivityIndicator size="small" color="black" />
                        </View>
                    :
                        <TouchableOpacity
                            style={{marginRight: 20}}
                            activeOpacity={0.5}
                            onPress={() => {
                                if(categoryRadioButton) {
                                    clickCreateCategory()
                                } else {
                                    clickCreateChannel()
                                }
                            }}
                        >
                            <Text style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                                Create
                            </Text>
                    </TouchableOpacity>
                    }
                </View>
              )
    }), [navigation]});

    return (
        <KeyboardAvoidingView         
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems: "center", }}
            keyboardVerticalOffset={77}
        >

            <Text style={styles.subHeadingText} >
                What do you want to create?
            </Text>

            <TouchableHighlight 
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
                onPress={() => { setChannelRadioButton(true); setCategoryRadioButton(false) }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <MaterialCommunityIcons 
                            name="pound"
                            size={ 25 }
                            style={{ margin: 5, marginLeft: 12.5 }}
                        />
                    
                        <View style={{ flexDirection: "column", margin: 10 }}>
                            <Text style={{ fontFamily: "Avenir Next", fontWeight: "700", fontSize: 15 }}>
                                Channel
                            </Text>
                            <Text style={{ fontFamily: "Avenir Next", fontWeight: "400", fontSize: 12.5, textAlignVertical: "center" }}>
                                Conversations that are separated by topic
                            </Text>
                        </View>
                    </View>
                    <View style={styles.radioButtonOutline}>
                        { channelRadioButton ?
                            <View style={styles.radioButtonFiller}/>
                        : 
                            null
                        }
                    </View>
                </View>
            </TouchableHighlight>

            <View 
                style={styles.lineSeparator}
            />

            <TouchableHighlight  
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
                onPress={() => { setChannelRadioButton(false); setCategoryRadioButton(true) }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialCommunityIcons 
                            name="folder-pound-outline"
                            size={ 25 }
                            style={{ margin: 5, marginLeft: 12.5 }}
                        />
                        <View style={{ flexDirection: "column", margin: 10 }}>
                            <Text style={{ fontFamily: "Avenir Next", fontWeight: "700", fontSize: 15 }}>
                                Category
                            </Text>
                            <Text style={{ fontFamily: "Avenir Next", fontWeight: "400", fontSize: 12.5, textAlignVertical: "center" }}>
                                Folders that you can organize your channels with                            
                            </Text>
                        </View>
                    </View>
                        
                    <View style={[styles.radioButtonOutline]}>
                        { categoryRadioButton ?
                            <View style={styles.radioButtonFiller}/>
                        : 
                            null
                        }
                    </View>
                </View>
            </TouchableHighlight>

            { channelRadioButton ?
                <Text style={[styles.subHeadingText, { marginTop: 15 }]} >
                    Channel Name(s)
                </Text>
            :
                <Text style={[styles.subHeadingText, { marginTop: 15 }]} >
                    Category Name
                </Text>
            }

            { channelRadioButton ?
                <TextInput 
                    placeholder="new-channel" 
                    style={styles.textInput}
                    value={channelInput}
                    clearButtonMode='always'
                    maxLength={32}
                    onChangeText={(text) => setChannelInput(text)}
                />
            :
                <TextInput 
                    placeholder="new-category" 
                    style={styles.textInput}
                    value={categoryInput}
                    clearButtonMode='always'
                    maxLength={32}
                    onChangeText={(text) => setCategoryInput(text)}
                />
            }

            { channelRadioButton ?
                <View style={{ width: '100%' }}>
                    <Text style={[styles.subHeadingText, { marginTop: 15 }]} >
                    For which category?
                    </Text>
                    { categories.length > 0 ? 
                        // <FlatList 
                        //     data={categories}
                        //     renderItem={({ item }) => <SelectCategoryCreateListItem item={item} setCategoryID={() => setCategoryID(item.id)} />}
                        //     keyExtractor={(item) => item.id}
                        //     showsVerticalScrollIndicator={true}
                        //     ItemSeparatorComponent={renderSeparator}
                        //     style={{ flexGrow: 0, maxHeight: 225 }}
                        // />
                        <ScrollView style={{ flexGrow: 0, maxHeight: 225 }}>
                            {
                                categories.map((item) => {
                                    return (
                                        <View key={item.id} >
                                            <ChosenCategory 
                                                categoryID={item.id}
                                                categoryName={item.name}
                                                onPress={handleSelected}
                                                value={selectedCategory}
                                                key={item.id}
                                            />
                                            <View
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    height: 0.5,
                                                    marginLeft: 15,
                                                    marginRight: 15
                                                }}
                                            />
                                        </View>

                                    )
                                })
                            }
                        </ScrollView>
                        
                    :
                        <View style={{ backgroundColor: "white", padding: 5 }}>
                            <Text style={styles.noCategoriesText}>
                                No available categories. You should make some; they make your life so much easier!
                            </Text>
                        </View>
                    }
                </View>
            :
                null
            }
        </KeyboardAvoidingView>
    );
};

function ChosenCategory({ categoryID, categoryName, onPress, value }) {
    return (
        <TouchableHighlight 
            style={[styles.touchablehighlightUnderLayPress, { marginLeft: 0 }]}
            activeOpacity={0.5}
            underlayColor="#E6E6E6"
            onPress={() => onPress(categoryID)}
        >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons 
                            name="folder-pound-outline"
                            size={ 25 }
                            style={{ margin: 5, marginLeft: 12.5 }}
                        />
                        <Text style={{ fontFamily: "Avenir Next", fontWeight: "700", fontSize: 15 }}>
                            {categoryName}
                        </Text>
                    </View>
                    
                    <View style={styles.radioButtonOutline}>
                        { value === categoryID ?
                            <View style={styles.radioButtonFiller}/>
                        : 
                            null
                        }
                    </View>
            </View>
        </TouchableHighlight>
    );
}

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
        fontWeight: "600", 
        fontSize: 17.5,
        width: 400, 
        marginLeft: 12.5,
        marginBottom: 6.25
    },
    touchablehighlightUnderLayPress: {
        backgroundColor: "white",
        width: "100%",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 1,
        paddingRight: 1,
        marginLeft: 4,
        marginRight: 4,
    },
    radioButtonOutline: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#00BDFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    radioButtonFiller: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#00BDFF',
    },
    noCategoriesText: {
        textAlign: "center", 
        marginHorizontal: 40, 
        fontSize: 12.5, 
        fontStyle: "italic", 
        fontFamily: "Avenir Next"
    },
    lineSeparator: {
        height: 1,
    },
    textInput: {
        width: "93.5%", 
        height: 50, 
        backgroundColor: "#E6E6E6", 
        fontSize: 17.5, 
        textAlign: "center", 
        fontFamily: "Avenir Next",
        borderRadius: 5
    },
    joinButtonText: {
        fontFamily: "Avenir Next",
        fontWeight: "700", 
        fontSize: 17.5,
        color: "white"
    },
})

export default CreateCategoriesAndChannelsScreen