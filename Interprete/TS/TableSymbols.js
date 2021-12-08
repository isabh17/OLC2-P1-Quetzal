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
      return Exception("Semantico", "Variable " + symbol.id + " ya existe", symbol.row, symbol.column);
    }else{
      this.table[symbol.id] = symbol;
      return null;
    }
  }

  getSymbol(id){//getTabla
    var actualTable = this;
    while(actualTable.table != null){
      if (id in actualTable.table){
        return actualTable.table[id];
      }else{
        actualTable = actualTable.anterior;
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
          return new Exception("Semantico", "No se puede asignar tipos distintos a las variables", symbol.getRow(), symbol.getColumn());
        }
      }else{
        actualTable = actualTable.previous;
        if(actualTable === null){
          return null;
        }
      }
    }
    //Retornariamos un eror semantico
    return new Exception("Semantico", "Variable No encontrada en Asignacion", symbol.getRow(), symbol.getColumn());
  }

  setEnvironment(environment){
    this.environment = environment;
  }

  getEnvironment(){
    return this.environment;
  }
}