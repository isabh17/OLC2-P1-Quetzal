class CaseSwitch extends Instruction {
    constructor(linea,column,expression,block,isCase,haveBlock){
        super(linea,column);
        this.expression = expression;
        this.block = block;
        this.isCase = isCase;
        this.haveBlock = haveBlock;
    }
        
    execute(e) {
        return this.block.execute(e);
    }

}