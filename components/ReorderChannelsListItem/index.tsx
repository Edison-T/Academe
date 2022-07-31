import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';



const ReorderChannelsListItem = (props) => {

    const { item } = props

    const navigation = useNavigation();
    
    return (
        <View style={{ flex: 1 }}>
            <TouchableHighlight 
                style={styles.touchablehighlightUnderLayPress}
                activeOpacity={0.5}
                underlayColor="#E6E6E6"
            >
                <View style={styles.mainContainer}>
                    <MaterialCommunityIcons 
                        name="pound"
                        size={ 22.5 }
                        color='#B0B0B0'
                        style={{ margin: 12.5 }}
                    />
                    
                    <Text style={[styles.fonts, { fontSize: 15 }]}>
                        {item}
                    </Text>
                </View>
            </TouchableHighlight>

        </View>
    );
}

export default ReorderChannelsListItem;