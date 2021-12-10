
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
[0-9]+("."[0-9]+)+\b            return "doubleVal";
[0-9]+\b                        return "intVal";
\"((\\\")|[^\n\"])*\"           { yytext = yytext.substr(1,yyleng-2); return 'stringVal'; }
\'((\\\')|[^\n\'])*\'	        	{ yytext = yytext.substr(1,yyleng-2); return 'charVal'; }
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
/* ERROR */
. { ErrorList.addError(new ErrorNode(yylloc.first_line,yylloc.first_column,new ErrorType(EnumErrorType.LEXICO),`El caracter: "${yytext}" no pertenece al lenguaje`,ENVIRONMENT.NULL)); }

/*.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }*/
/lex

/* Asociación de operadores y precedencia */
%left '||'
%left '&&'
%left '?'
%left '^'
%right '!'
%left '==' '!=' '<' '<=' '>' '>='
%left '+' '-'
%left '*' '/' '%'
%right '++' '--'
%right '&'
%right UMENOS
%left 'PAROP' 'PARCLS'

%left 'EOF'

%start INIT

%ebnf

%% /* Definición de la gramática */

INIT: SENTENCES EOF             {  return $1;}
    | EOF
;

SENTENCES
  : SENTENCES SENTENCE          { $$=$1; $$.push($2); }
  | SENTENCE                    { $$=[]; $$.push($1); }
;

SENTENCE
  : FUNCT                       { $$ = $1; }
  | PRINT                       { $$ = $1; }
  | DECLARATION                 { $$ = $1; }
  | ASSIGNMENT                  { $$ = $1; }
  | SENTENCE_IF                 { $$ = $1; }
  | SENTENCE_WHILE              { $$ = $1; }
  | SENTENCE_DO_WHILE           { $$ = $1; }
  | SENTENCE_SWITCH             { $$ = $1; }
  | SENTENCE_FOR                { $$ = $1; }
  | RETUR                       { $$ = $1; }
  | BREAKS                      { $$ = $1; }
  | CONTINU                     { $$ = $1; }
  | CALL_FUNCTION PTOCOMA       { $$ = $1; }
  | POST_FIXED PTOCOMA          { $$ = $1; }
  | TEMPLATE_STRUCT             { }
  | CREATE_STRUCT               { }
  | error PTOCOMA               { ErrorList.addError(new ErrorNode(this._$.first_line,this._$.first_column,new ErrorType(EnumErrorType.SYNTACTIC),` Error sintactico `,ENVIRONMENT.NULL)); $$ = new InstructionError(); }
  | error KEYCLS                { ErrorList.addError(new ErrorNode(this._$.first_line,this._$.first_column,new ErrorType(EnumErrorType.SYNTACTIC),` Error sintactico `,ENVIRONMENT.NULL)); $$ = new InstructionError(); }
;

CREATE_STRUCT
  : ID ID '=' ID PAROP L_E PARCLS PTOCOMA             {console.log($1, $2, $3, $4, $5, $6, $7, $8); }
;

TEMPLATE_STRUCT
  : STRUCT ID KEYOP PARAMETERS KEYCLS PTOCOMA            { console.log($1, $2, $3, $4, $5, $6); }
;

PRINT
  : Rprint PAROP EXP PARCLS PTOCOMA		  { $$ = new Print(this._$.first_line,this._$.first_column,$3,false); }
  | Rprintln PAROP EXP PARCLS PTOCOMA		{ $$ = new Print(this._$.first_line,this._$.first_column,$3,true); }
;

DECLARATION
  : TIPO IDENTIFIERS PTOCOMA                    { $$ = new Declaration($1, $2, null, @1.first_line, @1.first_column); }
  | TIPO ID '=' EXP PTOCOMA                     { $$ = new Declaration($1, $2, $4, @1.first_line, @1.first_column); }
  | TIPO COROP CORCLS IDENTIFIERS PTOCOMA       { $$ = new Declaration(null, null, null, @1.first_line, @1.first_column); }
  | TIPO COROP CORCLS ID '=' EXP PTOCOMA        { $$ = new Declaration(null, null, null, @1.first_line, @1.first_column); }
;

IDENTIFIERS
  : IDENTIFIERS COMA ID                 { $$=$1; $$.push($3); }
  | ID                                  { $$=[]; $$.push($1); }
;

ASSIGNMENT
  : ID '=' EXP PTOCOMA                                            { $$ = new Assignation($1, $3, @1.first_line, @1.first_column); }
  | ID COROP CORCLS '=' PARAMETROS                                {  }
  | COROP CORCLS ID '=' COROP PARAMETROS CORCLS PTOCOMA           {  }
;

