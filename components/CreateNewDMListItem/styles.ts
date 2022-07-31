import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    subContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    mainContainer: {
        margin: 5,
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#E6E6E6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    avatars: {
        width: 35, 
        height: 35, 
        borderRadius: 40, 
        margin: 5, 
        marginRight: 10
    },
    inviteFont: {
        fontFamily: "Avenir Next", 
        fontSize: 15, 
        textAlign: "center", 
        fontWeight: "500"
    },
    inviteButtonWrap: {
        width: 75, 
        height: 30, 
        backgroundColor: 'white',
        borderRadius: 5, 
        justifyContent: "center", 
        marginRight: 5
    },

    fonts: {
        fontFamily: "Avenir Next", 
        fontWeight: "500", 
        //selected DM will have 700 weight
    }
})

export default styles; 