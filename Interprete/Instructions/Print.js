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
}