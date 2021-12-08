class Assignation extends Instruction{
  constructor(identifier, expression, row, column){
    super(row, column);
    this.identifier = identifier;
    this.expression = expression;
    this.type = null;
  }

  execute(tree, table){
    var value = this.expression.execute(tree, table);
    if (value instanceof Exception) return value;
    var symbol = table.getSymbol(this.identifier);
    if (symbol === null){
      return new Exception("Semantico", "La variable "+this.identifier+" no existe");
    }
    if (symbol.getType() !== this.expression.type){
        return new Exception("Semantico", "Los tipos de variables no concuerdan: "+String(symbol.getType())+"!="+String(this.expression.type));
    }
    symbol = new Symbol(symbol.getId(), this.expression.type, value, symbol.getRow(), symbol.getColumn(), null);
    var res = table.updateValueSymbol(symbol);
    if (res instanceof Exception) return res;
    return null;
  }
}