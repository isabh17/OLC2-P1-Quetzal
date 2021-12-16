class Identifier extends Instruction{
  constructor(identifier, row, column,env){
    super(row, column);    
    this.identifier = identifier;
    this.type = null;
    this.objectType = null;
    this.env = env;
  }

  execute(tree, table){
    var symbol = table.getSymbol(this.identifier);
    if (symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro la variable` +this.identifier+" declarada",ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontro la variable "+this.identifier+" declarada", this.row, this.column);
    }else{
      if(symbol.getType() === Type.STRUCT){
        this.objectType = symbol.objectType;
      }else if(symbol.getType() === Type.ARRAY){
        this.objectType = symbol.objectType;
      }
      this.type = symbol.getType();
      if(symbol.getValue() === null || symbol.getValue() === "null"){
        this.type = Type.NULL;
      }
      return symbol.getValue();
    }
  }

  compile(generator){

  }
}
