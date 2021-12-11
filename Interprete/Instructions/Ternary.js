class Ternary extends Instruction {
  constructor(condition, instructionsTrue, instructionsFalse, row, column) {
    super(row, column);
    this.condition = condition;
    this.instructionsTrue = instructionsTrue;
    this.instructionsFalse = instructionsFalse;
    this.type = null;
  }

  execute(tree, table) {
    var condition = this.condition.execute(tree, table);
    if (condition instanceof Exception) return condition;
    if (this.condition.type === Type.BOOLEAN) {
      if (String(condition) === 'true') {
        var result = this.instructionsTrue.execute(tree, table);
        if(result instanceof Exception) return result;
        this.type = this.instructionsTrue.type;
        return result;
      } else {
        var result = this.instructionsFalse.execute(tree, table);
        if(result instanceof Exception) return result;
        this.type = this.instructionsFalse.type;
        return result;
      }
    } else {
      //ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`La expresion a evaluar en el if debe devolver true o false`,ENVIROMMENT.IF));
      return new Exception("Semantico", "La expresion a evaluar en el if debe devolver true o false", this.row, this.column);
    }
    return null;
  }
}