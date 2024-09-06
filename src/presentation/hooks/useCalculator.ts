import { useState } from "react"
import { OPERATOR_DICTIONARY } from "../models/operator.types";

export const INITIAL_STATES = {
    result: '0',
    subResult: '',
    operator: '',
    firstCombo: '',
    secondCombo: ''
}


export const useCalculator = () => {

    const [result, setResult] = useState<string>(INITIAL_STATES.result);
    const [subResult, setSubResult] = useState<string>(INITIAL_STATES.subResult);
    const [operator, setOperator] = useState<string>(INITIAL_STATES.operator);
    const [firstCombo, setFirstCombo] = useState(INITIAL_STATES.firstCombo);
    const [secondCombo, setSecondCombo] = useState(INITIAL_STATES.secondCombo);

    /**
     * This method works as helper to separate all numbers from '0'
     * @param buttonPressed 
     */
    const buildResult = (buttonPressed: string) => {

        if (operator) {
            // Means that we are handling the second combo
            if (buttonPressed === ',') {
                // setSecondCombo( secondCombo + '.' );
                handleComaButton();
            } else {
                setSecondCombo(secondCombo + buttonPressed);
                const newResult = serializeNumber(secondCombo + buttonPressed);
                setResult(newResult);
            }
        } else {
            // Means that we are handling the first combo
            if (buttonPressed === ',') {
                
                handleComaButton();
            } else {
                setFirstCombo(firstCombo + buttonPressed);
                const newResult = serializeNumber(firstCombo + buttonPressed);
                setResult(newResult);
            }
        }
    }

    /**
     * Method to handle the dots on thousands digits and concatenate with comma ( if it was pressed )
     * @param combo => Current combo
     * @returns => Serialized result
     */
    const serializeNumber = (combo: string): string => {

        const [entero, decimal] = combo.split('.');

        let result = "";

        if (entero.length < 4) {
            result = combo.replace('.', ',');
            return result;
        }

        for (let i = 0; i < entero.length; i++) {
            const rest = entero.length - (i + 1);
            if (rest % 3 === 0 && rest !== 0) {
                result = result + entero[i] + '.';
            } else {
                result += entero[i];
            }
        }

        return `${result}${decimal ? ',' + decimal : ""}`;
    }

    /**
     * This method will reset all states and displays the calculator as the beginning
     */
    const resetCount = () => {

        setResult(INITIAL_STATES.result);
        setSubResult(INITIAL_STATES.subResult)
        setOperator(INITIAL_STATES.operator);
        setFirstCombo(INITIAL_STATES.firstCombo);
        setSecondCombo(INITIAL_STATES.secondCombo);

    }

    /**
     * This method will be tiggered every time the user press a number 
     * @param numberPressed => Current number pressed
     */
    const addNumber = (numberPressed: string) => {
        if (result.includes(',') && result.length === 12) { return; }
        if (!result.includes(',') && result.length === 11) { return; }

        if (numberPressed === '0') {
            handleZeroButton();
            return;
        } else {
            buildResult(numberPressed);
        }
    }

    /**
     * This method will handle every action related with zero
     */
    const handleZeroButton = () => {
        // Means that we are handling the second combo
        if (operator) {
            if( secondCombo === '0' ) { return; }
            if (secondCombo === INITIAL_STATES.secondCombo) {
                setSecondCombo('0');
                setResult('0');
            } else if (result.includes(',') && result.length <= 9) {
                setSecondCombo(secondCombo + '0');
                const newResult = serializeNumber(secondCombo + '0');
                setResult(newResult);
            } else {
                setSecondCombo(secondCombo + '0');
                const newResult = serializeNumber(secondCombo + '0');
                setResult(newResult);
            }


        } else {
            // Means that we are handling the first combo
            if( firstCombo === '0' ) { return; }
            if (firstCombo === INITIAL_STATES.firstCombo) {
                setFirstCombo('0');
                setResult('0');
            } else if (result.includes(',') && result.length <= 9) {
                setFirstCombo(firstCombo + '0');
                const newResult = serializeNumber(firstCombo + '0');
                setResult(newResult);
            } else {
                setFirstCombo(firstCombo + '0');
                const newResult = serializeNumber(firstCombo + '0');
                setResult(newResult);
            }
        }
    }
    /**
     * This method will handle events related of the comma button
     */
    const handleComaButton = () => {
        if (!result.includes(',')) {

            if( operator ){

                let newSecondCombo = `${secondCombo}.`;
                if( secondCombo === INITIAL_STATES.secondCombo ){
                    newSecondCombo = `0.`;
                }
                setSecondCombo(newSecondCombo);
            }else{
                let newFirstCombo = `${firstCombo}.`;
                if( firstCombo === INITIAL_STATES.firstCombo ){
                    newFirstCombo = `0.`;
                }
                setFirstCombo(newFirstCombo);
            }

            setResult(result + ',');
        }
    }
    /**
     * This method will take care of mantain the state of the operator selected
     * @param operatorPressed => Current type of operator
     */
    const handleOperator = (operatorPressed: string) => {
        if (operator === operatorPressed) { return; }
        if (firstCombo === INITIAL_STATES.firstCombo) {
            setOperator(operatorPressed);
            return;
        }

        setOperator(operatorPressed);
    }
    /**
     * This method will handle the actions related to the +/- button
     */
    const handleSignShortcutButton = () => {

        if( operator ){
            let newSecondCombo;
            if( secondCombo === INITIAL_STATES.secondCombo  ) {
                newSecondCombo = '-0';
            }else if( secondCombo.includes('-') ) {
                newSecondCombo = secondCombo.replace('-','');
            }else {
                newSecondCombo = `-${secondCombo}`;
            }
            setSecondCombo( newSecondCombo );
            newSecondCombo = serializeNumber( newSecondCombo );
            setResult( newSecondCombo );
        }else {
            let newFirstCombo;
            if( firstCombo === INITIAL_STATES.firstCombo  ) {
                newFirstCombo = '-0';
            }else if( firstCombo.includes('-') ) {
                newFirstCombo = firstCombo.replace('-','');
            }else {
                newFirstCombo = `-${firstCombo}`;
            }
            setFirstCombo( newFirstCombo );
            newFirstCombo = serializeNumber( newFirstCombo );
            setResult( newFirstCombo );
        }
    }
    /**
     * This method will take care of the actions related of % button
     */
    const handlePercentButton = () => {

        if( secondCombo !== '0' && secondCombo !== INITIAL_STATES.secondCombo && operator !== INITIAL_STATES.operator){
            let newSecondCombo = Number(secondCombo) / 100;
            if( `${ newSecondCombo }`.includes('e')){ return; }

            let newSecondCombSerialized =  serializeNumber( `${newSecondCombo}` );


            setSecondCombo( `${newSecondCombo}` );
            setResult( newSecondCombSerialized );
        }
        if( firstCombo !== '0' && firstCombo !== INITIAL_STATES.firstCombo && operator === INITIAL_STATES.operator){
            let newFirstCombo = Number(firstCombo) / 100;

            if( `${ newFirstCombo }`.includes('e') ){ return; }
            let newFirstComboSerialized =  serializeNumber( `${newFirstCombo}` );
            
            setFirstCombo( `${newFirstCombo}` );
            setResult( newFirstComboSerialized );
        }
    }
    /**
     * This mithod will be activated by pressing the key =
     */
    const calculate = () => {

        if (firstCombo === INITIAL_STATES.firstCombo &&
            secondCombo === INITIAL_STATES.secondCombo &&
            operator === INITIAL_STATES.operator
        ) {
            return;
        }

        if( subResult.includes('Error') ) { return; }

        if( result === INITIAL_STATES.result  &&
            ( operator === INITIAL_STATES.operator || firstCombo === INITIAL_STATES.firstCombo )
         ){ return; } 

        if( secondCombo === INITIAL_STATES.secondCombo ){
            
            handleOperatorSign( firstCombo , firstCombo );

        }else if( firstCombo === INITIAL_STATES.firstCombo ){
            const [,newFirstCombo] = subResult.split('= ');
            handleOperatorSign( newFirstCombo.replace(',','.') , secondCombo );
        }else {
            handleOperatorSign( firstCombo , secondCombo );
        }

    }
    /**
     * This method works as a helper of calculate(), its function is provide a value to subResult state depending of the values
     * stored on the combos states and the sort of operator that the user selected
     * @param firstCombo => First value of the operation
     * @param secondCombo => Second value of the operation
     */
    const handleOperatorSign = ( firstCombo: string , secondCombo: string ) => {
        let result;
        let _first = firstCombo;
        let _second = secondCombo;
        let _operator = "";
        switch ( operator ) {
            case OPERATOR_DICTIONARY.MULTIPLICATION:
                result = '0';
                if( _first !== '0' || _second !== '0' ) {
                    result = `${Number( firstCombo ) * Number( secondCombo )}`;
                    result = ( result.includes('.') ? Number(result).toFixed(2) : result ).replace('.',',');
                    _first = `${_first}`.replace('.' , ',');
                    _second = `${_second}`.replace('.',',');
                }
                setResult( INITIAL_STATES.result );
                setFirstCombo( INITIAL_STATES.firstCombo );
                setSecondCombo( INITIAL_STATES.secondCombo );
                _operator = OPERATOR_DICTIONARY.MULTIPLICATION;
                setSubResult( `(${_first}) ${_operator} (${_second}) = ${result}` );
                break;
            case OPERATOR_DICTIONARY.DIVISION:

                if( _first !== '0' && _second === '0' ) {
                    result = 'Error';
                } else if( _first === '0' && _second !== '0' ) {
                    result = '0'
                }else if( _first !== '0' && _second !== '0' ) {
                    result = `${Number( firstCombo ) / Number( secondCombo )}`;
                    result = ( result.includes('.') ? Number(result).toFixed(2) : result ).replace('.',',');
                    _first = `${_first}`.replace('.' , ',');
                    _second = `${_second}`.replace('.',',');
                }
                setResult( INITIAL_STATES.result );
                setFirstCombo( INITIAL_STATES.firstCombo );
                setSecondCombo( INITIAL_STATES.secondCombo );
                _operator = OPERATOR_DICTIONARY.DIVISION;
                setSubResult( `(${_first}) ${_operator} (${_second}) = ${result}` );
                
                break;
            case OPERATOR_DICTIONARY.ADDITION:
                result = `${Number( firstCombo ) + Number( secondCombo )}`;
                result = ( result.includes('.') ? Number(result).toFixed(2) : result ).replace('.',',');
                _first = `${_first}`.replace('.' , ',');
                _second = `${_second}`.replace('.',',');
                setResult( INITIAL_STATES.result );
                setFirstCombo( INITIAL_STATES.firstCombo );
                setSecondCombo( INITIAL_STATES.secondCombo );
                _operator = OPERATOR_DICTIONARY.ADDITION;
                setSubResult( `(${_first}) ${_operator} (${_second}) = ${result}` );
                break;
            case OPERATOR_DICTIONARY.SUBTRACTION:
                result = `${Number( firstCombo ) - Number( secondCombo )}`;
                result = ( result.includes('.') ? Number(result).toFixed(2) : result ).replace('.',',');
                _first = `${_first}`.replace('.' , ',');
                _second = `${_second}`.replace('.',',');
                setResult( INITIAL_STATES.result );
                setFirstCombo( INITIAL_STATES.firstCombo );
                setSecondCombo( INITIAL_STATES.secondCombo );
                _operator = OPERATOR_DICTIONARY.SUBTRACTION;
                setSubResult( `(${_first}) ${_operator} (${_second}) = ${result}` );
                break;
        }

    }
    return {
        result,
        subResult,
        firstCombo,
        secondCombo,
        operator,
        setResult,
        setSubResult,
        setFirstCombo,
        setSecondCombo,
        setOperator,
        handleComaButton,
        handleOperator,
        handlePercentButton,
        handleSignShortcutButton,
        resetCount,
        addNumber,
        calculate
    }
}
