class Switch extends Instruction {
    constructor(condition, instructionsCase, instructionsDefault,switch_case, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsCase = instructionsCase;
        this.instructionsDefault = instructionsDefault;
        this.switch_case =  switch_case;
    } 
    execute(tree, table) { 
        console.log(this.condition);
        console.log(this.instructionsCase);
        console.log(this.instructionsDefault);
        console.log(this.switch_case);
        var condition = this.condition.execute(tree, table);
        if (condition instanceof Exception) return condition;
        if (this.condition.type === Type.BOOLEAN) {
            if (String(condition) === 'true') {
                console.log(String(this.switch_case));
                if(String(this.switch_case) === 'true'){
                    var newTable = new TableSymbols(table);
                    if (this.instructionsCase[0] !== undefined) {
                        for (var instrIF of this.instructionsCase) {
                            var result = instrIF.execute(tree, newTable);
                            if (result instanceof Exception) {
                                //tree.get_excepcion().append(result)
                                //tree.update_consola(result.__str__())
                            }
                            if (result instanceof Break) return result;
                            if (result instanceof Return) return result;
                            if (result instanceof Continue) return result;
                        }
                    } else {
                        var result = this.instructionsCase.execute(tree, newTable);
                        if (result instanceof Exception) {
                            //tree.get_excepcion().append(result)
                            //tree.update_consola(result.__str__())
                        }
                        if (result instanceof Break) return result;
                        if (result instanceof Return) return result;
                        if (result instanceof Continue) return result;
                    }
                }                
            } else {
                if (this.instructionsDefault !== null) {
                    var newTable = new TableSymbols(table);
                    if (this.instructionsDefault[0] !== undefined) {
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
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`La expresion a evaluar en el Switch Case debe devolver true o false`,ENVIROMMENT.IF));
            return new Exception("Semantico", "La expresion a evaluar en el Switch Case debe devolver true o false", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        }
    }


}