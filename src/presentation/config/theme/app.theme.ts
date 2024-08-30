import { StyleSheet } from "react-native";

export const colors = {
    darkGray : '#2D2D2D',
    lightGray: '#9B9B9B',
    orange: '#FF9427',

    textPrimary: '#FFFFFF',
    textSecondary: '#666666',
    background : '#000000'
}


export const globalStyles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    button: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        padding: 10,
        textAlign: 'center',
        fontSize: 30,
        color: colors.textPrimary,
        fontWeight: '400'
    },
    calculatorContainer: {
        flex: 1,
        justifyContent: 'flex-end',
/*         borderColor: 'red',
        borderWidth: 2, */
        
    },
    calculatorResultsContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,

    },
    calculatorButtonsContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
/*         borderColor: 'blue',
        borderWidth: 2, */
    },
    mainResult: {
        color: colors.textPrimary,
        fontSize: 65,
        fontWeight: '400',
        marginBottom: 10,
        textAlign: 'right'
    },
    subResult: {
        color: colors.textSecondary,
        fontSize: 35,
        fontWeight: '300',
        textAlign: 'right'
    },


});