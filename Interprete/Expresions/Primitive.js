class Primitive extends Instruction {
  constructor(type, value, row, column) {
    super(row, column);
    this.type = type;
    this.value = value;
  }

  execute(tree, table) {
    var value = this.getVal(this.type, this.value);
    if (typeof (value) === 'string') {
      value = value.split(' ');
      var exists = false;
      for (var word of value) {
        if (word.includes('$')) {
          //console.log(word);
          exists = true;
        }
      }
      if (exists === false) {
        //console.log(this.getVal(this.type, this.value));
        return this.getVal(this.type, this.value);
      } else {
        for (let i = 0; i < value.length; i++) {
          if (value[i].includes('$')) {
            value[i] = value[i].replace("$", "");
            

            var symbol = table.getSymbol(String(value[i]));
            if(symbol === null){
              ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró la variable "+value[i]+" declarada",ENVIRONMENT.NULL));
              new Exception("Semantico", "No se encontró la variable "+value[i]+" declarada", this.row, this.column);
            }else{
              
              value[i] = symbol.getValue();
            }
          }
        }
        var out = "";
        for(var word of value){
          out+=String(word) +" ";
        }
        return out;
      }
    }else{
      return this.getVal(this.type, this.value);
    }
  }
  
  getVal(type, value) {
    if (type === Type.INT) {
      return parseInt(value);
    } else if (type === Type.DOUBLE) {
      return parseFloat(value);
    } else if (type === Type.BOOLEAN) {
      return Boolean(value);
    } else if (type === Type.CHAR) {
      return parseInt(value.charCodeAt(0));
    }
    return String(value);
  }

  compile(generator){
    return {"value":this.value};
  }
}