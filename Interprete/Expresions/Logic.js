class Logic extends Instruction{
  constructor( operLeft, operator, operRight, row, column){
    super(row, column);  
    this.operator = operator;
    this.operLeft = operLeft;
    this.operRight = operRight;
    this.type = Type.BOOLEAN;
  }

  execute(tree, table){
    var left = this.operLeft.execute(tree, table);
    if (left instanceof Exception) return left;
    if ( this.operRight != null){
      var right = this.operRight.execute(tree, table);
      if ( right instanceof Exception) return right;
    }
    
    if ( this.operator === LOGIC_OPERATOR.OR){
        if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
          return this.getVal(this.operLeft.type, left) || this.getVal(this.operRight.type, right);
        }
        return Exception("Semantico", "Tipo Erroneo de operacion para ||.", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    }else if ( this.operator === LOGIC_OPERATOR.AND){
        if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
          return this.getVal(this.operLeft.type, left) && this.getVal(this.operRight.type, right);
        }
        return Exception("Semantico", "Tipo Erroneo de operacion para &&.", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    }else if ( this.operator === LOGIC_OPERATOR.NOT){
        if ( this.operLeft.type === Type.BOOLEAN){
          return ! this.getVal(this.operLeft.type, left);
        }
        return Exception("Semantico", "Tipo Erroneo de operacion para !.", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    }
    return Exception("Semantico", "Tipo de Operacion no Especif (icado.", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
  }
    
  getVal(type, value){
    if (type === Type.INT){
      return parseInt(value);
    }else if( type === Type.DOUBLE){
      return parseFloat(value);
    }else if(type === Type.BOOLEAN){
      return Boolean(value);
    }else if(type === Type.CHAR){
      return parseInt(value.charCodeAt(0));
    }
    return String(value);
  }
}