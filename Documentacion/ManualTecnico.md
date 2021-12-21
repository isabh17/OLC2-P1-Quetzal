# Manual Técnico

_Proyecto de Organización de lenguajes y Compiladores 2_

## Quetzal - Proyecto 1🚀
### Grupo #40
## Integrantes💁

| Nombre:                     | Carné     |
| --------------------------- | --------- |
| Jorge David Espina Molina   | 201403632 |
| Josué David Zea Herrera     | 201807159 |


## 📋 Instruction
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
- La clase Instruction es padre de todas las instrucciones.
- ### Constructor: 
  Este constructor nos ayudará para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parámetros
    - row:  Para llevar control de la línea.
    - column:  Para llevar control de la columna.
## 📋 Metodos Generales Clases hijas de Instruccion


### Execute:
    execute(tree, table) {}
Este método es el que se llamara para ejecutar una instrucción If que venga en la gramática.
#### Parámetros
  - #### tree:
    Es una clase que crea un objeto que simulará un AST en el cual guardará toda la información de la entrada a interpretar, variables, funciones, metodos etc.
  - #### table:
    Simula una tabla de símbolos que se ejecutará en los entornos, en esta guardarán todas las variables necesarias para la ejecución de los mismos.


### Compile:

    compile(generator, env){}
  Este método es el que se llamará para traducir una instrucción If que venga en el archivo de entrada para crear el C3D en C.
  

#### Parámetros
- #### generator:
  Es un objeto que se encargá de crear e ir agregando el código traducido en 3 direcciones de la entrada a ejecutar.
- #### env:
  Es un entorno que guarda la tabla de simbolos que se utilizará en la ejecución de la traducción del codigo de 3 direcciones, a diferencia de la tabla de simbolos utilizada en la interpretación, en esta cada simbolo guardá información de la posición en el stack por cada variable.

## 📋 Declaracion
    class Declaration extends Instruction {
        constructor(type, identifier, expression, row, column) {
            super(row, column);
            this.identifier = identifier;
            this.expression = expression;
            this.type = type;
        }
    }

- ### Descripcion: 
  En la clase Declaracion esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Declaracion.
  
  Se utiliza para guardar la informacion para declarar variables y asignarles valores .
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - identifier: variable que vamos a declarar.
    - expression: la expresion que se le va a asignar a la variable si en un caso tiene una asignacion, si no solo se declara.
    - type: tipo de variable sera int,double entre otras.
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
- ### normalDeclaration: 
  Metodo para solo declarar una variable normal en C3D.

- ### multipleDeclaration: 
  Metodo que sera para declaracion multiple en C3D.

## 📋 Asignacion
    class Assignation extends Instruction{
        constructor(identifier, expression, row, column){
            super(row, column);
            this.identifier = identifier;
            this.expression = expression;
            this.type = null;
        }
    }

- ### Descripcion: 
  En la clase Asignacion esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Asignacion.
  Se utiliza para reasignar el valor de una variable ya declarada.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - identifier: variable que vamos a asignarle nuevo valor.
    - expression: la expresion que se le va a asignar a la variable.
    - type: se le asigna null ya que es una asignacion y la validacion de tipos se hace en execute.
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

