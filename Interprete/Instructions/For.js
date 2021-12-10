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
            return new Exception("Semantico", "La variable a iterar no existe", this.row, this.column);
        }
        if(!this.verifyId()){
            return new Exception("Semantico", "Los iteradores no son los mismos", this.row, this.column);
        }
        var newTable = new TableSymbols(table);
        var variable = typeof(this.variable)==='string' ? null : this.variable.execute(tree, newTable);
        if(variable instanceof Exception) return variable;
        while(true){
            var resultCondition = this.condition.execute(tree, newTable);
            if(resultCondition instanceof Exception) return variable;
            if(this.condition.type!==Type.BOOLEAN){
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
                //if (result instanceof Break) return null;
                //if (result instanceof Return) return result;
                //if (result instanceof Continue) return result;
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
                return false;
            }
        }else{
            if(String(this.variable) !== String(this.inc_decre.identifier)){
                return false;
            }
        }
        return true;
    }

    verifyExistId(tree, table){
        if(!(this.variable instanceof Declaration) || !(this.variable instanceof Assignation)){
            var symbol = table.getSymbol(String(this.variable));
            if(symbol===null){
                return false;
            }
        }
        return true;
    }
}