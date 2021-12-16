class ChangeValueArray extends Instruction{
  constructor(id, parameters, expression, row, column){
    super(row, column);
    this.id = id;
    this.expression = expression;
    this.parameters = parameters;
    this.type = null;
  }

  execute(tree, table){
    var actualValue = table.getSymbol(String(this.id));
    if(actualValue === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró el array "+String(this.id)+" declarado, cambio atributo", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontró el array "+String(this.id)+" declarado, cambio atributo", this.row, this.column);
    }
    if(actualValue.type !== Type.ARRAY){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Se desea acceder a atributos de un objeto que no es de tipo array", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Se desea acceder a atributos de un objeto que no es de tipo array:", this.row, this.column);
    }
    this.type = actualValue.objectType;
    actualValue = actualValue.getValue();
    var positions = [];
    for(var i=0; i<this.parameters.length; i++){// Se verifica que todas las posiciones que vengan sean enteros
      var aux = this.parameters[i].execute(tree, table);
      if(aux instanceof Exception) return aux;
      if(this.parameters[i].type !== Type.INT){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se requiere un atributo numerico para la posicion del arreglo", ENVIRONMENT.NULL));
        return new Exception("Semantico", "Se requiere un atributo numerico para la posicion del arreglo", this.row, this.column);
      }
      positions.push(aux);
    }
    for(var i=0; i<positions.length-1; i++){
      if(positions[i]< 0 || positions[i]>actualValue.length-1){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se requiere un atributo numerico para la posicion del arreglo", ENVIRONMENT.NULL));
        return new Exception("Semantico", "El arreglo no contiene la posicion solicitada "+String(this.parameters[i]), this.row, this.column);
      }
      actualValue = actualValue[positions[i]];
    }
    var newVal = this.expression.execute(tree, table);
    if(newVal instanceof Exception) return newVal;
    if(this.expression.type === Type.ARRAY){
      this.expression.type = this.expression.objectType;
    }
    if( this.expression.type !== this.type ){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Tipos erroneos al asignar valor al arreglo "+this.expression.type+"!="+this.type, ENVIRONMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos al asignar valor al arreglo "+this.expression.type+"!="+this.type, this.row, this.column);
    }
    actualValue[positions[positions.length-1]] = newVal;
    return null;
  }

  compile(generator){
    return null;
  }
}