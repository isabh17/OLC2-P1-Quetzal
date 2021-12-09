class Identifier extends Instruction{
  constructor(identifier, row, column,env){
    super(row, column);    
    this.identifier = identifier;
    this.type = null;
    this.env = env;
  }

  execute(tree, table){
    var symbol = table.getSymbol(this.identifier);
    if (symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`No se encontro la variable` +this.identifier+" declarada",table.getEnvironment()));
      return Exception("Semantico", "No se encontro la variable "+this.identifier+" declarada", this.row, this.column);
    }else{
        this.type = symbol.getType();
        return symbol.getValue();
    }
  }
}
