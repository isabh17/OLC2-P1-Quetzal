class Return extends Instruction {
  constructor(expression, row, column) {
    super(row, column);
    this.expression = expression;
    this.type = null;
    this.result = null;
  }

  execute(tree, table) {
    if (this.expression === null) {
      this.type = Type.NULL;
      return this;
    }
    var result = this.expression.execute(tree, table);
    if (result instanceof Exception) return result;
    this.type = this.expression.type;
    this.result = result;
    return this;
  }

  compile(generator, env) {
    if (env.returnLbl === '') {
      return null;
    }

    var value = this.expression.compile(generator, env);
    if (value.type === Type.BOOLEAN) {
      var tempLbl = generator.newLabel();

      generator.putLabel(value.trueLbl);
      generator.setStack('P', '1');
      generator.addGoto(tempLbl);

      generator.putLabel(value.falseLbl);
      generator.setStack('P', '0');

      generator.putLabel(tempLbl);
    } else {
      generator.setStack('P', value.value);
    }
    generator.addGoto(env.returnLbl);
  }
}