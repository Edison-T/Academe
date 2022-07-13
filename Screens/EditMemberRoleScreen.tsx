import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable, StyleSheet, Alert, SectionList, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import CreateNewDMListItem from '../components/CreateNewDMListItem';
import ServerSettingsMemberListItem from '../components/ServerSettingsMembersListItem';
import InviteFriendsListItem from '../components/InviteFriendsListItem';
import EditServerMemberListItem from '../components/EditServerMemberListItem';
import ReorderCategoriesListItem from '../components/ReorderCategoriesListItem';
import DraggableCategoriesListItem from '../components/DraggableCategoriesListItem';

const EditMemberRoleScreen = ({route}) => {
    const [ adminRadioButton, setAdminRadioButotn ] = useState(true);
    const [ mentorRadioButton, setMentorRadioButton ] = useState(false);
    const [ teacherRadioButton, setTeacherRadioButton ] = useState(false);
    const [ memberRadioButton, setMemberRadioButton ] = useState(false);

    const { item } = route.params

    const navigation = useNavigation();

    useLayoutEffect (() => {
        navigation.setOptions({
              headerLeft: () => (
                <View>
                  <TouchableOpacity
                    style={{marginLeft: 15}}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                  >
                  <Ionicons
                        name="chevron-back" 
                        size={35}
                        color = 'black'
                    />
                </TouchableOpacity>
                </View>
              ),
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    activeOpacity={0.5}
                  >
                    <Text 
                        style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                            Save
                    </Text>
                  </TouchableOpacity>
                </View>
              )
    }), [navigation]});
   
    return (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
              <Image 
                  source={{ uri: item.image }}
                  style={styles.avatars}
              />
              <Text style={styles.userName}>
                  {item.name}
              </Text>
              <Text style={styles.userTagID}>
                  #{item.tagID}
              </Text>
          </View>

          <Text style={{ alignSelf: "flex-start", marginLeft: "5%", fontSize: 15, fontWeight: "600", marginVertical: 5, color: "#404040" }}>
            Edit Roles
          </Text>

          <View>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='shield-outline'
                        size={25}
                    />
                    <Text style={styles.membersListItemText}>
                        Admin
                    </Text>
                </View>
                <View style={[styles.radioButtonOutline]}>
                    { adminRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='school-outline'
                        size={25}
                    />
                    <Text style={styles.membersListItemText}>
                        Mentor
                    </Text>
                </View>
                <View style={[styles.radioButtonOutline]}>
                    { mentorRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='school-outline'
                        size={25}
                    />
                    <Text style={styles.membersListItemText}>
                        Teacher
                    </Text>
                </View>
                <View style={[styles.radioButtonOutline]}>
                    { teacherRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttons} 
                activeOpacity={0.5}
            >
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <Ionicons 
                        name='person-outline'
                        size={25}
                    />
                    <Text style={styles.membersListItemText}>
                        Member
                    </Text>
                </View>
                <View style={[styles.radioButtonOutline]}>
                    { memberRadioButton ?
                        <View style={styles.radioButtonFiller}/>
                    : 
                        null
                    }
                </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.kickContainer}>
            <Text style={styles.kickText}>
              Kick '{item.name}'
            </Text>
          </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create ({
    container: {
      flex: 1,
    },
    profileContainer: {
      padding: 5,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20
    },
    kickContainer: {
      padding: 10,
      backgroundColor: "white",
      alignItems: "center",
      marginVertical: 20,
    },
    kickText: {
      fontFamily: "Avenir Next", 
      fontWeight: "600", 
      fontSize: 17.5,
      color: 'red'
    },
    avatars: {
      width: 35, 
      height: 35, 
      borderRadius: 40, 
      margin: 5, 
      marginRight: 10
    },
    userName: {
      fontFamily: "Avenir Next", 
      fontWeight: "500", 
      fontSize: 15,
    },
    userTagID: {
      fontSize: 12.5, 
      color: "grey", 
      marginLeft: 5, 
      marginRight: 10,
      fontFamily: "Avenir Next", 
      fontWeight: "500", 
    },
    membersListItemText: {
        fontFamily: "Avenir Next",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 7.5,
    },
    buttons: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginBottom: 5
    },
    radioButtonOutline: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#00BDFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonFiller: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#00BDFF',
    },


})

export default EditMemberRoleScreen;
