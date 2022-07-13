import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttons: {
        width: "90%",
        alignSelf: "center",
        height: 80,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    texts: {
        fontFamily: "Avenir Next",
        fontWeight: "700",
        fontSize: 17.5,
        marginLeft: 70
    },
    tinyButtonImages: {
        width: 50, 
        height: 50, 
        position: "absolute", 
        margin: 5
    }
})

export default styles; 