class Generator {
  constructor() {
    // Contadores
    this.countTemp = 0;
    this.countLabel = 0;
    // Code
    this.code = '';
    this.funcs = '';
    this.natives = '';
    this.inFunc = false;
    this.inNatives = false;
    // Lista de Temporales
    this.temps = [];
    this.tempsRecover = {};
    // Lista de Nativas
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
  generator = null; // par afunciones
  Limpiar(){
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
    Generator.generator = new Generator();
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

  fConcatString() {
    if (this.concatString){
      return null;
    }
    this.concatString = true;
    this.inNatives = true;
    this.addBeginFunc("concatString");
    //temp new String
    var tempNewString = this.addTemp();

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

    //extrayendo parametros
    //Parametro1
    this.addExp(tempP, 'P', '1', '+');
    this.getStack(tempP, tempP);
    //Parametro1
    this.addExp(tempP2, 'P', '2', '+');
    this.getStack(tempP2, tempP2);

    //# Inicio de recorrido
    this.addGoto(initLbl);
    this.putLabel(initLbl);

    //extrayendo valor del heap
    this.getHeap(tempH, tempP);

    // labels para primer parámetro
    var lblTrue1 = this.newLabel();
    var lblFalse1 = this.newLabel();

    this.addIf(tempH, '-1', '==', lblFalse1);
    this.addGoto(lblTrue1);
    this.putLabel(lblTrue1);
    // concatenando....
    this.setHeap('H', tempH);
    this.nextHeap();
    this.addExp(tempP, tempP, '1', '+');
    this.addGoto(initLbl);

    //continua con el segundo parametro
    this.putLabel(lblFalse1);

    //extrayendo valor del heap
    this.getHeap(tempH, tempP2);

    // labels para segundo parámetro
    var lblTrue1 = this.newLabel();
    // lblFalse1 = this.newLabel() 

    this.addIf(tempH, '-1', '==', returnLbl);
    this.addGoto(lblTrue1);
    this.putLabel(lblTrue1);
    // concatenando....
    this.setHeap('H', tempH);
    this.nextHeap();
    this.addExp(tempP2, tempP2, '1', '+');
    this.addGoto(lblFalse1); //regresamos al lbl falso del primer parámetro

    // salida function
    this.putLabel(returnLbl);

    // Ingresando el simbolo de terminación de la cadena
    this.setHeap('H', '-1');
    this.nextHeap()

    // valor de retorno
    this.setStack('P', tempNewString);

    this.addEndFunc();
    this.inNatives = false;
  }

  //##################
  // FUNCS
  //##################
  addBeginFunc(id) {
    if (!this.inNatives) {
      this.inFunc = true;
    }
    this.codeIn(`void ${id}(){\n`, '');
  }

  addEndFunc() {
    this.codeIn('return;\n}\n');
    if (!this.inNatives) {
      this.inFunc = False
    }
  }

  //############
  // ENVS
  //############
  newEnv(size) {
    this.codeIn(`P=P+${size};\n`);
  }

  callFun(id) {
    this.codeIn(`${id}();\n`);
  }

  retEnv(size) {
    this.codeIn(`P=P-${size};\n`);
  }

  //##############
  // STACK
  //##############
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

  //##############
  // HEAP
  //##############
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