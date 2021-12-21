# Manual de Tecnico

_Proyecto de Organizacion de lenguajes y Compiladores 2_

## Quetzal - Proyecto 1🚀
### Grupo #40
## Integrantes💁

| Nombre:                     | Carné     |
| --------------------------- | --------- |
| Jorge David Espina Molina   | 201403632 |
| Josue David Zea Herrera     | 201807159 |


## 📋 Instruccion
    class Instruction{
        constructor(row, column) {
            if (new.target === Instruction) {
            throw new Error( 'No se puede crear un objeto de esta clase abstracta' );
            }
            this.row = row;
            this.column = column;
        }

        execute(tree, table){
            throw new Error( 'No se puede ejecutar el metodo execute de esta clase abstracta' );
        }

        compile(generator, env){
            throw new Error( 'No se puede ejecutar el metodo compile de esta clase abstracta' );
        }
    }
- En la clase Instruccion es padre de todas las instrucciones.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
## 📋 Metodos Generales Clases hijas de Instruccion


### Execute:
    execute(tree, table) {}
Este metodo es el que se llamara para ejecutar una instruccion If que venga en la gramatica.
#### Parametros
  - #### tree:
    Es una clase que crea un objeto que simulará un AST en el cual guardará toda la información de la entrada a interpretar, variables, funciones, metodos etc.
  - #### table:
    Simula una tabla de simbolos que se ejecutará en los entornos, en esta guardarán todas las variables necesarias para la ejecución de los mismos.


### Compile:

    compile(generator, env){}
  Este metodo es el que se llamara para traducir una instruccion If que venga en el archivo de entrada para crear el C3D en C.
  

#### Parametros
- #### generator:
  Es un objeto que se encarga de crear e ir agregando el codigo traducido en 3 direcciónes de la entrada a ejecutar.
- #### env:
  Es un entorno que guarda la tabla de simbolos que se utilizará en la ejecución de la traducción del codigo  de 3 direcciones, a diferencia de la tabla de simbolos utilizada en la interpretación, en esta cada simbolo guarda información de la posición en el stack por cada variable.

## 📋 Declaracion


## 📋 Asignacion



## 📋 If
    class If extends Instruction {
        constructor(condition, instructionsIf, instructionsElse, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsIf = instructionsIf;
        this.instructionsElse = instructionsElse;
    }
- En la clase If esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase If.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
## 📋 Switch
    class Switch extends Instruction {
        constructor(condition, instructionsCase, row, column) {
            super(row, column);
            this.condition = condition;
            this.instructionsCase = instructionsCase;
        }
    }
- En la clase Switch esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Switch.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - condition:  
    - instructionCase:  
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.




## 📋 For


## 📋 For In


## 📋 While


## 📋 Do While