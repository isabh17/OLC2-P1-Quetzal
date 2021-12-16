class Do extends Instruction {
  constructor(condition, instructions, row, column) {
    super(row, column);
    this.condition = condition;
    this.instructions = instructions; //[]
  }

  execute(tree, table) {
    //tree.setAmbito(ENVIRONMENT.WHILE);
    tree.addEnvironment("DO-WHILE");
    do {
      var newTable = new TableSymbols(table);        // Inicia el Nuevo Ambito.
      for (var instruction of this.instructions) {  // Inicia ejecutando las instructions adentro del While.            
        var result = instruction.execute(tree, newTable);
        if (result instanceof Exception) {
          //tree.get_excepcion().append(result)
          //tree.update_consola(result.__str__())
        }
        if (result instanceof Break) {
          //tree.removeAmbito();
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          return null;
        }
        if (result instanceof Return) {
          //tree.removeAmbito()
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          return result;
        }
        if (result instanceof Continue) continue; //DUDA SI QUITAR AMBITO
      }
      var condition = this.condition.execute(tree, table);
      if (condition instanceof Exception) {
        //tree.removeAmbito();
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return condition;
      }
      if (this.condition.type === Type.BOOLEAN) { // Aqui verifica si la condition es una expresion logica, sino lanza una Exception.
        if (String(condition) === "false") {
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion ---->REVISAR 
          break;
        }
      } else {
        //tree.removeAmbito();
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row, this.column, new ErrorType(EnumErrorType.SEMANTIC), `Error en do-while, la expresion no retorna un booleano.`, ENVIRONMENT.DO));
        return new Exception("Semantico", "Error en do-while, la expresion no retorna un booleano.", this.row, this.column);
      }
    } while (true);
  }
}