class RangeArray extends Instruction{
  constructor(id, left, right, row, column){
    super(row, column);
    this.id = id;
    this.left = left;
    this.right = right;
    this.type = null;
    this.objectType = null;
  }

  execute(tree, table){
    var symbol = table.getSymbol(String(this.id));
    if(symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error, no se encontró la variable "+this.id+" declarada.", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Error, no se encontró la variable "+this.id+" declarada.", this.row, this.column);
    }
    if(symbol.getType()!==Type.ARRAY){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error, la variable "+this.id+" no es un arreglo", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Error, la variable "+this.id+" no es un arreglo", this.row, this.column);
    }
    var left = this.left.execute(tree, table);
    if(left instanceof Exception) return left;
    var right = this.right.execute(tree, table);
    if(right instanceof Exception) return right;
    if(this.left.type !== Type.INT || this.right.type !== Type.INT){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Uno de los parametros enviados en el rango no es de tipo entero", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Uno de los parametros enviados en el rango no es de tipo entero", this.row, this.column);
    }
    var value = symbol.getValue();
    if((left < 0 || right > value.length) || left > right){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Valores incorrectos en el rango solicitado del arreglo", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Valores incorrectos en el rango solicitado del arreglo", this.row, this.column);
    }
    var range = value.slice(left, right);
    this.type = symbol.getType();
    this.objectType = symbol.objectType;
    return range;
  }
}