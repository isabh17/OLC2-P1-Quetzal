const gramatica =require("./gramatica.js");
let fs = require("fs");
let texto = fs.readFileSync('../entrada.txt', 'utf8');
console.log(gramatica.parse(texto));