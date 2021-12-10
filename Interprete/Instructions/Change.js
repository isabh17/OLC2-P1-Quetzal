class Change extends Instruction {
  constructor(name, expression, row, column) {
    super(row, column);
    this.name = name;
    this.expression = expression;
    this.type = null;
  }

  execute(tree, table) {
    var result = this.expression!== null ? this.expression.execute(tree, table) : null;
    console.log(result);
  }
}