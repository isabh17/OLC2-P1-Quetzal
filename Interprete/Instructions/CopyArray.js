class CopyArray extends Instruction{
  constructor(id, row, column){
    super(row, column);
    this.id = id;
    this.type = null;
    this.objectType = null;
  }

  execute(tree, table){
    var symbol = table.getSymbol(String(this.id));
    if(symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No se encontro declarada la variable", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontro declarada la variable", this.row, this.column);        
    }
    if(symbol.getType()!== Type.ARRAY){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se desea realizar copia de un objeto que no es de tipo array", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Se desea realizar copia de un objeto que no es de tipo array", this.row, this.column);        
    }
    this.type = Type.ARRAY;
    this.objectType = symbol.objectType;
    var copy = [...symbol.getValue()];
    return copy;
  }

  compile(generator){
    return null;
  }
}