class Identifier extends Instruction{
  constructor(identifier, row, column){
    super(row, column);    
    this.identifier = identifier;
    this.type = null;
  }

  execute(tree, table){
    var symbol = table.getSymbol(this.identifier);
    if (symbol === null){
      return Exception("Semantico", "No se encontro la variable "+this.identifier+" declarada", this.fila, this.columna);
    }else{
        this.type = symbol.getType();
        return symbol.getValue();
    }
  }
}
