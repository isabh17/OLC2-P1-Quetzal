

int var1 = 10;
int var2 = 20;
int a = 100;
int b = 150;
void main(){
    println("Probando Manejo de Entornos");
    println("El valor de var1 global es $a");  //10

    int var1 = 5*5;
    println("El valor de var1 local es $b");  //25

    println("Probando expresiones Arítmeticas");
    println(-25*(69-33*2)+22-32*2-33*(-48+48));   // -117
    println(-93.555+92.12-81.33+19+26-68+-7/(79+11)/86);    // -105.765
    println(8+67+74-1.0*((-86+22)*2)-5*6);  // 247.0
    println((51 % 49) * (9.9+90.1));    // 200.0
    println(0+9*3*(85%(46+95)));    // 2295

    println("Probando expresiones Booleanas y Lógicas");

    println(56 < 48 && 68 >=12 && 62 != 96);    // false
    println((21.0==20.5||95>=94)&&((19<39&&83<=96)||35<97));    // true
    println((68==33||(2<95&&17==37))&&63<=9||12<=42||25==1);    // true

    println("Probando expresiones Arítmeticas, Booleanas y Lógicas");
    if ((true == true && false != false) || true == false)
        println("No entra acá");
    else
        println("Entra acá");

    if (1 == (1 + 1 - (1 * 2 / 2)) && 20.5 == 20.5)
        println("Entra acá");
    else
        println("No entra acá");

    if ("Hola" == "Mundo")
        println("No entra acá");
    else
        println("Entra acá");

    int edad = 62;
    String respuesta = edad < 50 ? "Puede vacunarse" :   edad ==60  ? "Puede vacunarse con riesgo" :   "No puede vacunarse" ;
    println(respuesta);  //No puede vacunarse
}

double operacionMatematica(char operador, double valor1, double valor2){
    switch(operador) {
        case '+':
            return valor1 + valor2;
            break;
        case '-':
            return valor1 - valor2;
            break;
        case '*':
            return valor1 * valor2;
            break;
        case '/':
            return valor1 / valor2;
            break;
        default:
            return 0;
    } 
}
int operacionMatematica1(char operador, int valor1, int valor2){
    switch(operador) {
        case '+':
            return valor1 + valor2;
            break;
        case '-':
            return valor1 - valor2;
            break;
        case '*':
            return valor1 * valor2;
            break;
        case '/':
            return valor1 / valor2;
            break;
        default:
            return 0;
    } 
}
println("El valor de var1 global es $a" & " y el de la funcion es " & operacionMatematica('+',5.6,6.7));  //10
String brr = "hola";
println("suma " & operacionMatematica('+',5.6,6.7) & brr^3);
println("resta " & operacionMatematica('-',-5.6,6.7));
println("multipliacion " & operacionMatematica('*',5.6,6.7));
println("division " & operacionMatematica('/',5.6,6.7));
println("-------------------------------------------");
String animal = "Tigre";
println("---------------------caracterOfPosition----------------------");
println(animal.caracterOfPosition(2)); //g
println("--------------------subString-----------------------");
println(animal.subString(2,4)); //gr
println("-------------------length------------------------");
println(animal.length()); //5
println("-------------------toUppercase------------------------");
println(animal.toUppercase()); //TIGRE
println("------------------toLowercase-------------------------");
println(animal.toLowercase()); //tigre
println("El resultado de 2 + 2 es $(2 + 2)");  // Imprime El resultado de 2 + 2 es 4
println("---------------------int.parse-------------------------------");
println(int.parse("8200"));
println("----------------------double.parse------------------------------");
println(double.parse("3.13159"));
println("-------------------boolean.parse---------------------------------");
println(boolean.parse("1"));
println("--------------------toInt--------------------------------");
println(toInt(3.99999));//3
println("--------------------toDouble--------------------------------");
println(toDouble(operacionMatematica1('+',30,4))); //34.0
println("------------------------string----------------------------");
println(string(45.87));//"45.87"
println("--------------------typeof--------------------------------");
println(typeof(5 * 5));//int
println(typeof(operacionMatematica('*',5.6,6.7)));//double
println(typeof((21.0==20.5||95>=94)&&((19<39&&83<=96)||35<97)));//boool - false
println(typeof(animal));//string
println(typeof(string(45.87)));
println(typeof(toDouble(operacionMatematica1('+',30,4))));
println("-----------------------------MAIN-------------------------------");
main();
println("-----------------------------METOD-------------------------------");
//Se expresa de la siguiente manera:
println(sin(134));
println(sin(operacionMatematica1('+',30,4)));
println(log10(100));
println(log10(operacionMatematica1('+',30,4)));
println(cos(var1));
println(cos(operacionMatematica1('+',30,4)));
println(tan(12));
println(tan(operacionMatematica1('+',30,4)));
println(sqrt(16));
println(sqrt(operacionMatematica1('+',30,4)));
println(pow(2,16));
/*int ap = 0;
ap = pow(operacionMatematica1('+',30,4),2);*/
println(pow(operacionMatematica1('+',30,4),2));
println("-----------------------------arbolito-------------------------------");
for (int i = 0; i < 10; i++) {
   for (int j = 0; j < 10 - i; j++){
    print(" ");
   }
   for (int k = 0; k < (2 * i + 1); k++){
    print("*");
   }
   println("");
}