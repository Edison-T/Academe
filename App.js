import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ActivityIndicator, LogBox } from "react-native";
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatRoomScreen from "./Screens/ChatRoomScreen";

import ServerScreenComponent from './components/ServerScreenComponent';
import DrawerNavigatorComponent from './components/DrawerNavigatorComponent';
import { createStackNavigator } from '@react-navigation/stack';
import LookingForMoreScreen from './Screens/LookingForMoreScreen';
import CreateServerScreen from './Screens/CreateServerScreen';
import ExploreAndJoinPublicServersScreen from './Screens/ExploreAndJoinPublicServersScreen';
import CreateForAScreen from './Screens/CreateForAScreen';
import JoinServerWithCodeScreen from './Screens/JoinServerScreenWithCode';
import FindFriendsScreen from './Screens/FindFriendsScreen';
import JoinWhatTypeOfServerScreen from './Screens/JoinWhatTypeOfServerScreen';
import ExploreAndJoinClassesScreen from './Screens/ExploreAndJoinClassesScreen';
import CreateCategoriesAndChannelsScreen from './Screens/CreateCategoriesAndChannelsScreen';
import ChatRoomSettingsScreen from './Screens/ChatRoomSettingsScreen';
import EditServerScreen from './Screens/EditServerScreen';
import MembersSettingScreen from './Screens/MembersSettingScreen';
import ReOrderServerLayoutScreen from './Screens/ReOrderServerLayoutScreen';
import ReOrderCategoriesScreen from './Screens/ReOrderCategoriesScreen';
import EditMemberRoleScreen from './Screens/EditMemberRoleScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as mutations from './src/graphql/mutations';
import * as queries from './src/graphql/queries';

import awsConfig from './src/aws-exports';

import { API, Auth, Amplify, Hub, graphqlOperation } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { withOAuth } from "aws-amplify-react-native";
import LoginScreen from './Screens/LoginScreen';
import * as WebBrowser from 'expo-web-browser';
import SignUpScreen from './Screens/SignUpScreen';
import ConfirmSignUpScreen from './Screens/ConfirmSignUpScreen';
import UserProfileScreen from './Screens/UserProfileScreen';
import FriendsScreen from './Screens/FriendsScreen';
import IdentitiesScreen from './Screens/IdentitiesScreen';
import AccountInformationScreen from './Screens/AccountInformationScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import EditAllNotificationsScreen from './Screens/EditAllNotificationsScreen';
import EditServerNotificationsScreen from './Screens/EditServerNotificationsScreen';
import AnnouncementsScreen from './Screens/AnnouncementsScreen';

