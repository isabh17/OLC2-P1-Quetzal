# Reporte Gramatical 


## Gramatica


        INIT::= SENTENCES EOF            
            | EOF
        ;

        SENTENCES::= SENTENCES SENTENCE          
                | SENTENCE                    
        ;

        SENTENCE::= FUNCT                       
                | PRINT                       
                | DECLARATION PTOCOMA         
                | CHANGE_VALUE_STRUCT        
                | ASSIGNMENT PTOCOMA          
                | SENTENCE_IF                 
                | SENTENCE_WHILE              
                | SENTENCE_DO_WHILE           
                | SENTENCE_SWITCH             
                | SENTENCE_FOR                
                | RETUR                       
                | BREAKS                      
                | CONTINU                     
                | CALL_FUNCTION PTOCOMA       
                | POST_FIXED PTOCOMA          
                | TEMPLATE_STRUCT             
                | CREATE_STRUCT               
                | METHODS PTOCOMA             
                | error PTOCOMA               
                | error KEYCLS                
        ;

        CHANGE_VALUE_STRUCT::= ID PTO ACCESS '=' EXP PTOCOMA       
        ;

        CREATE_STRUCT::= ID ID '=' ID PAROP L_E PARCLS PTOCOMA      
                      | ID ID '=' STRUCT_CASES PTOCOMA             
        ;

        STRUCT_CASES::= ID PAROP PARCLS                  
                    | ID PTO ACCESS                             
                    | ID                                        
                    | nullVal                                   
        ;

        TEMPLATE_STRUCT::= STRUCT ID KEYOP PARAMETERS KEYCLS PTOCOMA  
        ;

        PRINT::= Rprint PAROP EXP PARCLS PTOCOMA		  
             | Rprintln PAROP EXP PARCLS PTOCOMA		
        ;

        DECLARATION::= TIPO IDENTIFIERS                    
                    | TIPO ID '=' EXP                     
                    | TIPO COROP CORCLS ID '=' EXP        
                    | TIPO COROP CORCLS IDENTIFIERS      
                    | ID COROP CORCLS ID '=' EXP         
                    | ID COROP CORCLS IDENTIFIERS         
        ;

        IDENTIFIERS::= IDENTIFIERS COMA ID                
                    | ID                                 
        ;

        ASSIGNMENT::= ID '=' EXP                                    
                    | ID ACCESS_ARRAY '=' EXP                        
        ;

        EXP::= EXP '&'  EXP                             
            | EXP '+'  EXP                              
            | EXP '-'  EXP                             
            | EXP '*' EXP                              
            | EXP '/' EXP                             
            | EXP '%' EXP                             
            | EXP '^' EXP                              
            | '!' EXP                                   
            | '-' EXP %prec UMENOS                     
            | EXP '<'  EXP                              
            | EXP '>'  EXP                              
            | EXP '&&' EXP                              
            | EXP '||' EXP                              
            | EXP '!=' EXP                              
            | EXP '==' EXP                             
            | EXP '>=' EXP                              
            | EXP '<=' EXP                              
            | CALL_FUNCTION                             
            | PRIMITIVO                                
            | PAROP EXP PARCLS                          
            | ID COROP EXP DOSPTOS EXP CORCLS          
            | COROP L_E CORCLS                          
            | COROP CORCLS                              
            | ID ACCESS_ARRAY                          
            | ID                                       
            | '#' ID                                    
            | ARRAY_DOT                                
            | POST_FIXED                                
            | TERNARY                                  
            | ID PTO ACCESS                             
            | METHODS                                  
            ;

        ARRAY_DOT::= ID '#'                                   
                | ID ACCESS_ARRAY '#'                      
                | ID COROP EXP DOSPTOS EXP CORCLS '#'      
        ;

        ACCESS_ARRAY::= ACCESS_ARRAY COROP EXP CORCLS             
                    | COROP EXP CORCLS                          
        ;

        ACCESS::= ID PTO ACCESS                           
            | ID                                     
        ;

        METHODS::= TIPO PTO METHOD PAROP L_E PARCLS           
                | ID PTO METHOD PAROP L_E PARCLS             
                | ID PTO METHOD PAROP PARCLS                 
        ;

        METHOD::= TOUPPER             
                | TOLOWER             
                | SUBSTR             
                | LENGTH             
                | CARACTERPOSC        
                | PARSE               
                | PUSH                
                | POP                
        ;

        TERNARY::= EXP '?' EXP DOSPTOS EXP                 
        ;

        L_E::= L_E COMA EXP                
            | EXP                         
        ;

        PRIMITIVO::= nullVal         
                | intVal          
                | doubleVal      
                | charVal        
                | stringVal       
                | trueVal         
                | falseVal        
        ;

        TIPO::= INT                                       
        | DOUBLE                                    
        | BOOLEAN                                   
        | STRING                                    
        | CHAR                                      
        | VOID                                      
        ;

        SENTENCE_FOR::= FOR PAROP DECLARATION PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK      
                | FOR PAROP ASSIGNMENT PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK      
                | FOR PAROP ID PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK               
                | FOR ID IN EXP BLOCK                                                    
        ;

        BLOCK::= KEYOP SENTENCES KEYCLS  
            | KEYOP KEYCLS            
        ;

        POST_FIXED::= ID '--'   
                | ID '++'   
        ;

        CUERPO::= FUNCT                       
                | PRINT                       
                | DECLARATION PTOCOMA         
                | CHANGE_VALUE_STRUCT        
                | ASSIGNMENT PTOCOMA          
                | SENTENCE_WHILE              
                | SENTENCE_DO_WHILE           
                | SENTENCE_SWITCH             
                | SENTENCE_FOR                
                | RETUR                       
                | BREAKS                      
                | CONTINU                     
                | CALL_FUNCTION PTOCOMA       
                | POST_FIXED PTOCOMA          
                | TEMPLATE_STRUCT             
                | CREATE_STRUCT               
                | METHODS PTOCOMA             
                | error PTOCOMA               
                | error KEYCLS                
        ;

        BLOCK_IF::= KEYOP SENTENCES KEYCLS  
                | KEYOP KEYCLS            
                | CUERPO                  
        ;

        SENTENCE_IF::= IF PAROP EXP PARCLS BLOCK_IF ELSE_IF 
        ;

        ELSE_IF::= ELSE IF PAROP EXP PARCLS BLOCK ELSE_IF  
        | ELSE BLOCK_IF                           
        | /*epsilone*/                            
        ;

        SENTENCE_SWITCH::= SWITCH PAROP EXP PARCLS BLOCK_SWITCH 
        ;

        BLOCK_SWITCH::= KEYOP L_CASE KEYCLS         
        | KEYOP KEYCLS                
        ;

        L_CASE::= L_CASE CASES  
        | CASES         
        ;

        CASES::= CASE EXP BLOCK_CASES        
        | DEFAULT BLOCK_CASES         
        ;

        BLOCK_CASES::= DOSPTOS SENTENCES       
        | DOSPTOS                 
        ;

        SENTENCE_WHILE::= WHILE PAROP EXP PARCLS BLOCK            
        ;

        SENTENCE_DO_WHILE::= DO BLOCK WHILE PAROP EXP PARCLS PTOCOMA 
        ;

        FUNCT::= TIPO ID PAROP PARCLS BLOCK                            
        | TIPO ID PAROP PARAMETERS PARCLS BLOCK                 
        | TIPO COROP CORCLS ID PAROP PARAMETERS PARCLS BLOCK    
        | TIPO COROP CORCLS ID PAROP PARCLS BLOCK               
        | ID ID PAROP PARCLS BLOCK                              
        | ID ID PAROP PARAMETERS PARCLS BLOCK                   
        ;

        PARAMETERS::= PARAMETERS COMA PARAMETER   
        | PARAMETER                   
        ;

        PARAMETER::= TIPO ID                     
        | TIPO COROP CORCLS ID        
        | ID ID                       
        ;

        CALL_FUNCTION::= ID PAROP L_E PARCLS                         
        | ID '#' PAROP L_E PARCLS                    
        | ID PAROP PARCLS                             
        | STRING PAROP L_E PARCLS                    
        | STRING '#' PAROP L_E PARCLS                 
        ;

        BREAKS::= BREAK PTOCOMA       
        ;

        CONTINU::= CONTINUE PTOCOMA    
        ;

        RETUR::= RETURN PTOCOMA     
        | RETURN EXP PTOCOMA 
        ;

