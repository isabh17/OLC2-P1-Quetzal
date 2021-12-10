class Switch extends Instruction {
    constructor(condition, instructionsCase, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsCase = instructionsCase;
    }
    
    execute(tree, table) { 
        var step = false;
        var condition = this.condition.execute(tree, table);
        if (condition instanceof Exception) return condition;
        if (this.condition.type === Type.INT || this.condition.type === Type.STRING ||this.condition.type === Type.CHAR) {
            var newTable = new TableSymbols(table);
            for (let instrCase of this.instructionsCase) {
                var cond = null;
                if(instrCase.getCondition()!==null){
                    cond = instrCase.getCondition().execute(tree, table);
                }
                if(cond === condition || cond === null || step){
                    var result = instrCase.execute(tree, newTable);
                    if (result instanceof Exception) {
                        //tree.get_excepcion().append(result)
                        //tree.update_consola(result._str_())
                    }
                    if (result instanceof Break) return null;
                    if (result instanceof Return) return result;
                    if (result instanceof Continue) return result;
                    step = true;
                }
            }
        } else {
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La expresion a evaluar en el Case debe devolver true o false`,ENVIRONMENT.SWITCH));
            return new Exception("Semantico", "La expresion a evaluar en el Case debe devolver true o false", this.row, this.column)
        }
        return null;
    }
}