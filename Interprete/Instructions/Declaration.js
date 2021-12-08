class Declaration extends Instruction{
  constructor(type, identifier, expression, row, column){
    super(row, column);
    this.identifier = identifier;
    this.expression = expression;
    this.type = type;
  }

  execute(tree, table){
    var value = this.expression.execute(tree, table);
    if (value instanceof Exception) return value;
    if (this.type != this.expression.type){
        return new Exception("Semantico", "Los types de variables no concuerdan: "+String(this.type)+"!="+String(this.expression.type));
    }
    var symbol = new Symbol(String(this.identifier),this.type, this.row, this.column, value, null);
    var res = table.addSymbol(symbol);
    if (res instanceof Exception) return res;
    return null;
  }
}