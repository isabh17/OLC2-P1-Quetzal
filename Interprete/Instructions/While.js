class While extends Instruction{
  constructor(condition, instructions, row, column){
    super(row, column);
    this.condition = condition;
    this.instructions = instructions; //[]
  }

  execute(tree, table){
    //tree.setAmbito(ENVIRONMENT.WHILE);
    while (true){
      var condition = this.condition.execute(tree, table)
      if (condition instanceof Exception){
          //tree.removeAmbito();
          return condition;
      }
      
      if (this.condition.type === Type.BOOLEAN){ // Aqui verifica si la condition es una expresion logica, sino lanza una Exception.
        if (String(condition) === "true"){
          var newTable = new TableSymbols(table)        // Inicia el Nuevo Ambito.
          for (var instruction of this.instructions){  // Inicia ejecutando las instructions adentro del While.            
            var result = instruction.execute(tree, newTable);
            if (result instanceof Exception){
              //tree.get_excepcion().append(result)
              //tree.update_consola(result.__str__())
            }
            if (result instanceof Break){
              //tree.removeAmbito();
              return null;
            }
            if (result instanceof Return){
              //tree.removeAmbito()
              return result;
            }
            if (result instanceof Continue) continue;
          }
        }else{
          //tree.removeAmbito();
          break;
        }
      }else{
        //tree.removeAmbito();
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Error en while, la expresion no retorna un booleano.`,ENVIRONMENT.WHILE));
        return new Exception("Semantico", "Error en while, la expresion no retorna un booleano.", this.row, this.column);
      }
    }
    return null;
  }
}