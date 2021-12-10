class TableSymbols{
  constructor(previous = null, environment = null){
    this.table = {};
    this.previous = previous;
    this.structs = [];
    this.functions = [];
    this.environment = environment;
  }

  addSymbol(symbol){
    if(symbol.id in this.table){
      ErrorList.addError(new ErrorNode(symbol.getRow(),symbol.getColumn(),new ErrorType(EnumErrorType.SEMANTIC),"Variable " + symbol.id + " ya existe",ENVIRONMENT.NULL));
      return new Exception("Semantico", "Variable " + symbol.id + " ya existe", symbol.row, symbol.column);
    }else{
      this.table[symbol.id] = symbol;
      return null;
    }
  }

  getSymbol(id){
    var actualTable = this;
    while(actualTable.table != null){
      if (id in actualTable.table){
        return actualTable.table[id];
      }else{
        actualTable = actualTable.previous;
        if(actualTable === null){
          return null;
        }
      }
    }
    return null;
  }

  updateValueSymbol(symbol){
    var actualTable = this;
    while(actualTable != null){
      if(symbol.id in actualTable.table){
        if(actualTable.table[symbol.id].getType() === symbol.getType()){
          actualTable.table[symbol.id].setValue(symbol.getValue());
          actualTable.table[symbol.id].setType(symbol.getType());
          return null;
        }else{
          ErrorList.addError(new ErrorNode(symbol.getRow(),symbol.getColumn(),new ErrorType(EnumErrorType.SEMANTIC),`No se puede asignar tipos distintos a las variables.`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No se puede asignar tipos distintos a las variables", symbol.getRow(), symbol.getEnvironment());
        }
      }else{
        actualTable = actualTable.previous;
        if(actualTable === null){
          return null;
        }
      }
    }
    //Retornariamos un eror semantico
    ErrorList.addError(new ErrorNode(symbol.getRow(),symbol.getColumn(),new ErrorType(EnumErrorType.SEMANTIC),`Variable No encontrada en Asignacion.`,ENVIRONMENT.NULL));
    return new Exception("Semantico", "Variable No encontrada en Asignacion", symbol.getRow(), symbol.getColumn());
  }

  setEnvironment(environment){
    this.environment = environment;
  }

  getEnvironment(){
    return this.environment;
  }
}