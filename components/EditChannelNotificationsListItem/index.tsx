import React, {useState, useEffect} from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from './styles';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const EditChannelNotificationsListItem = (props) => {
    const [selectedOption, setSelectedOption] = useState(null); //when adding api, change initial value
    const handleSelected = (value) => {
        setSelectedOption(value);
    };

    const { item } = props
    const navigation = useNavigation();
    
    return (
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "space-between" }}>

            <View style={{ flexDirection: "row", alignItems: "center", maxWidth: "30%" }}>
                <MaterialCommunityIcons 
                    name="pound"
                    size={ 22.5 }
                    color='#B0B0B0'
                    style={{ margin: 12.5, marginLeft: 20 }}
                />

                <Text style={{ fontSize: 15, fontFamily: "Avenir Next", fontWeight: "500" }}>
                    {item.channelName}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "18.75%", width: 250 }}>
                {/* <View style={[styles.radioButtonOutline]}>
                    { memberRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View>
                <View style={[styles.radioButtonOutline, {marginHorizontal: "12.5%"}]}>
                    { memberRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View>
                <View style={[styles.radioButtonOutline]}>
                    { memberRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View> */}
            <RadioButtonOption
                option={'All'}
                onPress={handleSelected}
                value={selectedOption}
            />
            <RadioButtonOption
                option={'Mentions'}
                onPress={handleSelected}
                value={selectedOption}
            />
            <RadioButtonOption
                option={'None'}
                onPress={handleSelected}
                value={selectedOption}
            />
            </View>

            
        </View>
    );
}

function RadioButtonOption({ option, onPress, value }) {
    return (
        <TouchableOpacity 
            style={[styles.radioButtonOutline]}
            onPress={() => onPress(option)}
            activeOpacity={0.5}
        >
            { value === option ?
                <View style={styles.radioButtonFiller}/>
            : 
                null
            }
        </TouchableOpacity>
    );
}

export default EditChannelNotificationsListItem;