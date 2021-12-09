class If extends Instruction {
    constructor(row,column,ifList,blockElse,haveElse){
        super(row, column);

        this.ifList = ifList;
        this.haveElse = haveElse;
        this.blockElse = blockElse;

        this.translatedCode = "";
    }
    execute(tree, table){
        var resultBlockIf;       

        for(var i = 0; i < this.ifList.length; i++){
            resultBlockIf = (this.ifList[i]).execute(tree,table);

            if((this.ifList[i]).conditionTrue){
                if(resultBlockIf != null){
                    if(resultBlockIf instanceof Break){
                        return resultBlockIf;
                    }else if(resultBlockIf instanceof Continue){
                        return resultBlockIf;
                    }else if(resultBlockIf instanceof Return){
                        return resultBlockIf;
                    }
                }
                return null;
            }
        }

        if(this.haveElse){
            var envIf = new Environment(table,new EnvironmentType(ENVIRONMENT.IF,null));
            var resultBlockElse = this.blockElse.execute(envIf);

            if(resultBlockElse != null){
                if(resultBlockElse instanceof  Break){
                    return resultBlockElse;
                }else if(resultBlockElse instanceof Continue){
                    return resultBlockElse;
                }else if(resultBlockElse instanceof Return){
                    return resultBlockElse;
                }else{
                    console.log("error con else");
                }
            }

        }

        return null;
    }

}