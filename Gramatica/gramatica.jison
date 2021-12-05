%{	
	var Consola = [];
	var EntornoGlobal = Entorno(null);
	
	function EjecutarBloque(LINS, ent){
    var retorno = null;
    for(var elemento of LINS){
        switch(elemento.TipoInstruccion){
            case "print":
                var e = Evaluar(elemento.Operacion, ent);
                Consola.push(e.Valor);
                break;
        }
        if(retorno){
            return retorno;
        }
    }
    return null;
  }

%}
%lex

%options case-insensitive
lex_identificador   [A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*

%%
//--------------------Para comentarios y caracteres en blanco----------------------
"//".*            	                          {} //Linea simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {} //Multilinea
[ \r\t]+                                      {}
\n                                            {}
//---------------------------------------------------------------------------------

//--------------------Para valores primitivos--------------------------------------
"null"			    	 	    return "nullVal";
"true"			    	 	    return "trueVal";
"false"			    	 	    return "falseVal";
[0-9]+\b                return "intVal";
[0-9]+("."[0-9]+)+\b    return "doubleVal";
\"((\\\")|[^\n\"])*\"   { yytext = yytext.substr(1,yyleng-2); return 'stringVal'; }
\'((\\\')|[^\n\'])*\'		{ yytext = yytext.substr(1,yyleng-2); return 'charVal'; }
//---------------------------------------------------------------------------------

"print"			    		return "Rprint";
"println"			  		return "Rprintln";
//-------------------------------------Simbolos--------------------------------

"("                 return 'PAROP';
")"                 return 'PARCLS';
";"                 return 'PTOCOMA';
","                 return 'COMA';
":"                 return 'DOSPTOS';
"?"                 return 'ASK';
"["                 return 'COROP';
"]"                 return 'CORCLS';
"{"                 return 'KEYOP';
"}"                 return 'KEYCLS';
"."                 return 'PTO';
"&"                 return 'CONCAT';

//-------------------------------Aritmetica----------------------------------
"++"                return '++';
"+"                 return '+';
"--"                return '--';
"-"                 return '-';
"*"                 return '*';
"^"                 return '^';
"/"                 return '/';
"%"                 return '%';

//-------------------------------Relacionales-----------------------------------
">="                return '>=';
">"                 return '>';
"<="                return '<=';
"<"                 return '<';
//------------------------------Comparacion-----------------------------------
"=="                return '==';
"!="                return '!=';
"="                 return '=';
//------------------------------Logicas---------------------------------------
"&&"                return '&&';
"||"                return '||';
"!"                 return '!';

//-----------------------------Reservadas-------------------------------------
"string"            return 'STRING'
"int"               return 'INT';
"void"              return 'VOID';
"boolean"           return 'BOOLEAN';

"push"              return 'PUSH';
"pop"               return 'POP';
"length"            return 'LENGTH';

"if"                return 'IF';
"for"               return 'FOR';
"in"                return 'IN';
"while"             return 'WHILE';
"do"                return 'DO';
"print"             return 'Rprint';
"println"           return 'Rprintln';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"default"           return 'DEFAULT';
"break"             return 'BREAK';
"return"            return 'RETURN';
"continue"          return 'CONTINUE';

"typeof"            return 'TYPEOF';
"touppercase"       return 'TOUPPER';
"tolowercase"       return 'TOLOWER';
"caracterOfPosition" return 'CARACTERPOSC';
"function"          return 'FUNCTION';
"struct"            return 'STRUCT'
"pow"               return 'POW';
"parse"             return 'PARSE';
"toint"             return 'TOINT';
"todouble"          return 'TODOUBLE';
"sin"               return 'SIN';
"cos"               return 'COS';
"tan"               return 'TAN';
"sqrt"              return 'SQRT';
"log10"             return 'LOG10';

<<EOF>>             return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */
%right '='
%right '?' ':'
%left '||'
%left '&&'
%left '!='
%left '==' 
%nonassoc '>' '>='
%nonassoc '<' '<='
%left '+' '-'
%left '*' '/' '%'
%right '**'
%right '!'
%right UMENOS
%right '++'
%right '--'
%right '('
%left ')'
%left '['
%left ']'
%left '{'
%left '}'
%left 'EOF'

%start INIT

%ebnf

%% /* Definición de la gramática */

INIT: SENTENCES EOF { return $1; }
    | EOF
;

SENTENCES: SENTENCES SENTENCE {  }
         | SENTENCE           {  }
;

SENTENCE: FUNCTIO            {   }
        | PRINT              {   }
        | DECLARATION        {   }
        | ASSIGNMENT         {   }
        | SENTENCE_IF        {   }
        | SENTENCE_WHILE     {   }
        | SENTENCE_DO_WHILE  {   }
        | SENTENCE_SWITCH    {   }
        | SENTENCE_FOR       {   }
        | RETUR              {   }
        | BREAKS             {   }
        | CONTINU            {   }
        | CALL_FUNCTION      {   }
        | error PTOCOMA      {   }
        | error KEYCLS       {   }
        ;

PUNTO_Y_COMA: PTOCOMA { }
            |/* epsilon */ {  }
            ;

PRINT
	: Rprint PAROP EXP PARCLS PUNTO_Y_COMA			        { }
	| Rprintln PAROP EXP PARCLS PUNTO_Y_COMA		        { }
;

DECLARATION: TIPO ID PUNTO_Y_COMA                                              { }
          | TIPO ID '=' EXP PUNTO_Y_COMA                                       { }
          | TIPO COROP CORCLS ID PUNTO_Y_COMA                                  { }
          | TIPO COROP CORCLS ID '=' COROP PARAMETROS CORCLS PUNTO_Y_COMA      { }
;

ASSIGNMENT: ID '=' EXP PUNTO_Y_COMA                                             { }
  | ID COROP CORCLS '=' PARAMETROS                                              { }
  | COROP CORCLS ID '=' COROP PARAMETROS CORCLS PUNTO_Y_COMA                    { }
;

PARMETROS: PARAMETROS COMA PARAMETROS         {  }
         | EXP                                {  }
;

EXP: EXP '+'  EXP                             {  }
  | EXP '-'  EXP                              {  }
  | EXP '*' EXP                               {  }
  | EXP '/' EXP                               {  }
  | EXP '%' EXP                               {  }
  | EXP '&&' EXP                              {  }
  | EXP '<'  EXP                              {  }
  | EXP '||' EXP                              {  }
  | '!' EXP                                   {  }
  | '-' EXP %prec UMENOS                      {  }
  | EXP '!=' EXP                              {  }
  | EXP '==' EXP                              {  }
  | EXP '>=' EXP                              {  }
  | EXP '>'  EXP                              {  }
  | EXP '<=' EXP                              {  }
  | ID PAROP PARCLS                           {  }
  | ID PAROP PARMETROS PARCLS                 {  }
  | nullVal                                   {  }
  | intVal                                    {  }
  | doubleVal                                 {  }
  | stringVal                                 {  }
  | trueVal                                   {  }
  | falseVal                                  {  }
  | PAROP EXP PARCLS                          {  }
  | COROP L_E CORCLS                          {  }
  | EXP '?' EXP DOSPTOS EXP                   {  }
 // | ID PAROP L_E PARCLS                       {  }  PARA UN METODO ME TIRA ERROR 
 /* | '--'                                      {  }
  | '++'                                      {  }*/

;

L_E: L_E COMA EXP                             {  }
  | EXP                                       {  }
  ;

PRIMITIVO
  : nullVal                                   {  }
  | intVal                                    {  }
  | doubleVal                                 {  }
  | charVal                                   {  }
  | stringVal                                 {  }
  | trueVal                                   {  }
  | falseVal                                  {  }
;

TIPO
  : INT                                       {  }
  | DOUBLE                                    {  }
  | BOOLEAN                                   {  }
  | STRING                                    {  }
  | CHAR                                      {  }
;


SENTENCE_FOR: FOR PAROP TIPO L_ID '=' EXP PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK  { }
        | FOR PAROP ID '=' EXP PTOCOMA E PTOCOMA POST_FIXED PARCLS BLOCK { }
        | FOR PAROP ID PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK{ }
        | FOR L_ID IN EXP BLOCK { }
        ;

L_ID:   L_ID COMA ID {  }
        | ID           {  }
        ; 

BLOCK:    KEYOP SENTENCES KEYCLS {  }
        | KEYOP KEYCLS           {  }
        ;

POST_FIXED: '--'   {  }
          | '++'   {  }
          ;



SENTENCE_IF: ELSE_IF ELSE BLOCK {  }
        | ELSE_IF               {  }
        ;

ELSE_IF: ELSE_IF ELSE IF PAROP EXP PARCLS BLOCK {  }
        | IF PARCLS E PARCLS BLOCK              {  }
        //| ELSE BLOCK                             {  } ARREGLARLO CON ELSE 
        ;

SENTENCE_WHILE: WHILE PAROP EXP PARCLS BLOCK  { }
                ;

SENTENCE_DO_WHILE: DO BLOCK WHILE PAROP EXP PARCLS PUNTO_Y_COMA { }
                ;

FUNCTIO: FUNCTION_HEAD KEYOP FUNCTION_SENTENCES KEYCLS  {  }
        | FUNCTION_HEAD KEYOP KEYCLS                    {  }
        ;

FUNCTION_HEAD: FUNCTION ID PAROP PARCLS                                         {  }
              | FUNCTION ID PAROP L_PARAMETROS PARCLS                           {  }
              ;

FUNCTION_SENTENCES: FUNCTION_SENTENCE FUNCTION_SENTENCES   { }
                | FUNCTION_SENTENCE                        { }
                ;
    
FUNCTION_SENTENCE: PRINT      { }               
                | DECLARATION { }
                | ASSIGNMENT  { }
                | SENTENCE_IF { }
                | SENTENCE_WHILE { }
                | SENTENCE_DO_WHILE{ }
                | SENTENCE_SWITCH{ }
                | SENTENCE_FOR { }
                | RETUR  { }
                | BREAKS { }
                | CONTINU { } 
                | CALL_FUNCTION
                | FUNCTIO  { }
                | error PTOCOMA { }
                | error KEYCLS { }
                ;

L_PARAMETROS: L_PARAMETROS COMA PARAMETRO  {  }
            | PARAMETRO                    {  }
            ;

PARAMETRO: TIPO ID            {  }
        | TIPO ID L_DIMENSION {  }
        ;

L_DIMENSION: L_DIMENSION COROP CORCLS {  }
        | COROP CORCLS                {  }
        ;


CALL_FUNCTION:  ID PAROP L_E PARCLS PUNTO_Y_COMA {  }
              | ID PAROP PARCLS PUNTO_Y_COMA {  }
              ;

SENTENCE_SWITCH: SWITCH PAROP EXP PARCLS BLOCK_SWITCH {  }
                ;

BLOCK_SWITCH: KEYOP L_CASE KEYCLS {  }
        | KEYOP KEYCLS            {  }
        ;

L_CASE: L_CASE CASES {  }
        | CASES      {  }
        ;

CASES:   CASE EXP DOSPTOS SENTENCES    {  }
        | CASE EXP DOSPTOS            {  }
        | DEFAULT DOSPTOS             {  }
        | DEFAULT DOSPTOS SENTENCES   {  }
        ;

BREAKS: BREAK PUNTO_Y_COMA {  }
        ;

CONTINU: CONTINUE PUNTO_Y_COMA {  }
        ;

RETUR:  RETURN PTOCOMA    {  }
      | RETURN EXP PTOCOMA {  }
      ;


