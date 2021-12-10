class Tree{
  constructor(instructions){
    this.instructions = instructions;
    this.functions = [];
    this.out = "";
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
}