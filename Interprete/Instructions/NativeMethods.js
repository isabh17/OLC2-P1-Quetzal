class NativeMethods extends Instruction {
  constructor(name, method, parameters, row, column) {
    super(row, column);
    this.name = name;
    this.method = method;
    this.parameters = parameters;
    this.type = null;
  }

  execute(tree, table) {
    if (this.method === 'toUppercase') {
      if (this.parameters.length !== 0) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se permiten parametros en funcion uppercase",ENVIRONMENT.NULL));
        return Exception("Semantico", "No se permiten parametros en funcion uppercase", this.row, this.column);
      }
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType() !== Type.STRING){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", la variable no contiene un string.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la variable no contiene un string.", this.row, this.column);
      }
      var value = symbol.getValue();
      value = value.toUpperCase();
      this.type = Type.STRING;
      return value;
    } else if (this.method === 'toLowercase') {
      if (this.parameters.length !== 0) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se permiten parametros en funcion uppercase",ENVIRONMENT.NULL));
        return Exception("Semantico", "No se permiten parametros en funcion uppercase", this.row, this.column);
      }
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType() !== Type.STRING){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", la variable no contiene un string.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la variable no contiene un string.", this.row, this.column);
      }
      var value = symbol.getValue();
      value = value.toLowerCase();
      this.type = Type.STRING;
      return value;
    } else if (this.method === 'length') {
      if (this.parameters.length !== 0) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se permiten parametros en funcion uppercase",ENVIRONMENT.NULL));
        return Exception("Semantico", "No se permiten parametros en funcion uppercase", this.row, this.column);
      }
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType()!== Type.STRING && symbol.getType()!== Type.ARRAY){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", la variable no contiene un string.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la variable no contiene un string.", this.row, this.column);
      }
      var value = symbol.getValue();
      var leng = value.length;
      this.type = Type.INT;
      return leng;
    } else if (this.method === 'subString') {
      if (this.parameters.length !== 2) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),  "Solo se admite 2 parameters en funcion nativa: " + this.name,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Solo se admite 2 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var begin = this.parameters[0].execute(tree, table);
      var end = this.parameters[1].execute(tree, table);
      if(begin instanceof Exception || this.parameters[0].type!==Type.INT) return begin;
      if(end instanceof Exception|| this.parameters[1].type!==Type.INT) return end;
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType()!== Type.STRING){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en "+this.name+", la variable no contiene un string.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la variable no contiene un string.", this.row, this.column);
      }
      var value = symbol.getValue();
      value = value.substring(begin, end);
      this.type = Type.STRING;
      return value;
    } else if (this.method === 'caracterOfPosition') {
      if (this.parameters.length !== 1) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se admite 1 parameters en funcion nativa: " + this.name,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var position = this.parameters[0].execute(tree, table);
      if(position instanceof Exception || this.parameters[0].type!==Type.INT) return begin;
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType()!== Type.STRING){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", la variable no contiene un string.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la variable no contiene un string.", this.row, this.column);
      }
      var value = symbol.getValue();
      value = value.charAt(position);
      this.type = Type.STRING;
      return value;
    }else if (this.method === 'parse') {
      if (this.parameters.length !== 1) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se admite 1 parametro en funcion nativa:"+this.name,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Solo se admite 1 parametro en funcion nativa:"+this.name, this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table);
      if(value instanceof Exception){
        return value;
      }
      if(this.parameters[0].type !== Type.STRING){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se permite parsear strings:",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Solo se permite parsear strings:", this.row, this.column);
      }
      if(this.name === Type.INT){
        value =parseInt(value);
        //ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se permite parsear entero:",ENVIRONMENT.NULL));
        if(isNaN(value)){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se permite parsear entero:",ENVIRONMENT.NULL));
          return new Exception("Semantico", "No se pudo parsear a entero:", this.row, this.column);
        } 
        this.type = Type.INT;
        return value;
      }else if(this.name === Type.DOUBLE){
        value =parseFloat(value);
        
        if(isNaN(value)){
           ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se permite parsear a double:",ENVIRONMENT.NULL));
           return new Exception("Semantico", "No se pudo parsear a double:", this.row, this.column);
        }
        this.type = Type.DOUBLE;
        return value;
      }else if(this.name === Type.BOOLEAN){
        value = JSON.parse(value)===true;
        if(isNaN(value)){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No se pudo parsear a double:",ENVIRONMENT.NULL));
          return new Exception("Semantico", "No se pudo parsear a double:", this.row, this.column);
        } 
        this.type = Type.BOOLEAN;
        return value;
      }
    }else if (this.method === 'push') {
      if (this.parameters.length !== 1) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se admite 1 parameters en funcion nativa: " + this.name,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table);
      if(value instanceof Exception ) return value;
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType()!== Type.ARRAY){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", la no es un arreglo.", ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la no es un arreglo.", this.row, this.column);
      }
      if(this.parameters[0].type !== symbol.objectType){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", se intenta agregar un valor de tipo distinto al que tiene el array.", ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", se intenta agregar un valor de tipo distinto al que tiene el array.", this.row, this.column);
      }
      var arr = symbol.getValue();
      arr.push(value);
      return null;
    }else if (this.method === 'pop') {
      if (this.parameters.length !== 0) {
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Solo se admite 1 parameters en funcion nativa: " + this.name,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var symbol = table.getSymbol(String(this.name));
      if(symbol === null){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", no se encontró la variable.",ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", no se encontró la variable.", this.row, this.column);
      }else if(symbol.getType()!== Type.ARRAY){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en "+this.name+", la no es un arreglo.", ENVIRONMENT.NULL));
        return new Exception("Semantico", "Error en "+this.name+", la no es un arreglo.", this.row, this.column);
      }
      var arr = symbol.getValue();
      arr.pop();
      return null;
    }
    return null;
  }

  compile(generator, env){
    return null;
  }
}