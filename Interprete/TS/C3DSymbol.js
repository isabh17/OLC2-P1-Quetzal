class C3DSymbol {
  constructor(id, type, position, global, inHeap, objectType = "") {
    this.id = id;
    this.type = type;
    this.position = position;
    this.isGlobal = global;
    this.inHeap = inHeap;
    this.objectType = objectType;
    this.value = null;
  }
}