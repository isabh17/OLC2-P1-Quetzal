class Primitive extends Instruction {
  constructor(type, value, row, column) {
    super(row, column);
    this.type = type;
    this.value = value;
  }

  execute(tree, table) {
    /*var value = this.getVal(this.type, this.value);
    if (typeof (value) === 'string') {
    let exists = false;      
      value = value.split('$');
      if(value.length > 1){
        exists = true;
      }
      console.log(exists);
      console.log(value);
      if (exists === false) {
        //console.log(this.getVal(this.type, this.value[1]));
        return this.getVal(this.type, this.value);
      } else {
        var symbol = table.getSymbol(String(value[1]));       
        if(symbol === null ){
          var val =  value[1];
          var rep = val.replace('(','');
          var rep1 = rep.replace(')','');
          console.log(ParseInt(val));

          //console.log(parseInt(val));
          var expr = val.execute(tree, table);
          //var expr = this.getVal(this.type, this.value[1]);
          if(expr === null){
            ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró la variable declarada o operacion aritmetica",ENVIRONMENT.NULL));
            new Exception("Semantico", "No se encontró la variable declarada o operacion aritmetica", this.row, this.column);
          }else{
            value[1] = expr;
            console.log('as');
            console.log(symbol);
            console.log('dddd');
            console.log(expr);
          }                    
          /*ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró la variable "+value[i]+" declarada",ENVIRONMENT.NULL));
          new Exception("Semantico", "No se encontró la variable "+value[i]+" declarada", this.row, this.column);*/
        /*}else{              
          value[1] = symbol.getValue();
        }*/
        /*for (let i = 0; i < value.length; i++) {
          if (value[i].includes('$')) {
            value[i] = value[i].replace("$", "");
            
            console.log(value);

            var symbol = table.getSymbol(String(value[i]));
            if(symbol === null){
              ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"No se encontró la variable "+value[i]+" declarada",ENVIRONMENT.NULL));
              new Exception("Semantico", "No se encontró la variable "+value[i]+" declarada", this.row, this.column);
            }else{
              
              value[i] = symbol.getValue();
            }
          }
        }*/
        /*var out = "";
        for(var word of value){
          out+=String(word) +" ";
        }
        return out;
      }
    }else{
      return this.getVal(this.type, this.value);
    }*/
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
}