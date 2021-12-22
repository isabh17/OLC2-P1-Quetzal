class Environment {
  constructor(prev) {
    this.prev = prev;
    this.size = 0;
    this.breakLbl = '';
    this.continueLbl = '';
    this.returnLbl = '';
    if (prev !== null) {
      this.size = this.prev.size;
      this.breakLbl = this.prev.breakLbl;
      this.continueLbl = this.prev.continueLbl;
      this.returnLbl = this.prev.returnLbl;
    }
    this.variables = {};
    this.functions = {};
    this.structs = {};
  }

  addVariable(id, type, heap, objectType = "") { 
    if (id in this.variables) {
      return null;
    } else {
      var newSymbol = new C3DSymbol(id, type, this.size, this.prev === null, heap, objectType);
      this.size += 1;
      this.variables[id] = newSymbol;
    }
    return this.variables[id];
  }

  saveFunc(name, funct) {
    this.functions[name] = funct;
  }

  getFunc(name) {
    var env = this;
    while (env != null) {
      if (name in env.functions) {
        return env.functions[name];
      }
      env = env.prev;
    }
    return null;
  }

  getVariable(id) {
    var env = this;
    while (env !== null) {
      if (id in env.variables) {
        return env.variables[id];
      }
      env = env.prev;
    }
    return null;
  }

  getGlobal() {
    env = this;
    while (env.prev != null) {
      env = env.prev;
    }
    return env;
  }
}