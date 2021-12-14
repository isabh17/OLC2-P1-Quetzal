println("Funciones nativas aritmeticas");
// log(base, numero)
//println(log10(2, 4));     // 2.0
//println(log10(9, 135));   // 2.2324867603589635
// log10()
println(log10(2000));   // 3.3010299956639813
println(log10(512));    // 2.709269960975831
// trigonometricas
println(sin(67/360*2*3.14));    // 0.9202730580752193
println(cos(67/360*2*3.14));    // 0.39127675446016985
println(tan(67/360*2*3.14));    // 2.351974778938468
// sqrt
println(sqrt(pow(2,4)));     // 4.0
println(sqrt(1258));    // 35.4682957019364

println("Operaciones con cadenas");
println("para" & "caidismo");   // paracaidismo
println("Holaaa"^5);    // HolaaaHolaaaHolaaaHolaaaHolaaa
//println("Hola Mundo!"[begin:5] * "Auxiliar"[1] * "Auxiliar"[2:end]);    // Hola Auxiliar
String mide = "Esto no sé cuanto mide";
println(mide.length());  // 22
String Mayuscula = "mayuscula"; // MAYUSCULA
String MINUSCULA = "MINUSCULA"; // MAYUSCULA

println(Mayuscula.toUppercase());    // MAYUSCULA
println(MINUSCULA.toLowercase());    // minuscula

println("Operador ternario");
String animal = "Tortuga";
println(animal == "Perro" ? 20 : "No"); // No