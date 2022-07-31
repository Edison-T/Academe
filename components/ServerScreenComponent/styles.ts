import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({
    container: {
        width: "75%", 
        marginRight: "2.5%", //changes space/gap between serverComponent and chatRoom screen
        height: "97.5%", 
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
        marginLeft: 17.5, 
        marginRight: 17.5,
        marginBottom: 17.5, 
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    inviteButtonIconAndText: {
        flexDirection: "row", 
        alignItems: "center", 
        alignSelf: "center", 
        padding: 5, 
    },
////////////////////////////////
    announcementsMainView: {
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 1,
        paddingRight: 1,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 5,
    },
    announcementsAndTextSubView: {
        flexDirection: "row",
        alignItems: "center",
    },
    ////////////////////////////
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
    shareButtonsRowView: {
        flexDirection: "row", 
        justifyContent: "space-between",
        margin: 20
    },
    shareCircleButtons: {
        width: 60, 
        height: 60, 
        borderRadius: 60, 
        alignItems: "center", 
        justifyContent: "center", 
        alignContent: "space-between"
    },
    lineSeparator: {
        backgroundColor: 'grey',
        height: 0.5,
        marginLeft: 7.5,
        marginRight: 7.5
    },
    textInput: {
        width: "95%", 
        height: 50, 
        backgroundColor: "#E6E6E6", 
        borderRadius: 5, 
        fontSize: 17.5, 
        fontFamily: "Avenir Next",
        alignSelf: "center",
        paddingHorizontal: 10,
        margin: 20,
    },
    ////////////////////////////
    serverImageForModal: {
        width: 65, 
        height: 65, 
        aspectRatio: 1, 
        borderRadius: 10, 
        marginLeft: 15
    },
    ////////////////////////
    noCategoriesText: {
        fontSize: 12.5, 
        textAlign: "center", 
        marginHorizontal: 35, 
        marginTop: 20, 
        fontWeight: "500", 
        color: "grey"
    },
    noCategoriesImage: {
        width: "80%",
        height: "35%", 
        alignSelf: "center", 
        marginTop: "40%"
    },

    fonts: {
        fontFamily: "Avenir Next", 
        fontWeight: "700", 
    }

})

export default styles; 