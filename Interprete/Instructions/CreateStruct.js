class CreateStruct extends Instruction {
  constructor(structName, nameObject, structName2, parameters, row, column) {
    super(row, column);
    this.structName = structName;
    this.nameObject = nameObject;
    this.structName2 = structName2;
    this.parameters = parameters;
  }

  execute(tree, table) {
    //tree.addEnvironment("STRUCT");
    var result = tree.getStruct(this.structName);
    console.log(result);
    if (result == null) {
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "No existe un struct declarado con ese nombre: " + this.structName,ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "No existe un struct declarado con ese nombre: " + this.nombre, this.row, this.column);
    }
    if(String(this.structName) !== String(this.structName2) ){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "Estructura para creacion de struct invalida",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Estructura para creacion de struct invalida", this.row, this.column);
    }
    if (Object.keys(result.parameters).length !== this.parameters.length){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC), "El numero de parametros enviado no coincide con los que recibe el struct.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "El numero de parametros enviado no coincide con los que recibe el struct.", this.row, this.column);
    }
    var count = 0;
    var paramsList = {};
    for(var parameter in result.parameters){
      var value = this.parameters[count].execute(tree, table);
      if (value instanceof Exception){
        return value;
      }
      if ( (result.parameters[parameter].Type !== this.parameters[count].type) && (typeof(result.parameters[parameter].Type) === 'string' && this.parameters[count].type !== Type.NULL) && (typeof(result.parameters[parameter].Type) === 'string' && this.parameters[count].type !== Type.STRUCT)){
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Tipo de dato diferente en parametros de creacion del struct.",ENVIRONMENT.STRUCT));
        return new Exception("Semantico", "El parametro enviado no coincide con el que recibe el struct.", this.row, this.column);
      }
      var symbol = "";
      if(this.parameters[count].type === Type.STRUCT){
        if(String(this.parameters[count].typeObject) !== String(result.parameters[parameter].Type)){ // Si se quiere enviar un struct de tipo diferente al que se espera
          tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
          ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"El struct que se envia es de un tipo distinto al que se recibe.",ENVIRONMENT.STRUCT));
          return new Exception("Semantico", "El struct que se envia es de un tipo distinto al que se recibe.", this.row, this.column);
        }
        symbol = new Symbol(String(result.parameters[parameter].Identifier), Type.STRUCT, value, this.row, this.column , null, result.parameters[parameter].Type);
      }else{
        symbol = new Symbol(String(result.parameters[parameter].Identifier), result.parameters[parameter].Type, value, this.row, this.column , null, null);
      }
      paramsList[String(result.parameters[parameter].Identifier)] = symbol;
      count += 1;
    }
    var symbol = new Symbol(String(this.nameObject), Type.STRUCT, paramsList, this.row, this.column , null, String(this.structName));
    var result = table.addSymbol(symbol);
    if(result = null){
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),"Ya existe una variable o struct con este nombre.",ENVIRONMENT.STRUCT));
      return new Exception("Semantico", "Ya existe una variable o struct con este nombre.", this.row, this.column);
    }
    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
    //TableReport.addTableSymbol(new NodeTableSymbols(this.row,this.column,this.structName, this.type, tree.getEnvironment(),null));
    return null;
  }
}