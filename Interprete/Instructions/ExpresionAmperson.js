class ExpresionAmperson extends Instruction {
  constructor(expression, row, column) {
    super(row, column);
    this.expression = expression;
  }
  execute(tree, table) {

  }

  compile(generator, env){
    return null;
  }
}