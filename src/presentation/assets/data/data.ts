
export enum ButtonsActionsDictionary {
    DIGIT       =   'digit',
    RESULT      =   'result',
    OPERATION   =   'operation',
    PARSE       =   'parse',
    DELETE      =   'delete' 
}

export type ButtonsAction = 
ButtonsActionsDictionary.DIGIT      |
ButtonsActionsDictionary.RESULT     |
ButtonsActionsDictionary.OPERATION  |
ButtonsActionsDictionary.DELETE  |
ButtonsActionsDictionary.PARSE;