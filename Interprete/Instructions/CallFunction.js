class CallFunction extends Instruction{
  constructor(name, parameters, row, column){
    super(row, column);
    this.name = name;
    this.parameters = parameters;
    this.type = null;
  }
  
  execute(tree, table){
    var result = tree.getFunction(this.name);
    if (result === null){
      return new Exception("Semantico", "No existe una funcionn con ese name: " + this.name, this.row, this.column);
    }
    var newTable = new TableSymbols(tree.getGlobalTable());
    if (Object.keys(result.parameters).length === this.parameters.length){ //LA CANTIDAD DE parameters ES LA ADECUADA
      var count = 0;
      for(var parameter in result.parameters){ // SE OBTIENE EL VALOR DEL PARAMETRO EN LA LLAMADA
        var value = this.parameters[count].execute(tree, table);
        if (value instanceof Exception){
          //tree.removeAmbito();
          return value;
        }
        if (result.parameters[parameter].Type === this.parameters[count].type){  // VERIFICACION DE TIPO 
          var type = "";
          if (Number.isInteger(value)){
            type = Type.INT;
          }else if (Number.isInteger(value)===false && typeof(value)==='number'){
            type = Type.DOUBLE;
          }else if (typeof(value) === 'boolean'){
            type = Type.BOOLEAN;
          }else if (typeof(value) === 'string' && value.length === 1){
            type = Type.CHAR;
          }else if (typeof(value) === 'string'){
            type = Type.STRING;
          }
          var symbol = new Symbol(String(result.parameters[parameter].Identifier), type,  value, this.row, this.column, null);
          var resultTable = newTable.addSymbol(symbol);
          if (resultTable instanceof Exception){
            //tree.removeAmbito()
            return resultTable;
          }
        }else{
          //tree.removeAmbito()
          return new Exception("Semantico", "Tipo de dato diferente en parametros de la llamada.", this.row, this.column);
        }
        count += 1;
      }
    }else{
      //tree.removeAmbito()
      return new Exception("Semantico", "El numero de parametros enviado no coincide con los que recibe la funcion.", this.row, this.column);
    }
    var value = result.execute(tree, newTable);
    if (value instanceof Exception){
      //tree.removeAmbito()
      return value;
    }
    this.type = result.type;
    //tree.removeAmbito()
    return value;
  }
}