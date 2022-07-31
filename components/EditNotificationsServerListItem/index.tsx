import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const EditNotificationsServerListItem = (props) => {

    const { item } = props

    const navigation = useNavigation();
    
    return (
        <TouchableOpacity 
            style={styles.mainContainer}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('UserProfileScreens', { 
                screen: 'EditServerNotificationsScreen',
                params: { item: item },
            })}
        >
            <Image 
                source={{ uri: item.image }}
                style={styles.profileImage}
            />
            <View style={{width: "80%", alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
                <Text style={{ fontFamily: "Avenir Next", fontSize: 22.5, fontWeight: "700" }}>
                    { item.name }
                </Text>
                <Ionicons 
                    name="chevron-forward"
                    size={20}
                />
            </View>
    </TouchableOpacity>
    );
}

export default EditNotificationsServerListItem;