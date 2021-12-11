class ForIn extends Instruction {
    constructor(identifier,expression,instructions, row, column){
        super(row, column);
        this.identifier = identifier;
        this.expression = expression;      
        this.instructions = instructions; //[]
    }

    execute(tree, table) {
        var newTable = new TableSymbols(table);
        var value = this.expression.execute(tree, table);
        if(this.expression.type !== Type.STRING){
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se permite iterar variables string en ForIn",ENVIRONMENT.FORIN));
            return new Exception("Semantico", "Solo se permite iterar variables string en forIn", this.row, this.column);
        }
        if (value instanceof Exception) return value;
        let cadena_array = value.split('');
        var symbol = new Symbol(String(this.identifier), this.expression.type, cadena_array[0], this.row, this.column, null, null);
        value = newTable.addSymbol(symbol);
        for(let letter of cadena_array){
            symbol = new Symbol(symbol.getId(), symbol.getType(), letter, symbol.getRow(), symbol.getColumn(), null, null);
            let res = newTable.updateValueSymbol(symbol);
            if(res instanceof Exception){
                return res;
            }
            for (var instrForIn of this.instructions) {
                var result = instrForIn.execute(tree, newTable);
                if (result instanceof Exception) {
                    //tree.get_excepcion().append(result)
                    //tree.update_consola(result.__str__())
                }
                if (result instanceof Break) return null;
                if (result instanceof Return) return result;
                if (result instanceof Continue) return result;
            }
        }
        return null;
    }
}