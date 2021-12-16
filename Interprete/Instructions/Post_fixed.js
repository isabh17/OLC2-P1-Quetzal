class Post_fixed extends Instruction{
  constructor(identifier, action, row, column){
    super(row, column);
    this.identifier = identifier;
    this.action = action;
    this.type = null;
  }

  execute(tree, table){
    var symbol = table.getSymbol(this.identifier);
    if (symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La variable`+this.identifier+" no existe",ENVIRONMENT.NULL));
      return new Exception("Semantico", "La variable "+this.identifier+" no existe", this.row, this.column);
    }
    var value = 0;
    var previousValue = 0;
    if (symbol.getType() === Type.INT){
      previousValue = symbol.value;
      if(this.action === "++"){
        value = symbol.value + 1;
      }else{
        value = symbol.value - 1; 
      }
    }else{
      //ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Los tipos de variables no concuerdan:` +String(symbol.getType())+"!=",table.getEnvironment()));
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Solo se puede incrementar o decrementar variables de tipo INT",ENVIRONMENT.FOR));
      return new Exception("Semantico", "Solo se puede incrementar o decrementar variables de tipo INT", this.row, this.column);
    }
    symbol = new Symbol(symbol.getId(), symbol.getType(), value, symbol.getRow(), symbol.getColumn(), null, null);
    var res = table.updateValueSymbol(symbol);
    if (res instanceof Exception) return res;
    this.type = Type.INT;
    return previousValue;
  }

  compile(generator){
    return null;
  }
}