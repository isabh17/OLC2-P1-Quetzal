class Print extends Instruction{
  constructor(row, column, expression, jump){
    super(row, column);
    this.expression = expression;
    this.jump = jump;
  }

  execute(tree, table){
    var value = this.expression.execute(tree, table);
    if(this.jump){
      //tree.updateOut("\n"+value);
      tree.updateOut(value+"\n");
    }else{
      tree.updateOut(value);
    }
  }
}