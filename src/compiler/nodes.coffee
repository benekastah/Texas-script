{nodes} = texas_script.compiler

nodes.SyntaxNode = class SyntaxNode
  constructor: (__, yy_or_node_or_num) ->
    if yy_or_node_or_num instanceof SyntaxNode
      @transfer_node = yy_or_node_or_num
      @yy = yy_or_node_or_num.yy
    else if (type_of yy_or_node_or_num) is "number"
      @yy =
        lexer:
          yylineno: yy_or_node_or_num
    else
      @yy = yy_or_node_or_num
      
    @line_number = @yy?.lexer.yylineno
    
  compile: ->
    if @value?
      "#{@value}"
    else
      "null"
      
  error: (message) ->
    filename = texas_script.compiler.current_filename
    location = ""
    type = ""
    if filename?
      location += " in #{filename}"
    if @line_number?
      location += " at line #{@line_number}"
    if @constructor.name?
      type = "#{@constructor.name}"
      
    throw "#{type}Error#{location}: #{message}"
    
class nodes.Number extends SyntaxNode
  constructor: (value) ->
    @value ?= value
    super
    
class nodes.Fixnum extends nodes.Number
  constructor: ([base, num]) ->
    base ?= 10
    @value = parseInt "#{num}", base
    super
  
class nodes.Symbol extends SyntaxNode
  constructor: (value) ->
    @input = value
    value = value.replace /\-/g, "_"
    @value = texas_script.compiler.validate_js_identifier value
    super
    
  concat: (symbols...) ->
    arr = for symbol in [this, symbols...]
      if symbol not instanceof nodes.Symbol
        @error "Can't join non-Symbol with Symbol"
      symbol.input
    new nodes.Symbol (arr.join "_"), this.yy
  
class nodes.Argument extends nodes.Symbol
  constructor: (value, yy) ->
    plain = value.substring 0, value.length - 1
    @plain = new nodes.Symbol plain, yy
    super
    
  compile: (plain) ->
    if plain
      @plain.compile()
    else
      super()
  
class nodes.JavascriptNamespace extends nodes.Symbol
  constructor: (__, yy) -> super "--js-root", yy
  
class nodes.String extends SyntaxNode
  constructor: (@value) -> super
  compile: -> "TEXAS.String.clone(\"#{@value}\")"
  
class nodes.Regex extends SyntaxNode
  constructor: ([@pattern, @flags]) -> super
  compile: -> "/#{@pattern}/#{@flags ? ''}"
  
class nodes.Boolean extends SyntaxNode
  constructor: (@value) -> super
  compile: -> "#{!!@value}"
  
class nodes.Nil extends SyntaxNode
  constructor: (@value) -> super
  
class nodes.Slot extends SyntaxNode
  constructor: ([@message, @value]) ->
    if @value instanceof nodes.Function
      @value.args = @message.args
    super
  compile: (in_obj) ->
    c_message = @message.compile()
    c_value = @value.compile()
    if in_obj
      "#{c_message}: #{c_value}"
    else
      "var #{c_message} = #{c_value};"
  
class nodes.Object extends SyntaxNode
  constructor: (@slots) -> super
  compile: ->
    c_slots = for slot in @slots then slot.compile true
    if c_slots.length
      "TEXAS.Object.clone({ #{c_slots.join ', '} })"
    else
      "TEXAS.Object.clone()"
  
class nodes.List extends SyntaxNode
  constructor: (@list_items) -> super
  compile: ->
    c_items = for item in @list_items then item.compile()
    "TEXAS.List.clone(#{c_items.join ', '})"
  
class nodes.Message extends SyntaxNode
  constructor: ([message_name, args]) ->
    args ?= []
    @args = args 
    @value = message_name.concat args...
    super

  compile: -> @value.compile()

  format_error: -> @error "Message must consist of one Symbol and zero or more Arguments."
  
class nodes.MessageSend extends SyntaxNode
  constructor: ({@base, message_name, args, js}) ->
    args ?= []
    if js
      @values = args
      @message = new nodes.Message [message_name]
    else
      m_args = []
      @values = []
      for arg in args
        m_args.push arg[0]
        @values.push arg[1]
      @message = new nodes.Message [message_name, m_args]
    super
    
  compile: ->
    if @base
      base = "#{@base.compile()}."
    else
      base = ''
    
    values = for value in @values then value.compile()
    "#{base}#{@message.compile()}(#{values.join ', '})"

class nodes.Function extends SyntaxNode
  constructor: (@statement_list) -> super
  compile: ->
    c_args = for arg in @args then arg.compile true
    c_statements = for stmnt in @statement_list then stmnt.compile()
    last = c_statements.pop()
    last = "return #{last}"
    c_statements.push last
    
    """
    (function (#{c_args.join ', '}) {
      #{c_statements.join ';\n'};
    })
    """