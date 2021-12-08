class Relational extends Instruction{
  constructor(operLeft, operator, operRight, row, column){
    super(row, column);  
    this.operator = operator;
    this.operLeft = operLeft;
    this.operRight = operRight;
    this.type = Type.BOOLEAN;
  }

  execute(tree, table){
    var left = this.operLeft.execute(tree, table);
    if (left instanceof Exception) return left;
    var right = this.operRight.execute(tree, table);
    if (right instanceof Exception) return right;
        
    if (this.operator === RELATIONAL_OPERATOR.IDENT){
      // INT
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      //DOUBLE
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      //BOOLEAN
      }else if (this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      // CHAR
      }else if (this.operLeft.type === Type.CHAR && this.operRight.type === Type.CHAR){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      //STRING
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) === this.getVal(this.operRight.type, right);
      // NULL
      }else if (this.operLeft.type === Type.NULL && this.operRight.type === Type.NULL){
        return true;
      }else if (this.operLeft.type === Type.NULL){
        return false;
      }else if (this.operRight.type === Type.NULL){
        return false;
      }
      console.log("Tipo Erroneo de operacion para ===.");
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo Erroneo de operacion para ===`,table.getEnvironment()));
      //return Exception("Semantico", "Tipo Erroneo de operacion para ===.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))

    }else if (this.operador === RELATIONAL_OPERATOR.DIFERENT){
      // INT
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      // DOUBLE
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      // BOOLEAN
      }else if (this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      // CHAR
      }else if (this.operLeft.type === Type.CHAR && this.operRight.type === Type.CHAR){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      // STRING
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) != str(this.getVal(this.operRight.type, right));
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.STRING && this.operRight.type === Type.STRING){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.NULL || this.operRight.type === Type.NULL){
        return this.getVal(this.operLeft.type, left) != this.getVal(this.operRight.type, right);
      // NULL
      }else if (this.operLeft.type === Type.NULL && this.operRight.type === Type.NULL){
        return false;
      }else if (this.operLeft.type === Type.NULL){
        return true;
      }else if (this.operRight.type === Type.NULL){
        return true;
      }
      console.log("Tipo Erroneo de operacion para !=.");
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo Erroneo de operacion para =!.`,table.getEnvironment()));
      //return Exception("Semantico", "Tipo Erroneo de operacion para =!.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))
    }else if ( this.operador === RELATIONAL_OPERATOR.MENQ){
      // INT
      if ( this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) < this.getVal(this.operRight.type, right);
      }else if ( this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) < this.getVal(this.operRight.type, right);
      // DOUBLE
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) < this.getVal(this.operRight.type, right);
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) < this.getVal(this.operRight.type, right);
      // BOOLEAN
      }else if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) < this.getVal(this.operRight.type, right);
      }
      console.log("Tipo Erroneo de operacion para <.");
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo Erroneo de operacion para <.`,table.getEnvironment()));
      //return Exception("Semantico", "Tipo Erroneo de operacion para <.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))

    }else if ( this.operador === RELATIONAL_OPERATOR.MAYQ){
      // INT
      if ( this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) > this.getVal(this.operRight.type, right);
      }else if ( this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) > this.getVal(this.operRight.type, right);
      // DOUBLE
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) > this.getVal(this.operRight.type, right);
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) > this.getVal(this.operRight.type, right);
      // BOOLEAN
      }else if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) > this.getVal(this.operRight.type, right);
      }
      console.log("Tipo Erroneo de operacion para >.");
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo Erroneo de operacion para >.`,table.getEnvironment()));
      //return Exception("Semantico", "Tipo Erroneo de operacion para >.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))
        
    }else if ( this.operador === RELATIONAL_OPERATOR.MENEQ){
      // INT
      if ( this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) <= this.getVal(this.operRight.type, right);
      }else if ( this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) <= this.getVal(this.operRight.type, right);
      // DOUBLE
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) <= this.getVal(this.operRight.type, right);
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) <= this.getVal(this.operRight.type, right);
      // BOOLEAN
      }else if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) <= this.getVal(this.operRight.type, right);
      }
      console.log("Tipo Erroneo de operacion para <=.");
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo Erroneo de operacion para <=.`,table.getEnvironment()));
      //return Exception("Semantico", "Tipo Erroneo de operacion para <=.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))
        
    }else if ( this.operador === RELATIONAL_OPERATOR.MAYEQ){
      // INT
      if ( this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) >= this.getVal(this.operRight.type, right)
      }else if ( this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) >= this.getVal(this.operRight.type, right)
      // DOUBLE
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        return this.getVal(this.operLeft.type, left) >= this.getVal(this.operRight.type, right)
      }else if ( this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        return this.getVal(this.operLeft.type, left) >= this.getVal(this.operRight.type, right)
      // BOOLEAN
      }else if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
        return this.getVal(this.operLeft.type, left) >= this.getVal(this.operRight.type, right)
      }
      console.log("Tipo Erroneo de operacion para >=.");
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo Erroneo de operacion para >=.`,table.getEnvironment()));
      //return Exception("Semantico", "Tipo Erroneo de operacion para >=.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))
    }
    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo de Operacion no Especificado.`,table.getEnvironment()));
    return Exception("Semantico", "Tipo de Operacion no Especificado.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))
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