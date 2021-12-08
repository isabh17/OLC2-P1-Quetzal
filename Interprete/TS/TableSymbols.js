class TableSymbols{
  constructor(previous = null, environment){
    this.table = {};
    this.previous = previous;
    this.struct = [];
    this.functions = [];
    this.environment = environment;
  }

  setTabla(simbolo){
    if(simbolo.id in this.tabla){
      //Error tipo exception
      /*return Exception("Semantico", "Variable " + simbolo.id + " ya existe", simbolo.fila, simbolo.columna, datetime.now().strftime('%Y-%m-%d %H:%M:%S'));*/
    }else{
      this.tabla[simbolo.id] = simbolo;
      return null;
    }
  }

  getTabla(id){
    var tablaActual = this;
    while(tablaActual.tabla != null){
      if (id in tablaActual.tabla){
        return tablaActual.tabla[id];
      }else{
        tablaActual = tablaActual.anterior;
        if(tablaActual === null){
          return null;
        }
      }
    }
    return null;
  }

  actualizarTabla(simbolo){
    var tablaActual = this;
    while(tablaActual != null){
      if(simbolo.id in tablaActual.tabla){
        if(tablaActual.tabla[simbolo.id].get_tipo() == simbolo.get_tipo()){
          tablaActual.tabla[simbolo.id].set_valor(simbolo.get_valor())
          tablaActual.tabla[simbolo.id].set_tipo(simbolo.get_tipo())
          return null
        }else{
          tablaActual.tabla[simbolo.id].set_tipo(simbolo.get_tipo());
          tablaActual.tabla[simbolo.id].set_valor(simbolo.get_valor());
          tablaActual.tabla[simbolo.id].set_tipo(simbolo.get_tipo());
          return null
        }
      }else{
        tablaActual = tablaActual.anterior;
        if(tablaActual === null){
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