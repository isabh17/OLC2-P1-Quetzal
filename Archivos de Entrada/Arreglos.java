void main(){
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