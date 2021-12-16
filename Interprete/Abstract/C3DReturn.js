class C3DReturn {
  constructor(val, retType, isTemp, auxType = ""){
    this.value = val;
    this.type = retType;
    this.auxType = auxType;
    this.isTemp = isTemp;
    this.trueLbl = '';
    this.falseLbl = '';
  }
}