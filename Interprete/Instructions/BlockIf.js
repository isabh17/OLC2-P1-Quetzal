class BlockIf extends Instruction {
    /**
     * 
     * @param {*} linea 
     * @param {*} column 
     * @param {*} expresion 
     * @param {*} block 
     * @param {*} isElseIf 
     */
    constructor(linea,column,expresion,block,isElseIf){
        super(linea,column);
        this.expresion = expresion;
        this.block = block;
        this.conditionTrue = false;
        this.isElseIf =isElseIf;

    }
    execute(tree, table){
        var resultCondicion;
        var envIf;
        var resultBlock;

        this.conditionTrue = false;
        resultCondicion = this.expression.execute(tree, table);
        if(resultCondicion.type != Type.BOOLEAN){
            ErrorList.addError(new ErrorNode(this.line,this.column,new ErrorType(EnumErrorType.SEMANTIC),`La condicion no es de valor boolean`,table.getEnvironment()));
            return null;
        }
        if(!(resultCondicion.value)){
            return null;
        }

        envIf = new Environment(e,ENVIRONMENT.IF,null);
        resultBlock = this.block.execute(envIf);
        this.conditionTrue = true;

        if(resultBlock != null){
            if(resultBlock instanceof Break){
                return resultBlock;
            }else if(resultBlock instanceof Continue){
                return resultBlock;
            }else if(resultBlock instanceof Return){
                return resultBlock;
            }else{
                console.log("error dentro del block if");
            }
        }
        return null;
    }
}