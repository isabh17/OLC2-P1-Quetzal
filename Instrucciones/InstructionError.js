//const Instruction =require("../Struct/Abstract/Instruction");
  
class InstructionError extends Instruction {

    constructor(){
        super(0,0);
    }

    getTranslated(){
        return "";
    }

    translatedSymbolsTable(e){ 
        return "";
    }

    executeSymbolsTable(e){
        return "";
    }

    execute(e) {
        return null;
    }

}