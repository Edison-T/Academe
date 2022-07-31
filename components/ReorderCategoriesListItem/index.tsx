import React, {useState, useEffect} from "react";
import { View, Text, Pressable, StyleSheet, TouchableHighlight } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ReorderChannelsListItem from "../ReorderChannelsListItem";



const ReorderCategoriesListItem = (props) => {
    const [ toggleChannelDropDown, setToggleChannelDropDown ] = useState(false)

    const { item } = props

    return (
        <View>
            <View style={styles.mainContainer}>
                <Text style={styles.categoryFont}>
                    {item.name}
                </Text>
                <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={null}
                >
                    <Text style={styles.editFont}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
        
            <FlatList 
                data={item.threads}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ReorderChannelsListItem item={item}/>}
            />            
        </View>
    );
}

export default ReorderCategoriesListItem;