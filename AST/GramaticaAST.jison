
%lex

%options case-sensitive
lex_identificador   [A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*

%%
//--------------------Para comentarios y caracteres en blanco----------------------
"//".*            	                          {} //Linea simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {} //Multilinea
[ \r\t]+                                      {}
\n                                            {}
//---------------------------------------------------------------------------------

//--------------------Para valores primitivos--------------------------------------
"null"			    	              return "nullVal";
"true"			    	              return "trueVal";
"false"			    	              return "falseVal";
[0-9]+("."[0-9]+)+\b                  return "doubleVal";
[0-9]+\b                              return "intVal";
\"((\\\")|[^\n\"])*\"                 { yytext = yytext.substr(1,yyleng-2); return 'stringVal'; }
\'((\\\')|[^\n\'])*\'	        	  { yytext = yytext.substr(1,yyleng-2); return 'charVal'; }
//---------------------------------------------------------------------------------

"print"			    		return "Rprint";
"println"			      return "Rprintln";
//-------------------------------------Simbolos--------------------------------

"("                 return 'PAROP';
")"                 return 'PARCLS';
";"                 return 'PTOCOMA';
","                 return 'COMA';
":"                 return 'DOSPTOS';
"["                 return 'COROP';
"]"                 return 'CORCLS';
"{"                 return 'KEYOP';
"}"                 return 'KEYCLS';
"."                 return 'PTO';

//-------------------------------Aritmetica----------------------------------
"++"                return '++';
"+"                 return '+';
"--"                return '--';
"-"                 return '-';
"*"                 return '*';
"^"                 return '^';
"/"                 return '/';
"%"                 return '%';
"?"                 return '?';

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
"&"                 return '&';
"||"                return '||';
"!"                 return '!';

//-----------------------------Reservadas-------------------------------------
"String"            return 'STRING';
"double"            return 'DOUBLE';
"int"               return 'INT';
"void"              return 'VOID';
"boolean"           return 'BOOLEAN';
"char"              return 'CHAR';

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

"toUppercase"       return 'TOUPPER';
"toLowercase"       return 'TOLOWER';
"subString"         return 'SUBSTR';
"length"            return 'LENGTH';
"caracterOfPosition" return 'CARACTERPOSC';
"push"              return 'PUSH';
"pop"               return 'POP';
"struct"            return 'STRUCT'
"parse"             return 'PARSE';

{lex_identificador} return 'ID'

<<EOF>>             return 'EOF';
/* ERROR */
. { ErrorList.addError(new ErrorNode(yylloc.first_line,yylloc.first_column,new ErrorType(EnumErrorType.LEXICO),`El caracter: "${yytext}" no pertenece al lenguaje`,ENVIRONMENT.NULL)); }

/*.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }*/
/lex

/* Asociación de operadores y precedencia */
%left '||'
%left '&&'
%left '?'
%left '&'
%right '!'
%left '==' '!=' '<' '<=' '>' '>='
%left '+' '-'
%left '*' '/' '%'
%right '++' '--'
%left '^'
%right UMENOS
%left 'PAROP' 'PARCLS'

%left 'EOF'

%start INIT

%ebnf

%% /* Definición de la gramática */

INIT: SENTENCES EOF             { $$ = { val: 0, node: newNode(yy, yystate, $1.node,'EOF')}; return $$;}
    | EOF                       { $$ = { val: 0, node: newNode(yy, yystate,'EOF')}; return $$;}
;

SENTENCES
  : SENTENCES SENTENCE          { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2.node)}; }
  | SENTENCE                    { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
;

SENTENCE
  : FUNCT                       { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | PRINT                       { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | DECLARATION PTOCOMA         { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | ASSIGNMENT PTOCOMA          { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_IF                 { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_WHILE              { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_DO_WHILE           { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_SWITCH             { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_FOR                { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | RETUR                       { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | BREAKS                      { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | CONTINU                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | CALL_FUNCTION PTOCOMA       { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2)}; }
  | POST_FIXED PTOCOMA          { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2)}; }
  | TEMPLATE_STRUCT             { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | CREATE_STRUCT               { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | error PTOCOMA               { $$ = { val: 0, node: newNode(yy, yystate,'error')}; }
  | error KEYCLS                { $$ = { val: 0, node: newNode(yy, yystate,'error')}; }
;

CREATE_STRUCT
  : ID ID '=' ID PAROP L_E PARCLS PTOCOMA             { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3,$4,$5, $6.node ,$7,$8)}; }
;

TEMPLATE_STRUCT
  : STRUCT ID KEYOP PARAMETERS KEYCLS PTOCOMA  { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3,$4.node,$5,$6)}; }
;

PRINT
  : Rprint PAROP EXP PARCLS PTOCOMA		    { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3.node,$4,$5)}; }
  | Rprintln PAROP EXP PARCLS PTOCOMA		{ $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3.node,$4,$5)}; }
  
;

DECLARATION
  : TIPO IDENTIFIERS                    { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2.node)}; }
  | TIPO ID '=' EXP                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3,$4.node)}; }
  | TIPO COROP CORCLS IDENTIFIERS       { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3,$4.node)}; }
  | TIPO COROP CORCLS ID '=' EXP        { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3,$4,$5,$6.node)}; }
