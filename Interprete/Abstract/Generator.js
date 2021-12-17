class Generator {
  constructor() {
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
    this.concatString = false;
    this.potencia = false;
  }

  getHeader() {
    var ret = '/*----HEADER----*/\n#include <stdio.h>\n#include <math.h>\n\ndouble heap[30101999];\ndouble stack[30101999];\ndouble P;\ndouble H;\n';
    if (this.temps.length > 0) {
      ret += 'double ';
      for (var i = 0; i < this.temps.length; i++) {
        ret += this.temps[i];
        if (i != this.temps.length - 1) {
          ret += ", ";
        }
      }
      ret += ";\n";
    }
    return ret;
  }

  getCode() {
    //return `${this.getHeader()}${/*this.natives*/}\n${this.funcs}\nvoid main(){\n${this.code}\n}`;
    return `${this.getHeader()}${this.natives}\n${this.funcs}\nvoid main(){\nP = 0; H = 0;\n${this.code}\n\treturn;\n}`;
  }

  codeIn(code, tab = "\t") {
    if (this.inNatives) {
      if (this.natives == '') {
        this.natives = this.natives + '/*-----NATIVES-----*/\n';
      }
      this.natives = this.natives + tab + code;
    } else if (this.inFunc) {
      if (this.funcs == '') {
        this.funcs = this.funcs + '/*-----FUNCS-----*/\n';
      }
      this.funcs = this.funcs + tab + code;
    } else {
      this.code = this.code + '\t' + code;
    }
  }

  addComment(comment) {
    this.codeIn(`/* ${comment} */\n`);
  }
  //###############
  // Instrucciones
  //##############
  addPrint(type, value) {
    this.freeTemp(value);
    if (type === "char") {
      this.codeIn(`printf("%c", (${type})${value});\n`);
    } else if (type === "double") {
      this.codeIn(`printf("%f", (${type})${value});\n`);
    }
  }

  printTrue() {
    this.addPrint("char", 116)
    this.addPrint("char", 114)
    this.addPrint("char", 117)
    this.addPrint("char", 101)
  }

  printFalse() {
    this.addPrint("char", 102);
    this.addPrint("char", 97);
    this.addPrint("char", 108);
    this.addPrint("char", 115);
    this.addPrint("char", 101);
  }

  freeTemp(temp) {
    if (temp in this.tempsRecover) {
      delete this.tempsRecover[temp];
    }
  }

  addTemp() {
    var temp = `t${this.countTemp}`;
    this.countTemp += 1;
    this.temps.push(temp);
    this.tempsRecover[temp] = temp;
    return temp;
  }

  saveTemps(env) {
    var size = 0
    if (this.tempsRecover.length > 0) {
      temp = this.addTemp();
      this.freeTemp(temp);
      this.addComment('Guardado de temporales');
      this.addExp(temp, 'P', env.size, '+');
      for (var value of this.tempsRecover) {
        size += 1
        this.setStack(temp, value, false);
        if (size != this.tempsRecover.length) {
          this.addExp(temp, temp, '1', '+');
        }
      }
      this.addComment('Fin Guardado de temporales');
    }
    ptr = env.size;
    env.size = ptr + size;
    return ptr;
  }

  recoverTemps(env, pos) {
    if (this.tempsRecover.length > 0) {
      temp = this.addTemp();
      this.freeTemp(temp);
      size = 0
      this.addComment('Recuperacion de temporales');
      this.addExp(temp, 'P', pos, '+');
      for (var value of this.tempsRecover) {
        size += 1
        this.getStack(value, temp);
        if (size != this.tempsRecove.length) {
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
  addExp(result, left, right, op) {
    this.freeTemp(left);
    this.freeTemp(right);
    if (op === "%") {
      this.codeIn(`${result}=fmod(${left},${right});\n`);
    } else {
      this.codeIn(`${result}=${left}${op}${right};\n`);
    }
  }

  //####################
  // Manejo de Labels
  //####################
  newLabel() {
    var label = `L${this.countLabel}`;
    this.countLabel += 1;
    return label;
  }

  putLabel(label) {
    this.codeIn(`${label}:\n`); //L0:
  }

  //##################
  // GOTO
  //##################
  addGoto(label) {
    this.codeIn(`goto ${label};\n`);
  }

  //##################
  // IF
  //##################
  addIf(left, right, op, label) {
    this.freeTemp(left);
    this.freeTemp(right);
    this.codeIn(`if (${left} ${op} ${right}) goto ${label};\n`);
  }

  addSpace() {
    this.codeIn("\n");
  }

  //#############
  // NATIVES
  //#############
  fPrintString() {
    if (this.printString) {
      return null;
    }
    this.printString = true;
    this.inNatives = true;

    this.addBeginFunc('printString');
    // Label para salir de la funcion
    var returnLbl = this.newLabel();
    // Label para la comparacion para buscar fin de cadena
    var compareLbl = this.newLabel();

    // Temporal puntero a Stack
    var tempP = this.addTemp();

    // Temporal puntero a Heap
    var tempH = this.addTemp();

    this.addExp(tempP, 'P', '1', '+');

    this.getStack(tempH, tempP);

    // Temporal para comparar
    var tempC = this.addTemp();

    this.putLabel(compareLbl);

    this.getHeap(tempC, tempH);

    this.addIf(tempC, '-1', '==', returnLbl);

    this.addPrint('char', tempC);

    this.addExp(tempH, tempH, '1', '+');

    this.addGoto(compareLbl);

    this.putLabel(returnLbl);
    this.addEndFunc();
    this.inNatives = false;
    this.freeTemp(tempP);
    this.freeTemp(tempH);
    this.freeTemp(tempC);
  }

  getConcatStrings(){
    if (this.concatString) {
      return null;
    }
    this.concatString = true;
    this.inNatives = true;

    this.addBeginFunc('concatStrings');
    let code = "";
    let t1 = this.addTemp();
    let t2 = this.addTemp();
    let t3 = this.addTemp();
    let t4 = this.addTemp();
    let t5 = this.addTemp();
    let t6 = this.addTemp();
    let t7 = this.addTemp();
    let t8 = this.addTemp();
    let t9 = this.addTemp();
    let t10 = this.addTemp();

    let l1 = Singleton.getLabel();
    let l2 = Singleton.getLabel();
    let l3 = Singleton.getLabel();
    let l4 = Singleton.getLabel();

    code += `${t1} = P + 1;//posicion de inicio de primera cadena en heap\n`;
    code += `${t2} = Stack[(int)${t1}];//referncia de inicio de cadena en heap\n`;
    code += `${t3} = P + 2;//posicion de inicio de segunda cadena en heap\n`;
    code += `${t4} = Stack[(int)${t3}];//referencia de segunda cadena en heap\n`;
    code += `${t5} = H;\n`;
    code += `${t6} = 0;//recorrer la cadena en heap\n`;
    code += `${t7} = 0;//recorrer el heap en posiciones vacias\n`;
    code += `${l1}:\n`;
    code += `${t8} = ${t2} + ${t6};\n`;
    code += `${t9} = Heap[(int)${t8}];\n`;
    code += `if(${t9} == -1) goto ${l2};//verifico si llegue al final de la cadena 1 para saltar a la segunda\n`;
    code += `${t10} = ${t5} + ${t7};//valor vacio en heap\n`;
    code += `Heap[(int)${t10}] = ${t9};//guardo el caracter en heap\n`;
    code += `${t6} = ${t6} + 1;\n`;
    code += `${t7} = ${t7} + 1;\n`;
    code += `goto ${l1};\n`;
    code += `${l2}:\n`;
    code += `${t6} = 0;//recorrer la cadena 2\n`;
    code += `${l3}:\n`;
    code += `${t8} = ${t4} + ${t6};\n`;
    code += `${t9} = Heap[(int)${t8}];\n`;
    code += `if(${t9} == -1) goto ${l4};\n`;
    code += `${t10} = ${t5} + ${t7};//valor vacio en heap\n`;
    code += `Heap[(int)${t10}] = ${t9};\n`;
    code += `${t6} = ${t6} + 1;\n`;
    code += `${t7} = ${t7} + 1;\n`;
    code += `goto ${l3};\n`;
    code += `${l4}:\n`;
    code += `${t10} = ${t5} + ${t7};\n`;
    code += `Heap[(int)${t10}] = -1;\n`;
    code += `H = ${t10} + 1;\n`;
    code += `${t1} = P + 0;//\n`;
    code += `Stack[(int)${t1}] = ${t5};//\n`;

    code += `return;\n}\n\n`;
    return code;
  }

  //##################
  // FUNCS
  //##################
  addBeginFunc(id){
    if(!this.inNatives){
      this.inFunc = true;
    }
    this.codeIn(`void ${id}(){\n`, '');
  }
  
  addEndFunc(){
    this.codeIn('return;\n}\n');
    if(!this.inNatives){
      this.inFunc = False
    }
  }

  //############
  // ENVS
  //############
  newEnv(size){
    this.codeIn(`P=P+${size};\n`);
  }

  callFun(id){
    this.codeIn(`${id}();\n`);
  }

  retEnv(size){
    this.codeIn(`P=P-${size};\n`);
  }

  //##############
  // STACK
  //##############
  setStack(pos, value, FreeValue = true){
      this.freeTemp(pos);
      if (FreeValue){
        this.freeTemp(value);
      }
      this.codeIn(`stack[(int)${pos}]=${value};\n`);
  }
  
  getStack(place, pos){
    this.freeTemp(pos);
    this.codeIn(`${place}=stack[(int)${pos}];\n`);
  }

  //##############
  // HEAP
  //##############
  setHeap(pos, value){
      this.freeTemp(pos);
      this.freeTemp(value);
      this.codeIn(`heap[(int)${pos}]=${value};\n`);
  }

  getHeap(place, pos){
      this.freeTemp(pos);
      this.codeIn(`${place}=heap[(int)${pos}];\n`);
  }

  nextHeap(){
      this.codeIn('H=H+1;\n');
  }
}