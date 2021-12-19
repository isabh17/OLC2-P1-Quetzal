class Logic extends Instruction{
  constructor( operLeft, operator, operRight, row, column){
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
    var right;
    if (left instanceof Exception) return left;
    if ( this.operRight != null){
      right = this.operRight.execute(tree, table);
      if ( right instanceof Exception) return right;
    }
    if ( this.operator === LOGIC_OPERATOR.OR){
        if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
          return this.getVal(this.operLeft.type, left) || this.getVal(this.operRight.type, right);
        }
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo Erroneo de operacion para ||.`,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Tipo Erroneo de operacion para ||.", this.row, this.column )
    }else if ( this.operator === LOGIC_OPERATOR.AND){
        if ( this.operLeft.type === Type.BOOLEAN && this.operRight.type === Type.BOOLEAN){
          return this.getVal(this.operLeft.type, left) && this.getVal(this.operRight.type, right);
        }
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo Erroneo de operacion para &&.`,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Tipo Erroneo de operacion para &&.", this.row, this.column )
    }else if ( this.operator === LOGIC_OPERATOR.NOT){
        if ( this.operLeft.type === Type.BOOLEAN){
          return ! this.getVal(this.operLeft.type, left);
        }
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo Erroneo de operacion para !.`,ENVIRONMENT.NULL));
        return new Exception("Semantico", "Tipo Erroneo de operacion para !.", this.row, this.column )
    }
    ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`Tipo de Operacion no Especificado.`,ENVIRONMENT.NULL));
    return new Exception("Semantico", "Tipo de Operacion no Especificado.", this.row, this.column )
  }
    
  getVal(type, value){
    if (type === Type.INT){
      return parseInt(value);
    }else if( type === Type.DOUBLE){
      return parseFloat(value);
    }else if(type === Type.BOOLEAN){
      if(value === true){
        return true;
      }else{
        return false;
      }
      //return (JSON.parse(value)===true);
    }else if(type === Type.CHAR){
      return parseInt(value.charCodeAt(0));
    }
    return String(value);
  }

  compile(generator, env){
    generator.addComment("INICIO EXPRESION LOGICA");

    this.checkLabels(generator);
    var lblAndOr = '';

    if (this.operator === LOGIC_OPERATOR.AND){
      lblAndOr = this.operLeft.trueLbl = generator.newLabel();
      this.operRight.trueLbl = this.trueLbl;
      this.operLeft.falseLbl = this.operRight.falseLbl = this.falseLbl;
    }else if( this.operator === LOGIC_OPERATOR.OR ){
      this.operLeft.trueLbl = this.operRight.trueLbl = this.trueLbl;
      lblAndOr = this.operLeft.falseLbl = generator.newLabel();
      this.operRight.falseLbl = this.falseLbl;
    }else{
      var ret = new C3DReturn(null, Type.BOOLEAN, false);
      ret.trueLbl = this.falseLbl;
      ret.falseLbl = this.trueLbl;
      return ret;
    }
    var left = this.operLeft.compile(generator, env);
    if (left.type !== Type.BOOLEAN){
      console.log("No se puede utilizar en expresion booleana");
      return null;
    }
    generator.putLabel(lblAndOr)
    var right = this.operRight.compile(generator, env);
    if (right.type !== Type.BOOLEAN){
      console.log("No se puede utilizar en expresion booleana");
      return null;
    }
    generator.addComment("FINALIZO EXPRESION LOGICA");
    generator.addSpace();
    var ret = new C3DReturn(null, Type.BOOLEAN, false);
    ret.trueLbl = this.trueLbl;
    ret.falseLbl = this.falseLbl;
    return ret;
  }

  checkLabels(generator){
    if (this.trueLbl === ''){
      this.trueLbl = generator.newLabel();
    }
    if (this.falseLbl === ''){
      this.falseLbl = generator.newLabel();
    }
  }
}