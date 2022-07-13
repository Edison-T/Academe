import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const EditServerMemberListItem = (props) => {

    const { item } = props

    const navigation = useNavigation();

    const navigateToEditMemberRoleScreen = () => {
        navigation.navigate('EditServerScreens', { 
            screen: 'EditMemberRoleScreen', 
            params: { item: item },
        })
    };

    return (
        <TouchableOpacity 
            style={styles.mainContainer}
            activeOpacity={0.5}
            onPress={navigateToEditMemberRoleScreen}
        >
            <View style={styles.subContainer}>
                <Image 
                    source={{ uri: item.image }}
                    style={styles.avatars}
                />
                <Text style={[styles.fonts, { fontSize: 15 }]}>
                    {item.name}
                </Text>
                <Text style={[styles.fonts, { fontSize: 12.5, color: "grey", marginLeft: 5, marginRight: 10 }]}>
                    #{item.tagID}
                </Text>
                { item.role ?
                    <View style={{ width: 70, height: 30, backgroundColor: "#F0F0F0", alignItems: "center", justifyContent: "space-between", borderRadius: 5, flexDirection: "row", paddingHorizontal: 7.5 }}>
                        <View style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#00BDFF" }} />
                        <Text style={{ fontSize: 10, fontWeight: "600" }}>
                            {item.role}
                        </Text>
                    </View>
                :
                null
                }
            </View>
            <Ionicons 
                name='chevron-forward'
                size={20}
            />
        </TouchableOpacity>
    );
}

export default EditServerMemberListItem;