class Function extends Instruction{
  constructor(name, parameters, instructions, row, column){
    super(row, column);  
    this.name = name;
    this.parameters = parameters;
    this.instructions = instructions;
    this.type = Type.Null;
  }
  
  execute(tree, table){
    var newTable = new TableSymbols(table);
    for (var instruction of this.instructions){
      var value = instruction.execute(tree, newTable);
      if (value instanceof Exception){
        tree.get_excepcion().append(value);
        tree.actualizar_consola_salto(value.__str__());
      }
      if (value instanceof Break){
        err = new Exception("Semantico", "Sentencia Break fuera de ciclo", instruction.row, instr.column);
        tree.get_excepcion().append(err);
        //tree.actualizar_consola_salto(err.__str__())
      }
      if (value instanceof Continue){
        err = new Exception("Semantico", "Sentencia Continue fuera de ciclo", instruction.row, instr.column);
        tree.get_excepcion().append(err)
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