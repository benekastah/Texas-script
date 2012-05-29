/* description: Parses end executes mathematical expressions. */

%{
  //var nodes;
  //setTimeout(function () {
  //  nodes = texas_script.compiler.nodes;
  //}, 0);
%}

/* lexical grammar */
%lex
%x string regex
%%

";;".*                                    /* skip comment */
\s+                                       /* skip whitespace */

'"'                                       { this.begin('string'); this.string_buffer = ""; }
<string>'"'                               { this.popState(); yytext = this.string_buffer; return 'STRING'; }
<string>(\\\"|[^"])*                      { this.string_buffer = yytext; }

"/"                                       { this.begin('regex'); }
<regex>"/"[a-zA-Z]*                       { this.popState(); return 'FLAGS'; }
<regex>(\\\/|[^\/])*                      { return 'REGEX'; }

[0-9]{1,2}"#""-"?[a-zA-Z0-9]+\b           return 'NUMBER_BASE'
"-"?[0-9]+("."[0-9]+)?\b                  return 'NUMBER'

"nil"                                     return 'NIL'
(true|yes)                                return 'TRUE'
(false|no)                                return 'FALSE'

"{"                                       return '{'
"}"                                       return '}'
"["                                       return '['
"]"                                       return ']'
"("                                       return '('
")"                                       return ')'
"="                                       return '='
"<-"                                      return '<-'
","                                       return ','

[\w@#\.!\$%\^&\*\-\+='"\?\|\/\\<>]+":"    return 'ARGUMENT_ID' //'
[\w@#\.!\$%\^&\*\-\+='"\?\|\/\\<>]+\b     return 'IDENTIFIER' //'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%right '=' '<-'

%start texas

%% /* language grammar */

texas
  : statement_list EOF
    { return $1; }
  | EOF
    { return []; }
  ;
  
statement_list
  : statement
    { $$ = [$1]; }
  | statement_list statement
    { $$ = $1; $$.push($2); }
  ;
  
statement
  : slot_set
  | expression
  ;
  
object
  : "{" "}"
    { $$ = new TSNODES.Object([], yy); }
  | "{" slot_set_list "}"
    { $$ = new TSNODES.Object($2, yy); }
  ; 
  
slot_set_list
  : slot_set
    { $$ = [$1]; }
  | slot_set_list slot_set
    { $$ = $1; $$.push($2); }
  ;
  
slot_set
  : message_def expression
    { $$ = new TSNODES.Slot([$1, $2], yy); }
  ;
  
lambda
  : "[" "]"
    { $$ = new TSNODES.Function([], yy); }
  | "[" statement_list "]"
    { $$ = new TSNODES.Function($2, yy); }
  ;
  
message_def
  : symbol '='
    { $$ = new TSNODES.Message([$1, null, true], yy); }
  | symbol '<-'
    { $$ = new TSNODES.Message([$1, null, false], yy); }
  | symbol argument_list '='
    { $$ = new TSNODES.Message([$1, $2, true], yy); }
  | symbol argument_list '<-'
    { $$ = new TSNODES.Message([$1, $2, false], yy); }
  ;

message_send
  : "(" message_param_list ")"
    { $$ = new TSNODES.MessageSend($2, yy); }
  ;
    
message_param_list
  : message_param
    { $$ = [$1]; }
  | message_param_list message_param
    { $$ = $1; $$.push($2); }
  ;
    
message_param
  : expression
  | argument
  ;

list
  : "{" "," "}"
    { $$ = new TSNODES.List([], yy); }
  | "{" expression_list "}"
    { $$ = new TSNODES.List(expression_list, yy); }
  ;

expression_list
  : expression
    { $$ = [$1]; }
  | expression_list ',' expression
    { $$ = $1; $$.push($3); }
  ;

expression
  : simple_expression
  | message_send
  ;

simple_expression
  : string
  | number
  | boolean
  | nil
  | symbol
  | regex
  | object
  | list
  | lambda
  ;

symbol
  : IDENTIFIER
    { $$ = new TSNODES.Symbol($1, yy); }
  ;

argument_list
  : argument
    { $$ = [$1]; }
  | argument_list argument
    { $$ = $1; $$.push($2); }
  ;

argument
  : ARGUMENT_ID
    { $$ = new TSNODES.Argument($1, yy); }
  ;

boolean
  : TRUE
    { $$ = new TSNODES.Boolean(true, yy); }
  | FALSE
    { $$ = new TSNODES.Boolean(false, yy); }
  ;

nil
  : NIL
    { $$ = new TSNODES.Nil(null, yy); }
  ;

string
  : STRING
    { $$ = new TSNODES.String($1, yy); }
  ;
    
regex
  : REGEX FLAGS
    { $$ = new TSNODES.Regex([$1, $2.substr(1)], yy); }
  ;

number
  : NUMBER
    { $$ = new TSNODES.Number(+$1, yy); }
  | NUMBER_BASE
    { $$ = new TSNODES.Fixnum($1.split('#'), yy); }
  ;