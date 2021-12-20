class Instruction{
  constructor(row, column) {
    if (new.target === Instruction) {
      throw new Error( 'No se puede crear un objeto de esta clase abstracta' );
    }
    this.row = row;
    this.column = column;
  }

  execute(tree, table){
    throw new Error( 'No se puede ejecutar el metodo execute de esta clase abstracta' );
  }

  compile(generator, env){
    throw new Error( 'No se puede ejecutar el metodo compile de esta clase abstracta' );
  }
}