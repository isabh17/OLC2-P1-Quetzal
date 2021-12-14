class DeclarationArray extends Instruction {
  constructor(type, identifier, listObjects, row, column) {
    super(row, column);
    this.type = type;
    this.identifier = identifier;
    this.listObjects = listObjects;
  }

  execute(tree, table) {
    if(this.listObjects === null){
      for(var parameter of this.identifier){
        var symbol = new Symbol(String(parameter), Type.ARRAY, [], this.row, this.column, null, this.type);
        var res = table.addSymbol(symbol);
        if (res instanceof Exception) return res;
      }
      return null;
    }else{
      this.listObjects.type = this.type;
      var result = this.listObjects.execute(tree, table);
      if (result instanceof Exception) return result;
      var symbol = new Symbol(String(this.identifier), Type.ARRAY, result, this.row, this.column, null, this.type);
      var res = table.addSymbol(symbol);
      if (res instanceof Exception) return res;
      return null;
    }
  }
}