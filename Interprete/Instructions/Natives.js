class Natives extends Instruction {
  constructor(name, parameters, row, column) {
    super(row, column);
    this.name = name;
    this.parameters = parameters;
    this.type = null;
  }

  execute(tree, table) {
    if (this.name === 'log10') {
      if (this.parameters.length !== 1) {
        return Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: log10", this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table);
      if(value instanceof Exception){
        return value;
      }
      if (typeof (value) !== 'number') {
        return Exception("Semantico", "El value del logaritmo debe ser de tipo numerico", this.row, this.column);
      }
      var result = Math.log10(value);
      if (Number.isInteger(result)) {
        this.type = Type.INT;
      } else {
        this.type = Type.DOUBLE;
      }
      return result;
    } else if (this.name === 'sin' || this.name === 'cos' || this.name === 'tan' || this.name == 'sqrt') {
      if (this.parameters.length !== 1) {
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table);
      if(value instanceof Exception){
        return value;
      }
      if (typeof (value) !== 'number') {
        return Exception("Semantico", "El value del logaritmo debe ser de tipo numerico", this.row, this.column);
      }
      var result = 0;
      if (this.name === 'sin') {
        result = Math.sin(value*Math.PI/180);
      } else if (this.name === 'cos') {
        result = Math.cos(value*Math.PI/180);
      } else if (this.name === 'tan') {
        result = Math.tan(value*Math.PI/180);
      } else if (this.name === 'sqrt') {
        result = Math.sqrt(value);
      }
      if (Number.isInteger(result)) {
        this.type = Type.INT;
      } else if (Number.isInteger(result) === false && typeof (result) === 'number') {
        this.type = Type.DOUBLE;
      }
      return result;
    } else if (this.name === 'string') {
      if (this.parameters.length !== 1) {
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table);
      if(value instanceof Exception){
        return value;
      }
      var result = String(value);
      this.type = Type.STRING;
      return result;
    } else if (this.name === 'typeof') {
      if (this.parameters.length !== 1) {
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table)
      if(value instanceof Exception){
        return value;
      }
      var result = "";
      if (Number.isInteger(value)) {
        result = "int";
      } else if (Number.isInteger(value) === false && typeof (value) === 'number') {
        result = "double";
      } else if (typeof (value) === 'boolean') {
        result = "boolean";
      } else if (typeof (value) === 'string' && value.length === 1) {
        result = "char";
      } else if (typeof (value) === 'string') {
        result = "string";
      }
      this.type = Type.STRING;
      if (result === "") {
        return new Exception("Semantico", "No se encontro referencia al parametro en funcion nativa:  " + this.name, this.row, this.column);
      }
      return result;
    } else if (this.name === 'pow') {
      if (this.parameters.length !== 2) {
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: " + this.name, this.row, this.column);
      }
      var base = this.parameters[0].execute(tree, table);
      var exponent = this.parameters[1].execute(tree, table);
      if(base instanceof Exception || typeof(base)!=="number"){
        if(typeof(base)!=="number"){
          return new Exception("Semantico", "Se esperaba un numero en la base, funcion: " + this.name, this.row, this.column);
        }
        return base;
      }else if(exponent instanceof Exception || typeof(exponent)!=="number"){
        if(typeof(base)!=="number"){
          return new Exception("Semantico", "Se esperaba un numero en el exponente, funcion: " + this.name, this.row, this.column);
        }
        return exponent;
      }
      var result = 0;
      result = Math.pow(base, exponent);
      if (Number.isInteger(value)) {
        this.type = Type.INT;
      } else {
        this.type = Type.DOUBLE;
      }
      return result;
    }else if (this.name === 'toInt' || this.name === 'toDouble' ) {
      if (this.parameters.length !== 1) {
        return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa:"+this.name, this.row, this.column);
      }
      var value = this.parameters[0].execute(tree, table);
      if(value instanceof Exception){
        return value;
      }
      if(this.name === "toInt"){
        value = parseInt(value);
        if(isNaN(value)){
          return new Exception("Semantico", "No se pudo realizar el parse a INT", this.row, this.column);
        }
        this.type = Type.DOUBLE;
      }else{
        value = parseFloat(value);
        if(isNaN(value)){
          return new Exception("Semantico", "No se pudo realizar el parse a DOUBLE", this.row, this.column);
        }
        this.type = Type.INT;
      }
      return value;
    }
  }
}
