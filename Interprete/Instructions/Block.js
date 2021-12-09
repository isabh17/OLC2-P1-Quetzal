class Block extends Instruction {  
    /**
     * 
     * @param {*} sentences 
     */
    constructor(sentences) {
      super(0, 0);
      this.sentences = sentences;
    }   
  
    execute(tree, table){
      var resultBlock;
  
      for(var i = 0; i < this.sentences.length; i++){        
        if(this.sentences[i] instanceof Instruction){
          resultBlock = (this.sentences[i]).execute(tree,table);          
          if(resultBlock != null){  
            if(resultBlock instanceof Break){
              return resultBlock;
            }else if(resultBlock instanceof Continue){
              return resultBlock;  
            }else if(resultBlock instanceof Return){
              return resultBlock;    
            }else{
            }  
          }  
        }else if(this.sentences[i] instanceof Aritmetica){
          this.sentences[i].execute(tree, table);

          //(this.sentences[i]).getValue(tree,table);
        }  
      }
      return null;
    }
  
  }