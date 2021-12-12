class While extends Instruction{
  constructor(condition, instructions, row, column){
    super(row, column);
    this.condition = condition;
    this.instructions = instructions; //[]
  }

  execute(tree, table){
    tree.addEnvironment("While");
    while (true){
      var condition = this.condition.execute(tree, table)
      if (condition instanceof Exception){
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          return condition;
      }
      if (this.condition.type === Type.BOOLEAN){ // Aqui verifica si la condition es una expresion logica, sino lanza una Exception.
        if (String(condition) === "true"){
          var newTable = new TableSymbols(table)        // Inicia el Nuevo Ambito.
          for (var instruction of this.instructions){  // Inicia ejecutando las instructions adentro del While.            
            var result = instruction.execute(tree, newTable);
            if (result instanceof Exception){
              tree.removeEnvironment();
              return result;
            }
            if (result instanceof Break){
              tree.removeEnvironment();
              return null;
            }
            if (result instanceof Return){
              tree.removeEnvironment();
              return result;
            }
            if (result instanceof Continue) continue;
          }
        }else{
          tree.removeEnvironment();
          break;
        }
      }else{
        tree.removeEnvironment();
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error en while, la expresion no retorna un booleano.`,ENVIRONMENT.WHILE));
        return new Exception("Semantico", "Error en while, la expresion no retorna un booleano.", this.row, this.column);
      }
    }
    return null;
  }
}