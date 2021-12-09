class Return extends Instruction{
  constructor(expression, row, column){
    super(row, column);
    this.expression = expression;
    this.tipo = null;
    this.result = null;
  }

  execute(tree, table){
    var result = this.expression.execute(tree, table);
    if (result instanceof Exception) return result;
    this.type = this.expression.type;
    this.result = result;
    return this;
  }
}