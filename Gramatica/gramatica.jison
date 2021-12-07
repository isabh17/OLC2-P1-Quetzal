%{
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
"null"			    	return "nullVal";
"true"			    	return "trueVal";
"false"			    	return "falseVal";
[0-9]+("."[0-9]+)+\b            return "doubleVal";
[0-9]+\b                        return "intVal";
\"((\\\")|[^\n\"])*\"           { yytext = yytext.substr(1,yyleng-2); return 'stringVal'; }
\'((\\\')|[^\n\'])*\'		{ yytext = yytext.substr(1,yyleng-2); return 'charVal'; }
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
"string"            return 'STRING';
"double"            return 'DOUBLE';
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

{lex_identificador} return 'ID'

<<EOF>>             return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */
%right '='
%right '?' 'DOSPTOS'
%left '||'
%left '&&'
%left '!='
%left '==' 
%nonassoc '>' '>='
%nonassoc '<' '<='
%left '&'               //Averiguar que hacer con  la  concatenacion
%left '+' '-'
%left '*' '/' '%'
%right '^'
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

INIT: SENTENCES EOF { }
    | EOF
;

SENTENCES: SENTENCES SENTENCE {  }
         | SENTENCE           {  }
;

SENTENCE
  : FUNCTIO                     { }
  | PRINT                       { }
  | DECLARATION                 { }
  | ASSIGNMENT                  { }
  | SENTENCE_IF                 { }
  | SENTENCE_WHILE              { }
  | SENTENCE_DO_WHILE           { }
  | SENTENCE_SWITCH             { }
  | SENTENCE_FOR                { }
  | RETUR                       { }
  | BREAKS                      { }
  | CONTINU                     { }
  | CALL_FUNCTION PTOCOMA       { }
  | POST_FIXED PTOCOMA          { }
  | TEMPLATE_STRUCT             { }
  | CREATE_STRUCT               {  }
  | error PTOCOMA               { console.log("Error sintactico en punto y coma"); }
  | error KEYCLS                { console.log("Error sintactico en llave cierre"); }
;

CREATE_STRUCT
  : ID ID '=' ID PAROP L_E PARCLS PTOCOMA             {console.log($1, $2, $3, $4, $5, $6, $7, $8); }
;

TEMPLATE_STRUCT
  : STRUCT ID KEYOP PARAMETERS KEYCLS PTOCOMA            { console.log($1, $2, $3, $4, $5, $6); }
;

PRINT
  : Rprint PAROP EXP PARCLS PTOCOMA		{ console.log($1,$2,$3,$4,$5); }
  | Rprintln PAROP EXP PARCLS PTOCOMA		{ console.log($1,$2,$3,$4,$5); }
;

DECLARATION
  : TIPO IDENTIFIERS PTOCOMA                    { console.log($1, $2, $3); }
  | TIPO ID '=' EXP PTOCOMA                     { console.log($1, $2, $3, $4, $5); }
  | TIPO COROP CORCLS IDENTIFIERS PTOCOMA       { console.log($1, $2, $3, $4, $5); }
  | TIPO COROP CORCLS ID '=' EXP PTOCOMA        { console.log($1, $2, $3, $4, $5, $6, $7); }
;

IDENTIFIERS
  : IDENTIFIERS COMA ID                 { $$=($1.toString()+$2.toString()+$3.toString()); }
  | ID                                  { $$=$1.toString(); }
;

ASSIGNMENT
  : ID '=' EXP PTOCOMA                                            { console.log($1, $2, $3, $4); }
  | ID COROP CORCLS '=' PARAMETROS                                {  }
  | COROP CORCLS ID '=' COROP PARAMETROS CORCLS PTOCOMA           {  }
;

EXP
  : EXP '&'  EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '+'  EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '-'  EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '*' EXP                               { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '/' EXP                               { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '%' EXP                               { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '^' EXP                               { $$=($1.toString()+$2.toString()+$3.toString()); }
  | '!' EXP                                   { $$=($1.toString()+$2.toString()); }
  | '-' EXP %prec UMENOS                      { $$=($1.toString()+$2.toString()); }
  | EXP '<'  EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '>'  EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '&&' EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '||' EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '!=' EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '==' EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '>=' EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP '<=' EXP                              { $$=($1.toString()+$2.toString()+$3.toString()); }
  | CALL_FUNCTION                             { $$=$1; }
  | PRIMITIVO                                 { $$=$1; }
  | PAROP EXP PARCLS                          { $$=($1.toString()+$2.toString()+$3.toString()); }
  | COROP L_E CORCLS                          { $$=($1.toString()+$2.toString()+$3.toString()); }
  | ID COROP L_E CORCLS                       { $$=($1.toString()+$2.toString()+$3.toString()+$4.toString()); }
  | EXP '?' EXP DOSPTOS EXP                   { $$=($1.toString()+$2.toString()+$3.toString()+$4.toString()+$5.toString()); }
  | ID                                        { $$=$1.toString(); }
  | POST_FIXED                                { $$=$1; }
;

L_E
  : L_E COMA EXP                { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP DOSPTOS EXP             { $$=($1.toString()+$2.toString()+$3.toString()); }
  | EXP                         { $$=$1; }
;

PRIMITIVO
  : nullVal                                   { $$=$1; }
  | intVal                                    { $$=$1; }
  | doubleVal                                 { $$=$1; }
  | charVal                                   { $$=$1; }
  | stringVal                                 { $$=$1; }
  | trueVal                                   { $$=$1; }
  | falseVal                                  { $$=$1; }
;

TIPO
  : INT                                       { $$=$1; }
  | DOUBLE                                    { $$=$1; }
  | BOOLEAN                                   { $$=$1; }
  | STRING                                    { $$=$1; }
  | CHAR                                      { $$=$1; }
;

SENTENCE_FOR
  : FOR PAROP TIPO ID '=' EXP PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK  { console.log($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11); }
  | FOR PAROP ID '=' EXP PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK       { console.log($1,$2,$3,$4,$5,$6,$7,$8,$9,$10); }
  | FOR PAROP ID PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK               { console.log($1,$2,$3,$4,$5,$6,$7,$8,$9); }
  | FOR ID IN EXP BLOCK                                                    { console.log($1,$2,$3,$4,$5); }
;

BLOCK
  : KEYOP SENTENCES KEYCLS  { $$=$1+$3; }
  | KEYOP KEYCLS            { $$=$1+$2; }
;

POST_FIXED
  : ID '--'   { $$=($1.toString()+$2.toString()); }
  | ID '++'   { $$=($1.toString()+$2.toString()); }
;

SENTENCE_IF
  : PRINCIPAL_IF ELSEIF                         {  }
  | PRINCIPAL_IF ELSE ELSEIF                    {  }
;

PRINCIPAL_IF
  : IF PAROP EXP PARCLS                         {  }
;

ELSEIF
  : BLOCK                                       {  }
  | SENTENCE                                    {  }
;

SENTENCE_WHILE
  : WHILE PAROP EXP PARCLS BLOCK  { console.log($1, $2, $3, $4, $5); }
;

SENTENCE_DO_WHILE
  : DO BLOCK WHILE PAROP EXP PARCLS PTOCOMA { console.log($1, $2, $3, $4, $5, $6, $7); }
;

FUNCTION
  : FUNCTION_HEADER ID PAROP PARCLS BLOCK               {  }
  | FUNCTION_HEADER ID PAROP PARAMETERS PARCLS BLOCK    {  }
;

FUNCTION_HEADER
  : TIPO                { $$=$1; }
  | VOID                { $$=$1; }
;

PARAMETERS
  : PARAMETERS COMA PARAMETER   { $$=($1.toString()+$2.toString()+$3.toString()); }
  | PARAMETER                   { $$=$1.toString(); }
;

PARAMETER
  : TIPO ID                     { $$=($1.toString()+$2.toString()); }
  | TIPO ID COROP CORCLS        { $$=($1.toString()+$2.toString()+$3.toString()+$4.toString()); }
  | ID ID                       { $$=($1.toString()+$2.toString()); }
;

CALL_FUNCTION
  : ID PAROP L_E PARCLS         { $$=($1.toString()+$2.toString()+$3.toString()+$4.toString()); }
  | ID PAROP PARCLS             { $$=($1.toString()+$2.toString()+$3.toString()); }
;

SENTENCE_SWITCH
  : SWITCH PAROP EXP PARCLS BLOCK_SWITCH {  }
;

BLOCK_SWITCH
  : KEYOP L_CASE KEYCLS         {  }
  | KEYOP KEYCLS                {  }
;

L_CASE
  : L_CASE CASES {  }
  | CASES      {  }
;

CASES
  : CASE EXP DOSPTOS SENTENCES          {  }
  | CASE EXP DOSPTOS                    {  }
  | DEFAULT DOSPTOS                     {  }
  | DEFAULT DOSPTOS SENTENCES           {  }
;

BREAKS
  : BREAK PTOCOMA               {  }
;

CONTINU
  : CONTINUE PTOCOMA            {  }
;

RETUR
  : RETURN PTOCOMA    {  }
  | RETURN EXP PTOCOMA {  }
;