;

IDENTIFIERS
  : IDENTIFIERS COMA ID                 { $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2,$3)}; }
  | ID                                  { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
;

ASSIGNMENT
  : ID '=' EXP                                            { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3.node)}; }
  | ID COROP CORCLS '=' PARAMETROS                        { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3,$4,$5.node)}; }
  //| COROP CORCLS ID '=' COROP PARAMETROS CORCLS           {  }
;

EXP
  : EXP '&'  EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '+'  EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '-'  EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '*' EXP                               { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '/' EXP                               { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '%' EXP                               { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '^' EXP                               { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | '!' EXP                                   { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node)}; }
  | '-' EXP %prec UMENOS                      { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node)}; }
  | EXP '<'  EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '>'  EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '&&' EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '||' EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '!=' EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '==' EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '>=' EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | EXP '<=' EXP                              { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
  | CALL_FUNCTION                             { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | PRIMITIVO                                 { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | PAROP EXP PARCLS                          { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node,$3)}; }
  | COROP L_E CORCLS                          { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node,$3)}; }
  | ID COROP L_E CORCLS                       { $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4)}; }
  | ID                                        { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | POST_FIXED                                { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | TERNARY                                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | METHODS                                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
;

METHODS
  : TIPO PTO METHOD PAROP L_E PARCLS           { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node,$4,$5.node,$6)}; }
  | ID PTO METHOD PAROP L_E PARCLS             { $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5.node,$6)}; }
  | ID PTO METHOD PAROP PARCLS                 { $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5)}; }
;

METHOD
  : TOUPPER             { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | TOLOWER             { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | SUBSTR              { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | LENGTH              { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | CARACTERPOSC        { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | PARSE               { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
;

TERNARY
  : EXP '?' EXP DOSPTOS EXP     { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node,$4,$5.node)};}
;

L_E
  : L_E COMA EXP                { $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2,$3.node)}; }
  | EXP                         { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
;

PRIMITIVO
  : nullVal         { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | intVal          { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | doubleVal       { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | charVal         { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | stringVal       { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | trueVal         { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | falseVal        { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
;

TIPO
  : INT                                       { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | DOUBLE                                    { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | BOOLEAN                                   { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | STRING                                    { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | CHAR                                      { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
  | VOID                                      { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
;

SENTENCE_FOR
  : FOR PAROP DECLARATION PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK      { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3.node,$4,$5.node,$6,$7.node,$8,$9.node)}; }
  | FOR PAROP ASSIGNMENT PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK       { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3.node,$4,$5.node,$6,$7.node,$8,$9.node)}; }
  | FOR PAROP ID PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK               { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3,$4,$5.node,$6,$7.node,$8,$9.node)}; }
  | FOR ID IN EXP BLOCK                                                    { $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3,$4.node,$5.node)};}
;

BLOCK
  : KEYOP SENTENCES KEYCLS  { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node,$3)}; }
  | KEYOP KEYCLS            { $$ = { val: 0, node: newNode(yy, yystate, $1,$2)}; }
;

POST_FIXED
  : ID '--'   { $$ = { val: 0, node: newNode(yy, yystate, $1,$2)}; }
  | ID '++'   { $$ = { val: 0, node: newNode(yy, yystate, $1,$2)}; }
;

CUERPO
  : PRINT                       {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | DECLARATION                 {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | ASSIGNMENT                  {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_WHILE              {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_DO_WHILE           {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_SWITCH             {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | SENTENCE_FOR                {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | RETUR                       {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | BREAKS                      {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | CONTINU                     {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
  | CALL_FUNCTION PTOCOMA       {  $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2)}; }
  | error PTOCOMA               {  $$ = { val: 0, node: newNode(yy, yystate, '; error')}; }
  | error KEYCLS                {  $$ = { val: 0, node: newNode(yy, yystate, '} error')}; }
;

BLOCK_IF
  : KEYOP SENTENCES KEYCLS  { $$ = { val: 0, node: newNode(yy, yystate,$1, $2.node,$3)}; }
  | KEYOP KEYCLS            { $$ = { val: 0, node: newNode(yy, yystate,$1, $2)}; }
  | CUERPO                  { $$ = { val: 0, node: newNode(yy, yystate,$1.node)}; }
;

SENTENCE_IF
  : IF PAROP EXP PARCLS BLOCK_IF ELSE_IF  { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3.node,$4,$5.node,$6.node)}; }
;

ELSE_IF
  : ELSE IF PAROP EXP PARCLS BLOCK ELSE_IF  { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3,$4.node,$5,$6.node,$7.node)}; }
  | ELSE BLOCK_IF                           { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node)}; }
  | /*epsilone*/                            { $$ = { val: 0, node: newNode(yy, yystate,'epsilon')}; }
;

SENTENCE_SWITCH
  : SWITCH PAROP EXP PARCLS BLOCK_SWITCH { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3.node,$4,$5.node)}; }
;

BLOCK_SWITCH
  : KEYOP L_CASE KEYCLS         { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node,$3)}; }
  | KEYOP KEYCLS                { $$ = { val: 0, node: newNode(yy, yystate,$1,$2)}; }
;

L_CASE
  : L_CASE CASES  { $$ = { val: 0, node: newNode(yy, yystate,$1.node,$2.node)};}
  | CASES         { $$ = { val: 0, node: newNode(yy, yystate,$1.node)};}
;

CASES
  : CASE EXP BLOCK_CASES        { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node,$3.node)};}
  | DEFAULT BLOCK_CASES         { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node)};}
