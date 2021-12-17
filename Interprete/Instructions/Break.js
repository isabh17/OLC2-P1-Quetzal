class Break extends Instruction{
  constructor(row, column){
    super(row, column);
  }

  execute(tree, table){
    return this;
  }

  compile(generator, env){
    //def compile(self, environment):
    if (env.breakLbl == ''){
        print("Break fuera de ciclo")
        return
    }
    generator.addGoto(env.breakLbl)
    //return null;
  }
}