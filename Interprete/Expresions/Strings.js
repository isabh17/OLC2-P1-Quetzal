class Strings extends Instruction {
  constructor(operLeft, operator, operRight, row, column) {
    super(row, column);
    this.operator = operator;
    this.operLeft = operLeft;
    this.operRight = operRight;
    this.type = null;
  }

  execute(tree, table) {
    var left = this.operLeft.execute(tree, table);
    if (left instanceof Exception) return left;
    if (this.operRight != null) {
      var right = this.operRight.execute(tree, table);
      if (right instanceof Exception) return right;
    }
    if (this.operator === STRINGS.CONCAT) {
      this.type = Type.STRING;

      return String(this.getVal(this.operLeft.type, left)) + String(this.getVal(this.operRight.type, right));
    }
    ErrorList.addError(new ErrorNode(this.row, this.column, new ErrorType(EnumErrorType.SEMANTIC), `Tipo de Operacion no Especificado.`, ENVIRONMENT.NULL));
    return new Exception("Semantico", "Tipo de Operacion no Especificado.", this.row, this.column);
  }

  getVal(type, value) {
    if (type === Type.INT) {
      return parseInt(value);
    } else if (type === Type.DOUBLE) {
      return parseFloat(value);
    } else if (type === Type.BOOLEAN) {
      return Boolean(value);
    } else if (type === Type.CHAR) {
      return String.fromCharCode(value);
    }
    return String(value);
  }

  compile(generator, env) {
    var left = this.operLeft.compile(generator, env);
    var right = this.operRight.compile(generator, env);
    generator.fConcatString();
    return this.concatString(generator, env, left.value, right.value);
  }

  concatString(generator, env, param1, param2) {
    // paso de parámetros
    // Parametro 1 
    var paramTemp = generator.addTemp();
    generator.addExp(paramTemp, 'P', env.size, '+');
    generator.addExp(paramTemp, paramTemp, '1', '+');
    generator.setStack(paramTemp, param1);
    // Parametro 2 
    var paramTemp1 = generator.addTemp();
    generator.addExp(paramTemp1, paramTemp, '1', '+');
    generator.setStack(paramTemp1, param2);

    // Cambio y llamada a entorno
    generator.newEnv(env.size);
    generator.callFun('concatString');

    var temp = generator.addTemp();
    generator.getStack(temp, 'P');
    generator.retEnv(env.size);
    return new C3DReturn(temp, Type.STRING, true);
  }
}