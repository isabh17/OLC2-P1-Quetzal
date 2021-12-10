class Function extends Instruction{
  constructor(type, name, parameters, instructions, row, column){
    super(row, column);  
    this.type = type;
    this.name = name;
    this.parameters = parameters;
    this.instructions = instructions;
  }
  
  execute(tree, table){
    var newTable = new TableSymbols(table);
    for (var instruction of this.instructions){
      var value = instruction.execute(tree, newTable);
      if (value instanceof Exception){
        return value;
      }
      if (value instanceof Break){
        err = new Exception("Semantico", "Sentencia Break fuera de ciclo", instruction.row, instruction.column);
        //tree.get_excepcion().append(err);
        //tree.actualizar_consola_salto(err.__str__())
      }
      if (value instanceof Continue){
        err = new Exception("Semantico", "Sentencia Continue fuera de ciclo", instruction.row, instruction.column);
        //tree.get_excepcion().append(err)
        //tree.actualizar_consola_salto(err.__str__())
      }
      if (value instanceof Return){
        this.type = value.type;
        return value.result;
      }
    }
    return null;
  }
}