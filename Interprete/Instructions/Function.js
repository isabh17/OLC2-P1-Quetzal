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
        if(this.type === Type.NULL){//Si la funcion es de tipo void
          if(value!==null){// Si la funcion recibe un return con expresion y aun así devuelve algo
            return new Exception("Semantico", "Error en funcion "+ this.name+ ", se retorna una expresion y se esperaba vacio.", this.row, this.column);
          }
        }else{
          if(this.type === value.type){//Si la funcion retorna un valor se verifica que sean del tipo que debe retornar
            return value.result;
          }else{
            if(this.type === Type.DOUBLE && value.type === Type.INT){
              value.type = Type.DOUBLE;
              return value.result;
            }
            return new Exception("Semantico", "Error en funcion "+ this.name+ ", se retorna un valor del tipo incorrecto de esta funcion.", this.row, this.column);
          }
        }
      }
    }
    if(this.type!==Type.NULL){
      return new Exception("Semantico", "Error en funcion "+ this.name+ ", se esperaba que se retornara un valor.", this.row, this.column);
    }
    return null;
  }
}