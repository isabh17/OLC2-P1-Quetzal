class For extends Instruction {
    constructor(type,identifier,expression,condition,inc_decre,instructions_for, row, column){
      super(row, column);
      this.type = type;
      this.identifier = identifier;
      this,expression = expression;
      this.condition = condition;
      this.inc_decre = inc_decre;
      this.instructions_for = instructions_for; //[]
    }
    execute(tree, table) {
        console.log(this.type);
        console.log(this.identifier);
        //var value = this.expression.execute(tree, table);
        //console.log(value);
        //var condition = this.condition.execute(tree, table)
        console.log(this.condition);
        console.log(this.inc_decre);
        var value = this.expression.execute(tree, table);
        if (value instanceof Exception) return value;
        var symbol = table.getSymbol(this.identifier);
        if (symbol === null){
            var symbol = new Symbol(String(this.identifier), this.type, value, this.row, this.column, null);//falta agregar el ambito
            var res = table.addSymbol(symbol);
            if(res instanceof Exception) exceptions.push(res);        
        }        
        var condition = this.condition.execute(tree, table);
        if (condition instanceof Exception) return condition;
        if (this.condition.type === Type.BOOLEAN) {
            for (var instrFor of this.instructions_for) {
                var result = instrFor.execute(tree, newTable);
                if (result instanceof Exception) {
                    //tree.get_excepcion().append(result)
                    //tree.update_consola(result.__str__())
                }
                if (result instanceof Break) return result;
                if (result instanceof Return) return result;
                if (result instanceof Continue) return result;
            }
        } else {
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`La expresion a evaluar en el for debe devolver true o false`,ENVIROMMENT.FOR));
            return new Exception("Semantico", "La expresion a evaluar en el for debe devolver true o false", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        }
    }

}