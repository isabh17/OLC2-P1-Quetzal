class ChangeValueStruct extends Instruction{
  constructor(id, parameters, expression, row, column){
    super(row, column);
    this.id = id;
    this.expression = expression;
    this.parameters = parameters;
  }

  execute(tree, table){
    this.parameters = this.parameters.reverse();
    var value = this.expression.execute(tree, table);
    if(value === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No se encontro declarada la variable", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontro declarada la variable", this.row, this.column);        
    }
    if(value instanceof Exception) return value;
    var actualValue = table.getSymbol(String(this.id));
    if(actualValue === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró el struct "+String(this.id)+" declarado, cambio atributo", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontró el struct "+String(this.id)+" declarado, cambio atributo", this.row, this.column);
    }
    if(actualValue.type !== Type.STRUCT){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Se desea acceder a atributos de un objeto que no es de tipo struct: "+actual, ENVIRONMENT.NULL));
      return new Exception("Semantico", "Se desea acceder a atributos de un objeto que no es de tipo struct: "+actual, this.row, this.column);
    }
    for(var i = 0; i < this.parameters.length; i++){
      if(String(actualValue.getValue())==="null"){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "El struct no contiene el parametro: "+this.parameters[i], ENVIRONMENT.NULL));
        return new Exception("Semantico", "No se le ha asignado un valor en la propiedad solicitada del struct", this.row, this.column);        
      }
      if( !(this.parameters[i] in actualValue.getValue()) ){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"El struct no contiene el parametro: "+this.parameters[i], ENVIRONMENT.NULL));
        return new Exception("Semantico", "El struct no contiene el parametro: "+this.parameters[i], this.row, this.column);
      }
      actualValue = actualValue.getValue();
      actualValue = actualValue[this.parameters[i]];
    }

    /*Cambio aqui, antes estaba mal escrito "SRING" y se arreglo a "STRING                      v"*/
    if( this.expression.type !== actualValue.getType() && (typeof(actualValue.getType()) === 'string' && this.expression.type !== Type.STRUCT )){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipos erroneos al asignar valor a struct", ENVIRONMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos al asignar valor a struct", this.row, this.column);
    }
    if(typeof(actualValue.getType())==='string'){
      if(actualValue.getType() !== this.expression.objectType && this.expression.type !== Type.NULL){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Se esperaba la asignación de un struct en el parametro", ENVIRONMENT.NULL));
        return new Exception("Semantico", "Se esperaba la asignación de un struct en el parametro", this.row, this.column);
      }
    }
    actualValue.setValue(value);
    return null;
  }
}