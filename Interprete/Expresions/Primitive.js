class Primitive extends Instruction {
  constructor(type, value, row, column) {
    super(row, column);
    this.type = type;
    this.value = value;
    this.trueLbl = '';
    this.falseLbl = '';
    this.objectType = '';
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
            if (symbol === null) {
              ErrorList.addError(new ErrorNode(this.row, this.column, new ErrorType(EnumErrorType.SEMANTIC), "No se encontró la variable " + value[i] + " declarada", ENVIRONMENT.NULL));
              new Exception("Semantico", "No se encontró la variable " + value[i] + " declarada", this.row, this.column);
            } else {

              value[i] = symbol.getValue();
            }
          }
        }
        var out = "";
        for (var word of value) {
          out += String(word) + " ";
        }
        return out;
      }
    } else {
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

  compile(generator, env) {
    if (this.type === Type.INT || this.type === Type.DOUBLE) {
      return new C3DReturn(String(this.value), this.type, false);
    } else if (this.type === Type.BOOLEAN) {
      if (this.trueLbl === '') {
        this.trueLbl = generator.newLabel();
      }
      if (this.falseLbl === '') {
        this.falseLbl = generator.newLabel();
      }
      if (this.value==="true") {
        generator.addGoto(this.trueLbl);
      } else {
        generator.addGoto(this.falseLbl);
      }

      var ret = new C3DReturn(this.value, this.type, false);
      ret.trueLbl = this.trueLbl;
      ret.falseLbl = this.falseLbl;
      return ret;

    } else if (this.type === Type.STRING) {
      var retTemp = generator.addTemp();
      generator.addExp(retTemp, 'H', '', '');

      for (var char of String(this.value)) {
        generator.setHeap('H', char.charCodeAt(0));   // heap[H] = NUM;
        generator.nextHeap();                // H = H + 1;
      }
      generator.setHeap('H', '-1');            // FIN DE CADENA
      generator.nextHeap();

      return new C3DReturn(retTemp, Type.STRING, true);
    } else {
      console.log('Por hacer');
    }
  }
}