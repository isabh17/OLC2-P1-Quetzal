class Tree{
  constructor(instruction){
    this.instruction = instruction;
    this.functions = [];
    this.out = "";
    this.globalTable = null;
  }

  getInstruction(){ 
    return this.instruction;
  }
  
  setInstruccion(instruction){
    this.instruction = instruction;
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
}