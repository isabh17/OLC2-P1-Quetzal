class Generator {
  constructor() {
    this.countTemp = 0;
    this.countLabel = 0;
    this.code = '';
    this.funcs = '';
    this.natives = '';
    this.inFunc = false;
    this.inNatives = false;
    this.temps = [];
    this.tempsRecover = {};
    this.printString = false;
    this.compareString = false;
    this.repeatString = false;
    this.length = false;
    this.uppercase = false;
    this.power = false;
    this.concatString = false;
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
    return `${this.getHeader()}${this.natives}\n${this.funcs}\nvoid main(){\n\tP = 0; H = 0;\n${this.code}\n\treturn;\n}`;
  }

  codeIn(code, tab = "\t") {
    if (this.inNatives) {
      if (this.natives == '') {
        this.natives = this.natives + '/*-----NATIVES-----*/\n';
      }
      this.natives = this.natives + tab + code;
    } else if (this.inFunc) {
      if (this.funcs == '') {
        this.funcs = this.funcs + '/*----FUNCTIONS----*/\n';
      }
      this.funcs = this.funcs + tab + code;
    } else {
      this.code = this.code + '\t' + code;
    }
  }

  addComment(comment) {
    this.codeIn(`/* ${comment} */\n`);
  }
  //----------------------------- INSTRUCTIONS ----------------------------------------
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

  freeAllTemps() {
    this.tempsRecover = {};
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
    var ptr = env.size;
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
  //---------------------------------- EXPRESSIONS --------------------------------------
  addExp(result, left, right, op) {
    this.freeTemp(left);
    this.freeTemp(right);
    if (op === "%") {
      this.codeIn(`${result}=fmod(${left},${right});\n`);
    } else if(op === "sin" || op === "cos"|| op === "tan"){
      this.codeIn(`${result}=${op}(${left}*3.1415926536/180);\n`);
    }else if(op === "log10" || op === "sqrt"){
      this.codeIn(`${result}=${op}(${left});\n`);
    }else {
      this.codeIn(`${result}=${left}${op}${right};\n`);
    }
  }
  //-------------------------------- USING OF LABELS -----------------------------------
  newLabel() {
    //console.log(this.countLabel);
    var label = `L${this.countLabel}`;
    this.countLabel += 1;
    return label;
  }

  putLabel(label) {
    this.codeIn(`${label}:\n`); //L0:
  }
  //--------------------------------- USING OF GOTO ------------------------------------
  addGoto(label) {
    this.codeIn(`goto ${label};\n`);
  }
  //--------------------------------- USING OF IF --------------------------------------
  addIf(left, right, op, label) {
    this.freeTemp(left);
    this.freeTemp(right);
    this.codeIn(`if (${left} ${op} ${right}) goto ${label};\n`);
  }

  addSpace() {
    this.codeIn("\n");
  }
  //------------------------------- NATIVE FUNCTIONS -----------------------------------
  fPrintString() {
    if (this.printString) {
      return null;
    }
    this.printString = true;
    this.inNatives = true;

    this.addBeginFunc('printString');
    var returnLbl = this.newLabel();
    var compareLbl = this.newLabel();

    var tempP = this.addTemp();

    var tempH = this.addTemp();

    this.addExp(tempP, 'P', '1', '+');

    this.getStack(tempH, tempP);

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

  fConcatString() {
    if (this.concatString) {
      return null;
    }
    this.concatString = true;
    this.inNatives = true;
    this.addBeginFunc("concatString");
    var tempNewString = this.addTemp();

    var tempP = this.addTemp();
    this.freeTemp(tempP);
    var tempP2 = this.addTemp();
    this.freeTemp(tempP2);
    var tempH = this.addTemp();
    this.freeTemp(tempH);

    var returnLbl = this.newLabel();
    var initLbl = this.newLabel();

    this.addExp(tempNewString, 'H', '', '');

    this.addExp(tempP, 'P', '1', '+');
    this.getStack(tempP, tempP);
    this.addExp(tempP2, 'P', '2', '+');
    this.getStack(tempP2, tempP2);

    this.addGoto(initLbl);
    this.putLabel(initLbl);

    this.getHeap(tempH, tempP);

    var lblTrue1 = this.newLabel();
    var lblFalse1 = this.newLabel();

    this.addIf(tempH, '-1', '==', lblFalse1);
    this.addGoto(lblTrue1);
    this.putLabel(lblTrue1);
    this.setHeap('H', tempH);
    this.nextHeap();
    this.addExp(tempP, tempP, '1', '+');
    this.addGoto(initLbl);

    this.putLabel(lblFalse1);

    this.getHeap(tempH, tempP2);

    var lblTrue1 = this.newLabel();

    this.addIf(tempH, '-1', '==', returnLbl);
    this.addGoto(lblTrue1);
    this.putLabel(lblTrue1);
    this.setHeap('H', tempH);
    this.nextHeap();
    this.addExp(tempP2, tempP2, '1', '+');
    this.addGoto(lblFalse1);

    this.putLabel(returnLbl);

    this.setHeap('H', '-1');
    this.nextHeap()

    this.setStack('P', tempNewString);

    this.addEndFunc();
    this.inNatives = false;
  }

  fCompareString() {
    if (this.compareString) {
      return;
    }
    this.compareString = true;
    this.inNatives = true;
    this.addBeginFunc("compareString");

    var tempP = this.addTemp();
    this.freeTemp(tempP);
    var tempP1 = this.addTemp();
    this.freeTemp(tempP1);
    var tempP2 = this.addTemp();
    this.freeTemp(tempP2);

    // label de inicio
    var initLbl = this.newLabel();
    // label de true
    var trueLbl = this.newLabel();
    // label de false
    var falseLbl = this.newLabel();
    // label de salida
    var returnLbl = this.newLabel();


    // extrayendo parametros
    // Parametro1
    this.addExp(tempP, 'P', '1', '+');
    this.getStack(tempP1, tempP);
    // Parametro1
    this.addExp(tempP, tempP, '1', '+');
    this.getStack(tempP2, tempP);

    // Inicio
    var tempValue1 = this.addTemp();
    var tempValue2 = this.addTemp();

    this.putLabel(initLbl);
    this.getHeap(tempValue1, tempP1);
    this.getHeap(tempValue2, tempP2);

    this.addIf(tempValue1, tempValue2, '!=', falseLbl);
    this.addIf(tempValue1, '-1', '==', trueLbl); // termino

    this.addExp(tempP1, tempP1, '1', '+');
    this.addExp(tempP2, tempP2, '1', '+');
    this.addGoto(initLbl);

    // TRUE
    this.putLabel(trueLbl);
    this.setStack('P', '1'); // 1 => true
    this.addGoto(returnLbl);

    // FALSE
    this.putLabel(falseLbl);
    this.setStack('P', '0'); // 0 => falso

    // FIN
    this.putLabel(returnLbl);
    this.addEndFunc();
    this.inNatives = false;;
  }

  fPower() {
    if (this.power) {
      return;
    }
    this.power = true;
    this.inNatives = true;
    this.addBeginFunc("native_power");

    var tempP = this.addTemp();
    this.freeTemp(tempP);
    var tempP1 = this.addTemp();
    this.freeTemp(tempP1);
    var tempP2 = this.addTemp();
    this.freeTemp(tempP2);

    var initLbl = this.newLabel();
    var returnLbl = this.newLabel();
    var exponente = this.newLabel();

    this.addExp(tempP, 'P', '1', '+');
    this.getStack(tempP1, tempP);
    this.addExp(tempP, tempP, '1', '+');
    this.getStack(tempP2, tempP);

    this.addExp(tempP, tempP1, '', '');

    this.addIf(tempP2, '0', '==', exponente);

    this.putLabel(initLbl);

    this.addIf(tempP2, '1', '<=', returnLbl);
    this.addExp(tempP1, tempP1, tempP, '*');
    this.addExp(tempP2, tempP2, '1', '-');
    this.addGoto(initLbl);
    this.putLabel(exponente);
    this.addExp(tempP1, '1', '', '');

    this.putLabel(returnLbl);
    this.setStack('P', tempP1);

    this.addEndFunc();
    this.inNatives = false;
  }

  fRepeatString() {
    if (this.repeatString) {
      return;
    }
    this.repeatString = true;
    this.inNatives = true;
    this.addBeginFunc("repeatString");
    // temp new String
    var tempNewString = this.addTemp();
    this.freeTemp(tempNewString);

    // temp counter iteraciones
    var tempCounter = this.addTemp();
    this.freeTemp(tempCounter);

    // Guardando pos del string a repetir
    var tempR = this.addTemp();
    this.freeTemp(tempR);
    var tempP = this.addTemp();
    this.freeTemp(tempP);
    var tempP2 = this.addTemp();
    this.freeTemp(tempP2);
    var tempH = this.addTemp();
    this.freeTemp(tempH);

    // label de salida
    var returnLbl = this.newLabel();
    // label de inicio
    var initLbl = this.newLabel();

    // Guardando el inicio de mi concatenacion
    this.addExp(tempNewString, 'H', '', '');
    this.addExp(tempCounter, '1', '', '');

    //extrayendo parametros
    //Parametro1
    this.addExp(tempP, 'P', '1', '+');
    this.getStack(tempP, tempP);
    //Parametro1
    this.addExp(tempP2, 'P', '2', '+');
    this.getStack(tempP2, tempP2);

    //// Inicio de recorrido
    this.addExp(tempR, tempP, '', '');
    this.putLabel(initLbl);

    //extrayendo valor del heap
    this.getHeap(tempH, tempP);

    // labels para primer parámetro
    var lblTrue1 = this.newLabel();

    this.addIf(tempH, '-1', '==', lblTrue1);

    // Guardando nuevo string
    this.setHeap('H', tempH);
    this.addExp(tempP, tempP, '1', '+');
    this.nextHeap();
    // regresando al inicio
    this.addGoto(initLbl);
    // termino la cadena 
    this.putLabel(lblTrue1);
    this.addIf(tempP2, tempCounter, '==', returnLbl);
    this.addExp(tempCounter, tempCounter, '1', '+');
    // regresandoe el puntero para recorrer nuevamente el string 
    this.addExp(tempP, tempR, '', '');
    this.addGoto(initLbl);

    // salida
    this.putLabel(returnLbl);

    // colocando simbolo de finalizacion
    this.setHeap('H', '-1');
    this.nextHeap();

    // valor de retorno
    this.setStack('P', tempNewString);

    this.addEndFunc();
    this.inNatives = false;
  }

  fLength() {
    if (this.length){
      return;
    }
    this.length = true;
    this.inNatives = true;

    this.addBeginFunc("native_length");

    var temp = this.addTemp();

    var returnLbl = this.newLabel();

    // extrayendo parametros
    // Parametro1
    this.addExp(temp, 'P', '1', '+');
    this.getStack(temp, temp);

    this.getHeap(temp, temp);

    this.addGoto(returnLbl);
    this.putLabel(returnLbl);
    //Guardamos el retono
    this.setStack('P', temp);

    this.addEndFunc();
    this.inNatives = false;
    this.freeTemp(temp)
  }
  //---------------------------------- FUNCTIONS -----------------------------------------
  addBeginFunc(id) {
    if (!this.inNatives) {
      this.inFunc = true;
    }
    this.codeIn(`void ${id}(){\n`, '');
  }

  addEndFunc() {
    this.codeIn('return;\n}\n');
    if (!this.inNatives) {
      this.inFunc = false;
    }
  }
  //------------------------------ ENVIRONMENT METHODS -----------------------------------
  newEnv(size) {
    this.codeIn(`P=P+${size};\n`);
  }

  callFun(id) {
    this.codeIn(`${id}();\n`);
  }

  retEnv(size) {
    this.codeIn(`P=P-${size};\n`);
  }
  //--------------------------------- STACK METHODS -------------------------------------
  setStack(pos, value, FreeValue = true) {
    this.freeTemp(pos);
    if (FreeValue) {
      this.freeTemp(value);
    }
    this.codeIn(`stack[(int)${pos}]=${value};\n`);
  }

  getStack(place, pos) {
    this.freeTemp(pos);
    this.codeIn(`${place}=stack[(int)${pos}];\n`);
  }
  //--------------------------------- HEAP METHODS -------------------------------------
  setHeap(pos, value) {
    this.freeTemp(pos);
    this.freeTemp(value);
    this.codeIn(`heap[(int)${pos}]=${value};\n`);
  }

  getHeap(place, pos) {
    this.freeTemp(pos);
    this.codeIn(`${place}=heap[(int)${pos}];\n`);
  }

  nextHeap() {
    this.codeIn('H=H+1;\n');
  }
}