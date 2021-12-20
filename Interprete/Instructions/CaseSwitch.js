class CaseSwitch extends Instruction {
    constructor(condition, instructionsCase, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsCase = instructionsCase;
    }

    execute(tree, table) {
        for(var instruction of this.instructionsCase){

            var result = instruction.execute(tree, table);
            if (result instanceof Exception) return result;
            if (result instanceof Break) return result;
            if (result instanceof Return) return result;
            if (result instanceof Continue) return result;
        }
        return null;
    }

    getCondition(){
        return this.condition;
    }

    compile(generator, env){
        return null;
    }
}