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

      if (this.operator === ARITMETIC_OPERATOR.SUM){
        if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
          this.type = Type.INT
          return this.returnVal(this.operLeft.type, left) + this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) + this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) + this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) + this.returnVal(this.operRight.type, right);
        }
        return Exception("Semantico", "Tipos erroneos en operación suma.", this.row, this.column);
      
      }else if (this.operator === ARITMETIC_OPERATOR.REST){
        if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
            this.type = Type.INT
            return this.returnVal(this.operLeft.type, left) - this.returnVal(this.operRight.type, right)
        }else if(this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE){
            this.type = Type.DOUBLE
            return this.returnVal(this.operLeft.type, left) - this.returnVal(this.operRight.type, right)
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
            this.type = Type.DOUBLE
            return this.returnVal(this.operLeft.type, left) - this.returnVal(this.operRight.type, right) 
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
            this.type = Type.DOUBLE
            return this.returnVal(this.operLeft.type, left) - this.returnVal(this.operRight.type, right) 
        }
        return Exception("Semantico", "Tipos erroneos en operación resta.", this.row, this.column);

      }else if (this.operator === ARITMETIC_OPERATOR.MULT){
        if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
          this.type = Type.INT;
          return this.returnVal(this.operLeft.type, left) * this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) * this.returnVal(this.operRight.type, right);
        }else if (his.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) * this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) * this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.STRING && this.operRight.type == Type.STRING){
          this.type = Type.STRING;
          var res = this.returnVal(this.operLeft.type, left)
          res += this.returnVal(this.operRight.type, right)
          return res;
        }
        return Exception("Semantico", "Tipos erroneos en operación multiplicación.", this.row, this.column);

      }else if (this.operator === ARITMETIC_OPERATOR.DIV){
        if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) / this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) / this.returnVal(this.operRight.type, right)
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) / this.returnVal(this.operRight.type, right)
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible dividir entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) / this.returnVal(this.operRight.type, right);
        }
        return Exception("Semantico", "Tipos erroneos en operación división.", this.row, this.column);
        
      }else if (this.operator === ARITMETIC_OPERATOR.POTENCIA){
        if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
          this.type = Type.INT;
          return this.returnVal(this.operLeft.type, left) ** this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) ** this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) ** this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return this.returnVal(this.operLeft.type, left) ** this.returnVal(this.operRight.type, right);
        }
        return Exception("Semantico", "Tipos erroneos en operación potencia.", this.row, this.column);
        
      }else if (this.operator === ARITMETIC_OPERATOR.MODULO){
        if (this.operLeft.type == Type.INT && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible mod entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) % this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.INT && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible mod entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) % this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.INT){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
            return Exception("Semantico", "No es posible mod entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) % this.returnVal(this.operRight.type, right);
        }else if (this.operLeft.type == Type.DOUBLE && this.operRight.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          if (this.returnVal(this.operRight.type, right) == 0){
              return Exception("Semantico", "No es posible mod entre cero", this.row, this.column);
          }
          return this.returnVal(this.operLeft.type, left) % this.returnVal(this.operRight.type, right);
        }
        return Exception("Semantico", "Tipos erroneos en operación modulo.", this.row, this.column);

      }else if (this.operator === ARITMETIC_OPERATOR.UMENOS){
        if (this.operLeft.type == Type.INT){
          this.type = Type.INT;
          return - this.returnVal(this.operLeft.type, left);
        }else if (this.operLeft.type == Type.DOUBLE){
          this.type = Type.DOUBLE;
          return - this.returnVal(this.operLeft.type, left);
        }
        return Exception("Semantico", "Acción erronea en operator unario -.", this.row, this.column);
      }
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumType.SEMANTIC),`Tipo de Operacion no Especificado.`,table.getEnvironment()));
      return Exception("Semantico", "Tipo de Operacion no Especificado.", this.row, this.column);
    }
  }

  returnVal(type, val){
    if (type == Type.INT){
      return parseInt(val);
    }else if( type == Type.DOUBLE){
      return parseFloat(val);
    }else if(type == Type.BOOLEANO){
      return Boolean(val);
    }
    return String(val);
  }
}