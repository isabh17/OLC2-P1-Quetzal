class Return extends Instruction{
  constructor(expression, row, column){
    super(row, column);
    this.expression = expression;
    this.type = null;
    this.result = null;
  }

  execute(tree, table){
    if(this.expression===null){
      return null;
    }
    var result = this.expression.execute(tree, table);
    if (result instanceof Exception) return result;
    this.type = this.expression.type;
    this.result = result;
    return this;
  }

  compile(generator, env){
    if(env.returnLbl === ''){
      return;
    }
    let value =  this.expression.compile(generator,env);
    if(this.value === TypeError.BOOLEAN){
      let tmpLbl = generator.newLabel();
      generator.putLabel(value.trueLbl);
      generator.setStack('p','1');
      generator.addGoto(tmpLbl);
      generator.putLabel('p','0');
      generator.putLabel(tmpLbl);
    }else{
      generator.setStack('p',value.value);
    }
    generator.addGoto(env.returnLbl);
  }
}