class CaseSwitch extends Instruction {
    constructor(condition, instructionsCase, instructionsDefault, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsCase = instructionsCase;
        this.instructionsDefault = instructionsDefault;
    } 
    execute(tree, table,id) { 
        //console.log(this.instructionsCase);
        var condition = this.condition.execute(tree, table);
          if (condition instanceof Exception) return condition;
          //console.log(this.condition.type === Type.INT || this.condition.type === Type.STRING ||this.condition.type === Type.CHAR);
          //console.log(this.condition);
        if (this.condition.type === Type.INT || this.condition.type === Type.STRING ||this.condition.type === Type.CHAR) {
            if (condition) {
                var newTable = new TableSymbols(table);
                if (this.instructionsCase[0] !== undefined) {
                    console.log("entro a array vienen varios case");
                    console.log(this.instructionsCase)
                    for (var instrIF of this.instructionsCase) {
                        var result = instrIF.execute(tree, newTable);
                        console.log(result);
                        if (result instanceof Exception) {
                            //tree.get_excepcion().append(result)
                            //tree.update_consola(result.__str__())
                        }
                        if (result instanceof Break) return result;
                        if (result instanceof Return) return result;
                        if (result instanceof Continue) return result;
                    }
                } else {
                    console.log("solo vienen uno");
                    var result = this.instructionsCase.execute(tree, newTable);
                    if (result instanceof Exception) {
                        //tree.get_excepcion().append(result)
                        //tree.update_consola(result.__str__())
                    }
                    if (result instanceof Break) return result;
                    if (result instanceof Return) return result;
                    if (result instanceof Continue) return result;
                }
            } else {
                if (this.instructionsDefault !== null) {
                    console.log("entro a default")
                    var newTable = new TableSymbols(table);
                    if (this.instructionsDefault !== null) {
                        for (var instrElse of this.instructionsDefault) {
                            var result = instrElse.execute(tree, newTable);
                            if (result instanceof Exception) {
                                //tree.get_excepcion().append(result)
                                //tree.update_consola(result.__str__()) 
                            }
                            if (result instanceof Break) return result;
                            if (result instanceof Return) return result;
                            if (result instanceof Continue) return result;
                        }
                    } else {
                        var result = this.instructionsDefault.execute(tree, newTable);
                        if (result instanceof Exception) {
                            //tree.get_excepcion().append(result)
                            //tree.update_consola(result.__str__())
                        }
                        if (result instanceof Break) return result;
                        if (result instanceof Return) return result;
                        if (result instanceof Continue) return result;
                    }
                }
            }
        } else {
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La expresion a evaluar en el Case debe devolver true o false`,ENVIRONMENT.SWITCH));
            return new Exception("Semantico", "La expresion a evaluar en el Case debe devolver true o false", this.row, this.column)
        }
    }

}