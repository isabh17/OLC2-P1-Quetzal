void Main(){
  int[] arr = [[0, 1], 2, 3];
  println(arr);
  println(arr[0]);
  println(arr[1]);
  println(arr[2]);
  
  int aux = arr[0];
  arr[0] = arr[2];
  arr[1] = arr[1];
  arr[2] = aux;
  
  println(arr[0]);
  println(arr[1]);
  println(arr[2]);
  println(arr);
  int[] arr = [
  [
  	[5,10,15,20],
    [25,30,35,40]
  ],
  [
    [45,50,55,60],
    [65,70,75,80]
  ],
  [
    [85,90,95,100],
    [105,110,115,120]
  ]
]; //[3][2][4]

        println(arr);

        println(arr[0][0][0]);
        println(arr[0][0][1]);
        println(arr[0][0][2]);
        println(arr[0][0][3]);
        println(arr[0][1][0]);
        println(arr[0][1][1]);
        println(arr[0][1][2]);
        println(arr[0][1][3]);
        println(arr[1][0][0]);
        println(arr[1][0][1]);
        println(arr[1][0][2]);
        println(arr[1][0][3]);
        println(arr[1][1][0]);
        println(arr[1][1][1]);
        println(arr[1][1][2]);
        println(arr[1][1][3]);
        println(arr[2][0][0]);
        println(arr[2][0][1]);
        println(arr[2][0][2]);
        println(arr[2][0][3]);
        println(arr[2][1][0]);
        println(arr[2][1][1]);
        println(arr[2][1][2]);
        println(arr[2][1][3]);

        arr[0][0][0] = 120;
        arr[0][0][1] = 115;
        arr[0][0][2] = 110;
        arr[0][0][3] = 105;
        arr[0][1][0] = 100;
        arr[0][1][1] = 95;
        arr[0][1][2] = 90;
        arr[0][1][3] = 85;
        arr[1][0][0] = 80;
        arr[1][0][1] = 75;
        arr[1][0][2] = 70;
        arr[1][0][3] = 65;
        arr[1][1][0] = 60;
        arr[1][1][1] = 55;
        arr[1][1][2] = 50;
        arr[1][1][3] = 45;
        arr[2][0][0] = 40;
        arr[2][0][1] = 35;
        arr[2][0][2] = 30;
        arr[2][0][3] = 25;
        arr[2][1][0] = 20;
        arr[2][1][1] = 15;
        arr[2][1][2] = 10;
        arr[2][1][3] = 5;


        println(arr[0][0][0]);
        println(arr[0][0][1]);
        println(arr[0][0][2]);
        println(arr[0][0][3]);
        println(arr[0][1][0]);
        println(arr[0][1][1]);
        println(arr[0][1][2]);
        println(arr[0][1][3]);
        println(arr[1][0][0]);
        println(arr[1][0][1]);
        println(arr[1][0][2]);
        println(arr[1][0][3]);
        println(arr[1][1][0]);
        println(arr[1][1][1]);
        println(arr[1][1][2]);
        println(arr[1][1][3]);
        println(arr[2][0][0]);
        println(arr[2][0][1]);
        println(arr[2][0][2]);
        println(arr[2][0][3]);
        println(arr[2][1][0]);
        println(arr[2][1][1]);
        println(arr[2][1][2]);
        println(arr[2][1][3]);

        println(arr);
        return;
}

void swap(int i,int j,int[] arr) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

int [] arreglo = [32, 21, 7, 89, 56, 909, 109, 2, 9, 1, 44, 3, 8200, 11, 8, 10];
int [] copiaArreglo = arreglo[];

for i in 1:(length(arreglo)) 1:5

    for j in 1:(length(arreglo) - 1)

        if arreglo[j] > arreglo[j + 1]
            swap(j, j+1, arreglo);
        end;

    end;

end;

println(["O","R","D","E","N","A","D","O"]);
println(arreglo); // [1, 2, 3, 7, 8, 9, 10, 11, 21, 32, 44, 56, 89, 109, 909, 8200]
println(copiaArreglo); // [32, 21, 7, 89, 56, 909, 109, 2, 9, 1, 44, 3, 8200, 11, 8, 10]

println("===============PUNTO===============");
println(arreglo[begin:4].+3); //[4, 5, 6, 10]
println(arreglo[5:8].*5); //[40, 45, 50, 55]
println(arreglo[9:12].^2); //[441, 1024, 1936, 3136]
println(cos.(arreglo[13:end])); //[0.5101770449416689, -0.577002178942952, -0.4715725491514069, 0.9033951202531774]

println("===============PUSH/POP===============");

for i in 1:length(copiaArreglo)
    print(pop!(arreglo)," - "); //8200 - 909 - 109 - 89 - 56 - 44 - 32 - 21 - 11 - 10 - 9 - 8 - 7 - 3 - 2 - 1 -
end;

println("");

for i in 1:length(copiaArreglo)
    push!(arreglo,copiaArreglo[i]);
end;

println(arreglo); //[32, 21, 7, 89, 56, 909, 109, 2, 9, 1, 44, 3, 8200, 11, 8, 10]
println(copiaArreglo); //[32, 21, 7, 89, 56, 909, 109, 2, 9, 1, 44, 3, 8200, 11, 8, 10]
