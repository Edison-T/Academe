import React, {useState, useEffect} from "react";
import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ChannelListItem from "../ChannelListItem";
import { API, graphqlOperation } from "aws-amplify";



const CategoryListItem = (props) => {
    const [ toggleChannelDropDown, setToggleChannelDropDown ] = useState(false);
    const [ channels, setChannels ] = useState([]);

    const { item } = props

    // useEffect(() => {
    //     let ignoreFlag = false;
    //     const fetchServerInfo = async () => {
    //         try {
    //           const serverInfo = await API.graphql(
    //               graphqlOperation(
    //                   getServer, {
    //                       id: server.id,
    //                   },
    //               ),
    //           )
    //           if(!ignoreFlag) {
    //             setCategories(serverInfo.data.getServer.categories.items)
    //           }
    //       } catch (e) {
    //           console.log(e);
    //           return
    //       }
    //     }
    //     fetchServerInfo()
    //     return () => {
    //         ignoreFlag = true;
    //     }
    // }, [server.id])
//console.log(item)
    return (
        <View>
            <TouchableHighlight 
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
                onPress={() => { setToggleChannelDropDown(!toggleChannelDropDown) }}
            >
                <View style={styles.mainContainer}>
                    { toggleChannelDropDown ?
                        <Ionicons 
                            name="chevron-forward"
                            size={ 10 }
                            style={{margin: 2}}
                        />
                        :
                        <Ionicons 
                            name="chevron-down"
                            size={ 10 }
                            style={{margin: 2}}
                        />
                    }
                    <Text style={[styles.fonts, { fontSize: 15 }]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableHighlight>
            
            {/* { !toggleChannelDropDown ?
                <FlatList 
                data={item.threads}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ChannelListItem item={item}/>}
                />
                :
                null
            } */}
            

        </View>
    );
}

export default CategoryListItem;