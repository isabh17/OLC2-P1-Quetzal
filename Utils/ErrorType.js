/**
 * @enum use for error type with
 *  lexic, sintactic and semantic
 */
 var EnumErrorType;
 (function (EnumErrorType) {
     EnumErrorType["LEXICO"] = "LEXICO";
     EnumErrorType["SYNTACTIC"] = "SINTACTICO";
     EnumErrorType["SEMANTIC"] = "SEMANTICO";
 })(EnumErrorType || (EnumErrorType = {}));
 /**
  * @class use class for all error
  */
 class ErrorType {
     constructor(enumErrorType) {
         this.enumErrorType = enumErrorType;
     }
     
     toString() {
         return this.enumErrorType.toString();
     }
 }
 