## Reglas Semanticas
        print(SENTENCES)
        ;

        SENTENCES::= SENTENCES SENTENCE          
                | SENTENCE                    
        ;

        SENTENCE::= FUNCT                       
                | PRINT                       
                | DECLARATION PTOCOMA         
                | CHANGE_VALUE_STRUCT        
                | ASSIGNMENT PTOCOMA          
                | SENTENCE_IF                 
                | SENTENCE_WHILE              
                | SENTENCE_DO_WHILE           
                | SENTENCE_SWITCH             
                | SENTENCE_FOR                
                | RETUR                       
                | BREAKS                      
                | CONTINU                     
                | CALL_FUNCTION PTOCOMA       
                | POST_FIXED PTOCOMA          
                | TEMPLATE_STRUCT             
                | CREATE_STRUCT               
                | METHODS PTOCOMA             
                | error PTOCOMA               
                | error KEYCLS                
        ;

        CHANGE_VALUE_STRUCT::= ID PTO ACCESS '=' EXP PTOCOMA       
        ;

        CREATE_STRUCT::= ID ID '=' ID PAROP L_E PARCLS PTOCOMA      
                      | ID ID '=' STRUCT_CASES PTOCOMA             
        ;

        STRUCT_CASES::= ID PAROP PARCLS                  
                    | ID PTO ACCESS                             
                    | ID                                        
                    | nullVal                                   
        ;

        TEMPLATE_STRUCT::= STRUCT ID KEYOP PARAMETERS KEYCLS PTOCOMA  
        ;

        PRINT::= Rprint PAROP EXP PARCLS PTOCOMA		  
             | Rprintln PAROP EXP PARCLS PTOCOMA		
        ;

        DECLARATION::= TIPO IDENTIFIERS                    
                    | TIPO ID '=' EXP                     
                    | TIPO COROP CORCLS ID '=' EXP        
                    | TIPO COROP CORCLS IDENTIFIERS      
                    | ID COROP CORCLS ID '=' EXP         
                    | ID COROP CORCLS IDENTIFIERS         
        ;

        IDENTIFIERS::= IDENTIFIERS COMA ID                
                    | ID                                 
        ;

        ASSIGNMENT::= ID '=' EXP                                    
                    | ID ACCESS_ARRAY '=' EXP                        
        ;

        EXP::= EXP '&'  EXP                             
            | EXP '+'  EXP                              
            | EXP '-'  EXP                             
            | EXP '*' EXP                              
            | EXP '/' EXP                             
            | EXP '%' EXP                             
            | EXP '^' EXP                              
            | '!' EXP                                   
            | '-' EXP %prec UMENOS                     
            | EXP '<'  EXP                              
            | EXP '>'  EXP                              
            | EXP '&&' EXP                              
            | EXP '||' EXP                              
            | EXP '!=' EXP                              
            | EXP '==' EXP                             
            | EXP '>=' EXP                              
            | EXP '<=' EXP                              
            | CALL_FUNCTION                             
            | PRIMITIVO                                
            | PAROP EXP PARCLS                          
            | ID COROP EXP DOSPTOS EXP CORCLS          
            | COROP L_E CORCLS                          
            | COROP CORCLS                              
            | ID ACCESS_ARRAY                          
            | ID                                       
            | '#' ID                                    
            | ARRAY_DOT                                
            | POST_FIXED                                
            | TERNARY                                  
            | ID PTO ACCESS                             
            | METHODS                                  
            ;

        ARRAY_DOT::= ID '#'                                   
                | ID ACCESS_ARRAY '#'                      
                | ID COROP EXP DOSPTOS EXP CORCLS '#'      
        ;

        ACCESS_ARRAY::= ACCESS_ARRAY COROP EXP CORCLS             
                    | COROP EXP CORCLS                          
        ;

        ACCESS::= ID PTO ACCESS                           
            | ID                                     
        ;

        METHODS::= TIPO PTO METHOD PAROP L_E PARCLS           
                | ID PTO METHOD PAROP L_E PARCLS             
                | ID PTO METHOD PAROP PARCLS                 
        ;

        METHOD::= TOUPPER             
                | TOLOWER             
                | SUBSTR             
                | LENGTH             
                | CARACTERPOSC        
                | PARSE               
                | PUSH                
                | POP                
        ;

        TERNARY::= EXP '?' EXP DOSPTOS EXP                 
        ;

        L_E::= L_E COMA EXP                
            | EXP                         
        ;

        PRIMITIVO::= nullVal         
                | intVal          
                | doubleVal      
                | charVal        
                | stringVal       
                | trueVal         
                | falseVal        
        ;

        TIPO::= INT                                       
        | DOUBLE                                    
        | BOOLEAN                                   
        | STRING                                    
        | CHAR                                      
        | VOID                                      
        ;

        SENTENCE_FOR::= FOR PAROP DECLARATION PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK      
                | FOR PAROP ASSIGNMENT PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK      
                | FOR PAROP ID PTOCOMA EXP PTOCOMA POST_FIXED PARCLS BLOCK               
                | FOR ID IN EXP BLOCK                                                    
        ;

        BLOCK::= KEYOP SENTENCES KEYCLS  
            | KEYOP KEYCLS            
        ;

        POST_FIXED::= ID '--'   
                | ID '++'   
        ;

        CUERPO::= FUNCT                       
                | PRINT                       
                | DECLARATION PTOCOMA         
                | CHANGE_VALUE_STRUCT        
                | ASSIGNMENT PTOCOMA          
                | SENTENCE_WHILE              
                | SENTENCE_DO_WHILE           
                | SENTENCE_SWITCH             
                | SENTENCE_FOR                
                | RETUR                       
                | BREAKS                      
                | CONTINU                     
                | CALL_FUNCTION PTOCOMA       
                | POST_FIXED PTOCOMA          
                | TEMPLATE_STRUCT             
                | CREATE_STRUCT               
                | METHODS PTOCOMA             
                | error PTOCOMA               
                | error KEYCLS                
        ;

        BLOCK_IF::= KEYOP SENTENCES KEYCLS  
                | KEYOP KEYCLS            
                | CUERPO                  
        ;

        SENTENCE_IF::= IF PAROP EXP PARCLS BLOCK_IF ELSE_IF 
        ;

        ELSE_IF::= ELSE IF PAROP EXP PARCLS BLOCK ELSE_IF  
        | ELSE BLOCK_IF                           
        | /*epsilone*/                            
        ;

        SENTENCE_SWITCH::= SWITCH PAROP EXP PARCLS BLOCK_SWITCH 
        ;

        BLOCK_SWITCH::= KEYOP L_CASE KEYCLS         
        | KEYOP KEYCLS                
        ;

        L_CASE::= L_CASE CASES  
        | CASES         
        ;

        CASES::= CASE EXP BLOCK_CASES        
        | DEFAULT BLOCK_CASES         
        ;

        BLOCK_CASES::= DOSPTOS SENTENCES       
        | DOSPTOS                 
        ;

        SENTENCE_WHILE::= WHILE PAROP EXP PARCLS BLOCK            
        ;

        SENTENCE_DO_WHILE::= DO BLOCK WHILE PAROP EXP PARCLS PTOCOMA 
        ;

        FUNCT::= TIPO ID PAROP PARCLS BLOCK                            
        | TIPO ID PAROP PARAMETERS PARCLS BLOCK                 
        | TIPO COROP CORCLS ID PAROP PARAMETERS PARCLS BLOCK    
        | TIPO COROP CORCLS ID PAROP PARCLS BLOCK               
        | ID ID PAROP PARCLS BLOCK                              
        | ID ID PAROP PARAMETERS PARCLS BLOCK                   
        ;

        PARAMETERS::= PARAMETERS COMA PARAMETER   
        | PARAMETER                   
        ;

        PARAMETER::= TIPO ID                     
        | TIPO COROP CORCLS ID        
        | ID ID                       
        ;

        CALL_FUNCTION::= ID PAROP L_E PARCLS                         
        | ID '#' PAROP L_E PARCLS                    
        | ID PAROP PARCLS                             
        | STRING PAROP L_E PARCLS                    
        | STRING '#' PAROP L_E PARCLS                 
        ;

        BREAKS::= BREAK PTOCOMA       
        ;

        CONTINU::= CONTINUE PTOCOMA    
        ;

        RETUR::= RETURN PTOCOMA     
        | RETURN EXP PTOCOMA 
        ;