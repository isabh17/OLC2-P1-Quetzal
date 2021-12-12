class AccessAtributeStruct extends Instruction{
  constructor(id, parameters, row, column){
    super(row, column);
    this.id = id;
    this.parameters = parameters;
    this.type = null;
  }

  execute(tree, table){
    this.parameters = this.parameters.reverse();
    var actualValue = table.getSymbol(String(this.id));
    if(actualValue === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró el struct "+String(this.id)+" declarado, acceso a atributo", ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontró el struct "+String(this.id)+" declarado, acceso a atributo", this.row, this.column);
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
      actualValue = actualValue.getValue();
      if( !(this.parameters[i] in actualValue) ){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"El struct no contiene el parametro: "+this.parameters[i], ENVIRONMENT.NULL));
        return new Exception("Semantico", "El struct no contiene el parametro: "+this.parameters[i], this.row, this.column);
      }
      actualValue = actualValue[this.parameters[i]];
    }
    this.type = actualValue.getType();
    if(actualValue.getValue() === null || actualValue.getValue() === "null"){
      this.type = Type.NULL;
    }
    return actualValue.getValue();
  }
}