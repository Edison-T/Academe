import React, {useState, useEffect} from "react";
import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const SelectCategoryCreateListItem = (props) => {
    const [ radioButton, setRadioButton ] = useState(false);

    const { item, setCategoryID } = props

    return (
        <View style={{ flex: 1 }}>
            <TouchableHighlight 
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
                onPress={() => { setRadioButton(!radioButton); setCategoryID() }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons 
                                name="folder-pound-outline"
                                size={ 25 }
                                style={{ margin: 5, marginLeft: 12.5 }}
                            />
                            <Text style={{ fontFamily: "Avenir Next", fontWeight: "700", fontSize: 15 }}>
                                {item.name}
                            </Text>
                        </View>
                        
                        <View style={styles.radioButtonOutline}>
                            { radioButton ?
                                <View style={styles.radioButtonFiller}/>
                            : 
                                null
                            }
                        </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default SelectCategoryCreateListItem;