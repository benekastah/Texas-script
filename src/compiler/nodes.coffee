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
    value = value.replace /\-/g, "_"
    @value = texas_script.compiler.validate_js_identifier value
    super
    
  join: (symbols...) ->
    arr = for symbol in [this, symbols...]
      if symbol not instanceof nodes.Symbol
        @error "Can't join non-Symbol with Symbol"
      symbol.value
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
  
class nodes.String extends SyntaxNode
  constructor: (@value) -> super
  compile: -> "\"#{@value}\""
  
class nodes.Regex extends SyntaxNode
  constructor: ([@pattern, @flags]) -> super
  compile: -> "/#{@pattern}/#{@flags ? ''}"
  
class nodes.Boolean extends SyntaxNode
  constructor: (@value) -> super
  compile: -> "#{!!@value}"
  
class nodes.Nil extends SyntaxNode
  constructor: (@value) -> super
  
class nodes.Message extends SyntaxNode
  constructor: ([base_name, args]) ->
    args ?= []
    
    if base_name not instanceof nodes.Symbol
      @format_error()
      
    for item, index in args
      if index >= 1 and item not instanceof nodes.Argument
        @format_error()
       
    @args = args 
    @value = base_name.join args...
    super
    
  compile: -> @value.compile()
  
  format_error: -> @error "Message must consist of one Symbol and zero or more Arguments."
  
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
      "{ #{c_slots.join ', '} }"
    else
      "{}"
  
class nodes.List extends SyntaxNode
  constructor: (@list_items) -> super
  compile: ->
    c_items = for item in @list_items then item.compile()
    "[#{c_items.join ', '}]"
  
class nodes.MessageSend extends SyntaxNode
  constructor: (message_components) ->
    format_error nodes.Message::format_error
    
    index_of_first_argument
    for item, index in message_components
      if item instanceof nodes.Argument
        index_of_first_arguments = index
        break
    
    if index_of_first_argument is 2
      [@base, base_name, others...] = message_components
    else
      [base_name, others...] = message_components
      
    if base_name not instanceof nodes.Symbol
      format_error.call this
    
    args = []
    @values = []
    for item, index in others
      if index % 2 is 0
        if item not instanceof nodes.Argument
          format_error.call this
        args.push item
      else
        values.push item
    
    @message = new nodes.Message base_name, args
    super
    
  compile: ->
    if @base
      base = "#{@base.compile()}."
    else
      base = ''
    
    values = for value in @values then value.compile()
    "#{base}#{message.compile()}(#{values.join ', '})"

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
