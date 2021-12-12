class For extends Instruction {
    constructor(variable, condition, inc_decre, instructions_for, row, column){
      super(row, column);
      this.variable = variable;
      this.condition = condition;
      this.inc_decre = inc_decre;
      this.instructions_for = instructions_for; //[]
    }

    execute(tree, table) {
        if(!this.verifyExistId(tree, table)){
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "La variable a iterar no existe",ENVIRONMENT.FOR));
            return new Exception("Semantico", "La variable a iterar no existe", this.row, this.column);
        }
        if(!this.verifyId()){
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Los iteradores no son los mismos",ENVIRONMENT.FOR));
            return new Exception("Semantico", "Los iteradores no son los mismos", this.row, this.column);
        }
        var variable = typeof(this.variable)==='string' ? null : this.variable.execute(tree, table);
        if(variable instanceof Exception) return variable;
        while(true){
            var newTable = new TableSymbols(table);
            var resultCondition = this.condition.execute(tree, newTable);
            if(resultCondition instanceof Exception) return variable;
            if(this.condition.type!==Type.BOOLEAN){
                ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se esperaba una condicion booleana",ENVIRONMENT.FOR));
                return new Exception("Semantico", "Se esperaba una condicion booleana", this.row, this.column);   
            }
            if(!resultCondition){
                break;
            };
            for (var instrFor of this.instructions_for) {
                var result = instrFor.execute(tree, newTable);
                if (result instanceof Exception) {
                    //tree.get_excepcion().append(result)
                    //tree.update_consola(result._str_())
                    return result;
                }
                //console.log(result);
                if (result instanceof Break) return null;
                if (result instanceof Return) return result;
                if (result instanceof Continue) return result;
            }
            var resIncr_decr = this.inc_decre.execute(tree, newTable);
            if(resIncr_decr instanceof Exception){
                return resIncr_decr;
            }
        }
        return null;
    }

    verifyId(){
        if(this.variable instanceof Declaration || this.variable instanceof Assignation){
            if(String(this.variable.identifier) !== this.inc_decre.identifier){
                console.log("f1");
                return false;
            }
        }else{
            if(String(this.variable) !== String(this.inc_decre.identifier)){
                console.log("f");
                return false;
            }
        }
        return true;
    }

    verifyExistId(tree, table){
        //console.log(this.variable);
        let val = !this.variable instanceof Declaration;
        let val1 =  !this.variable instanceof Assignation
        //console.log(val);
        //console.log(val1);
        //console.log(val||val1);
        if(val||val1){
            var symbol = table.getSymbol(String(this.variable));
            console.log(symbol);
            if(symbol===null){
                return false;
            }
        }
        return true;        
    }
}