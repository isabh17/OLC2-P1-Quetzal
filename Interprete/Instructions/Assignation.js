class Assignation extends Instruction{
  constructor(identifier, expression, row, column){
    super(row, column);
    this.identifier = identifier;
    this.expression = expression;
    this.type = null;
  }

  execute(tree, table){
    var value = this.expression.execute(tree, table);
    //console.log(this.expression.type);
    if (value instanceof Exception) return value;
    var symbol = table.getSymbol(this.identifier);
    //console.log(symbol);
    //console.log("vamo bien");
    if (symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable `+this.identifier+" no existe",ENVIRONMENT.NULL));
      return new Exception("Semantico", "La variable "+this.identifier+" no existe", this.row, this.column);
    }
    if (symbol.getType() !== this.expression.type && ( symbol.getType() === Type.STRUCT && this.expression.type !== Type.NULL) ){
      if(symbol.getType() === Type.DOUBLE && this.expression.type === Type.INT){
        this.expression.type = Type.DOUBLE;
        //console.log("entro esta verga");      
      }else{
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no concuerdan: ` +String(symbol.getType())+"!=",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Los tipos de variables no concuerdan: "+String(symbol.getType())+"!="+String(this.expression.type), this.row, this.column);
      }
    }
    if(symbol.getType() === Type.STRUCT){
      symbol = new Symbol(symbol.getId(), Type.STRUCT, value, symbol.getRow(), symbol.getColumn(), null, symbol.objectType);
    }else{
      if(symbol.getType()===2){
        //console.log("es double");
        symbol = new Symbol(symbol.getId(),symbol.getType(), value, symbol.getRow(), symbol.getColumn(), null, null);
      }else{
        symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null, null);
      }
    }
    //console.log(symbol);
    //console.log("vamo mal");
    var res = table.updateValueSymbol(symbol);
    if (res instanceof Exception) return res;
    return null;
  }
}