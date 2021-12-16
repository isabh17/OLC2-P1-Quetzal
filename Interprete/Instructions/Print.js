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

  compile(generator){
    var val = this.expression.compile(generator);
    if(this.expression.type == Type.INT){
        generator.addPrint("double", val.value);
    }else if(this.expression.type == Type.DOUBLE){
      generator.addPrint("double", val.value);
    }else if (val.type == Type.BOOLEAN){
        /*tempLbl = generator.newLabel()
        generator.putLabel(val.trueLbl)
        generator.printTrue()
        generator.addGoto(tempLbl)
        generator.putLabel(val.falseLbl)
        generator.printFalse()
        generator.putLabel(tempLbl)*/
    }else if(val.type == Type.STRING){
        /*generator.fPrintString();
        paramTemp = generator.addTemp();
        generator.addExp(paramTemp, 'P', env.size, '+');
        generator.addExp(paramTemp, paramTemp, '1', '+');
        generator.setStack(paramTemp, val.value);
        generator.newEnv(env.size);
        generator.callFun('printString');
        temp = generator.addTemp();
        generator.getStack(temp, 'P');
        generator.retEnv(env.size);*/
    }else{
      console.log("POR HACER");
    }
    if (this.jump){
      generator.addPrint("c", 10);
    }
    return null;
  }
}