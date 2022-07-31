import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const DirectMessagesListItem = (props) => {

    const { item } = props

    const navigation = useNavigation<any>();
    
    return (
        <View>
            <TouchableHighlight 
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
                onPress={() => {navigation.navigate("ChatRoomScreen"), {item: item}}}
            >
                <View style={styles.mainContainer}>
                    <View style={{ alignItems: "center", justifyContent: "flex-end", flexDirection: "row" }}>
                        <View>
                            <Image 
                                source={{ uri: item.image }}
                                style={styles.avatars}
                            />
                            <View style={{ width: 15, height: 15, backgroundColor: item.status == "Online" ? "#43B581" : "#F04747", borderRadius: 15, position: "absolute", bottom: 5, right: 5, borderWidth: 2.5, borderColor: "#F9F9F9" }} />
                        </View>
                        <Text style={[styles.fonts, { fontSize: 15 }]}>
                            {item.name}
                        </Text>
                    </View>
                    
                    <View style={{ width: 17, height: 17, backgroundColor: "red", borderRadius: 17, margin: 5, marginRight: 12.5, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 12, fontWeight: "700", color: "white" }}>1</Text>
                    </View>
                </View>
            </TouchableHighlight>

        </View>
    );
}

export default DirectMessagesListItem;