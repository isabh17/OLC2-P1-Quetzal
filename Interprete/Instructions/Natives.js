class Natives extends Instruction{
  constructor(name, parameters, row, column){
      super(row, column);  
      this.name = name;
      this.parameters = parameters;
      this.type = null;
  }
    
    execute(tree, table){
          if (this.name === 'log10'){
            if (this.parameters.length !== 1){
              return Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: log10", this.row, this.column);
            }
            var value = this.parameters[0].execute(tree, table);
            if(typeof(value)!=='number'){
              return Exception("Semantico", "El value del logaritmo debe ser de tipo numerico", this.row, this.column);
            }
            var result = Math.log10(value);
            if (Number.isInteger(result)){
              this.type = Type.INT;
            }else if(Number.isInteger(result)===false && typeof(result)==='number'){
              this.type = Type.DOUBLE;
            }
            return result;
          }else if (this.name === 'sin' || this.name === 'cos' || this.name === 'tan'  || this.name == 'sqrt'){
            if (this.parameters.length !== 1){
                return new Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: "+this.name, this.row, this.column);
            }
            var value = this.parameters[0].execute(tree, table)
            if(typeof(value)!=='number'){
              return Exception("Semantico", "El value del logaritmo debe ser de tipo numerico", this.row, this.column);
            }
            var result = 0;
            if (this.name === 'sin'){
              result = Math.sin((value*180)/3.1416);
            }else if (this.name === 'cos' ){
              result = Math.cos((value*180)/3.1416);
            }else if (this.name === 'tan'){
              result = Math.tan((value*180)/3.1416);
            }else if (this.name === 'sqrt'){
              result = Math.sqrt(value);
            }
            if (Number.isInteger(result)){
              this.type = Type.INT;
            }else if (Number.isInteger(result)===false && typeof(result)==='number'){
              this.type = Type.DOUBLE;
            }
            return result;
          }/*else if (this.name === 'string'){
            if len(this.parameters) != 1:
                return Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: "+this.name, this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            valor = this.parameters[0].execute(tree, table)
            result = str(valor)
            this.tipo = Tipo.STRING
            return result
        
          }else if (this.name == 'uppercase' || this.name == 'lowercase'){
            if len(this.parameters) != 1:
                return Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: "+this.name, this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            valor = this.parameters[0].execute(tree, table)
            if type(valor) != str:
                return Exception("Semantico", "Solo se permite hacer uppercase/lowercase a STRING", this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            if this.name == "uppercase":
                result = valor.upper()
            else if this.name == "lowercase":
                result = valor.lower()
            this.tipo = Tipo.STRING
            return result
          }else if (this.name === 'typeof'){
            if len(this.parameters) != 1:
                return Exception("Semantico", "Solo se admite 1 parameters en funcion nativa: "+this.name, this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            valor = this.parameters[0].execute(tree, table)
            result = ""
            if type(valor) == int:
                result = "Int64"
                this.tipo = Tipo.INT64
            else if type(valor) == float:
                result = "Float64"
                this.tipo = Tipo.FLOAT64
            else if type(valor) == bool:
                result = "Boolean"
                this.tipo = Tipo.BOOLEANO
            else if type(valor) == str and len(valor) == 1:
                result = "Char"
                this.tipo = Tipo.CHAR
            else if type(valor) == str:
                result = "String"
                this.tipo = Tipo.STRING
            if result == "":
                return Exception("Semantico", "No se encontro referencia al parametro en funcion nativa:  "+this.name, this.row, this.column, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            return result
          }*/
  }
}
