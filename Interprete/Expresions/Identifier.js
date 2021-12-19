class Identifier extends Instruction{
  constructor(identifier, row, column,env){
    super(row, column);    
    this.identifier = identifier;
    this.type = null;
    this.objectType = null;
    this.env = env;
    this.trueLbl = '';
    this.falseLbl = '';
    this.objectType = '';
  }

  execute(tree, table){
    var symbol = table.getSymbol(this.identifier);
    if (symbol === null){
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No se encontro la variable` +this.identifier+" declarada",ENVIRONMENT.NULL));
      return new Exception("Semantico", "No se encontro la variable "+this.identifier+" declarada", this.row, this.column);
    }else{
      if(symbol.getType() === Type.STRUCT){
        this.objectType = symbol.objectType;
      }else if(symbol.getType() === Type.ARRAY){
        this.objectType = symbol.objectType;
      }
      this.type = symbol.getType();
      if(symbol.getValue() === null || symbol.getValue() === "null"){
        this.type = Type.NULL;
      }
      return symbol.getValue();
    }
  }

  compile(generator, env){
    generator.addComment("Compilacion de Acceso");
    
    var symbol = env.getVariable(this.identifier);
    if(symbol === null){
        console.log("Error, no existe la variable "+this.identifier);
        return null;
    }

    // Temporal para guardar variable
    var temp = generator.addTemp();

    // Obtencion de posicion de la variable
    var tempPos = symbol.position;
    if(!symbol.isGlobal){
      tempPos = generator.addTemp();
      generator.addExp(tempPos, 'P', symbol.position, "+");
    }
    generator.getStack(temp, tempPos);

    if(symbol.type !== Type.BOOLEAN){
        generator.addComment("Fin compilacion acceso");
        generator.addSpace();
        return new C3DReturn(temp, symbol.type, true);
    }
    if(this.trueLbl === ''){
      this.trueLbl = generator.newLabel();
    }
    if(this.falseLbl === ''){
      this.falseLbl = generator.newLabel();
    }
    
    generator.addIf(temp, '1', '==', this.trueLbl);
    generator.addGoto(this.falseLbl);

    generator.addComment("Fin compilacion acceso");
    generator.addSpace();

    var ret = new C3DReturn(null, Type.BOOLEAN, false);
    ret.trueLbl = this.trueLbl;
    ret.falseLbl = this.falseLbl;
    return ret;
  }
}
