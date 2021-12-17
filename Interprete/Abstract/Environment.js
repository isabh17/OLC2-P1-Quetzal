class Environment {
  constructor(prev) {
    this.prev = prev;
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

  addVariable(id, type, heap, objectType = "") { //saveVar
    if (id in this.variables) {
      return null;
    } else {
      var newSymbol = new C3DSymbol(id, type, this.size, this.prev === null, heap, objectType);
      this.size += 1;
      this.variables[id] = newSymbol;
    }
    return this.variables[id];
  }

  saveFunc(idFunc, funct) {
    console.log(this.functions);
    if (idFunc in this.functions) {
      //console.log("Función repetida")
    } else {
      this.functions[idFunc] = funct;
    }
  }

  saveStruct(idStruct, attr) {
    if (idStruct in this.structs) {
      //console.log("Struct repetido");
    } else {
      this.structs[idStruct] = attr;
    }
  }

  getVariable(id) {//getVar
    var env = this;
    while (env !== null) {
      if (id in env.variables) {
        return env.variables[id];
      }
      env = env.prev;
    }
    return null;
  }

  getFunc(idFunc) {
    env = this
    while (env != None) {
      if (idFunc in env.functions) {
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