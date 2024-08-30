import { View, Text, Pressable, useWindowDimensions } from "react-native"
import { colors, globalStyles } from "../config/theme/app.theme"
import { CalculatorButton } from "./CalculatorButton";
import { INITIAL_STATES, useCalculator } from "../hooks/useCalculator";
import { OPERATOR_DICTIONARY } from "../models/operator.types";



export const CalculatorScreen = () => {

    const { height, width } = useWindowDimensions();
    const {
        result ,
        subResult ,
        firstCombo ,
        secondCombo ,
        operator , 
        resetCount , 
        addNumber , 
        handleOperator , 
        handleSignShortcutButton , 
        handlePercentButton ,
        calculate
        } = useCalculator(); 
    const dimension = (width > height) ? true : false;

    return (
        <View style={[
            globalStyles.calculatorContainer,
            { flexDirection: (dimension) ? 'row' : 'column' }
        ]}>
            <View style={[
                globalStyles.calculatorResultsContainer,
                { justifyContent: (dimension) ? 'center' : 'flex-end' }
            ]}>
                <Text style={globalStyles.mainResult} adjustsFontSizeToFit numberOfLines={ 1 }>{ result }</Text>
                <Text style={globalStyles.subResult} adjustsFontSizeToFit numberOfLines={ 1 }>{ subResult }</Text>
            </View>

            <View style={[
                globalStyles.calculatorButtonsContainer,
                { marginTop: (dimension) ? 0 : 50 }
            ]}>
                <View style={[
                    globalStyles.buttonsRow,
                    { marginVertical: (dimension) ? 3 : 5 }
                ]}>
                    <CalculatorButton label={ ( firstCombo || secondCombo || operator ) ? 'C' : 'AC' } dimension={dimension} background={colors.lightGray} color={colors.background} onPress={ resetCount } />
                    <CalculatorButton label="+/-" dimension={dimension} background={colors.lightGray} color={colors.background} onPress={ handleSignShortcutButton }/>
                    <CalculatorButton label={ OPERATOR_DICTIONARY.PERCENT } dimension={dimension} background={colors.lightGray} color={colors.background} onPress={ handlePercentButton }/>
                    <CalculatorButton label={ OPERATOR_DICTIONARY.DIVISION } dimension={dimension} background={colors.orange} onPress={ () => handleOperator( OPERATOR_DICTIONARY.DIVISION ) } operator={ operator }/>
                </View>
                <View style={[
                    globalStyles.buttonsRow,
                    { marginVertical: (dimension) ? 3 : 5 }
                ]}>
                    <CalculatorButton label="7" dimension={dimension} onPress={ () => addNumber('7') } />
                    <CalculatorButton label="8" dimension={dimension} onPress={ () => addNumber('8') } />
                    <CalculatorButton label="9" dimension={dimension} onPress={ () => addNumber('9') } />
                    <CalculatorButton label={ OPERATOR_DICTIONARY.MULTIPLICATION } dimension={dimension} background={colors.orange} onPress={ () => handleOperator( OPERATOR_DICTIONARY.MULTIPLICATION ) } operator={ operator }/>
                </View>
                <View style={[
                    globalStyles.buttonsRow,
                    { marginVertical: (dimension) ? 3 : 5 }
                ]}>
                    <CalculatorButton label="4" dimension={dimension} onPress={ () => addNumber('4') } />
                    <CalculatorButton label="5" dimension={dimension} onPress={ () => addNumber('5') } />
                    <CalculatorButton label="6" dimension={dimension} onPress={ () => addNumber('6') } />
                    <CalculatorButton label={ OPERATOR_DICTIONARY.SUBTRACTION } dimension={dimension} background={colors.orange} onPress={ () => handleOperator( OPERATOR_DICTIONARY.SUBTRACTION ) } operator={ operator }/>
                </View>
                <View style={[
                    globalStyles.buttonsRow,
                    { marginVertical: (dimension) ? 3 : 5 }
                ]}>
                    <CalculatorButton label="1" dimension={dimension} onPress={ () => addNumber('1') } />
                    <CalculatorButton label="2" dimension={dimension} onPress={ () => addNumber('2') } />
                    <CalculatorButton label="3" dimension={dimension} onPress={ () => addNumber('3') } />
                    <CalculatorButton label={ OPERATOR_DICTIONARY.ADDITION } dimension={dimension} background={colors.orange} onPress={ () => handleOperator( OPERATOR_DICTIONARY.ADDITION ) } operator={ operator }/>
                </View>
                <View style={[
                    globalStyles.buttonsRow,
                    { marginVertical: (dimension) ? 3 : 5 }
                ]}>
                    <CalculatorButton label="0" dimension={dimension} doubleSize onPress={ () => addNumber('0') } />
                    <CalculatorButton label="," dimension={dimension} onPress={ () => addNumber(',') } />
                    <CalculatorButton label="=" dimension={dimension} background={colors.orange} onPress={ calculate } />
                </View>
            </View>
        </View>
    )
}
