import React from 'react';
import { Fragment } from 'react';
import { TouchableOpacity, Pressable, Text, View, Image } from 'react-native';

import styles from './styles'

import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import {S3Image} from 'aws-amplify-react-native'
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Clipboard from 'expo-clipboard';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import MessageReply from '../MessageReply';
import AudioPlayer from '../AudioPlayer';
import { getMessage } from '../../src/graphql/queries';


const ChatMessage = (props) => {
    const [repliedTo, setRepliedTo] = useState<any>(null);
    const { showActionSheetWithOptions } = useActionSheet();
    const [soundURI, setSoundURI] = useState<any>(null);

    const { item, setAsMessageReply } = props;

    useEffect(() => {
        let ignoreFlag = false
        if(item.audio) {
            Storage.get(item.audio).then(setSoundURI);
        }
        return () => {
            ignoreFlag = true;
          }
    }, [item])

    useEffect(() => {
        let ignoreFlag = false
        if (item?.replyToMessageID) {
            const fetchReplyToMessage = async () => {
                try {
                    const userData = await API.graphql(
                        graphqlOperation(
                            getMessage, {
                                id: item.replyToMessageID,
                            }
                        )
                    )
                    setRepliedTo(userData.data.getMessage)
                } catch (e) {
                    console.log(e);
                }
            } 
            fetchReplyToMessage()
            return () => {
                ignoreFlag = true;
            }
        }
    }, [item])

    const onActionPress = (index) => {
        if (index === 0) {
          Clipboard.setStringAsync(item.content)
        } else if (index === 1) {
            setAsMessageReply();
            // if(item.audio) {
            //     Storage.get(item.audio).then(setSoundURI);
            // } else {
            //     setRepliedTo(item)
            // }
        }
      };

    const openActionMenu = () => {
        const options = ["Copy Text", "Reply", "Cancel"]; //add "React"
        const cancelButtonIndex = 2;
        
        showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
            destructiveButtonIndex: 2,
          },
          onActionPress
        );
    };

return (
    <View style={[styles.container, { height: "auto" }]}>
        <TouchableOpacity 
            activeOpacity={0.7} 
            onLongPress={openActionMenu}
            style={
            [styles.messageBox, {
                backgroundColor: 'transparent',
                alignSelf: "flex-start",
                width: "100%",
            },  
            ]}>
            {repliedTo && (<MessageReply message={repliedTo} />)}

            <View style={{ flexDirection: "row", }}>
                <S3Image imgKey={ item.user.publicProfilePicture } style={{ width: 45,  height: 45, aspectRatio: 1, borderRadius: 50, }}/>
                <View style={{ flexDirection: "column", marginLeft: 10, maxWidth: "85%" }}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.name}>{item.user.publicName}</Text>
                        <Text style={[{ color: "grey", marginLeft: 7.5, fontSize: 12.5 }]}>{moment(item.createdAt).format("h:mm A")}</Text>
                    </View>
                                        
                    <Text style={[styles.message, { color: "black"}]}>
                        {item.content}
                    </Text>

                    {soundURI && (<AudioPlayer soundURI={soundURI} />)}
                </View>
            </View>
                
        </TouchableOpacity>
    
    </View>
)
}

export default ChatMessage;