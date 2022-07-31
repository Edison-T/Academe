import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    touchablehighlightUnderLayPress: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 1,
        paddingRight: 1,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 5,
    },
    avatars: {
        width: 35, 
        height: 35, 
        borderRadius: 40, 
        margin: 5, 
        marginRight: 10
    },

    fonts: {
        fontFamily: "Avenir Next", 
        fontWeight: "500", 
        //selected DM will have 700 weight
    }
})

export default styles; 