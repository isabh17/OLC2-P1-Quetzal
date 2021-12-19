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
      TableReport.addTableSymbol(new NodeTableSymbols(this.row,this.column,String(this.name),"VOID", 'Global',null));
      tree.addEnvironment("Funcion "+String(this.name));
    }else{
      TableReport.addTableSymbol(new NodeTableSymbols(this.row,this.column,String(this.name), this.type,'Global',null));
      tree.addEnvironment("Funcion "+String(this.name));
    }
    for (var instruction of this.instructions){
      var value = instruction.execute(tree, table); //Cambio aqui
      if (value instanceof Exception){ // Se cambio, estaba value instanceof pasa a ser instruction
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return value;
      }
      if (value instanceof Break){// Se cambio, estaba value instanceof pasa a ser instruction
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(instruction.row, instruction.column,new ErrorType(EnumErrorType.SEMANTIC), "Sentencia Break fuera de ciclo",ENVIRONMENT.FUNCTION));
        err = new Exception("Semantico", "Sentencia Break fuera de ciclo", instruction.row, instruction.column);
      }
      if (value instanceof Continue){// Se cambio, estaba value instanceof pasa a ser instruction
        ErrorList.addError(new ErrorNode(instruction.row, instruction.column,new ErrorType(EnumErrorType.SEMANTIC), "Sentencia Continue fuera de ciclo",ENVIRONMENT.FUNCTION));
        err = new Exception("Semantico", "Sentencia Continue fuera de ciclo", instruction.row, instruction.column);
      }
      if (value instanceof Return){
        if(this.type === Type.NULL){//Si la funcion es de tipo void
          if(value.result!==null){// Si la funcion recibe un return con expresion y aun así devuelve algo
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            ErrorList.addError(new ErrorNode(this.row, this.column,new ErrorType(EnumErrorType.SEMANTIC), "Error en funcion "+ this.name+ ", se retorna una expresion y se esperaba vacio.",ENVIRONMENT.FUNCTION));
            return new Exception("Semantico", "Error en funcion "+ this.name+ ", se retorna una expresion y se esperaba vacio.", this.row, this.column);
          }else{
            return value.result;
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
    return null;
  }

  compile(generator, env){
    if(this.name === "main"){
      this.execMain(generator, env);
    }else{
      this.execOthers(generator, env);
    }
  }

  execMain(generator, env){
    for(var instruction of this.instructions){
      instruction.compile(generator, env);
    }
  }

  execOthers(generator, env){
    env.saveFunc(this.name, this);
    
    var newEnv = new Environment(env);

    var returnLbl = generator.newLabel();
    newEnv.returnLbl = returnLbl;
    newEnv.size = 1;

    for (var parameter in this.parameters){
      newEnv.addVariable(this.parameters[parameter].Identifier, this.parameters[parameter].Type, (parameter.type === Type.STRING || parameter.type === Type.STRUCT));
    }
    
    generator.freeAllTemps();

    generator.addBeginFunc(this.name);

    for(var instruction of this.instructions){
      instruction.compile(generator, newEnv);
    }
    
    generator.putLabel(returnLbl);
    generator.addEndFunc();
    generator.freeAllTemps();
  }
}