import store from './redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { selectUser } from './redux/features/userSlice';
import { getUser } from './Screens/queries';
import { login, logout } from './redux/features/userSlice'

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
      return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsConfig,
  oauth: {
      ...awsConfig.oauth,
      urlOpener,
  },
});
LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

  function App (props) {
    //const [user, setUser] = useState(null);
    //const [customState, setCustomState] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

  const {
    oAuthUser, //use this in conditional render for auth or unauth user if redux does not work
    oAuthError,
    hostedUISignIn,
    googleSignIn,
    customProviderSignIn,
    signOut,
  } = props;

  const checkForExistingUser = async (userID) => {
    const existingUser = await API.graphql({
      query: queries.getUser,
      variables: { id: userID },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })

    if (existingUser.data.getUser) {
      console.log(`We checked that ${userID} already has a graphql user, so we will not create a new one`)
      return
    }

    function makeTagNumber() {
      var tagNumber = "";
      var possible = "0123456789";
    
      for (var i = 0; i < 4; i++)
        tagNumber += possible.charAt(Math.floor(Math.random() * possible.length));
      return tagNumber;
    }

    const randomProfilePictures = [
      "icons8-bird-96.png",
      "icons8-duck-96.png",
      "icons8-dove-96.png",
      "icons8-dog-96.png",
      "icons8-hummingbird-96-2.png",
      "icons8-hummingbird-96.png",
      "icons8-parrot-96.png",
      "icons8-pelican-96.png",
      "icons8-penguin-96.png",
      "icons8-puffin-bird-96.png",
      "icons8-snail-96.png",
    ]

    function makeRandomProfilePicture() {
      return randomProfilePictures[Math.floor(Math.random() * randomProfilePictures.length)]
    }

    const newUser = {
      id: userID,
      name: "academe_user",
      tagNumber: makeTagNumber(),
      profilePicture: makeRandomProfilePicture(),
      isTeacherRole: null,
    }

    const createdNewUser = (await API.graphql({
      query: mutations.createUser,
      variables: { input: newUser },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    }));

    console.log(`Created new user in App.js: ${createdNewUser}`)
  };

  const fetchUserInfo = async (userID) => {
    try {
      const userData = await API.graphql(
          graphqlOperation(
              getUser, {
                  id: userID,
              },
          ),
      )
      dispatch(login({
        id: userData.data.getUser.id,
        name: userData.data.getUser.name,
        tagNumber: userData.data.getUser.tagNumber,
        profilePicture: userData.data.getUser.profilePicture,
        status: userData.data.getUser.status,
        isTeacherRole: userData.data.getUser.isTeacherRole,
        lastOnlineAt: userData.data.getUser.lastOnlineAt,
      }))
  } catch (e) {
      console.log(e);
      return
  }
}

  useEffect(() => {
    const unsubscribe =  Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          try {
            const userID = data.signInUserSession.idToken.payload.sub
            checkForExistingUser(userID)
            fetchUserInfo(userID)
          }
          catch (e) {
            console.log(e)
          }
          break;
        case "signOut":
          dispatch(logout())
          break;
          case 'signIn_failure':
          case 'cognitoHostedUI_failure':
              console.log('Sign in failure', data);
              break;
      }
    });

    //Should I put this in another useEffect to make it cleaner? Auth is for checking google sign in.
    //This checks if the user has already logged in and closes the app. When opened again, they don't have to log in again.
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        const userID = currentUser.signInUserSession.idToken.payload.sub
        fetchUserInfo(userID)
      })
      .catch((e) => {
        dispatch(logout())
        console.log(e);
        console.log("Not signed in")
      })

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   Hub.listen('auth', ({ payload: { event, data } }) => {
  //       switch (event) {
  //           case 'signIn':
  //               getUser().then((userData) => setUser(userData));
  //               break;
  //           case 'signOut':
  //               setUser(null);
  //               break;
  //           case 'signIn_failure':
  //           case 'cognitoHostedUI_failure':
  //               console.log('Sign in failure', data);
  //               break;
  //       }
  //   });

  //   getUser().then((userData) => setUser(userData));
  // }, []);

  // function getUser() {
  //   return Auth.currentAuthenticatedUser()
  //       .then((userData) => userData)
  //       // async (userData) => {

  //     // const checkExistingUser = {
  //     //   id: userData.attributes.sub,
  //     // }

  //     // const existingUser = await API.graphql({
  //     //   query: queries.getUser,
  //     //   variables: { input: checkExistingUser },
  //     //   authMode: 'AWS_IAM',
  //     // })

  //     // if (existingUser.data.getUser) {
  //     //   console.log(`${userData.attributes.sub} already has a graphql user`)
  //     //   return
  //     // }

  //     // const newUser = {
  //     //   id: userData.attributes.sub,
  //     //   name: "google_user",
  //     // }

  //     // const item = (await API.graphql({
  //     //   query: mutations.createUser,
  //     //   variables: { input: newUser },
  //     //   authMode: 'AWS_IAM',
  //     // }));

  //     //console.log(item);
  //       .catch(() => console.log('Not signed in'));
  // }

      function DrawerNavigator() {
        return (
          <Drawer.Navigator 
            drawerContent={props => <DrawerNavigatorComponent {...props} />}
            screenOptions={{
              drawerStyle: {
                width: "85%",
              },
              overlayColor: "transparent",
              swipeEdgeWidth: 1000,
            }}
          >
            <Drawer.Screen 
              name="ChatRoomScreen" 
              component={ChatRoomScreen} 
              initialParams={{ item: "Initial Chatroom" }}
              options={ ({ route }) => ({ 
                title: route.params.item.name, 
                headerStyle: { backgroundColor: "#F4F4F4" },
              })}
            />
            <Drawer.Screen 
              name="AnnouncementsScreen" 
              component={AnnouncementsScreen} 
              options={ ({ route }) => ({ 
                title: (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons 
                        name="bullhorn-variant"
                        size={ 17 }
                        style={{ marginRight: 10 }}
                        color={'#0BDFFF'}
                    />
                    
                    <Text style={{ fontSize: 17.5, fontWeight: "600" }}>
                        Announcements
                    </Text>
                  </View>
                ), 
                headerStyle: { backgroundColor: "#F4F4F4" },
              })}
            />
            <Drawer.Screen 
              name="ChatRoomSettingsScreen" 
              component={ChatRoomSettingsScreen} 
              options={ () => ({ 
                headerStyle: { backgroundColor: "transparent" },
                swipeEnabled: false,
                title: null
              })}           
            />
            <Drawer.Screen 
              name="AddAndJoinServerScreens" 
              component={AddAndJoinServerScreens} 
              options={{ headerShown: false, swipeEnabled: false, }}
            />
            <Drawer.Screen 
              name="EditServerScreens" 
              component={EditServerScreens} 
              options={{ headerShown: false, swipeEnabled: false, }}
            />
          </Drawer.Navigator>
        )
      }
      function AuthenticationScreens() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerStyle: { backgroundColor: "#00BDFF" }, title: null, headerShown: false}} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerStyle: { backgroundColor: "#00BDFF", shadowColor: "transparent" }, title: null }} />
            <Stack.Screen name="ConfirmSignUpScreen" component={ConfirmSignUpScreen} options={{headerStyle: { backgroundColor: "#00BDFF", shadowColor: "transparent" }, title: null }} />
          </Stack.Navigator>
        );
      }
      function AddAndJoinServerScreens() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="LookingForMoreScreen" component={LookingForMoreScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="CreateServerScreen" component={CreateServerScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="ExploreAndJoinPublicServersScreen" component={ExploreAndJoinPublicServersScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="CreateForAScreen" component={CreateForAScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="FindFriendsScreen" component={FindFriendsScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="JoinServerWithCodeScreen" component={JoinServerWithCodeScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="JoinWhatTypeOfServerScreen" component={JoinWhatTypeOfServerScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="ExploreAndJoinClassesScreen" component={ExploreAndJoinClassesScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="CreateCategoriesAndChannelsScreen" component={CreateCategoriesAndChannelsScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />

          </Stack.Navigator>
        );
      }
      function EditServerScreens() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="CreateCategoriesAndChannelsScreen" component={CreateCategoriesAndChannelsScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null}} />
            <Stack.Screen name="EditServerScreen" component={EditServerScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: "Server Settings"}} />
            <Stack.Screen name="MembersSettingScreen" component={MembersSettingScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: "Members"}} />
            <Stack.Screen name="ReOrderServerLayoutScreen" component={ReOrderServerLayoutScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: "Server Layout"}} />
            <Stack.Screen name="ReOrderCategoriesScreen" component={ReOrderCategoriesScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: "Categories"}} />
            <Stack.Screen name="ReOrderChannelsScreen" component={ReOrderCategoriesScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: "Channels"}} />
            <Stack.Screen name="EditMemberRoleScreen" component={EditMemberRoleScreen} options={({route}) => ({headerStyle: { backgroundColor: "transparent" }, title: `Edit ${route.params.item.name}`})} />
          </Stack.Navigator>
        );
      }

      function UserProfileScreens() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{headerStyle: { backgroundColor: "transparent" }, title: null, headerShown: false}} />
            <Stack.Screen name="IdentitiesScreen" component={IdentitiesScreen} options={{headerStyle: { backgroundColor: "#F4F4F4" }, title: "Edit Identities" }} />
            <Stack.Screen name="AccountInformationScreen" component={AccountInformationScreen} options={{headerStyle: { backgroundColor: "#F4F4F4" }, title: "Account" }} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{headerStyle: { backgroundColor: "#F4F4F4" }, title: "Change Password" }} />
            <Stack.Screen name="EditAllNotificationsScreen" component={EditAllNotificationsScreen} options={{headerStyle: { backgroundColor: "#F4F4F4" }, title: "Edit Notifications" }} />
            <Stack.Screen name="EditServerNotificationsScreen" component={EditServerNotificationsScreen} 
              options={ ({ route }) => ({ 
                title: route.params.item.name, 
                headerStyle: { backgroundColor: "#F4F4F4" },
              })} 
            />
          </Stack.Navigator>
        )
      }

      function FriendsScreens() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{headerStyle: { backgroundColor: "#F4F4F4" }, title: "Friends" }} />
          </Stack.Navigator>
        )
      }

      return (
          <NavigationContainer>
              { user ?
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  headerShown: false,
                  tabBarStyle: {backgroundColor: "#F0F0F0"},
                  tabBarLabel: () => { return null },
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'DrawerNavigator') {
                      iconName = focused ? 'chatbox' : 'chatbox-outline';
                    } else if (route.name === 'FriendsScreens') {
                      iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'UserProfileScreens') {
                      iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#00BDFF',
                  tabBarInactiveTintColor: 'gray',
                })}
              >
                <Tab.Screen
                  name="DrawerNavigator"
                  component={DrawerNavigator}
                  //options={{ tabBarStyle: {display: 'none'} }}
                />
                <Tab.Screen
                  name="FriendsScreens"
                  component={FriendsScreens}
                />
                <Tab.Screen
                  name="UserProfileScreens"
                  component={UserProfileScreens}
                />
              </Tab.Navigator>
              :
              <Stack.Navigator
                  screenOptions={{
                    headerShown: false
                  }}
              >
                <Stack.Screen 
                  name="AuthenticationScreens" 
                  component={AuthenticationScreens} 
                  options={ () => ({ 
                    headerStyle: { backgroundColor: "transparent" },
                    title: null
                  })}
                />
              </Stack.Navigator>
              }
          </NavigationContainer>
      );
    };

    function AppWrapper () {
      return (
        <Provider store={store}>
          <App/>
        </Provider>
      )
    }

// export default withAuthenticator(App, {
//   signUpConfig: {
//     hiddenDefaults: ['phone_number']
//   }
// })
export default withOAuth(AppWrapper);