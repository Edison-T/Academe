import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    messageBox: {
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#F4F4F4',
        alignSelf: "flex-start",
        width: "100%",
    },
    name: {
        color: "#00BFFF",
        fontWeight: 'bold',
        fontSize: 15,
    },
    message: {
        fontSize: 15,
    },
});

export default styles;