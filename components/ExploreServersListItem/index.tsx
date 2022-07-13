import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';



const ExploreServersListItem = (props) => {

    const { item } = props

    const navigation = useNavigation();

    const navigateToSubject = () => {
    }
    
    return (
        <View>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
            >
                <Image 
                    source={item.image}
                    style={styles.tinyButtonImages}
                />
                <Text style={styles.texts}>
                    {item.subject}
                </Text>
                <Ionicons 
                    name='chevron-forward'
                    size={25}
                />
            </TouchableOpacity>
        </View>
    );
}

export default ExploreServersListItem;