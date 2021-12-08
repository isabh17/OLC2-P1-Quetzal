class Primitive extends Instruction{
  constructor(type, value, row, column){
    super(row,column);
    this.type = type;
    this.value = value;
  }

  execute(tree, table){
    return this.value;
  }
}