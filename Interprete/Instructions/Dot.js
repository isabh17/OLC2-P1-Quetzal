class Dot extends Instruction{
  constructor(id, row, column){
    super(row, column);
    this.id = id;
    this.type = null;
    this.objectType = null;
  }

  execute(tree, table){
    var symbol = table.geSymbol(String(this.id));
    if(symbol===null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No se encontró la variable declarada", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontró la variable declarada", this.row, this.column);
    }
    if(symbol.getType()!==Type.ARRAY){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se desea realizar una operacion # a una variable que no es Array", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Se desea realizar una operacion # a una variable que no es Array", this.row, this.column);
    }
    this.type = symbol.getType();
    this.objectType = symbol.objectType;
    return symbol.getValue();
  }
}