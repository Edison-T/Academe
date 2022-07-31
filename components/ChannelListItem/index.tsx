import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';



const ChannelListItem = (props) => {

    const { item } = props

    //console.log(item)
    // item.id means channel id
    const navigation = useNavigation();

    const navigateToChatRoom = () => {
        //navigation.setParams({item: item});
        navigation.navigate('ChatRoomScreen', {item: item})
        navigation.dispatch(DrawerActions.closeDrawer());
    }
    
    
    return (
        <View>
            <TouchableHighlight 
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
                onPress={navigateToChatRoom}
            >
                <View style={styles.mainContainer}>
                    <MaterialCommunityIcons 
                        name="pound"
                        size={ 17 }
                        color='grey'
                        style={{ margin: 5, marginLeft: 12.5 }}
                    />
                    
                    <Text style={{ fontSize: 15, fontFamily: "Avenir Next", color: item.numberOfMessagesUnseen > 0 ? "black" : "grey", fontWeight: item.numberOfMessagesUnseen > 0 ? "600" : "500" }}>
                        {item.name}
                    </Text>
                </View>
            </TouchableHighlight>

        </View>
    );
}

export default ChannelListItem;