class Print extends Instruction{
  constructor(row, column, expression, jump){
    super(row, column);
    this.expression = expression;
    this.jump = jump;
  }

  execute(tree, table){
    var value = this.expression.execute(tree, table);
    if (value instanceof Exception) return value;
    /*if(value === null){
      return "null";
    }*/
    if(this.expression.type === Type.STRUCT){
      value = this.getValueStruct(value);
    }
    if(this.jump){
      tree.updateOut(value+"\n");
    }else{
      tree.updateOut(value);
    }
    return null;
  }

  getValueStruct(variables){
    var value = String(this.expression.typeObject)+"(";
    for(var parameter in variables){
      value+=String(parameter)+":"+variables[parameter].getValue()+","
    }
    value+=")";
    return value;
  }

  compile(generator, env){
    var val = this.expression.compile(generator, env);
    if(this.expression.type === Type.INT || val.type === Type.INT){
      generator.addPrint("double", val.value);
    }else if(this.expression.type === Type.DOUBLE){
      generator.addPrint("double", val.value);
    }else if (val.type === Type.BOOLEAN){
        var tempLbl = generator.newLabel();
        generator.putLabel(val.trueLbl);
        generator.printTrue();
        generator.addGoto(tempLbl);
        generator.putLabel(val.falseLbl);
        generator.printFalse();
        generator.putLabel(tempLbl);
    }else if(val.type === Type.STRING){
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
    }else if (val.type === Type.CHAR){
      var temp = generator.addTemp();
      generator.getHeap(temp, val.value);
      generator.addPrint("char", temp);
    }else{
      console.log("POR HACER");
    }
    if (this.jump===true){
      generator.addPrint("char", 10);
    }
    return null;
  }
}