EXP
  : EXP '&'  EXP                              { $$ = new Strings($1, STRINGS.CONCAT, $3, @1.first_line, @1.first_column); }
  | EXP '+'  EXP                              { $$ = new Aritmetica($1, ARITMETIC_OPERATOR.SUM, $3, @1.first_line, @1.first_column); }
  | EXP '-'  EXP                              { $$ = new Aritmetica($1, ARITMETIC_OPERATOR.REST, $3, @1.first_line, @1.first_column); }
  | EXP '*' EXP                               { $$ = new Aritmetica($1, ARITMETIC_OPERATOR.MULT, $3, @1.first_line, @1.first_column); }
  | EXP '/' EXP                               { $$ = new Aritmetica($1, ARITMETIC_OPERATOR.DIV, $3, @1.first_line, @1.first_column); }
  | EXP '%' EXP                               { $$ = new Aritmetica($1, ARITMETIC_OPERATOR.MOD, $3, @1.first_line, @1.first_column); }
  | EXP '^' EXP                               { $$ = new Aritmetica($1, ARITMETIC_OPERATOR.POT, $3, @1.first_line, @1.first_column); }
  | '!' EXP                                   { $$ = new Logic($2, LOGIC_OPERATOR.NOT, null, @1.first_line, @1.first_column); }
  | '-' EXP %prec UMENOS                      { $$ = new Aritmetica($2, ARITMETIC_OPERATOR.UMENOS, null, @1.first_line, @1.first_column); }
  | EXP '<'  EXP                              { $$ = new Relational($1, RELATIONAL_OPERATOR.MENQ , $3, @1.first_line, @1.first_column); }
  | EXP '>'  EXP                              { $$ = new Relational($1, RELATIONAL_OPERATOR.MAYQ , $3, @1.first_line, @1.first_column); }
  | EXP '&&' EXP                              { $$ = new Logic($1, LOGIC_OPERATOR.AND, $3, @1.first_line, @1.first_column); }
  | EXP '||' EXP                              { $$ = new Logic($1, LOGIC_OPERATOR.OR, $3, @1.first_line, @1.first_column); }
  | EXP '!=' EXP                              { $$ = new Relational($1, RELATIONAL_OPERATOR.DIFFERENT , $3, @1.first_line, @1.first_column); }
  | EXP '==' EXP                              { $$ = new Relational($1, RELATIONAL_OPERATOR.IDENT , $3, @1.first_line, @1.first_column); }
  | EXP '>=' EXP                              { $$ = new Relational($1, RELATIONAL_OPERATOR.MAYEQ , $3, @1.first_line, @1.first_column); }
  | EXP '<=' EXP                              { $$ = new Relational($1, RELATIONAL_OPERATOR.MENEQ , $3, @1.first_line, @1.first_column); }
  | CALL_FUNCTION                             { $$ = $1; }
  | PRIMITIVO                                 { $$ = $1; }
  | PAROP EXP PARCLS                          { $$ = $2; }
  | COROP L_E CORCLS                          { $$ = ($1.toString()+$2.toString()+$3.toString()); }
  | ID COROP L_E CORCLS                       { $$ = ($1.toString()+$2.toString()+$3.toString()+$4.toString()); }
  | EXP '?' EXP DOSPTOS EXP                   { $$ = ($1.toString()+$2.toString()+$3.toString()+$4.toString()+$5.toString()); }
  | ID                                        { $$ = new Identifier($1, @1.first_line, @1.first_column,ENVIRONMENT.NULL); }
  | POST_FIXED                                { $$ = $1; }
;

L_E
  : L_E COMA EXP                { $$=$1; $$.push($3); }
  | EXP                         { $$=[]; $$.push($1); }
;

PRIMITIVO
  : nullVal         { $$ = new Primitive(Type.NULL,  $1, @1.first_line, @1.first_column); }
  | intVal          { $$ = new Primitive(Type.INT,  $1, @1.first_line, @1.first_column); }
  | doubleVal       { $$ = new Primitive(Type.DOUBLE,  $1, @1.first_line, @1.first_column); }
  | charVal         { $$ = new Primitive(Type.CHAR,  $1, @1.first_line, @1.first_column); }
  | stringVal       { $$ = new Primitive(Type.STRING,  $1, @1.first_line, @1.first_column); }
  | trueVal         { $$ = new Primitive(Type.BOOLEAN,  $1, @1.first_line, @1.first_column); }
  | falseVal        { $$ = new Primitive(Type.BOOLEAN,  $1, @1.first_line, @1.first_column); }
;

TIPO
  : INT                                       { $$=Type.INT; }
  | DOUBLE                                    { $$=Type.DOUBLE; }
  | BOOLEAN                                   { $$=Type.BOOLEAN; }
  | STRING                                    { $$=Type.STRING; }
  | CHAR                                      { $$=Type.CHAR; }
  | VOID                                      { $$=Type.NULL; }
;

SENTENCE_FOR
  : FOR PAROP TIPO ID '=' EXP PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK  { console.log($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11); }
  | FOR PAROP ID '=' EXP PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK       { console.log($1,$2,$3,$4,$5,$6,$7,$8,$9,$10); }
  | FOR PAROP ID PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK               { console.log($1,$2,$3,$4,$5,$6,$7,$8,$9); }
  | FOR ID IN EXP BLOCK                                                    { console.log($1,$2,$3,$4,$5); }
;

BLOCK
  : KEYOP SENTENCES KEYCLS  { $$ = $2; }
  | KEYOP KEYCLS            { $$ = []; }
