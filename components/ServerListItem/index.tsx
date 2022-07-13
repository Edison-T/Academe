import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Pressable, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { S3Image } from 'aws-amplify-react-native';


const ServerListItem = (props) => {
    const { item, setServer, setToggleDirectMessagesComponent } = props;
   
    const navigation = useNavigation();

    return ( 
        <TouchableOpacity 
            onPress={() => {setServer(); setToggleDirectMessagesComponent()}}
            activeOpacity={0.5} 
            style={{ alignItems: "center" }}
        >
            <View style={styles.leftContainer}>
                <S3Image 
                    imgKey={item.serverPicture}
                    style={styles.S3Image}
                />
                
            </View>
        </TouchableOpacity>
    )
};

export default ServerListItem;