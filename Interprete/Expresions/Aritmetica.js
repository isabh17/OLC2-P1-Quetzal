class Aritmetica extends Instruction{
  constructor(operLeft, operator, operRight, row, column){
    super(row, column);
    this.operator = operator;
    this.operLeft = operLeft;
    this.operRight = operRight;
    this.type = null;
  }
  
  execute(tree, table){
    var left = this.operLeft.execute(tree, table);
    if (left instanceof Exception) return left;
    if (this.operRight != null){
      var right = this.operRight.execute(tree, table);
      if (right instanceof Exception) return right;
    }
    if (this.operator === ARITMETIC_OPERATOR.SUM){
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) + this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE || this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) + this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.CHAR || this.operLeft.type == Type.CHAR && this.operRight.type == Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) + this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE ){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) + this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.CHAR || this.operLeft.type == Type.CHAR && this.operRight.type == Type.DOUBLE){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) + this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.CHAR && this.operRight.type == Type.CHAR ){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) + this.getVal(this.operRight.type, right);
      }
      //ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipos erroneos en operación suma.`,ENVIROMMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos en operación suma."+this.operLeft.type+"!="+this.operRight.type, this.row, this.column);
    
    }else if (this.operator === ARITMETIC_OPERATOR.REST){
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) - this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE || this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) - this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) - this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE ){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) - this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.DOUBLE){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) - this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.CHAR && this.operRight.type === Type.CHAR ){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) - this.getVal(this.operRight.type, right);
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipos erroneos en operación resta.`,ENVIRONMENT.NULL));
      return new new Exception("Semantico", "Tipos erroneos en operación resta.", this.row, this.column);

    }else if (this.operator === ARITMETIC_OPERATOR.MULT){
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) * this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE || this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) * this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) * this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) * this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.DOUBLE){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) * this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type === Type.CHAR && this.operRight.type === Type.CHAR){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) * this.getVal(this.operRight.type, right);
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipos erroneos en operación multiplicación.`,ENVIRONMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos en operación multiplicación.", this.row, this.column);

    }else if (this.operator === ARITMETIC_OPERATOR.DIV){
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) / this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE || this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) / this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.INT){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) / this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) / this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.DOUBLE){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) / this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.CHAR && this.operRight.type === Type.CHAR){
        this.type = Type.DOUBLE;
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) / this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipos erroneos en operación división.`,ENVIRONMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos en operación división.", this.row, this.column);
      
    }else if (this.operator === ARITMETIC_OPERATOR.POT){
      if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) ^ this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE || this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) ^ this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.CHAR || this.operLeft.type == Type.CHAR && this.operRight.type == Type.INT){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) ^ this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) ^ this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.CHAR || this.operLeft.type == Type.CHAR && this.operRight.type == Type.DOUBLE){
        this.type = Type.DOUBLE;
        return this.getVal(this.operLeft.type, left) ^ this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.CHAR && this.operRight.type == Type.CHAR){
        this.type = Type.INT;
        return this.getVal(this.operLeft.type, left) ^ this.getVal(this.operRight.type, right);
      }else if (this.operLeft.type == Type.STRING && this.operRight.type == Type.INT){
        this.type = Type.STRING;
        var text = String(this.getVal(this.operLeft.type, left));
        var cant = this.getVal(this.operRight.type, right);
        var pr = "";
        for(let step= 0; step<cant; step++){
          pr+=text;
        }
        return pr;
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipos erroneos en operación potencia.`,ENVIRONMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos en operación potencia.", this.row, this.column);
      
    }else if (this.operator === ARITMETIC_OPERATOR.MOD){
      if (this.operLeft.type === Type.INT && this.operRight.type === Type.INT){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) % this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.DOUBLE || this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.INT){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) % this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.INT && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.INT){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) % this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.DOUBLE){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) % this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.DOUBLE && this.operRight.type === Type.CHAR || this.operLeft.type === Type.CHAR && this.operRight.type === Type.DOUBLE){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) % this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }else if (this.operLeft.type === Type.CHAR && this.operRight.type === Type.CHAR){
        if (this.getVal(this.operRight.type, right) === 0){
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`No es posible dividir entre cero`,ENVIRONMENT.NULL));
          return new Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
        }
        var result = this.getVal(this.operLeft.type, left) % this.getVal(this.operRight.type, right);
        Number.isInteger(result) ? this.type = Type.INT : this.type = Type.DOUBLE;
        return result;
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipos erroneos en operación división.`,ENVIRONMENT.NULL));
      return new Exception("Semantico", "Tipos erroneos en operación división.", this.row, this.column);
      
    
    }else if (this.operator === ARITMETIC_OPERATOR.UMENOS){
      if (this.operLeft.type == Type.INT){
        this.type = Type.INT;
        return - this.getVal(this.operLeft.type, left);
      }else if (this.operLeft.type == Type.DOUBLE){
        this.type = Type.DOUBLE;
        return - this.getVal(this.operLeft.type, left);
      }else if (this.operLeft.type == Type.CHAR){
        this.type = Type.INT;
        return - this.getVal(this.operLeft.type, left);
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Acción erronea en operator unario -.`,ENVIRONMENT.NULL));
      return new Exception("Semantico", "Acción erronea en operator unario -.", this.row, this.column);
    }
    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo de Operacion no Especificado.`,ENVIRONMENT.NULL));
    return new Exception("Semantico", "Tipo de Operacion no Especificado.", this.row, this.column);
  }

  getVal(type, value){
    if (type === Type.INT){
      return parseInt(value);
    }else if( type === Type.DOUBLE){
      return parseFloat(value);
    }else if( type === Type.BOOLEAN){
      return (JSON.parse(value)===true);
    }else if( type === Type.CHAR){
      return parseInt(value.charCodeAt(0));
    }
    return String(value);
  }
}
