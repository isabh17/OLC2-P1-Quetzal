class Continue extends Instruction{
  constructor(row, column){
    super(row, column);
  }

  execute(tree, table){
    return this;
  }
}