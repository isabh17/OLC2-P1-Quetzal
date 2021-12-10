class Primitive extends Instruction{
  constructor(type, value, row, column){
    super(row,column);
    this.type = type;
    this.value = value;
  }

  execute(tree, table){
    return this.getVal(this.type, this.value);
  }
  
  getVal(type, value){
    if (type === Type.INT){
      return parseInt(value);
    }else if( type === Type.DOUBLE){
      return parseFloat(value);
    }else if( type === Type.BOOLEAN){
      return Boolean(value);
    }else if( type === Type.CHAR){
      return parseInt(value.charCodeAt(0));
    }
    return String(value);
  }
}