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

  actualizarTabla(simbolo){
    var actualTable = this;
    while(actualTable != null){
      if(simbolo.id in actualTable.tabla){
        if(actualTable.tabla[simbolo.id].get_tipo() == simbolo.get_tipo()){
          actualTable.tabla[simbolo.id].set_valor(simbolo.get_valor())
          actualTable.tabla[simbolo.id].set_tipo(simbolo.get_tipo())
          return null
        }else{
          actualTable.tabla[simbolo.id].set_tipo(simbolo.get_tipo());
          actualTable.tabla[simbolo.id].set_valor(simbolo.get_valor());
          actualTable.tabla[simbolo.id].set_tipo(simbolo.get_tipo());
          return null
        }
      }else{
        actualTable = actualTable.anterior;
        if(actualTable === null){
          return null;
        }
      }
    }
    //Retornariamos un eror semantico
    return Exception("Semantico", "Variable No encontrada en Asignacion", simbolo.get_fila(), simbolo.get_columna(), datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
  }

  setEnvironment(environment){
    this.environment = environment;
  }

  getEnvironment(){
    return this.environment;
  }
}