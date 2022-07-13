import React from 'react';
import { Fragment } from 'react';
import { TouchableOpacity, Pressable, Text, View, Image } from 'react-native';

import styles from './styles'

import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';


const ChatMessage = (props) => {

    const { item } = props;

return (
    <View style={[styles.container, { height: "auto" }]}>
        <TouchableOpacity activeOpacity={0.7} style={
            [styles.messageBox, {
                backgroundColor: 'transparent',
                alignSelf: "flex-start",
                width: "100%",
            },  
            ]}>
            <View style={{ flexDirection: "row", }}>
                <Image source={{ uri: item.profileImage }} style={{ width: 45,  height: 45, aspectRatio: 1, borderRadius: 50, }}/>
                <View style={{ flexDirection: "column", marginLeft: 10, maxWidth: "85%" }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={[{ color: "grey", marginLeft: 7.5, fontSize: 12.5 }]}>{item.time}</Text>
                    </View>
                    
                    <Text style={[styles.message, { color: "black"}]}>
                        {item.messageContent}
                    </Text>
                </View>
            </View>
                
        </TouchableOpacity>
    
    </View>
)
}

export default ChatMessage;