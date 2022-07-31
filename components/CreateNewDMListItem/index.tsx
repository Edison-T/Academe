import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const CreateNewDMListItem = (props) => {

    const { item } = props

    const navigation = useNavigation<any>();
    
    return (
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <Image 
                            source={{ uri: item.image }}
                            style={styles.avatars}
                        />
                        <View style={{ width: 15, height: 15, backgroundColor: item.status == "Online" ? "#43B581" : "#F04747", borderRadius: 15, position: "absolute", bottom: 5, right: 5, borderWidth: 2.5, borderColor: "#E6E6E6" }} />
                    </View>
                    <View>
                        <Text style={[styles.fonts, { fontSize: 15 }]}>
                            {item.name}
                        </Text>
                        { item.status == "Online" ?
                            <Text style={[styles.fonts, { fontSize: 12.5, color: "grey" }]}>
                                Online
                            </Text>
                        :
                            <Text style={[styles.fonts, { fontSize: 12.5, color: "grey" }]}>
                                Last online 12:01 P.M
                            </Text>
                        }
                    </View>
                </View>

                <View>
                    <TouchableOpacity 
                        style={styles.inviteButtonWrap}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.inviteFont}>
                            Chat
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}

export default CreateNewDMListItem;