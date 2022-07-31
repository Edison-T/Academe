import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#E6E6E6",
        marginTop: -10,
    },
    serverNavigator: {
        backgroundColor: "transparent", 
        flexDirection: "column", 
        alignSelf: "flex-start", 
        borderTopRightRadius: 12.5, 
        borderBottomRightRadius: 12.5,
        height: "100%",
    },
    schoolIcon: {
        alignSelf: "center",
        marginTop: 5,
    },
    directMessageIcon: {
        backgroundColor: "white",
        alignItems: "center",
        width: 55,
        height: 55,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5
    },
    addNewServerButton: {
        backgroundColor: "white",
        alignItems: "center",
        width: 55,
        height: 55,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 55,
        marginTop: 5,
    }
})

export default styles;