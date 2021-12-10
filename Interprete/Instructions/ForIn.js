class ForIn extends Instruction {

    constructor(identifier,expression,instructions_for_in, row, column){
        super(row, column);
        this.identifier = identifier;
        this.expression = expression;      
        this.instructions_for_in = instructions_for_in; //[]
    }     
    execute(tree, table) {
        /*var value = this.expression.execute(tree, table);
        if (value instanceof Exception) return value;
        var symbol = table.getSymbol(this.identifier);
        if (symbol === null){
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no existe",ENVIRONMENT.FOR));
            return new Exception("Semantico", "La variable "+this.identifier+" no existe");   
        } 
        if (symbol.getType() !== this.expression.type){
            if(symbol.getType() === Type.STRING){
                symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
                var res = table.updateValueSymbol(symbol);
                if (res instanceof Exception) return res;
            }else{
                ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no concuerdan: ` +String(symbol.getType())+"!=",ENVIRONMENT.FOR));
                return new Exception("Semantico", "Los tipos de variables no concuerdan: "+String(symbol.getType())+"!="+String(this.expression.type));
            }
        }*/
        var newTable = new TableSymbols(table);
        var value = this.expression.execute(tree, table);
        console.log(value);
        if (value instanceof Exception) return value;
       
        var symbol = table.getSymbol(this.identifier);
        if (symbol === null){
            var symbol = new Symbol(String(this.identifier),this.expression.type , value, this.row, this.column, null);//falta agregar el ambito
            var res = table.addSymbol(symbol);
            if(res instanceof Exception) exceptions.push(res);        
        } 
        var newTable = new TableSymbols(table); 
        let cadena_array = value.split('');
        console.log(cadena_array);     
        for (var instrForIn of this.instructions_for_in) {
            var result = instrForIn.execute(tree, newTable);
            if (result instanceof Exception) {
                //tree.get_excepcion().append(result)
                //tree.update_consola(result.__str__())
            }
            
            if (result instanceof Break) return result;
            if (result instanceof Return) return result;
            if (result instanceof Continue) return result;
           
           
        }
        return null;
       /* let str = 'soylenin';
        let arr = str.split('');
        console.log(arr); 
        String cadena = "OLC2";
            for letra in cadena{
                print(letra & "-");      // Imprime O-L-C-2
            }*/
    }
    
}