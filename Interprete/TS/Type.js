const Type = {
  INT : 1,
  DOUBLE : 2,
  STRING : 3,
  CHAR : 4,
  BOOLEAN : 5,
  STRUCT : 6,
  ARRAY : 7,
  NULL : 8
}

const ARITMETIC_OPERATOR = {
  SUM : 1,
  REST : 2,
  MULT : 3,
  DIV : 4,
  POT : 5,
  MOD : 6,
  UMENOS : 7
}

const RELATIONAL_OPERATOR = {
  MAYQ : 1,
  MENQ : 2,
  MAYEQ : 3,
  MENEQ : 4,
  IDENT : 5,
  DIFFERENT : 6
}

const LOGIC_OPERATOR = {
  AND : 1,
  OR : 2,
  NOT : 3
}

const ENVIRONMENT = {
  GLOBAL : 'GLOBAL',
  IF : 'IF',
  WHILE : 'WHILE',
  DO : 'DO',
  SWITCH : 'SWITCH',
  FORIN : 'FORIN',
  FOR : 'FOR',
  FUNCTION : 'FUNCTION',
  MAIN : 'MAIN',
  NULL : 'NULL',
  VOID : 'VOID'
}

const STRINGS = {
  CONCAT : 1
}