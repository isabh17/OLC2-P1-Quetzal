class Environment {
  constructor(prev) {
    this.prev = prev;
    // NUEVO
    this.size = 0;
    this.breakLbl = '';
    this.continueLbl = '';
    this.returnLbl = '';
    if (prev != null) {
      this.size = this.prev.size;
      this.breakLbl = this.prev.breakLbl;
      this.continueLbl = this.prev.continueLbl;
      this.returnLbl = this.prev.returnLbl;
    }
    this.variables = {};
    this.functions = {};
    this.structs = {};
  }

  saveVar(idVar, symType, inHeap, structType = "") {
    if (idVar in this.variables.keys()) {
      console.log("Variable ya existe")
    } else {
      newSymbol = Symbol(idVar, symType, this.size, this.prev == None, inHeap, structType)
      this.size += 1
      this.variables[idVar] = newSymbol;
    }
    return this.variables[idVar];
  }

  saveFunc(idFunc, funct) {
    if (idFunc in this.functions.keys()) {
      console.log("Función repetida")
    } else {
      this.functions[idFunc] = funct;
    }
  }

  saveStruct(idStruct, attr) {
    if (idStruct in this.structs.keys()) {
      console.log("Struct repetido");
    } else {
      this.structs[idStruct] = attr;
    }
  }

  getVar(idVar) {
    env = this;
    while (env != null) {
      if (idVar in env.variables.keys()) {
        return env.variables[idVar];
      }
      env = env.prev;
    }
    return null;
  }

  getFunc(idFunc) {
    env = this
    while (env != None) {
      if (idFunc in env.functions.keys()) {
        return env.functions[idFunc];
      }
      env = env.prev;
    }
    return None
  }

  getStruct(idStruct) {
    env = this;
    while (env != null) {
      if (idStruct in env.structs.keys()) {
        return env.structs[idStruct];
      }
      end = end.prev;
    }
    return None;
  }

  getGlobal() {
    env = this;
    while (env.prev != null) {
      env = env.prev;
    }
    return env;
  }
}