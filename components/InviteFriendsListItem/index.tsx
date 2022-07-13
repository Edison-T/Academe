import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const InviteFriendsListItem = (props) => {

    const { item } = props

    const navigation = useNavigation<any>();
    
    return (
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <Image 
                        source={{ uri: item.image }}
                        style={styles.avatars}
                    />
                    <View>
                        <Text style={[styles.fonts, { fontSize: 15 }]}>
                            {item.name}
                        </Text>
                        <Text style={[styles.fonts, { fontSize: 12.5, color: "grey" }]}>
                            Offline
                        </Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity 
                        style={styles.inviteButtonWrap}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.inviteFont}>
                            Invite
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}

export default InviteFriendsListItem;