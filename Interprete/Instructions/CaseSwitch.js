class CaseSwitch extends Instruction {
    constructor(condition, instructionsCase, row, column) {
        super(row, column);
        this.condition = condition; //= 5;
        this.instructionsCase = instructionsCase;
    }

    execute(tree, table) { 
        for(var instruction of this.instructionsCase){
            //console.log(this.instructionsCase);
            //console.log(this.instruccion);

            var result = instruction.execute(tree, table);
            //console.log("valores del case")
            console.log(result);
            if (result instanceof Exception) {
                //tree.get_excepcion().append(result)
                //tree.update_consola(result.__str__())
            }
            if (result instanceof Break) return result;
            if (result instanceof Return) return result;
            if (result instanceof Continue) return result;
        }
        return null;
    }

    getCondition(){
        return this.condition;
    }
}