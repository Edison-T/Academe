import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    leftContainer: {
        flex: 1,
        paddingBottom: 7.5,
        paddingTop: 7.5,
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    S3Image: {
        width: 55, 
        height: 55, 
        aspectRatio: 1, 
        borderRadius: 10, 
    }
});

export default styles;