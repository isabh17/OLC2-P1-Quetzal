class Declaration extends Instruction {
  constructor(type, identifier, expression, row, column) {
    super(row, column);
    this.identifier = identifier;
    this.expression = expression;
    this.type = type;
  }

  execute(tree, table) {
    if (typeof (this.identifier) === 'string') {//Para declarar multiples variables
      var value = this.expression.execute(tree, table);
      if (value instanceof Exception) return value;
      if (this.type === Type.INT && this.expression.type === Type.DOUBLE) {
        if (Number.isInteger(value)) {
          this.expression.type = Type.INT;
        }
      }
      if (this.type != this.expression.type) {
        ErrorList.addError(new ErrorNode(this.row, this.column, new ErrorType(EnumErrorType.SEMANTIC), "Los types de variables no concuerdan: " + String(this.type) + "!=" + String(this.expression.type), ENVIRONMENT.NULL));
        return new Exception("Semantico", "Los types de variables no concuerdan: " + String(this.type) + "!=" + String(this.expression.type), this.row, this.column);
      }
      if (this.type === Type.CHAR) {
        value = String.fromCharCode(value);
      }
      var symbol = new Symbol(String(this.identifier), this.type, value, this.row, this.column, null, null);
      var res = table.addSymbol(symbol);
      if (res instanceof Exception) return res;
      TableReport.addTableSymbol(new NodeTableSymbols(this.row, this.column, String(this.identifier), this.type, tree.getEnvironment(), value));
      return null;
    } else {
      for (var variable of this.identifier) {
        var value = "";
        if (this.type === Type.INT) {
          value = 0;
        } else if (this.type === Type.DOUBLE) {
          value = 0.0;
        } else if (this.type === Type.BOOLEAN) {
          value = true;
        } else if (this.type === Type.STRING) {
          value = "";
        } else if (this.type === Type.CHAR) {
          value = '';
        }
        var symbol = new Symbol(String(variable), this.type, value, this.row, this.column, null, null);
        var res = table.addSymbol(symbol);
        if (res instanceof Exception) return res;
      }
      return null;
    }
  }

  compile(generator, env) {
    // Compilacion de valor que estamos asignando
    var value = this.expression.compile(generator, env);

    // Guardado y obtencion de variable. Esta tiene la posicion, lo que nos sirve para asignarlo en el heap
    var newVar = env.getVariable(this.identifier);
    if (newVar === null) {
      newVar = env.addVariable(this.identifier, value.type, (value.type === Type.STRING || value.type === Type.STRUCT), this.expression.objectType);
    }
    newVar.type = this.type;

    // Obtencion de posicion de la variable
    var tempPos = newVar.position;
    if (!newVar.isGlobal) {
      tempPos = generator.addTemp();
      generator.addExp(tempPos, 'P', newVar.position, "+");
    }
    if (value.type === Type.BOOLEAN) {
      var tempLbl = generator.newLabel();

      generator.putLabel(value.trueLbl);
      generator.setStack(tempPos, "1");

      generator.addGoto(tempLbl);

      generator.putLabel(value.falseLbl);
      generator.setStack(tempPos, "0");

      generator.putLabel(tempLbl);
    } else {
      generator.setStack(tempPos, value.value);
    }
    generator.addSpace();
  }
}