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
        if(this.type != null){ // si trae type de variable
            var value = this.expression.execute(tree, table);
            console.log(value);
            if (value instanceof Exception) return value;
            var symbol = table.getSymbol(this.identifier);
            if (symbol === null){
                var symbol = new Symbol(String(this.identifier), this.type, value, this.row, this.column, null);//falta agregar el ambito
                var res = table.addSymbol(symbol);
                if(res instanceof Exception) exceptions.push(res);        
            }        
            var condition = this.condition.execute(tree, table);
            if (condition instanceof Exception) return condition;

            while(this.condition){
                var newTable = new TableSymbols(table);
                for (var instrFor of this.instructions_for) {
                    var result = instrFor.execute(tree, newTable);
                    if (result instanceof Exception) {
                        //tree.get_excepcion().append(result)
                        //tree.update_consola(result.__str__())
                    }
                    if (result instanceof Break) return result;
                    if (result instanceof Return) return result;
                    if (result instanceof Continue) return result;
                    if(this.inc_decre==='++'){
                        value++;
                    }else{
                        value--;
                    }
                    symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                    var res = newTable.updateValueSymbol(symbol);
                    if (res instanceof Exception) return res;
                }                 
            } 
        }else{
            if(this.expression!=null){ // si la expresion si viene tengo que asignarlo
                var value = this.expression.execute(tree, table);
                console.log(value);
                if (value instanceof Exception) return value;
                var symbol = table.getSymbol(this.identifier);
                if (symbol === null){
                    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable`+this.identifier+" no existe",ENVIRONMENT.FOR));
                    return new Exception("Semantico", "La variable "+this.identifier+" no existe");   
                } 
                if (symbol.getType() !== this.expression.type){
                    if(symbol.getType() === Type.INT){
                      this.expression.type = Type.DOUBLE;
                    }else{
                      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no concuerdan:` +String(symbol.getType())+"!=",ENVIRONMENT.FOR));
                      return new Exception("Semantico", "Los tipos de variables no concuerdan: "+String(symbol.getType())+"!="+String(this.expression.type));
                    }
                }              
                symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                var res = table.updateValueSymbol(symbol);
                if (res instanceof Exception) return res;

                var condition = this.condition.execute(tree, table);
                if (condition instanceof Exception) return condition;

                while(this.condition){
                    var newTable = new TableSymbols(table);
                    for (var instrFor of this.instructions_for) {
                        var result = instrFor.execute(tree, newTable);
                        if (result instanceof Exception) {
                            //tree.get_excepcion().append(result)
                            //tree.update_consola(result.__str__())
                        }
                        if (result instanceof Break) return result;
                        if (result instanceof Return) return result;
                        if (result instanceof Continue) return result;
                        if(this.inc_decre==='++'){
                            value++;
                        }else{
                            value--;
                        }
                        symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                        var res = newTable.updateValueSymbol(symbol);
                        if (res instanceof Exception) return res;           
                    }                 
                } 
            }else{ // CUANDO NO VIENE ASIGNACION NI EL TIPO
                
            }
            
        }
               
    }

}