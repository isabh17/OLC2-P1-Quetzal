class Declaration extends Instruction{
  constructor(type, identifier, expression, row, column){
    super(row, column);
    this.identifier = identifier;
    this.expression = expression;
    this.type = type;
  }

  execute(tree, table){
    if(typeof(this.identifier)==='string'){//Para declarar multiples variables
      var value = this.expression.execute(tree, table);
      if (value instanceof Exception) return value;
      if (this.type != this.expression.type){
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Los types de variables no concuerdan: "+String(this.type)+"!="+String(this.expression.type),ENVIRONMENT.NULL));
        return new Exception("Semantico", "Los types de variables no concuerdan: "+String(this.type)+"!="+String(this.expression.type), this.row, this.column);
      }
      if(this.type===Type.CHAR){
        value = String.fromCharCode(value);
      }
      var symbol = new Symbol(String(this.identifier), this.type, value, this.row, this.column, null, null);
      var res = table.addSymbol(symbol);
      if (res instanceof Exception) return res;
      TableReport.addTableSymbol(new NodeTableSymbols(this.row,this.column,String(this.identifier), this.type, tree.getEnvironment(),value));
      return null;
    }else{
      for(var variable of this.identifier){
        var value = "";
        if(this.type===Type.INT){
          value = 0;
        }else if(this.type===Type.DOUBLE){
          value = 0.0;
        }else if(this.type===Type.BOOLEAN){
          value = true;
        }else if(this.type===Type.STRING){
          value = "";
        }else if(this.type===Type.CHAR){
          value = '';
        }
        var symbol = new Symbol(String(variable), this.type, value, this.row, this.column, null, null);
        var res = table.addSymbol(symbol);
        if(res instanceof Exception) return res;
      }
      return null;
    }
  }
}