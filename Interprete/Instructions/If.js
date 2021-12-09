class If extends Instruction {
    constructor(condition, instructionsIf, instructionsElse, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsIf = instructionsIf;
        this.instructionsElse = instructionsElse;
    }

    execute(tree, table) {
        var condition = this.condition.execute(tree, table);
        if (condition instanceof Exception) return condition;
        if (this.condition.type === Type.BOOLEAN) {
            if (String (condition) === 'true') {
                var newTable = new TableSymbols(table);
                if (this.instructionsIf[0] !== undefined) {
                    for (var instrIF of this.instructionsIf) {
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
                    var result = this.instructionsIf.execute(tree, newTable);
                    if (result instanceof Exception) {
                        //tree.get_excepcion().append(result)
                        //tree.update_consola(result.__str__())
                    }
                    if (result instanceof Break) return result;
                    if (result instanceof Return) return result;
                    if (result instanceof Continue) return result;
                }
            } else {
                if (this.instructionsElse !== null) {
                    var newTable = new TableSymbols(table);
                    if (this.instructionsElse[0] !== undefined) {
                        for (var instrElse of this.instructionsElse) {
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
                        var result = this.instructionsElse.execute(tree, newTable);
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
            return new Exception("Semantico", "La expresion a evaluar en el if debe devolver true o false", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        }
    }
}