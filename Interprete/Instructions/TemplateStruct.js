class TemplateStruct extends Instruction {
  constructor(name, parameters, row, column) {
    super(row, column);
    this.name = name;
    this.parameters = parameters;
  }

  execute(tree, table) {
    return null;
  }
}

/*if (this.parameters.length !== params.length) {
  return new Exception("Semantico", "La cantidad de parameters no coincide al crear el struct", this.row, this.column);
}
var contador = 0;
var temp = new Struct(this.tipo, str(name_struct), row, column);
for (var expresion of params) {
  var resultExpresion = expresion.execute(tree, table);
  if (resultExpresion instanceof Exception) return resultExpresion;
  if (this.parameters[contador]["tipoDato"] == any) {
    temp.agregarVariable({ "tipoDato": any, "identificador": str(this.parameters[contador]['identificador']), "valor": resultExpresion })
  } else if (this.parameters[contador]["tipoDato"] == expresion.tipo) {
    temp.agregarVariable({ "tipoDato": expresion.tipo, "identificador": str(this.parameters[contador]['identificador']), "valor": resultExpresion })
  } else {
    return new Exception("Semantico", "Tipo de dato diferente en parameters de la llamada.", this.row, this.column);
  }
  contador += 1;
}
return temp;*/