class ListObjects extends Instruction{
  constructor(parameters, row, column){
    super(row, column);
    this.parameters = parameters;
    this.type = null;
    this.objectType = null;
  }

  execute(tree, table){
    for(var i = 0; i<this.parameters.length; i++){
      if(this.parameters[i] instanceof ListObjects){
        this.parameters[i].type = this.type;
      }
      var auxiliar = this.parameters[i].execute(tree, table);
      if(this.parameters[i].type === Type.ARRAY){
        this.parameters[i].type = this.parameters[i].objectType;
      }
      if(this.parameters[i].type!==this.type){
        if(this.type !== null){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se desea agregar un valor de distinto tipo al arreglo "+this.parameters[i].type+"!="+this.type, ENVIRONMENT.NULL));
          return new Exception("Semantico", "Se desea agregar un valor de distinto tipo al arreglo "+this.parameters[i].type+"!="+this.type, this.row, this.column);
        }else{
          this.type = this.parameters[i].type;
        }
      }
      this.parameters[i] = auxiliar;
    }
    return this.parameters;
  }

  compile(generator, env){
    return null;
  }
}