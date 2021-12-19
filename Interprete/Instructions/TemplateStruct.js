class TemplateStruct extends Instruction {
  constructor(name, parameters, row, column) {
    super(row, column);
    this.name = name;
    this.parameters = parameters;
  }

  execute(tree, table) {    
    return null;
  }

  compile(generator, env){
    return null;
  }
}