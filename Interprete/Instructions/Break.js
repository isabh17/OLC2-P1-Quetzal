class Break extends Instruction {
  constructor(row, column) {
    super(row, column);
  }

  execute(tree, table) {
    return this;
  }

  compile(generator, env) {
    if (env.breakLbl === '') {
      console.log("Break");
      return;
    }
    generator.addGoto(env.breakLbl);
    //return null;
  }
}