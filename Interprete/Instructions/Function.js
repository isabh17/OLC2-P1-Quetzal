class Function extends Instruction{
  constructor(type, name, parameters, instructions, row, column, objectType ){
    super(row, column);  
    this.type = type;
    this.name = name;
    this.parameters = parameters;
    this.instructions = instructions;
    this.objectType = objectType;
  }
  
  execute(tree, table){
    if(this.type === Type.NULL){//Si la funcion es de tipo void
      TableReport.addTableSymbol(new NodeTableSymbols(this.row,this.column,String(this.name),"VOID", tree.getEnvironment(),null));
      tree.addEnvironment("MAIN");
    }else{
      TableReport.addTableSymbol(new NodeTableSymbols(this.row,this.column,String(this.name), this.type, tree.getEnvironment(),null));
      tree.addEnvironment("FUNCION");
    }
    for (var instruction of this.instructions){
      var value = instruction.execute(tree, table);
      if (value instanceof Exception){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return value;
      }
      if (value instanceof Break){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(instruction.row, instruction.column,new ErrorType(EnumErrorType.SEMANTIC), "Sentencia Break fuera de ciclo",ENVIRONMENT.FUNCTION));
        err = new Exception("Semantico", "Sentencia Break fuera de ciclo", instruction.row, instruction.column);
      }
      if (value instanceof Continue){
        ErrorList.addError(new ErrorNode(instruction.row, instruction.column,new ErrorType(EnumErrorType.SEMANTIC), "Sentencia Continue fuera de ciclo",ENVIRONMENT.FUNCTION));
        err = new Exception("Semantico", "Sentencia Continue fuera de ciclo", instruction.row, instruction.column);
      }
      if (value instanceof Return){
        if(this.type === Type.NULL){//Si la funcion es de tipo void
          if(value!==null){// Si la funcion recibe un return con expresion y aun así devuelve algo
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en funcion "+ this.name+ ", se retorna una expresion y se esperaba vacio.",ENVIRONMENT.FUNCTION));
            return new Exception("Semantico", "Error en funcion "+ this.name+ ", se retorna una expresion y se esperaba vacio.", this.row, this.column);
          }
          
        }else{
          if(this.type === value.type){//Si la funcion retorna un valor se verifica que sean del tipo que debe retornar
            if(this.type === Type.STRUCT){
              if(String(this.objectType) !== String(value.expression.objectType)){
                tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en funcion "+ this.name+ ", se retorna un valor del tipo incorrecto de esta funcion, "+this.objectType+"!="+value.objectType+".", ENVIRONMENT.FUNCTION));
                return new Exception("Semantico", "Error en funcion "+ this.name+ ", se retorna un valor del tipo incorrecto de esta funcion, "+this.objectType+"!="+value.expression.objectType+".", this.row, this.column);
              }
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              return value.result;
            }
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            return value.result;
          }else{
            if(this.type === Type.DOUBLE && value.type === Type.INT){
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              value.type = Type.DOUBLE;
              return value.result;
            }
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC),"Error en funcion "+ this.name+ ", se retorna un valor del tipo incorrecto de esta funcion.",ENVIRONMENT.FUNCTION));
            return new Exception("Semantico", "Error en funcion "+ this.name+ ", se retorna un valor del tipo incorrecto de esta funcion, "+this.type+"!="+value.type+".", this.row, this.column);
          }
        }
      }
    }
    if(this.type!==Type.NULL){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en funcion "+ this.name+ ", se esperaba que se retornara un valor.",ENVIRONMENT.FUNCTION));
      return new Exception("Semantico", "Error en funcion "+ this.name+ ", se esperaba que se retornara un valor.", this.row, this.column);
    }
    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
    return null;
  }

  compile(generator){
    for (var instruction of this.instructions){
      instruction.compile(generator);
    }
    return null;
  }
}