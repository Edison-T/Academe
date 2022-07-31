import React from 'react';
import { Fragment } from 'react';
import { Text, View } from 'react-native';
import Lightbox from 'react-native-lightbox';

// import { Message } from '../../types';
import moment from 'moment';
import styles from './styles'
import {S3Image} from 'aws-amplify-react-native';
import Hyperlink from 'react-native-hyperlink'
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useWindowDimensions } from 'react-native';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMessage } from '../../src/graphql/queries';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const MessageReply = (props) => {
    const [soundURI, setSoundURI] = useState<any>(null);

    const { message, setAsMessageReply } = props;

    useEffect(() => {
        let ignoreFlag = false
        if(message.audio) {
            Storage.get(message.audio).then(setSoundURI);
        }
        return () => {
            ignoreFlag = true;
          }
    }, [message]) //try to trim this easier

    return (
        <View style={[styles.container, { height: "auto" }]}>
        <View style={styles.messageBox}>
            <View style={{ flexDirection: "row", marginLeft: '12.5%', }}>
                {/* <MaterialCommunityIcons 
                    name='arrow-down-left'
                    style={{ position: 'absolute', right: '101%', top: 10 }}
                    size={10}
                /> */}

                <S3Image 
                    imgKey={ message.user.publicProfilePicture } 
                    style={styles.image}
                />
                <View style={{ flexDirection: "column", marginLeft: 5, maxWidth: "95%" }}>
                    <Text 
                        style={styles.name}
                        numberOfLines={3}
                    >
                        {message.user.publicName}
                        <Text style={styles.reply}>
                           {"\u00A0"}{message.content}
                        </Text>
                    </Text>
                    {soundURI && (<AudioPlayer soundURI={soundURI} />)}
                </View>
            </View>
                
        </View>
    </View>
    )
}

export default MessageReply;