;

BLOCK_CASES
  : DOSPTOS SENTENCES       { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node)}; }
  | DOSPTOS                 { $$ = { val: 0, node: newNode(yy, yystate,$1)}; }
;

SENTENCE_WHILE
  : WHILE PAROP EXP PARCLS BLOCK            { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3.node,$4,$5.node)}; }
;

SENTENCE_DO_WHILE
  : DO BLOCK WHILE PAROP EXP PARCLS PTOCOMA { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node,$3,$4,$5.node,$6,$7)}; }
;

FUNCT
  : TIPO ID PAROP PARCLS BLOCK               { $$ = { val: 0, node: newNode(yy, yystate,$1.node,$2,$3,$4,$5.node)}; }
  | TIPO ID PAROP PARAMETERS PARCLS BLOCK    { $$ = { val: 0, node: newNode(yy, yystate,$1.node,$2,$3,$4.node,$5,$6.node)}; }
;

PARAMETERS
  : PARAMETERS COMA PARAMETER   { $$ = { val: 0, node: newNode(yy, yystate,$1.node,$2,$3.node)}; }
  | PARAMETER                   { $$ = { val: 0, node: newNode(yy, yystate,$1.node)}; }
;

PARAMETER
  : TIPO ID                     { $$ = { val: 0, node: newNode(yy, yystate,$1.node,$2)}; }
  //| TIPO ID COROP CORCLS        { $$=($1.toString()+$2.toString()+$3.toString()+$4.toString()); }
  | ID ID                       { $$ = { val: 0, node: newNode(yy, yystate,$1,$2)}; }
;

CALL_FUNCTION
  : ID PAROP L_E PARCLS                         { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3.node,$4)}; }
  | ID PAROP PARCLS                             { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3)}; }
  | STRING PAROP L_E PARCLS                     { $$ = { val: 0, node: newNode(yy, yystate,$1,$2,$3.node,$4)}; }
;

BREAKS
  : BREAK PTOCOMA       { $$ = { val: 0, node: newNode(yy, yystate,$1,$2)}; }
;

CONTINU
  : CONTINUE PTOCOMA    { $$ = { val: 0, node: newNode(yy, yystate,$1,$2)}; }
;

RETUR
  : RETURN PTOCOMA     { $$ = { val: 0, node: newNode(yy, yystate,$1,$2)}; }
  | RETURN EXP PTOCOMA { $$ = { val: 0, node: newNode(yy, yystate,$1,$2.node,$3)}; }
;
