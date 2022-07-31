import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    touchablehighlightUnderLayPress: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 1,
        paddingRight: 1,
        backgroundColor: "white"
    },
    radioButtonOutline: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#00BDFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    radioButtonFiller: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#00BDFF',
    },

    fonts: {
        fontFamily: "Avenir Next", 
        fontWeight: "700", 
    }
})

export default styles; 