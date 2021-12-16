class Instruction{
  constructor(row, column) {
    if (new.target === Instruction) {
      throw new Error( 'Error, couldn´t instance this class, Instruction' );
    }
    this.row = row;
    this.column = column;
  }

  execute(tree, table){
    throw new Error( 'Error' );
  }

  compile(generator){
    throw new Error( 'Error' );
  }
}