;

POST_FIXED
  : ID '--'   { $$=($1.toString()+$2.toString()); }
  | ID '++'   { $$=($1.toString()+$2.toString()); }
;

CUERPO
  : PRINT                       {  $$ = $1; }
  | DECLARATION                 {  $$ = $1; }
  | ASSIGNMENT                  {  $$ = $1; }
  | SENTENCE_WHILE              {  $$ = $1; }
  | SENTENCE_DO_WHILE           {  $$ = $1; }
  | SENTENCE_SWITCH             {  $$ = $1; }
  | SENTENCE_FOR                {  $$ = $1; }
  | RETUR                       {  $$ = $1; }
  | BREAKS                      {  $$ = $1; }
  | CONTINU                     {  $$ = $1; }
  | CALL_FUNCTION PTOCOMA       {  $$ = $1,$2; }
  | error PTOCOMA               { ErrorList.addError(new ErrorNode(this._$.first_line,this._$.first_column,new ErrorType(EnumErrorType.SYNTACTIC),` Error sintactico `,ENVIRONMENT.NULL)); $$ = new InstructionError(); }
  | error KEYCLS                { ErrorList.addError(new ErrorNode(this._$.first_line,this._$.first_column,new ErrorType(EnumErrorType.SYNTACTIC),` Error sintactico `,ENVIRONMENT.NULL)); $$ = new InstructionError(); }
;

BLOCK_IF
  : KEYOP SENTENCES KEYCLS  { $$ = $2; }
  | KEYOP KEYCLS            { $$ = []; }
  | CUERPO                  { $$ = $1; }
;

SENTENCE_IF
  : IF PAROP EXP PARCLS BLOCK_IF ELSE_IF  { $$ = new If($3, $5, $6, @1.first_line, @1.first_column); }
;

ELSE_IF
  : ELSE IF PAROP EXP PARCLS BLOCK ELSE_IF  { $$ = new If($4, $6, $7, @1.first_line, @1.first_column); }
  | ELSE BLOCK_IF                           { $$ = $2; }
  | /*epsilone*/                            { $$ = null; }
;

SENTENCE_SWITCH
  : SWITCH PAROP EXP PARCLS BLOCK_SWITCH { $$ = new Switch($3,$5,this._$.first_line,this._$.first_column); }
;

BLOCK_SWITCH
  : KEYOP L_CASE KEYCLS         { $$ = $2; }
  | KEYOP KEYCLS                { $$ = []; }
;

L_CASE
  : L_CASE CASES  { $$=$1; $$.push($2);}
  | CASES         { $$=[]; $$.push($1); }
;

CASES
  : CASE EXP BLOCK_CASES        { $$ = new CaseSwitch($2, $3, this._$.first_line, this._$.first_column);}
  | DEFAULT BLOCK_CASES         { $$ = new CaseSwitch(null, $2, this._$.first_line, this._$.first_column);}
;

BLOCK_CASES
  : DOSPTOS SENTENCES       { $$ = $2; }
  | DOSPTOS                 { $$ = []; }
;

SENTENCE_WHILE
  : WHILE PAROP EXP PARCLS BLOCK            { $$ = new While($3, $5, @1.first_line, @1.first_column); }
;

SENTENCE_DO_WHILE
  : DO BLOCK WHILE PAROP EXP PARCLS PTOCOMA { $$ = new Do($5, $2, @1.first_line, @1.first_column); }
;

FUNCT
  : TIPO ID PAROP PARCLS BLOCK               { $$ =new Function($1, $2, {}, $5, @1.first_line,  @1.first_column); }
  | TIPO ID PAROP PARAMETERS PARCLS BLOCK    { $$ =new Function($1, $2, $4, $6, @1.first_line,  @1.first_column); }
;

PARAMETERS
  : PARAMETERS COMA PARAMETER   { $$=$1; $$[$3.Identifier] = $3; }
  | PARAMETER                   { $$={}; $$[$1.Identifier] = $1; }
;

PARAMETER
  : TIPO ID                     { $$={"Identifier":$2, "Type":$1}; }
  //| TIPO ID COROP CORCLS        { $$=($1.toString()+$2.toString()+$3.toString()+$4.toString()); }
  | ID ID                       { $$={"Identifier":$2, "Type":$1}; }
;

CALL_FUNCTION
  : ID PAROP L_E PARCLS         { $$ = new CallFunction($1, $3, @1.first_line,  @1.first_column); }
  | ID PAROP PARCLS             { $$ = new CallFunction($1, [], @1.first_line,  @1.first_column); }
;

BREAKS
  : BREAK PTOCOMA       { $$ = new Break(@1.first_line,  @1.first_column); }
;

CONTINU
  : CONTINUE PTOCOMA    { $$ = new Continue(@1.first_line, @1.first_column); }
;

RETUR
  : RETURN PTOCOMA     { $$ = new Return(null, @1.first_line, @1.first_column); }
  | RETURN EXP PTOCOMA { $$ = new Return($2, @1.first_line, @1.first_column); }
;
