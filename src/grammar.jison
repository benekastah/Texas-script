/* description: Parses end executes mathematical expressions. */

%{
  
  var trim = String.prototype.trim || function () {
    s = '' + this;
    return s.replace(/^\s+/, '').replace(/\s+$/, '');
  };
  
%}

/* lexical grammar */
%lex
%x string regex
%%

";".*                                     /* skip comment */

\s"-"\s                                   return 'UNARY_IDENTIFIER'
\s"+"\s                                   return 'UNARY_IDENTIFIER'
\s"++"\s                                  return 'UNARY_IDENTIFIER'
\s"/"\s                                   return 'UNARY_IDENTIFIER'
\s"*"\s                                   return 'UNARY_IDENTIFIER'
\s"%"\s                                   return 'UNARY_IDENTIFIER'
\s"**"\s                                  return 'UNARY_IDENTIFIER'

\s"&"\s                                   return 'UNARY_IDENTIFIER'
\s"|"\s                                   return 'UNARY_IDENTIFIER'
\s"^"\s                                   return 'UNARY_IDENTIFIER'
\s"~"\s                                   return 'UNARY_IDENTIFIER'
\s"<<"\s                                  return 'UNARY_IDENTIFIER'
\s">>"\s                                  return 'UNARY_IDENTIFIER'
\s">>>"\s                                 return 'UNARY_IDENTIFIER'

\s"="\s                                   return 'UNARY_IDENTIFIER'

\s"=="\s                                  return 'UNARY_IDENTIFIER'
\s"<"\s                                   return 'UNARY_IDENTIFIER'
\s">"\s                                   return 'UNARY_IDENTIFIER'
\s">="\s                                  return 'UNARY_IDENTIFIER'
\s"<="\s                                  return 'UNARY_IDENTIFIER'

\s"and"\s                                 return 'UNARY_IDENTIFIER'
\s"or"\s                                  return 'UNARY_IDENTIFIER'

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
"<="                                      return '<='
"<-"                                      return '<-'
","                                       return ','

"*js"                                     return 'JAVASCRIPT_NAMESPACE'
[\w@#\.!\$%\^&\*\-\+='"\?\|\/\\<>]+":"    return 'ARGUMENT_ID' //'
"."?[\w]+                                 return 'JAVASCRIPT_IDENTIFIER'
[\w@#\.!\$%\^&\*\-\+='"\?\|\/\\<>]+\b     return 'IDENTIFIER' //'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%right '<=' '<-'

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
  : slot_set_list_item
    { $$ = [$1]; }
  | slot_set_list slot_set_list_item
    { $$ = $1; $$.push($2); }
  ;
  
slot_set_list_item
  : slot_set
  | slot_set ","
    { $$ = $1; }
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
  : symbol '<='
    { $$ = new TSNODES.Message([$1, null, true], yy); }
  | symbol '<-'
    { $$ = new TSNODES.Message([$1, null, false], yy); }
  | symbol argument_list '<='
    { $$ = new TSNODES.Message([$1, $2, true], yy); }
  | symbol argument_list '<-'
    { $$ = new TSNODES.Message([$1, $2, false], yy); }
  ;

message_send
  : javascript_message_send
  | unary_message_send
  | texas_message_send
  ;

javascript_message_send
  : "(" js_namespace js_symbol expression_list ")"
    { $$ = new TSNODES.MessageSend({ base: $2, message_name: $3, args: $4, js: true }, yy); }
  | "(" js_namespace js_symbol ")"
    { $$ = new TSNODES.MessageSend({ base: $2, message_name: $3, js: true }, yy); }
  ;

unary_message_send
  : "(" expression unary_symbol expression ")"
    { $$ = new TSNODES.MessageSend({ base: $2, message_name: $3, args: [$4], js: true }, yy); }
  ;

texas_message_send
  : "(" expression texas_symbol message_param_list ")"
    { $$ = new TSNODES.MessageSend({ base: $2, message_name: $3, args: $4 }, yy); }
  | "(" expression texas_symbol ")"
    { $$ = new TSNODES.MessageSend({ base: $2, message_name: $3 }, yy); }
  ;
    
message_param_list
  : message_param
    { $$ = [$1]; }
  | message_param_list message_param
    { $$ = $1; $$.push($2); }
  ;
    
message_param
  : argument expression
    { $$ = [$1, $2]; }
  ;

list
  : "{" "," "}"
    { $$ = new TSNODES.List([], yy); }
  | "{" expression_list "}"
    { $$ = new TSNODES.List($2, yy); }
  ;

expression_list
  : expression
    { $$ = [$1]; }
  | expression_list ',' expression
    { $$ = $1; $$.push($3); }
  | expression_list ','
    { $$ = $1; }
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
  : texas_symbol
  | unary_symbol
  ;

texas_symbol
  : IDENTIFIER
    { $$ = new TSNODES.Symbol($1, yy); }
  | js_symbol
  ;

unary_symbol
  : UNARY_IDENTIFIER
    { $$ = new TSNODES.Symbol(trim.call($1), yy); }
  ;

js_symbol
  : JAVASCRIPT_IDENTIFIER
    { $$ = new TSNODES.Symbol($1, yy); }
  ;

js_namespace
  : JAVASCRIPT_NAMESPACE
    { $$ = new TSNODES.JavascriptNamespace(null, yy); }
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