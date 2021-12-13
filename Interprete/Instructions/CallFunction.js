class CallFunction extends Instruction{
  constructor(name, parameters, row, column){
    super(row, column);
    this.name = name;
    this.parameters = parameters;
    this.type = null;
    this.objectType = null;
  }
  
  execute(tree, table){
    if(this.verifyNative()){
      return this.executeNative(tree, table);
    }
    var result = tree.getFunction(this.name);
    if (result === null){
      result = tree.getStruct(this.name);
      if(result === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No existe una funcion o una plantilla de struct con ese nombre: " + this.name,ENVIRONMENT.FUNCTION));
        return new Exception("Semantico", "No existe una funcion o una plantilla de struct con ese nombre: " + this.name, this.row, this.column);
      }
      return this.createStruct(tree, table);
    }
    var newTable = new TableSymbols(tree.getGlobalTable());
    if (Object.keys(result.parameters).length === this.parameters.length){ //LA CANTIDAD DE parameters ES LA ADECUADA
      var count = 0;
      for(var parameter in result.parameters){ // SE OBTIENE EL VALOR DEL PARAMETRO EN LA LLAMADA
        var value = this.parameters[count].execute(tree, table);
        if (value instanceof Exception){
          //tree.removeAmbito();
          return value;
        }
        if (result.parameters[parameter].Type === this.parameters[count].type){  // VERIFICACION DE TIPO 
          var type = "";
          if (Number.isInteger(value)){
            type = Type.INT;
          }else if (Number.isInteger(value)===false && typeof(value)==='number'){
            type = Type.DOUBLE;
          }else if (typeof(value) === 'boolean'){
            type = Type.BOOLEAN;
          }else if (typeof(value) === 'string' && value.length === 1){
            type = Type.CHAR;
          }else if (typeof(value) === 'string'){
            type = Type.STRING;
          }
          var symbol = new Symbol(String(result.parameters[parameter].Identifier), type,  value, this.row, this.column, null, null);
          var resultTable = newTable.addSymbol(symbol);
          if (resultTable instanceof Exception){
            return resultTable;
          }
        }else{
          if( (this.parameters[count].type===Type.STRUCT || this.parameters[count].type === Type.NULL) && typeof(result.parameters[parameter].Type)==='string'){//Cambio aqui
            if(this.parameters[count].type === Type.NULL) this.parameters[count].type = Type.STRUCT;
            if(this.parameters[count].objectType===result.parameters[parameter].Type){
              var symbol = new Symbol(String(result.parameters[parameter].Identifier), Type.STRUCT,  value, this.row, this.column, null, this.parameters[count].objectType);
              var resultTable = newTable.addSymbol(symbol);
              if (resultTable instanceof Exception){
                return resultTable;
              }
            }else{
              ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo de dato diferente en parametros de la llamada.",ENVIRONMENT.FUNCTION));
              return new Exception("Semantico", "Tipo de dato diferente en parametros de la llamada.", this.row, this.column);              
            }
          }else{
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo de dato diferente en parametros de la llamada.",ENVIRONMENT.FUNCTION));
            return new Exception("Semantico", "Tipo de dato diferente en parametros de la llamada.", this.row, this.column);
          }
        }
        count += 1;
      }
    }else{
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "El numero de parametros enviado no coincide con los que recibe la funcion.",ENVIRONMENT.FUNCTION));
      return new Exception("Semantico", "El numero de parametros enviado no coincide con los que recibe la funcion.", this.row, this.column);
    }
    var value = result.execute(tree, newTable);
    if (value instanceof Exception){
      return value;
    }
    if(result.type === Type.STRUCT) this.objectType = result.objectType;
    this.type = result.type;
    return value;
  }
  
  createStruct(tree, table){
    var result = tree.getStruct(this.name);
    if (Object.keys(result.parameters).length !== this.parameters.length){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "El numero de parametros enviado no coincide con los que recibe el struct.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "El numero de parametros enviado no coincide con los que recibe el struct.", this.row, this.column);
    }
    var count = 0;
    var paramsList = {};
    for(var parameter in result.parameters){
      var value = this.parameters[count].execute(tree, table);
      if (value instanceof Exception)return value;
      if ( (result.parameters[parameter].Type !== this.parameters[count].type) && (typeof(result.parameters[parameter].Type) === 'string' && this.parameters[count].type !== Type.NULL) && (typeof(result.parameters[parameter].Type) === 'string' && this.parameters[count].type !== Type.STRUCT)){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo de dato diferente en parametros de creacion del struct.", ENVIRONMENT.STRUCT));
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
    this.type = Type.STRUCT;
    this.objectType = this.name;
    return paramsList;
  }

  verifyNative(){//Metodo usado para verificar si  se debe ejecutar una funcion nativa
    var name = this.name;
    if(name==="pow"||name==="sqrt"||name==="sin"||name==="cos"||name==="tan"||name==="log10"||name==="toInt"||name==="toDouble"||name==="string"||name==="typeof"){
      return true;
    }else{
      return false;
    }
  }

  executeNative(tree, table){
    var funct = new Natives(this.name, this.parameters, this.row, this.column);
    var result = funct.execute(tree, table);
    this.type = funct.type;
    return result;
  }
}

/*
struct Estructura{
    int x
};

void cambiarAtributo(Estructura s){
    s.x = 10;
}

Estructura a = Estructura(0);
println(a);             // Imprime 'Estructura(0)'
println(a.x);			// Imprime 0

cambiarAtributo(a);
/*println(a);             // Imprime 'Estructura(10)'
println(a.x);           // Imprime 10*/