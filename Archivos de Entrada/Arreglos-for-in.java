void swap(int i, int j, int[] arr){
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
int [] arreglo = [32, 21, 7, 89, 56, 909, 109, 2, 9, 1, 44, 3, 8200, 11, 8, 10];
int [] copiaArreglo = #arreglo;
for(int i = 0; i<arreglo.length(); i++){
  for(int j = 0; j<arreglo.length()-1; j++){
    if(arreglo[j] > arreglo[j + 1] ){
      swap(j, j+1, arreglo);
    }
  }
}
int begin = 0; int end = 2;
println(["O","R","D","E","N","A","D","O"]);
println(arreglo); // [1, 2, 3, 7, 8, 9, 10, 11, 21, 32, 44, 56, 89, 109, 909, 8200]
println(copiaArreglo); // [32, 21, 7, 89, 56, 909, 109, 2, 9, 1, 44, 3, 8200, 11, 8, 10]
println("===============PUNTO===============");
println(arreglo[begin:4]#+3); //[4,5,6,10]
println(arreglo[5:8]#*5); //[45,50,55]
println(sin#(arreglo[begin:end])); //[0.01745240643728351,0.03489949670250097]
println(cos#(arreglo[begin:end])); //[0.9998476951563913,0.9993908270190958]
println(tan#(arreglo[begin:end])); //[0.017455064928217585,0.03492076949174773]
println(sqrt#(arreglo[begin:end])); //[1,1.4142135623730951]
println(log10#(arreglo[begin:end])); //[0,0.3010299956639812]