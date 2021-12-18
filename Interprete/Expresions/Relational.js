class Relational extends Instruction{
  constructor(operLeft, operator, operRight, row, column){
    super(row, column);  
    this.operator = operator;
    this.operLeft = operLeft;
    this.operRight = operRight;
    this.type = Type.BOOLEAN;
    this.trueLbl = '';
    this.falseLbl = '';
    this.structType = '';
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
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo Erroneo de operacion para ===."+this.operLeft.type+" "+this.operRight.type, ENVIRONMENT.NULL));
      return Exception("Semantico", "Tipo Erroneo de operacion para ==."+this.operLeft.type+" "+this.operRight.type, this.row, this.column)
    }else if (this.operator === RELATIONAL_OPERATOR.DIFFERENT){
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
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo Erroneo de operacion para ===."+this.operLeft.type+" "+this.operRight.type, ENVIRONMENT.NULL));
      return Exception("Semantico", "Tipo Erroneo de operacion para !=."+this.operLeft.type+" "+this.operRight.type, this.row, this.column)
    }else if ( this.operator === RELATIONAL_OPERATOR.MENQ){
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
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo Erroneo de operacion para ===."+this.operLeft.type+" "+this.operRight.type, ENVIRONMENT.NULL));
      return Exception("Semantico", "Tipo Erroneo de operacion para <."+this.operLeft.type+" "+this.operRight.type, this.row, this.column)
    }else if ( this.operator === RELATIONAL_OPERATOR.MAYQ){
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
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo Erroneo de operacion para ===."+this.operLeft.type+" "+this.operRight.type, ENVIRONMENT.NULL));
      return Exception("Semantico", "Tipo Erroneo de operacion para >."+this.operLeft.type+" "+this.operRight.type, this.row, this.column)
    }else if ( this.operator === RELATIONAL_OPERATOR.MENEQ){
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
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo Erroneo de operacion para ===."+this.operLeft.type+" "+this.operRight.type, ENVIRONMENT.NULL));
      return Exception("Semantico", "Tipo Erroneo de operacion para <=."+this.operLeft.type+" "+this.operRight.type, this.row, this.column)  
    }else if ( this.operator === RELATIONAL_OPERATOR.MAYEQ){
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
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo Erroneo de operacion para >=.`,ENVIRONMENT.NULL));
      //return Exception("Semantico", "Tipo Erroneo de operacion para >=.", this.row, this.column,  datetime.now().strftime('%Y-%m-%d %H){%M){%S'))
    }
    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo de Operacion no Especificado.`,ENVIRONMENT.NULL));
    return new Exception("Semantico", "Tipo de Operacion no Especificado.", this.row, this.column)
  }
  
  getVal(type, value){
    if (type === Type.INT){
      return parseInt(value);
    }else if( type === Type.DOUBLE){
      return parseFloat(value);
    }else if(type === Type.BOOLEAN){
      return (JSON.parse(value)===true);
    }else if(type === Type.CHAR){
      return parseInt(value.charCodeAt(0));
    }
    return String(value);
  }

  compile(generator, env){
    generator.addComment("INICIO EXPRESION RELACIONAL");
    var left = this.operLeft.compile(generator, env);
    var right = null;
    var result = new C3DReturn(null, Type.BOOLEAN, false);
    if (left.type !== Type.BOOLEAN){
      right = this.operRight.compile(generator, env);
      if ( (left.type === Type.INT || left.type === Type.DOUBLE) && (right.type === Type.INT || right.type === Type.DOUBLE) ){
        this.checkLabels(generator);
        generator.addIf(left.value, right.value, this.getOp(), this.trueLbl);
        generator.addGoto(this.falseLbl);
      }else if (left.type === Type.STRING && right.type === Type.STRING){
        console.log("Comparacion de cadenas");     // Únicamente se puede con igualdad o desigualdad
      }
    }else{
        gotoRight = generator.newLabel();
        leftTemp = generator.addTemp();

        generator.putLabel(left.trueLbl);
        generator.addExp(leftTemp, '1', '', '');
        generator.addGoto(gotoRight);

        generator.putLabel(left.falseLbl);
        generator.addExp(leftTemp, '0', '', '');

        generator.putLabel(gotoRight);

        right = this.right.compile(generator, env);
        if (right.type != Type.BOOLEAN){
          console.log("Error, no se pueden comparar");
          return;
        }
        gotoEnd = generator.newLabel();
        rightTemp = generator.addTemp();

        generator.putLabel(right.trueLbl);
        
        generator.addExp(rightTemp, '1', '', '');
        generator.addGoto(gotoEnd);

        generator.putLabel(right.falseLbl);
        generator.addExp(rightTemp, '0', '', '');

        generator.putLabel(gotoEnd);

        this.checkLabels();
        generator.addIf(leftTemp, rightTemp, this.getOp(), this.trueLbl);
        generator.addGoto(this.falseLbl);
    }
    generator.addComment("FIN DE EXPRESION RELACIONAL");
    generator.addSpace();
    result.trueLbl = this.trueLbl;
    result.falseLbl = this.falseLbl;
    return result;
  }

  checkLabels(generator){
    if (this.trueLbl === ''){
      this.trueLbl = generator.newLabel();
    }
    if (this.falseLbl === ''){
      this.falseLbl = generator.newLabel();
    }
  }

  getOp(){
    if (this.operator === RELATIONAL_OPERATOR.MAYQ){
        return '>';
    }else if( this.operator === RELATIONAL_OPERATOR.MENQ){
        return '<';
    }else if( this.operator === RELATIONAL_OPERATOR.MAYEQ){
        return '>=';
    }else if( this.operator === RELATIONAL_OPERATOR.MENEQ){
        return '<=';
    }else if( this.operator === RELATIONAL_OPERATOR.IDENT){
        return '==';
    }else if( this.operator === RELATIONAL_OPERATOR.DIFFERENT){
        return '!=';
    }
  }
}