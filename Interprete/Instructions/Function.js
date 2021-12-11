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
        ErrorList.addError(new ErrorNode(instruction.row, instruction.column,new ErrorType(EnumErrorType.SEMANTIC), "Sentencia Break fuera de ciclo",ENVIRONMENT.FUNCTION));
        err = new Exception("Semantico", "Sentencia Break fuera de ciclo", instruction.row, instruction.column);
        //tree.get_excepcion().append(err);
        //tree.actualizar_consola_salto(err.__str__())
      }
      if (value instanceof Continue){
        ErrorList.addError(new ErrorNode(instruction.row, instruction.column,new ErrorType(EnumErrorType.SEMANTIC), "Sentencia Continue fuera de ciclo",ENVIRONMENT.FUNCTION));
        err = new Exception("Semantico", "Sentencia Continue fuera de ciclo", instruction.row, instruction.column);
        //tree.get_excepcion().append(err)
        //tree.actualizar_consola_salto(err.__str__())
      }
      if (value instanceof Return){
        if(this.type === Type.NULL){//Si la funcion es de tipo void
          if(value!==null){// Si la funcion recibe un return con expresion y aun así devuelve algo
            ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en funcion "+ this.name+ ", se retorna una expresion y se esperaba vacio.",ENVIRONMENT.FUNCTION));
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
      ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en funcion "+ this.name+ ", se esperaba que se retornara un valor.",ENVIRONMENT.FUNCTION));
      return new Exception("Semantico", "Error en funcion "+ this.name+ ", se esperaba que se retornara un valor.", this.row, this.column);
    }
    return null;
  }
}