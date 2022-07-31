import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const ServerSettingsMemberListItem = (props) => {

    const { item, toggleUserModal, setUserProfile } = props

    const navigation = useNavigation();

    return (
            <TouchableOpacity 
                style={styles.mainContainer}
                activeOpacity={0.5}
                onPress={() => { toggleUserModal(); setUserProfile() }}
            >
                <View style={styles.subContainer}>
                    <Image 
                        source={{ uri: item.image }}
                        style={styles.avatars}
                    />
                    <Text style={[styles.fonts, { fontSize: 15 }]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
    );
}

export default ServerSettingsMemberListItem;