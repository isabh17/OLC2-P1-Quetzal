class AccessArray extends Instruction{
  constructor(id, parameters, row, column){
    super(row, column);
    this.id = id;
    this.parameters = parameters;
    this.type = null;
    this.objectType = null;
  }

  execute(tree, table){
    var symbol = table.getSymbol(String(this.id));
    if(symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró la  variable "+this.id+" declarada.", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontró la  variable "+this.id+" declarada.", this.row, this.column);
    }
    if(symbol.getType()!==Type.ARRAY){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "La variable "+this.id+" no es un arreglo.", ENVIRONMENT.NULL));
      return new Exception("Semantico", "La variable "+this.id+" no es un arreglo.", this.row, this.column);
    }else{
      this.type = symbol.objectType;
    }
    var actualValue = symbol.getValue();
    var index = [];
    for(var i=0; i<this.parameters.length; i++){// Se verifica que todas las posiciones que vengan sean enteros
      var aux = this.parameters[i].execute(tree, table);
      if(aux instanceof Exception) return aux;
      if(this.parameters[i].type !== Type.INT){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se requiere un atributo numerico para la posicion del arreglo", ENVIRONMENT.NULL));
        return new Exception("Semantico", "Se requiere un atributo numerico para la posicion del arreglo", this.row, this.column);
      }
      index.push(aux);
    }
    for(var i=0; i<index.length; i++){
      if(index[i]< 0 || index[i]>actualValue.length-1){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "El arreglo no contiene la posicion solicitada "+String(index[i]), ENVIRONMENT.NULL));
        return new Exception("Semantico", "El arreglo no contiene la posicion solicitada "+String(index[i]), this.row, this.column);
      }
      actualValue = actualValue[index[i]];
    }
    return actualValue;
  }
}