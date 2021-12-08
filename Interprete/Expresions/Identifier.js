class Identifier extends Instruction{
  constructor(identifier, row, column){
    super(row, column);    
    this.identifier = identifier;
    this.type = null;
  }

  execute(tree, table){
    var symbol = table.getSymbol(this.identifier);
    if (symbol == null){
      symbol = tree.getSymbol(this.identifier)
      if (symbol == null){
        return Exception("Semantico", "No se encontro la variable "+this.identifier+" declarada", this.fila, this.columna, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
      }else{
        this.tipo = symbol.tipo
        return symbol.getVariables();
      }
    }else{
        this.tipo = symbol.get_tipo()
        return symbol.get_valor();
    }
  }
}