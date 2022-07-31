import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    messageBox: {
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignSelf: "flex-start",
        width: "100%",
    },
    reply: {
        color: "grey", 
        fontSize: 12, 
        fontWeight: 'normal'
    },
    image: {
        width: 20,  
        height: 20, 
        aspectRatio: 1, 
        borderRadius: 50,
    },
    name: {
        color: "#00BFFF",
        fontWeight: 'bold',
        fontSize: 12.5,
    },
    
});

export default styles;