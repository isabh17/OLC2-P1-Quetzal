class If extends Instruction {
  constructor(condition, instructionsIf, instructionsElse, row, column) {
    super(row, column);
    this.condition = condition;
    this.instructionsIf = instructionsIf;
    this.instructionsElse = instructionsElse;
  }

  execute(tree, table) {
    tree.addEnvironment("IF");
    var condition = this.condition.execute(tree, table);
    if (condition instanceof Exception) return condition;
    if (this.condition.type === Type.BOOLEAN) {
      if (String(condition) === 'true') {
        var newTable = new TableSymbols(table);
        if (this.instructionsIf[0] !== undefined) {
          for (var instrIF of this.instructionsIf) {
            var result = instrIF.execute(tree, newTable);
            if (result instanceof Exception) {
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              //tree.get_excepcion().append(result)
              //tree.update_consola(result.__str__())
            }
            if (result instanceof Break) {
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              return result;
            }
            if (result instanceof Return) {
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              return result;
            }
            if (result instanceof Continue){
              return result;
            }
          }
        } else {
          var result = this.instructionsIf.execute(tree, newTable);
          if (result instanceof Exception) {
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            //tree.get_excepcion().append(result)
            //tree.update_consola(result.__str__())
          }
          if (result instanceof Break) {
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            return result;
          }
          if (result instanceof Return) {
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            return result;
          }
          if (result instanceof Continue) return result;
        }
      } else {
        if (this.instructionsElse !== null) {
          var newTable = new TableSymbols(table);
          if (this.instructionsElse[0] !== undefined) {
            for (var instrElse of this.instructionsElse) {
              var result = instrElse.execute(tree, newTable);
              if (result instanceof Exception) {
                tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                //tree.get_excepcion().append(result)
                //tree.update_consola(result.__str__()) 
              }
              if (result instanceof Break) {
                tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                return result;
              }
              if (result instanceof Return) {
                tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                return result;
              }
              if (result instanceof Continue) return result;
            }
          } else {
            var result = this.instructionsElse.execute(tree, newTable);
            if (result instanceof Exception) {
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              //tree.get_excepcion().append(result)
              //tree.update_consola(result.__str__())
            }
            if (result instanceof Break) {
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              return result;
            }
            if (result instanceof Return) {
              tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
              return result;
            }
            if (result instanceof Continue) return result;
          }
        }
      }
    } else {
      tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
      ErrorList.addError(new ErrorNode(this.row,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La expresion a evaluar en el if debe devolver true o false`,ENVIRONMENT.IF));
      return new Exception("Semantico", "La expresion a evaluar en el if debe devolver true o false", this.row, this.column);
    }
    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
    return null;
  }

  compile(generator, env){
    return null;
  }
}