## 📋 If
    class If extends Instruction {
        constructor(condition, instructionsIf, instructionsElse, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsIf = instructionsIf;
        this.instructionsElse = instructionsElse;
    }

- ### Descripcion: 
  En la clase If esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase If.

  Ejecucion de instrucciones if que adentro pueden venir mas instrucciones desde un print hasta llamadas de funciones.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - condition: la condicional que viene a evaluar en el if.
    - instructionIf: Instrucciones si solo viene un if.
    - InstruccionsElse: Instrucciones si en un caso viene else if o  else.
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
- ### Descripcion: 
  En la clase Switch esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Switch.
  
  Ejecucion de instrucciones Switch que adentro pueden venir mas instrucciones desde un print hasta llamadas de funciones, tambien se hace el llamado de break cada vez que la condicional sea correcta para poder salir del switch.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - condition: la condicional que viene a evaluar en el switch.
    - instructionCase:  Instrucciones de cada case.
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

## 📋 Ternary
    class Ternary extends Instruction {
      constructor(condition, instructionsTrue, instructionsFalse, row, column) {
        super(row, column);
        this.condition = condition;
        this.instructionsTrue = instructionsTrue;
        this.instructionsFalse = instructionsFalse;
        this.type = null;
      }
- ### Descripción: 
  Operador ternario, evalua una condición, si esta es evaluada como correcta ejecuta una instrucción y si es falsa ejecuta una instrucción diferente, es una manera corta de un if sencillo.
  
    #### Parámetros del constructor
    - condition: Condición que se evaluará.
    - instructionsTrue: Instrucción que se ejecutará si la condición es verdadera.
    - instructionsFalse: Instrucción que se ejecutará si la condición es falsa.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.


## 📋 For
    class For extends Instruction {
        constructor(variable, condition, inc_decre, instructions_for, row, column) {
            super(row, column);
            this.variable = variable;
            this.condition = condition;
            this.inc_decre = inc_decre;
            this.instructions_for = instructions_for;
        }
    }
- ### Descripcion: 
  En la clase For esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase For.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - variable: variable que puede ir decrementando o incrementable que se puede declarar ahi mismo o puede que ya exista en un entorno anterior.
    - condition: la condicional que viene a evaluar en el for.
    - instructions_for:  Instrucciones del for.
    - inc_decre: mandamos si es incrementable o decrementable que venga asi se ejecuta.
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

- ### verifyId:
  Verificamos si la varible que viene sea la misma que venga en inc_decre, si no lo tomamos como error semantico.
- ### verifyExistId: 
  Este nos ayuda a verificar si la variable que viene ya existe si en un caso no venga una declaracion, si no viene el tipo para declarar y existe entonces se retorna la informacion de dicha variable.

## 📋 For In
    class ForIn extends Instruction {
        constructor(identifier, expression, instructions, row, column) {
            super(row, column);
            this.identifier = identifier;
            this.expression = expression;
            this.instructions = instructions; 
        }
    }
    
- ### Descripcion: 
En la clase For in  esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase For in.

Para recorrer una cadena de string o un array de valores desde un rango de posiciones del array.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - identifier: variable que recorrera el for in.
    - expression: la expresion que viene a evaluar en el for puede ser una operacion o un array o string que recorrerlo entre otros.
    - instructions:  Instrucciones del for in.    
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
## 📋 While
    class While extends Instruction{
        constructor(condition, instructions, row, column){
            super(row, column);
            this.condition = condition;
            this.instructions = instructions; 
        }
    }
- ### Descripcion: 
  En la clase While esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase While.

  Validamos las condicionales llamandola desde otra clase que se llama condicion en la cual evaluamos si es falso o verdadero, si es falso seguimos ejecutando las instrucciones del while, si no nos salimos.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - condition: la condicional que viene a evaluar.
    - instructions:  Instrucciones del while.    
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
  
## 📋 Do While
    class Do extends Instruction {
        constructor(condition, instructions, row, column) {
            super(row, column);
            this.condition = condition;
            this.instructions = instructions; 
        }
    }
- ### Descripcion: 
 En la clase Do esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Do.

 ejecutamos y despues Validamos las condicionales llamandola desde otra clase que se llama condicion en la cual evaluamos si es falso o verdadero, si es falso seguimos ejecutando las instrucciones del while, si no nos salimos.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - condition: la condicional que viene a evaluar.
    - instructions:  Instrucciones del do while.    
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.


## 📋 Post Fixes
    class Post_fixed extends Instruction{
        constructor(identifier, action, row, column){
            super(row, column);
            this.identifier = identifier;
            this.action = action;
            this.type = null;
        }
    }

- ### Descripcion: 
 En la clase Post Fixes esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Post Fixes.

 Aqui hacemos las validaciones para incrementar o decrementar una variable la podemos hacer llamar desde otra clase cuando la necesitamos.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - identifier: variable que vamos a asignarle nuevo valor.
    - action: la accion si se le incrementa el valor a la variable o decrementa.   
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

## 📋 Print
    class Print extends Instruction {
        constructor(row, column, expression, jump) {
            super(row, column);
            this.expression = expression;
            this.jump = jump;
        }
    }
- ### Descripcion: 
  En la clase Print esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Print.
  Aqui podemos mandar a imprimir en consola las ejecuciones desde una funcion que me trae un valor o de un nodo hasta operaciones y condiciones.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - expression: lo que deseamos imprimir en la ejecucion.
    - jump: si es con salto de linea o sin salto.   
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
  
## 📋 Break
    class Break extends Instruction {
        constructor(row, column) {
            super(row, column);
        }
    }
- ### Descripcion: 
  En la clase Break esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Break.
  Llamada de funcion cuando venga un break en una instruccion hace que salga de dicha instruccion.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

## 📋 Return
    class Return extends Instruction {
        constructor(expression, row, column) {
            super(row, column);
            this.expression = expression;
            this.type = null;
            this.result = null;
        }
    }
- ### Descripcion: 
  En la clase Break esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Break.
  Llamada de funcion cuando venga un break en una instruccion hace que salga de dicha instruccion.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

## 📋 Continue
    class Continue extends Instruction{
        constructor(row, column){
            super(row, column);
        }
    }
- ### Descripcion: 
  En la clase Break esta extendida a Instruction esto es porque le definimos que Instruccion sera padre de la clase Break.
  Llamada de funcion cuando venga un break en una instruccion hace que salga de dicha instruccion.
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
## 📋 TemplateStruct
    class TemplateStruct extends Instruction {
      constructor(name, parameters, row, column) {
        super(row, column);
        this.name = name;
        this.parameters = parameters;
      }
- ### Descripción: 
  Es utilizada para guardar la información para la creación de structs de este tipo, define las variables que cada objeto contendrá en su interior al igual que el tipo del struct creado.
  
    #### Parámetros del constructor
    - name: Nombre que se le asigna a la plantilla de struct que se cargará al sistema.
    - parameters: Lista de parámetros con los que debe cumplir cada instancia de struct.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 CreateStruct
    class CreateStruct extends Instruction {
      constructor(structName, nameObject, structName2, parameters, row, column) {
        super(row, column);
        this.structName = structName;
        this.nameObject = nameObject;
        this.structName2 = structName2;
        this.parameters = parameters;
      }
- ### Descripción: 
  En esta clase se envía la información del struct que se desea crear, obtiene el identificador con el que se nombrará el objeto, el nombre de la plantilla del struct a crear y los Parámetros que se le asignaran a sus variables.
  
    #### Parámetros del constructor
    - structName: Nombre de la plantilla de struct que se solicita crear.
    - nameObject: Nombre que se le asignará a la instancia del objeto struct.
    - parameters: Lista de parámetros con los que debe cumplir cada instancia de struct.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 AccessAtributeStruct
    class AccessAtributeStruct extends Instruction{
      constructor(id, parameters, row, column){
        super(row, column);
        this.id = id;
        this.parameters = parameters;
        this.type = null;
        this.objectType = null;
      }
- ### Descripción: 
  Para obtener el o los valores que un objeto struct contiene utilizamos esta clase en la cual hacemos hacemos una busqueda en los Parámetros que este posee hasta dar en el que se solicita, una vez encontrado se devuelve para la operación que se desea realizar.
  
    #### Parámetros del constructor
    - id: Nombre de la instancia del objeto struct que se solicita.
    - parameters: Lista de parámetros con los que debe cumplir cada instancia de struct.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 ChangeValueStruct
    class ChangeValueStruct extends Instruction{
      constructor(id, parameters, expression, row, column){
        super(row, column);
        this.id = id;
        this.expression = expression;
        this.parameters = parameters;
      }
- ### Descripción: 
  Cuando se desea cambiar el valor que un atributo de los objetos de tipo struct que se  poseen se utiliza esta clase.
  
    #### Parámetros del constructor
    - id: Nombre de la instancia del objeto struct que se solicita.
    - parameters: Lista de parámetros con los que debe cumplir cada instancia de struct.
    - expression: Al ejecutar esta obtenemos el nuevo valor que se asignará al atributo.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 DeclarationArray
    class DeclarationArray extends Instruction {
      constructor(type, identifier, listObjects, row, column) {
        super(row, column);
        this.type = type;
        this.identifier = identifier;
        this.listObjects = listObjects;
      }
- ### Descripción: 
  Esta clase es utilizada para la creación de arreglos y así almacenar toda la información necesaria para guardarlos.
  
    #### Parámetros del constructor
    - tye: Nombre del dato primitivo para referenciar el tipo de dato que contendrá el arreglo.
    - identifier: Identificador del objeto de tipo arreglo que se va a crear.
    - listObjects: Lista de expresiones que que se le asignará al arreglo.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 AccessArray
    class AccessArray extends Instruction{
      constructor(id, parameters, row, column){
        super(row, column);
        this.id = id;
        this.parameters = parameters;
        this.type = null;
        this.objectType = null;
      }
- ### Descripción: 
  Esta clase es utilizada para obtener un valor en específico al cual se desea acceder, el mismo es enviada en una posición.
  
    #### Parámetros del constructor
    - id: Identificador del objeto de tipo arreglo al que se va a acceder.
    - parameters: Lista posiciones en las cuales se buscará un valor.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 ChangeValueArray
    class ChangeValueArray extends Instruction{
      constructor(id, parameters, expression, row, column){
        super(row, column);
        this.id = id;
        this.expression = expression;
        this.parameters = parameters;
        this.type = null;
      }
- ### Descripción: 
  Cuando se desea cambiar el valor de una posición de un arreglo se utiliza esta clase.
  
    #### Parámetros del constructor
    - id: Identificador del objeto de tipo arreglo al que se va a acceder.
    - parameters: Lista posiciones en las cuales se buscará un valor.
    - expression: Al ejecutar esta obtenemos el nuevo valor que se asignará al atributo.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 CopyArray
    class CopyArray extends Instruction{
      constructor(id, row, column){
        super(row, column);
        this.id = id;
        this.type = null;
        this.objectType = null;
      }
- ### Descripción: 
  Debido a que Quetzal maneja los arreglos por referencia, en el momento que se desea crear una copia exactamente igual de un arreglo pero independiente del mismo se utiliza esta clase.
  
    #### Parámetros del constructor
    - id: Identificador del objeto de tipo arreglo al que se va a acceder.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 RangeArray
    class RangeArray extends Instruction{
      constructor(id, left, right, row, column){
        super(row, column);
        this.id = id;
        this.left = left;
        this.right = right;
        this.type = null;
        this.objectType = null;
      }
- ### Descripción: 
  Para interactuar con tramos en específico de un arreglo se hace uso de esta clase, misma que devuelve un tramo del arreglo.
  
    #### Parámetros del constructor
    - id: Identificador del objeto de tipo arreglo al que se va a acceder.
    - left: Posición inicial que se busca del arreglo.
    - right: Posición final que se busca del arreglo.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 Function
    class Function extends Instruction{
      constructor(type, name, parameters, instructions, row, column, objectType ){
        super(row, column);  
        this.type = type;
        this.name = name;
        this.parameters = parameters;
        this.instructions = instructions;
        this.objectType = objectType;
      }
- ### Descripción: 
  Crea una función en el sistema guardando toda la información necesaria para la posteriór ejecución.
  
    #### Parámetros del constructor
    - type: Tipo de retorno para el valor que develve la función.
    - name: Nombre que se le asignará a la función.
    - parameters: Lista de parámetros que recibe la función.
    - instructions: Lista de instrucciones que se ejecutarán en una llamada de función.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.
    - objectType: Tipo de objeto que retorna, en caso se devuelva un arreglo o struct.

## 📋 CallFunction
    class CallFunction extends Instruction {
      constructor(name, parameters, forArray, row, column) {
        super(row, column);
        this.name = name;
        this.parameters = parameters;
        this.forArray = forArray;
        this.type = null;
        this.objectType = null;
      }
- ### Descripción: 
  Objeto que se encargará de realizar una llamada de función para luego ejecutarla.
  
    #### Parámetros del constructor
    - name: Nombre de la función que se llama.
    - parameters: Lista de parámetros que recibe la función.
    - forArray: Parámetro booleano que se envia para saber si es una función nativa de arreglos.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 Natives
    class Natives extends Instruction {
      constructor(name, parameters, forArray, row, column) {
        super(row, column);
        this.name = name;
        this.parameters = parameters;
        this.forArray = forArray;
        this.type = null;
        this.objectType = null;
      }
- ### Descripción: 
  Objeto que se encargará de realizar una llamada de función nativa, propia de Quetzal, para luego ejecutarla.
  
    #### Parámetros del constructor
    - name: Nombre de la función nativa a llamar.
    - parameters: Lista de parámetros que recibe la función.
    - forArray: Parámetro booleano que se envia para saber si es una función nativa de arreglos.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.

## 📋 NativeMethods
    class NativeMethods extends Instruction {
      constructor(name, method, parameters, row, column) {
        super(row, column);
        this.name = name;
        this.method = method;
        this.parameters = parameters;
        this.type = null;
      }
- ### Descripción: 
  Objeto que se encargará de ejecutar un metodo nativo propia de Quetzal, específico para un  tipo de objeto.
  
    #### Parámetros del constructor
    - name: Nombre del objeto al que se le aplicará el metodo.
    - method: Nombre del método nativo a ejecutar.
    - parameters: Lista de parámetros que recibe el método.
    - row: Para llevar control de la línea.
    - column: Para llevar control de la columna.
## 📋 ErrorList
    static errorList = [];
- ### Descripcion: 
  Esta clase nos ayudara para llevar el control de todos los tipos de error desde lexicos, sintacticos y semanticos.
- ### Metodos:  
    - cleanErrorList: Limpio toda la lista de errores.
    - addError:  Agrego un error a la lista de errores.
    - getErrorList: Obtengo todos los datos de la lista.
    - isErrors: Validar si tiene errores.
    - showErrors: Para imprimir en consola los errores que vengan.


## 📋 ErrorNode
  
    constructor(line, column, errorType, description, environmentType) {
        this.line = line;
        this.column = column;
        this.errorType = errorType;
        this.description = description;
        this.environmentType = environmentType;
    }
- ### Descripcion: 
- ### Constructor: 
  Este constructor nos ayudara para mayor facilidad a la hora de mandar los datos desde jison la gramatica.
  
    #### Parametros
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
## 📋 moveDivs
- ### Descripcion: 

- ### Metodos:  
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
## 📋 Node
    static errorList = [];
- ### Descripcion: 

- ### Metodos:  
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.

## 📋 Table Report
    static errorList = [];
- ### Descripcion: 

- ### Metodos:  
    - row:  para llevar control de la linea.
    - column:  para llevar control de la columna.
