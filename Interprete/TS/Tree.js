class Tree{
  constructor(instructions){
    this.instructions = instructions;
    this.functions = [];
    this.structTemplates = [];
    this.out = "";
    this.environment = ["Global"];
    this.variables = [];
    this.globalTable = null;
  }

  getInstructions(){ 
    return this.instructions;
  }
  
  setInstruccions(instructions){
    this.instructions = instructions;
  }

  getOut(){
    return this.out;
  }
  
  setConsole(out){
    this.out = out;
  }
  
  updateOut(text){
    this.out += text;
  }

  getGlobalTable(){
    return this.globalTable;
  }
  
  setGlobalTable(globalTable){
    this.globalTable = globalTable;
  }

  addFunction(funct){
    this.functions.push(funct);
  }

  getFunctions(){
    return this.functions;
  }

  getFunction(name){
    for(var funct of this.functions){
      if(funct.name === name){
        return funct;
      }
    }
    return null;
  }
  
  addStruct(struct){
    this.structTemplates.push(struct);
  }

  getStructs(){
    return this.structTemplates;
  }

  getStruct(name){
    for(var struct of this.structTemplates){
      if(struct.name === name){
        return struct;
      }
    }
    return null;
  }

  addVariable(variable){
    this.variables.push(variable);
  }

  getVariables(){
    return this.variables;
  }

  get(){
    return this.environment;
  }
  getEnvironment(){
    return this.environment[this.environment.length-1];
  }

  addEnvironment(environment){
    this.environment.push(environment);
  }

  removeEnvironment(){
    this.environment.pop();
  }
}