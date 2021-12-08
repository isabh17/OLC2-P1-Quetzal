class Symbol{
  constructor(id, type, row, column, value, ambit){
    this.id = id;
    this.type = type;
    this.row = row;
    this.column = column;
    this.value = value;
    this.ambit = ambit;
  }

  get_id(){
      return this.id;
  }

  set_id(id){
      this.id = id;
  }

  get_type(){
      return this.type;
  }

  set_type(type){
      this.type = type;
  }

  get_row(){
      return this.row;
  }
    
  set_row(row){
      this.row = row;
  }

  get_column(){
      return this.column;
  }

  set_column(column){
      this.column = column;
  }
    
  get_value(){
      return this.value;
  }

  set_value(value){
      this.value = value;
  }
}