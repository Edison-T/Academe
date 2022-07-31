import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    container: {
        width: "75%", 
        height: "97.5%", 
        marginRight: "2.5%",
        backgroundColor: "#F9F9F9", 
        borderRadius: 10,
    },
    nameAndEllipsisContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 17.5,
        justifyContent: "space-between"
    },
    inviteButtonView: {
        backgroundColor: "#E6E6E6", 
        marginLeft: 17.5, 
        marginRight: 17.5,
        marginBottom: 17.5, 
        borderRadius: 5
    },
    inviteButtonIconAndText: {
        flexDirection: "row", 
        alignItems: "center", 
        alignSelf: "center", 
        padding: 5, 
    },
/////////////////////////////////////////
    modalView: {
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flex: 1,
        marginTop: "40%"
    },
    closeButton: {
        padding: 10, 
        borderRadius: 10, 
        width: 60
    },
    searchFriendTextInputWrapper: {
        flexDirection: "row", 
        alignItems: "center", 
        width: "100%", 
        backgroundColor: "#E6E6E6", 
        paddingHorizontal: 10, 
        alignSelf: "center", 
        maxWidth: "95%", 
        borderRadius: 5, 
        marginVertical: 20
    },
    searchFriendTextInput: {
        flex: 1,
        borderRadius: 5, 
        fontSize: 17.5, 
        fontFamily: "Avenir Next",
        alignSelf: "center",
        paddingVertical: 10,
    },
//////////////////////////////
    buttons: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#00BFFF",
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontFamily: "Avenir Next",
        fontWeight: "700",
        fontSize: 30,
        margin: 10,
        textAlign: "center"
    },
    subHeadingText: {
        fontFamily: "Avenir Next",
        fontWeight: "500", 
        fontSize: 17.5,
        width: 400, 
        textAlign: "center",
    },
    addFriendTextInput: {
        width: "90%", 
        height: 50, 
        backgroundColor: "#E6E6E6", 
        borderRadius: 10, 
        fontSize: 17.5, 
        padding: 10, 
        textAlign: "center", 
        fontFamily: "Avenir Next",
        marginTop: 15,
    },
    createButtonText: {
        fontFamily: "Avenir Next",
        fontWeight: "700", 
        fontSize: 17.5,
        color: "white"
    },

    fonts: {
        fontFamily: "Avenir Next", 
        fontWeight: "700", 
    }

})

export default styles; 