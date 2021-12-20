class Print extends Instruction {
  constructor(row, column, expression, jump) {
    super(row, column);
    this.expression = expression;
    this.jump = jump;
  }

  execute(tree, table) {
    if (Array.isArray(this.expression)) {
      return this.executeArray(tree, table);
    } else {
      return this.executeNormal(tree, table);
    }
  }

  executeNormal(tree, table){
    var value = this.expression.execute(tree, table);
    if (value instanceof Exception) return value;
    if (this.expression.type === Type.STRUCT) {
      value = this.getValueStruct(value);
    }
    var cors = this.expression.type === Type.ARRAY ? true : false;
    if(cors){
      tree.updateOut("[");
    }
    if (this.jump) {
      tree.updateOut(value);
      if(cors){
        tree.updateOut("]");
      }
      tree.updateOut("\n");
    } else {
      tree.updateOut(value);
      if(cors){
        tree.updateOut("]");
      }
    }
    return null;
  }

  executeArray(tree, table){
    var expressions = [];
    for (var exp of this.expression) {
      var result = exp.execute(tree, table);
      if(exp.type === Type.ARRAY){
        result = "["+String(result)+"]";
      }
      if (result instanceof Exception) return result;
      expressions.push(result);
    }
    var jump = this.jump === true ? "\n" : "";
    for(var exp of expressions){
      tree.updateOut(exp+" ");
    }
    tree.updateOut(jump);
    return null;
  }

  getValueStruct(variables) {
    var value = String(this.expression.objectType) + "(";
    for (var parameter in variables) {
      value += String(parameter) + ":" + variables[parameter].getValue() + ","
    }
    value += ")";
    return value;
  }

  compile(generator, env) {
    var val = this.expression.compile(generator, env);
    if (this.expression.type === Type.INT || val.type === Type.INT) {
      generator.addPrint("double", val.value);
    } else if (this.expression.type === Type.DOUBLE) {
      generator.addPrint("double", val.value);
    } else if (val.type === Type.BOOLEAN) {
      var tempLbl = generator.newLabel();
      generator.putLabel(val.trueLbl);
      generator.printTrue();
      generator.addGoto(tempLbl);
      generator.putLabel(val.falseLbl);
      generator.printFalse();
      generator.putLabel(tempLbl);
    } else if (val.type === Type.STRING) {
      generator.fPrintString();
      var paramTemp = generator.addTemp();
      generator.addExp(paramTemp, 'P', env.size, '+');
      generator.addExp(paramTemp, paramTemp, '1', '+');
      generator.setStack(paramTemp, val.value);
      generator.newEnv(env.size);
      generator.callFun('printString');
      var temp = generator.addTemp();
      generator.getStack(temp, 'P');
      generator.retEnv(env.size);
    } else if (val.type === Type.CHAR) {
      var temp = generator.addTemp();
      generator.getHeap(temp, val.value);
      generator.addPrint("char", temp);
    } else {
      console.log("Falta ejecutar");
    }
    if (this.jump === true) {
      generator.addPrint("char", 10);
    }
    return null;
  }
}