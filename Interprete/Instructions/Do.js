class Do extends Instruction {
  constructor(condition, instructions, row, column) {
    super(row, column);
    this.condition = condition;
    this.instructions = instructions; //[]
  }

  execute(tree, table) {
    tree.addEnvironment("DO-WHILE");
    do {
      var newTable = new TableSymbols(table);        // Inicia el Nuevo Ambito.
      for (var instruction of this.instructions) {  // Inicia ejecutando las instructions adentro del While.            
        var result = instruction.execute(tree, newTable);
        if (result instanceof Exception) {
        }
        if (result instanceof Break) {
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          return null;
        }
        if (result instanceof Return) {
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          return result;
        }
        if (result instanceof Continue) continue; //DUDA SI QUITAR AMBITO
      }
      var condition = this.condition.execute(tree, table);
      if (condition instanceof Exception) {
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return condition;
      }
      if (this.condition.type === Type.BOOLEAN) { // Aqui verifica si la condition es una expresion logica, sino lanza una Exception.
        if (String(condition) === "false") {
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion ---->REVISAR 
          break;
        }
      } else {
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row, this.column, new ErrorType(EnumErrorType.SEMANTIC), `Error en do-while, la expresion no retorna un booleano.`, ENVIRONMENT.DO));
        return new Exception("Semantico", "Error en do-while, la expresion no retorna un booleano.", this.row, this.column);
      }
    } while (true);
  }

  compile(generator, env){
    var continueLbl = generator.newLabel();
    generator.putLabel(continueLbl);

    var condition = this.condition.compile(generator, env);
    let newEnv = new Environment(env);

    newEnv.breakLbl = condition.falseLbl;
    newEnv.continueLbl = continueLbl;

    generator.putLabel(condition.trueLbl);

    for(var instruction of this.instructions){
      instruction.compile(generator, newEnv);
    }
    generator.addGoto(continueLbl);

    generator.putLabel(condition.falseLbl);
  }
}