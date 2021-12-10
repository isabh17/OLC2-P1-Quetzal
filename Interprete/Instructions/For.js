class For extends Instruction {
    constructor(type,identifier,expression,condition,identifier2,inc_decre,instructions_for, row, column){
      super(row, column);
      this.type = type;
      this.identifier = identifier;
      this.expression = expression;
      this.condition = condition;
      this.identifier2 = identifier2;
      this.inc_decre = inc_decre;
      this.instructions_for = instructions_for; //[]
    }
    execute(tree, table) {
        //console.log(this.expression);
        if(this.type != null){ // si trae type de variable
            var value = this.expression.execute(tree, table);
            //console.log(value);
            if (value instanceof Exception) return value;
            if(this.identifier!==this.identifier2){
                ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no es la misma de la segunda variable ++ en --",ENVIRONMENT.FOR));
                return new Exception("Semantico", "La variable "+this.identifier+" no es la misma de la segunda variable ++ en --");
            }
            var symbol = table.getSymbol(this.identifier);
            if (symbol === null){
                var symbol = new Symbol(String(this.identifier), this.type, value, this.row, this.column, null);//falta agregar el ambito
                var res = table.addSymbol(symbol);
                if(res instanceof Exception) exceptions.push(res);        
            } 
            var newTable = new TableSymbols(table);      
            var condition = this.condition.execute(tree, newTable);
            if (condition instanceof Exception) return condition;            
            while(condition){
                //console.log("entro");
                for (var instrFor of this.instructions_for) {
                    var result = instrFor.execute(tree, newTable);
                    if (result instanceof Exception) {
                        //tree.get_excepcion().append(result)
                        //tree.update_consola(result.__str__())
                    }
                    if (result instanceof Break) return result;
                    if (result instanceof Return) return result;
                    if (result instanceof Continue) return result;
                    //if(this.identifier===this.identifier2){
                    if(this.inc_decre==='++'){
                        value++;
                        //console.log(value)
                    }else{
                        value--;
                        //5console.log(value)
                    }
                    /*}else{
                        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable`+this.identifier+" no es la misma de la segunda variable ++ en --",ENVIRONMENT.FOR));
                        return new Exception("Semantico", "La variable "+this.identifier+" no es la misma de la segunda variable ++ en --");
                    }*/
                    //console.log(value);
                    symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                    var res = newTable.updateValueSymbol(symbol);
                    if (res instanceof Exception) return res;
                    var conditionWhile = this.condition.execute(tree, newTable);
                    //console.log(conditionWhile)
                    if (conditionWhile instanceof Exception) return condition;
                    if(conditionWhile){
                        console.log("enciclado " +value )                        
                    }else{
                        console.log("nos salimos")
                        return null;
                    }
                }                 
            }
        }else{ 
            if(this.expression!=null){ // si la expresion si viene tengo que asignarlo  REVISARLO PORQUE IMPRIME EL PRIMER VALOR ANTES QUE LO VUELVA A ASIGNAR
                var value = this.expression.execute(tree, table);
                //console.log(value);
                if (value instanceof Exception) return value;
                var symbol = table.getSymbol(this.identifier);
                if (symbol === null){
                    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no existe",ENVIRONMENT.FOR));
                    return new Exception("Semantico", "La variable "+this.identifier+" no existe");   
                } 
                if (symbol.getType() !== this.expression.type){
                    if(symbol.getType() === Type.INT){
                        symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                        var res = table.updateValueSymbol(symbol);
                        if (res instanceof Exception) return res;
                    }else{
                      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no concuerdan: ` +String(symbol.getType())+"!=",ENVIRONMENT.FOR));
                      return new Exception("Semantico", "Los tipos de variables no concuerdan: "+String(symbol.getType())+"!="+String(this.expression.type));
                    }
                }
                var newTable = new TableSymbols(table);
                var condition = this.condition.execute(tree, newTable);
                if (condition instanceof Exception) return condition;
                //value = 6; i <5  i = 5 ---> 5<5
                while(this.condition){
                    if(this.identifier!==this.identifier2){
                        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no es la misma de la segunda variable ++ en --",ENVIRONMENT.FOR));
                        return new Exception("Semantico", "La variable "+this.identifier+" no es la misma de la segunda variable ++ en --");
                    }                    
                    for (var instrFor of this.instructions_for) {
                        var result = instrFor.execute(tree, newTable);
                        if (result instanceof Exception) {
                            //tree.get_excepcion().append(result)
                            //tree.update_consola(result.__str__())
                        }
                        if (result instanceof Break) return result;
                        if (result instanceof Return) return result;
                        if (result instanceof Continue) return result;
                        //if(this.identifier===this.identifier2){
                        if(this.inc_decre==='++'){
                            value++;
                            //console.log(value)
                        }else{
                            value--;
                            //5console.log(value)
                        }
                        /*}else{
                            
                        }*/
                        //console.log(value);
                        symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                        var res = newTable.updateValueSymbol(symbol);
                        if (res instanceof Exception) return res;
                        var conditionWhile = this.condition.execute(tree, newTable);
                        //console.log(conditionWhile)
                        if (conditionWhile instanceof Exception) return condition;
                        if(conditionWhile){
                            console.log("enciclado " +value )                        
                        }else{
                            console.log("nos salimos")
                            return null;
                        }
                    }                   
                } 
            }else{ // CUANDO NO VIENE ASIGNACION NI EL TIPO                
                var symbol = table.getSymbol(this.identifier);
                //console.log(symbol.getValue());
                var value = symbol.getValue();
                if (symbol === null){
                    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no existe",ENVIRONMENT.FOR));
                    return new Exception("Semantico", "La variable "+this.identifier+" no existe");   
                } 
                //console.log(this.identifier);
                //console.log(symbol)            
                if(symbol.getType() === Type.INT){
                    
                }else{
                    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no concuerdan: ` +String(symbol.getType())+"!=",ENVIRONMENT.FOR));
                    return new Exception("Semantico", "Los tipos de variables no concuerdan: "+String(symbol.getType())+"!="+String(this.expression.type));
                }     
                var newTable = new TableSymbols(table);          
                var condition = this.condition.execute(tree, newTable);
                if (condition instanceof Exception) return condition;
                //value = 6; i <5  i = 5 ---> 5<5
                while(this.condition){
                    if(this.identifier!==this.identifier2){
                        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no es la misma de la segunda variable ++ en --",ENVIRONMENT.FOR));
                        return new Exception("Semantico", "La variable "+this.identifier+" no es la misma de la segunda variable ++ en --");
                    }                    
                    for (var instrFor of this.instructions_for) {
                        var result = instrFor.execute(tree, newTable);
                        if (result instanceof Exception) {
                            //tree.get_excepcion().append(result)
                            //tree.update_consola(result.__str__())
                        }
                        if (result instanceof Break) return result;
                        if (result instanceof Return) return result;
                        if (result instanceof Continue) return result;
                        //if(this.identifier===this.identifier2){
                        console.log(value);
                        if(this.inc_decre==='++'){
                            value++;
                            //console.log(value)
                        }else{
                            value--;
                            //5console.log(value)
                        }
                        /*}else{
                            
                        }*/
                        //console.log(value);
                        symbol = new Symbol(symbol.getId(), symbol.getType(), value, symbol.getRow(), symbol.getColumn(), null);
                        var res = newTable.updateValueSymbol(symbol);
                        if (res instanceof Exception) return res;
                        var conditionWhile = this.condition.execute(tree, newTable);
                        console.log(this.conditionWhile);
                        //console.log(conditionWhile)
                        if (conditionWhile instanceof Exception) return condition;
                        if(conditionWhile){
                            console.log("enciclado " +value )                        
                        }else{
                            console.log("nos salimos")
                            return null;
                        }
                    }                   
                } 
            }
            
        }
               
    }

}