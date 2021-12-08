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
  GLOBAL : 1,
  IF : 2,
  WHILE : 3,
  DO : 4,
  SWITCH : 5,
  FORIN : 6,
  FOR : 7,
  FUNCTION : 8,
  MAIN : 9,
  NULL : 10
}