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


const ReOrderServerLayoutScreen = () => {
    const [ reorderModal, setReorderModal ] = useState(false);

    const navigation = useNavigation();

    const toggleReorderModal = () => {
      setReorderModal(!reorderModal);
    };

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
                    onPress={toggleReorderModal}
                  >
                    <Text 
                        style={{ fontFamily: "Avenir Next", fontSize: 15, fontWeight: "600" }}>
                            Reorder
                    </Text>
                  </TouchableOpacity>
                </View>
              )
    }), [navigation]});

    const channels = [
      {
          name: "Science",
          threads: ["Lab Report", "Homework", "Upcoming Tests/Quizzes"]
      },
      {
          name: "Math",
          threads: ["Experiments", "Homework", "Upcoming Tests/Quizzes"]
      },
      {
        name: "College Preparation",
        threads: ["Financial Aid", "Scholarships", "College Essay Topics", "College Applications"]
      },
    ] 

    const navigateToReOrderCategoriesScreen = () => {
      toggleReorderModal();
      navigation.navigate('EditServerScreens', { screen: 'ReOrderCategoriesScreen' })
    };

    const navigateToReOrderChannelsScreen = () => {
      toggleReorderModal();
      navigation.navigate('EditServerScreens', { screen: 'ReOrderChannelsScreen' })
    }
   
    return (
        <View style={styles.container}>
            <FlatList 
              data={channels}
              renderItem={({ item }) => <ReorderCategoriesListItem item={item}/>}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 20 }}
            />

            <TouchableOpacity
              style={styles.createButton}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('EditServerScreens', { 
                screen: 'CreateCategoriesAndChannelsScreen',
                params: { goBackWhere: "ReOrderServerLayoutScreen" }
              })}
            >
              <Ionicons 
                name='create-outline'
                size={30}
                color={'#00BDFF'}
              />
            </TouchableOpacity>
            <Modal 
              isVisible={reorderModal} 
              backdropOpacity={0.50}
              onBackdropPress={toggleReorderModal}
              style={{ margin: 0 , justifyContent: "flex-end" }}
            >
              <View style={styles.modalView}> 
                <Text style={{ fontFamily: "Avenir Next", fontSize: 20, fontWeight: "700", padding: 10 }}>
                  Reorder:
                </Text>
                <View>
                  <TouchableOpacity 
                      style={styles.buttons} 
                      activeOpacity={0.5}
                      onPress={navigateToReOrderCategoriesScreen}
                  >
                      <View style={{ alignItems: "center", flexDirection: "row" }}>
                          <Ionicons 
                              name='folder-outline'
                              size={25}
                          />
                          <Text style={styles.membersListItemText}>
                              Categories
                          </Text>
                      </View>
                      <Ionicons 
                          name='chevron-forward'
                          size={20}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity 
                      style={styles.buttons} 
                      activeOpacity={0.5}
                      onPress={navigateToReOrderChannelsScreen}
                  >
                      <View style={{ alignItems: "center", flexDirection: "row" }}>
                          <MaterialCommunityIcons 
                              name='pound'
                              size={25}
                          />
                          <Text style={styles.membersListItemText}>
                              Channels
                          </Text>
                      </View>
                      <Ionicons 
                          name='chevron-forward'
                          size={20}
                      />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
        </View>
        
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    createButton: {
      position: "absolute", 
      width: 75, 
      height: 75, 
      borderRadius: 60, 
      backgroundColor: "white", 
      alignSelf: "flex-end", 
      alignItems: "center", 
      justifyContent: "center", 
      right: 30, 
      bottom: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
    },
    modalView: {
      backgroundColor: "white",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      flex: 1,
      marginTop: "135%"
    },
    membersListItemText: {
      fontFamily: "Avenir Next",
      fontWeight: "600",
      fontSize: 15,
      marginLeft: 7.5,
  },
    buttons: {
      width: "95%",
      alignSelf: "center",
      borderRadius: 5,
      backgroundColor: "#E9E9E9",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      marginBottom: 5,
    },

})

export default ReOrderServerLayoutScreen;
