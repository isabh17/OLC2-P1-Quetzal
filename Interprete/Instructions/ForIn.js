class ForIn extends Instruction {
    constructor(identifier, expression, instructions, row, column) {
        super(row, column);
        this.identifier = identifier;
        this.expression = expression;
        this.instructions = instructions; //[]
    }

    execute(tree, table) {
        tree.addEnvironment("FOR-IN");
        if (this.expression instanceof ListObjects || this.expression instanceof RangeArray) {
            return this.execForArray(tree, table);
        } else {
            return this.normalExec(tree, table);
        }
    }

    execForArray(tree, table) {
        var newTable = new TableSymbols(table);
        var listValues = this.expression.execute(tree, table);
        if (listValues instanceof Exception) return listValues;
        var symbol = new Symbol(String(this.identifier), this.expression.type, listValues[0], this.row, this.column, null, null);
        var value = newTable.addSymbol(symbol);
        for (let index of listValues) {
            symbol = new Symbol(symbol.getId(), symbol.getType(), index, symbol.getRow(), symbol.getColumn(), null, null);
            let res = newTable.updateValueSymbol(symbol);
            if (res instanceof Exception) {
                tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                return res;
            }
            for (var instruction of this.instructions) {
                var result = instruction.execute(tree, newTable);
                if (result instanceof Exception) {
                    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                    return result;
                }
                if (result instanceof Break) {
                    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                    return null;
                }
                if (result instanceof Return) {
                    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                    return result;
                }
                if (result instanceof Continue) return result;
            }
        }
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return null;
    }

    normalExec(tree, table) {
        var newTable = new TableSymbols(table);
        var value = this.expression.execute(tree, table);
        if (this.expression.type !== Type.STRING) {
            tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
            ErrorList.addError(new ErrorNode(this.row, this.column, new ErrorType(EnumErrorType.SEMANTIC), "Solo se permite iterar variables string en ForIn", ENVIRONMENT.FORIN));
            return new Exception("Semantico", "Solo se permite iterar variables string en forIn", this.row, this.column);
        }
        if (value instanceof Exception) return value;
        let cadena_array = value.split('');
        var symbol = new Symbol(String(this.identifier), this.expression.type, cadena_array[0], this.row, this.column, null, null);
        value = newTable.addSymbol(symbol);
        for (let letter of cadena_array) {
            symbol = new Symbol(symbol.getId(), symbol.getType(), letter, symbol.getRow(), symbol.getColumn(), null, null);
            let res = newTable.updateValueSymbol(symbol);
            if (res instanceof Exception) {
                tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                return res;
            }
            for (var instrForIn of this.instructions) {
                var result = instrForIn.execute(tree, newTable);
                if (result instanceof Exception) {
                    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                    return result;
                }
                if (result instanceof Break) {
                    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                    return null;
                }
                if (result instanceof Return) {
                    tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
                    return result;
                }
                if (result instanceof Continue) return result;
            }
        }
        tree.removeEnvironment();           // Remover ambito cada vez que se termine una ejecucion
        return null;
    }

    compile(generator, env) {
        var newEnv = new Environment(env);
        generator.addComment("BEGIN FOR");
        var value = this.expression.compile(generator, env);
        
        var temp = generator.addTemp();
        generator.freeTemp(temp);
        var variable = newEnv.addVariable(this.identifier, Type.CHAR, true);
        generator.addExp(temp, 'P', variable.position, '+');
        generator.setStack(temp, value.value);

        var continueLbl = generator.newLabel(); // regresa a ka condición
        var breakLbl = generator.newLabel(); // regresa a ka condición

        newEnv.continueLbl = continueLbl;
        newEnv.breakLbl = breakLbl;

        var tempI = generator.addTemp();
        generator.addExp(temp, 'P', variable.position, '+');
        generator.getStack(tempI, temp);

        generator.putLabel(continueLbl);// inicio for
        var tempH = generator.addTemp();
        generator.getHeap(tempH,tempI); // si es -1 termina la cadena 
        generator.setStack(temp, tempI); // guardando nuevo valor
        generator.addExp(tempI, tempI, '1', '+'); // aumentando el index
        generator.addIf(tempH, '-1', '==', breakLbl);

        for (var instruction of this.instructions){
            instruction.compile(generator, newEnv);
        }
        generator.addGoto(continueLbl);
        generator.putLabel(breakLbl);
    }
}