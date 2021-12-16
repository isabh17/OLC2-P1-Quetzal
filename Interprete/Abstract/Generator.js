class Generator{
  constructor(){
    // Contadores
    this.countTemp = 0;
    this.countLabel = 0;
    // Code;
    this.code = '';
    this.funcs = '';
    this.natives = '';
    this.inFunc = false;
    this.inNatives = false;
    // Lista de Temporales;
    this.temps = [];
    this.tempsRecover = {};
    // Lista de Nativas;
    this.printString = false;
    this.potencia = false;
  }

  getHeader(){
    var ret = '/*----HEADER----*/\n#include <stdio.h>\n#include <math.h>\n\ndouble heap[30101999];\ndouble stack[30101999];\ndouble P;\ndouble H;\n';
    if (this.temps.length >0){
      ret += 'double ';
      for (var i = 0; i<this.temps.length; i++){
        ret += this.temps[i];
        if (i != this.temps.length - 1) {
          ret += ", ";
        }
      }
      ret += ";\n";
    }
    return ret;
  }

  getCode(){
    //return `${this.getHeader()}${/*this.natives*/}\n${this.funcs}\nvoid main(){\n${this.code}\n}`;
    return `${this.getHeader()}${this.natives}\n${this.funcs}\nvoid main(){\nP = 0; H = 0;\n${this.code}\n}`;
  }

  codeIn(code, tab="\t"){
    if(this.inNatives){
      if(this.natives == ''){
        this.natives = this.natives + '/*-----NATIVES-----*/\n';
      }
      this.natives = this.natives + tab + code;
    }else if(this.inFunc){
      if(this.funcs == ''){
        this.funcs = this.funcs + '/*-----FUNCS-----*/\n';
      }
      this.funcs = this.funcs + tab +  code;
    }else{
      this.code = this.code + '\t' +  code;
    }
  }

  addComment(comment){
    this.codeIn(`/* ${comment} */\n`);
  }

  addPrint(type, value){
    this.freeTemp(value);
    if(type === "char"){
      this.codeIn(`printf("%c", (${type})${value});\n`);
    }else if(type === "double"){
      this.codeIn(`printf("%f", (${type})${value});\n`);
    }
  }

  freeTemp(temp){
    if(temp in this.tempsRecover){
      delete this.tempsRecover[temp];
    }
  }

  addTemp(){
    var temp = `t${this.countTemp}`;
    this.countTemp += 1;
    this.temps.push(temp);
    this.tempsRecover[temp] = temp;
    return temp;
  }

  saveTemps(env){
    var size = 0
    if (this.tempsRecover.length > 0){
      temp = this.addTemp();
      this.freeTemp(temp);
      this.addComment('Guardado de temporales');
      this.addExp(temp, 'P', env.size, '+');
      for (var value of this.tempsRecover){
        size += 1
        this.setStack(temp, value, false);
        if (size != this.tempsRecover.length){
          this.addExp(temp, temp, '1', '+');
        }
      }
      this.addComment('Fin Guardado de temporales');
    }
    ptr = env.size;
    env.size = ptr + size;
    return ptr;
  }

  recoverTemps(env, pos){
    if (this.tempsRecover.length > 0){
      temp = this.addTemp();
      this.freeTemp(temp);
      size = 0
      this.addComment('Recuperacion de temporales');
      this.addExp(temp, 'P', pos, '+');
      for(var value of this.tempsRecover){
        size += 1
        this.getStack(value, temp);
        if (size != this.tempsRecove.length){
          this.addExp(temp, temp, '1', '+');
        }
      }
      env.size = pos
      this.addComment('Fin Recuperacion de temporales')
    }
  }
  
  //###################
  //# EXPRESIONES
  //###################
  addExp(result, left, right, op){
    this.freeTemp(left);
    this.freeTemp(right);
    this.codeIn(`${result}=${left}${op}${right};\n`);
  }
}