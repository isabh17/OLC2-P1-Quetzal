class CreateStruct extends Instruction {
  constructor(structName, nameObject, structName2, parameters, row, column) {
    super(row, column);
    this.structName = structName;
    this.nameObject = nameObject;
    this.structName2 = structName2;
    this.parameters = parameters;
  }

  execute(tree, table) {
    if(this.structName2 instanceof CallFunction){
      return this.createWithCallFunction(tree, table);
    }else if(this.structName2 instanceof AccessAtributeStruct){
      return this.createWithAccess(tree, table);
    }else if(this.structName2 === Type.NULL || (typeof(this.structName2)==='string' && this.parameters === null)){
      return this.createWithIdOrNull(tree, table);
    }else{
      return this.normalCreate(tree, table);
    }
  }

  createWithIdOrNull(tree, table){
    var result = tree.getStruct(this.structName);
    if (result == null) {
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No existe un struct declarado con ese nombre: " + this.structName,ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "No existe un struct declarado con ese nombre: " + this.nombre, this.row, this.column);
    }
    var value;
    if(this.structName2 === Type.NULL){
      value = null;
    }else{ //Se busca el id
      value = table.getSymbol(this.structName2);
      if(value === null){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontro la variable buscada "+String(this.structName2), ENVIRONMENT.STRUCT));
        return new Exception("Semantico", "No se encontro la variable buscada "+String(this.structName2), this.row, this.column);
      }
      value = value.getValue();
    }
    var symbol = new Symbol(String(this.nameObject), Type.STRUCT, value, this.row, this.column , null, String(this.structName));
    var result = table.addSymbol(symbol);
    if(result = null){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Ya existe una variable o struct con este nombre.", ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Ya existe una variable o struct con este nombre.", this.row, this.column);
    }
    return null;
  }

  createWithAccess(tree, table){
    var result = tree.getStruct(this.structName);
    if (result == null) {
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No existe un struct declarado con ese nombre: " + this.structName,ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "No existe un struct declarado con ese nombre: " + this.nombre, this.row, this.column);
    }
    var value = this.structName2.execute(tree, table);
    if(value instanceof Exception) return value;
    var symbol = new Symbol(String(this.nameObject), Type.STRUCT, value, this.row, this.column , null, String(this.structName));
    var result = table.addSymbol(symbol);
    if(result = null){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Ya existe una variable o struct con este nombre.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Ya existe una variable o struct con este nombre.", this.row, this.column);
    }
    tree.removeEnvironment(); 
    return null;
  }

  createWithCallFunction(tree, table){
    var result = tree.getStruct(this.structName);
    if (result == null) {
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No existe un struct declarado con ese nombre: " + this.structName,ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "No existe un struct declarado con ese nombre: " + this.nombre, this.row, this.column);
    }
    var value = this.structName2.execute(tree, table);
    if(value instanceof Exception) return value;
    if(String(this.structName) !== String(this.structName2.objectType) ){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se recibe un struct de tipo diferente al que se esperaba "+this.structName+"!="+this.structName2.objectType+".", ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Se recibe un struct de tipo diferente al que se esperaba "+this.structName+"!="+this.structName2.objectType+".", this.row, this.column);
    }
    var symbol = new Symbol(String(this.nameObject), Type.STRUCT, value, this.row, this.column , null, String(this.structName));
    var result = table.addSymbol(symbol);
    if(result = null){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Ya existe una variable o struct con este nombre.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Ya existe una variable o struct con este nombre.", this.row, this.column);
    }
    tree.removeEnvironment(); 
    return null;
  }

  normalCreate(tree, table){
    var result = tree.getStruct(this.structName);
    if (result == null) {
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No existe un struct declarado con ese nombre: " + this.structName,ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "No existe un struct declarado con ese nombre: " + this.nombre, this.row, this.column);
    }
    if(String(this.structName) !== String(this.structName2) ){
      var funct = new CallFunction(this.structName2, this.parameters, this.row, this.column);
      var value = funct.execute(tree, table);
      if(value instanceof Exception) return value;
      if(funct.type !== Type.STRUCT){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se esperaba un struct para la creación", ENVIRONMENT.STRUCT));
        return new Exception("Semantico", "Se esperaba un struct para la creación", this.row, this.column);        
      }else{
        if(String(funct.objectType) !== String(this.structName)){
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Se recibio un struct de diferente tipo", ENVIRONMENT.STRUCT));
          return new Exception("Semantico", "Se recibio un struct de diferente tipo", this.row, this.column);
        }
        var symbol = new Symbol(String(this.nameObject), Type.STRUCT, value, this.row, this.column , null, String(this.structName));
        var result = table.addSymbol(symbol);
        if(result = null){
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Ya existe una variable o struct con este nombre "+this.nameObject+".", ENVIRONMENT.STRUCT));
          return new Exception("Semantico", "Ya existe una variable o struct con este nombre "+this.nameObject+".", this.row, this.column);
        }
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return null;
      }
    }
    if (Object.keys(result.parameters).length !== this.parameters.length){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "El numero de parametros enviado no coincide con los que recibe el struct.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "El numero de parametros enviado no coincide con los que recibe el struct.", this.row, this.column);
    }
    var count = 0;
    var paramsList = {};
    for(var parameter in result.parameters){
      var value = this.parameters[count].execute(tree, table);
      if (value instanceof Exception){
        return value;
      }
      if ( (result.parameters[parameter].Type !== this.parameters[count].type) && (typeof(result.parameters[parameter].Type) === 'string' && this.parameters[count].type !== Type.NULL) && (typeof(result.parameters[parameter].Type) === 'string' && this.parameters[count].type !== Type.STRUCT)){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo de dato diferente en parametros de creacion del struct.",ENVIRONMENT.STRUCT));
        return new Exception("Semantico", "El parametro enviado no coincide con el que recibe el struct.", this.row, this.column);
      }
      var symbol = "";
      if(this.parameters[count].type === Type.STRUCT || this.parameters[count].type === Type.NULL){
        if(String(this.parameters[count].objectType) !== String(result.parameters[parameter].Type) && !(this.parameters[count] instanceof Primitive)){ // Si se quiere enviar un struct de tipo diferente al que se espera
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"El struct que se envia es de un tipo distinto al que se recibe.",ENVIRONMENT.STRUCT));
          return new Exception("Semantico", "El struct que se envia es de un tipo distinto al que se recibe.", this.row, this.column);
        }
        symbol = new Symbol(String(result.parameters[parameter].Identifier), Type.STRUCT, value, this.row, this.column , null, result.parameters[parameter].Type);
      }else{
        symbol = new Symbol(String(result.parameters[parameter].Identifier), result.parameters[parameter].Type, value, this.row, this.column , null, null);
      }
      paramsList[String(result.parameters[parameter].Identifier)] = symbol;
      count += 1;
    }
    var symbol = new Symbol(String(this.nameObject), Type.STRUCT, paramsList, this.row, this.column , null, String(this.structName));
    var result = table.addSymbol(symbol);
    if(result = null){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Ya existe una variable o struct con este nombre.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Ya existe una variable o struct con este nombre.", this.row, this.column);
    }
    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
    return null;
  }
}