class Break extends Instruction{
  constructor(row, column){
    super(row, column);
  }

  execute(tree, table){
    return this;
  }

  compile(generator, env){
    return null;
  }
}