// Generated by CoffeeScript 1.3.1
(function() {
  var JS_ILLEGAL_IDENTIFIER_CHARS, JS_KEYWORDS, SyntaxNode, WRAPPER_PREFIX, WRAPPER_REGEX, WRAPPER_SUFFIX, char_wrapper, nodes, root, texas_script, type_of, wrapper, __toString,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  root = typeof global !== "undefined" && global !== null ? global : window;

  texas_script = {
    parser: parser,
    compiler: {
      compile: function(nodes) {
        var c_nodes, node;
        c_nodes = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = nodes.length; _i < _len; _i++) {
            node = nodes[_i];
            _results.push(node.compile());
          }
          return _results;
        })();
        return c_nodes.join(';\n');
      },
      nodes: {}
    }
  };

  root.TSNODES = texas_script.compiler.nodes;

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = texas_script;
  } else {
    root.texas_script = texas_script;
  }

  __toString = Object.prototype.toString;

  type_of = function(x) {
    return __toString.call(x).slice(8, -1).toLowerCase();
  };

  JS_KEYWORDS = ["break", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "implements", "import", "in", "instanceof", "interface", "let", "new", "null", "package", "private", "protected", "public", "return", "static", "switch", "super", "this", "throw", "true", "try", "typeof", "undefined", "var", "void", "while", "with", "yield"];

  JS_ILLEGAL_IDENTIFIER_CHARS = {
    "~": "tilde",
    "`": "backtick",
    "!": "exclamationmark",
    "@": "at",
    "#": "pound",
    "%": "percent",
    "^": "carat",
    "&": "amperstand",
    "*": "asterisk",
    "(": "leftparen",
    ")": "rightparen",
    "-": "dash",
    "+": "plus",
    "=": "equals",
    "{": "leftcurly",
    "}": "rightcurly",
    "[": "leftsquare",
    "]": "rightsquare",
    "|": "pipe",
    "\\": "backslash",
    "\"": "doublequote",
    "'": "singlequote",
    ":": "colon",
    ";": "semicolon",
    "<": "leftangle",
    ">": "rightangle",
    ",": "comma",
    ".": "period",
    "?": "questionmark",
    "/": "forwardslash",
    " ": "space",
    "\t": "tab",
    "\n": "newline",
    "\r": "carriagereturn"
  };

  WRAPPER_PREFIX = "_$";

  WRAPPER_SUFFIX = "_";

  WRAPPER_REGEX = /_\$[^_]+_/g;

  wrapper = function(text) {
    return "" + WRAPPER_PREFIX + text + WRAPPER_SUFFIX;
  };

  char_wrapper = function(conversions, _char) {
    var txt, _ref, _ref1;
    if (conversions == null) {
      conversions = {};
    }
    txt = (_ref = (_ref1 = conversions[_char]) != null ? _ref1 : JS_ILLEGAL_IDENTIFIER_CHARS[_char]) != null ? _ref : "ASCII_" + (_char.charCodeAt(0));
    return wrapper(txt);
  };

  texas_script.compiler.validate_js_identifier = function(text, conversions) {
    var _char_wrapper;
    if ((JS_KEYWORDS.indexOf(text)) >= 0) {
      return wrapper(text);
    }
    if (text.length === 0) {
      return wrapper("null");
    }
    _char_wrapper = char_wrapper.bind(null, conversions);
    return ((text.replace(WRAPPER_REGEX, wrapper)).replace(/^\d/, _char_wrapper)).replace(/[^\w\$]/g, _char_wrapper);
  };

  nodes = texas_script.compiler.nodes;

  nodes.SyntaxNode = SyntaxNode = (function() {

    SyntaxNode.name = 'SyntaxNode';

    function SyntaxNode(__, yy_or_node_or_num) {
      var _ref;
      if (yy_or_node_or_num instanceof SyntaxNode) {
        this.transfer_node = yy_or_node_or_num;
        this.yy = yy_or_node_or_num.yy;
      } else if ((type_of(yy_or_node_or_num)) === "number") {
        this.yy = {
          lexer: {
            yylineno: yy_or_node_or_num
          }
        };
      } else {
        this.yy = yy_or_node_or_num;
      }
      this.line_number = (_ref = this.yy) != null ? _ref.lexer.yylineno : void 0;
    }

    SyntaxNode.prototype.compile = function() {
      if (this.value != null) {
        return "" + this.value;
      } else {
        return "null";
      }
    };

    SyntaxNode.prototype.error = function(message) {
      var filename, location, type;
      filename = texas_script.compiler.current_filename;
      location = "";
      type = "";
      if (filename != null) {
        location += " in " + filename;
      }
      if (this.line_number != null) {
        location += " at line " + this.line_number;
      }
      if (this.constructor.name != null) {
        type = "" + this.constructor.name;
      }
      throw "" + type + "Error" + location + ": " + message;
    };

    return SyntaxNode;

  })();

  nodes.Number = (function(_super) {

    __extends(Number, _super);

    Number.name = 'Number';

    function Number(value) {
      if (this.value == null) {
        this.value = value;
      }
      Number.__super__.constructor.apply(this, arguments);
    }

    return Number;

  })(SyntaxNode);

  nodes.Fixnum = (function(_super) {

    __extends(Fixnum, _super);

    Fixnum.name = 'Fixnum';

    function Fixnum(_arg) {
      var base, num;
      base = _arg[0], num = _arg[1];
      if (base == null) {
        base = 10;
      }
      this.value = parseInt("" + num, base);
      Fixnum.__super__.constructor.apply(this, arguments);
    }

    return Fixnum;

  })(nodes.Number);

  nodes.Symbol = (function(_super) {

    __extends(Symbol, _super);

    Symbol.name = 'Symbol';

    function Symbol(value) {
      this.input = value;
      value = value.replace(/\-/g, "_");
      this.value = texas_script.compiler.validate_js_identifier(value);
      Symbol.__super__.constructor.apply(this, arguments);
    }

    Symbol.prototype.concat = function() {
      var arr, symbol, symbols;
      symbols = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      arr = (function() {
        var _i, _len, _ref, _results;
        _ref = [this].concat(__slice.call(symbols));
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          symbol = _ref[_i];
          if (!(symbol instanceof nodes.Symbol)) {
            this.error("Can't join non-Symbol with Symbol");
          }
          _results.push(symbol.input);
        }
        return _results;
      }).call(this);
      return new nodes.Symbol(arr.join("_"), this.yy);
    };

    return Symbol;

  })(SyntaxNode);

  nodes.Argument = (function(_super) {

    __extends(Argument, _super);

    Argument.name = 'Argument';

    function Argument(value, yy) {
      var plain;
      plain = value.substring(0, value.length - 1);
      this.plain = new nodes.Symbol(plain, yy);
      Argument.__super__.constructor.apply(this, arguments);
    }

    Argument.prototype.compile = function(plain) {
      if (plain) {
        return this.plain.compile();
      } else {
        return Argument.__super__.compile.call(this);
      }
    };

    return Argument;

  })(nodes.Symbol);

  nodes.JavascriptNamespace = (function(_super) {

    __extends(JavascriptNamespace, _super);

    JavascriptNamespace.name = 'JavascriptNamespace';

    function JavascriptNamespace(__, yy) {
      JavascriptNamespace.__super__.constructor.call(this, "--js-root", yy);
    }

    return JavascriptNamespace;

  })(nodes.Symbol);

  nodes.String = (function(_super) {

    __extends(String, _super);

    String.name = 'String';

    function String(value) {
      this.value = value;
      String.__super__.constructor.apply(this, arguments);
    }

    String.prototype.compile = function() {
      return "TEXAS.String.clone(\"" + this.value + "\")";
    };

    return String;

  })(SyntaxNode);

  nodes.Regex = (function(_super) {

    __extends(Regex, _super);

    Regex.name = 'Regex';

    function Regex(_arg) {
      this.pattern = _arg[0], this.flags = _arg[1];
      Regex.__super__.constructor.apply(this, arguments);
    }

    Regex.prototype.compile = function() {
      var _ref;
      return "/" + this.pattern + "/" + ((_ref = this.flags) != null ? _ref : '');
    };

    return Regex;

  })(SyntaxNode);

  nodes.Boolean = (function(_super) {

    __extends(Boolean, _super);

    Boolean.name = 'Boolean';

    function Boolean(value) {
      this.value = value;
      Boolean.__super__.constructor.apply(this, arguments);
    }

    Boolean.prototype.compile = function() {
      return "" + (!!this.value);
    };

    return Boolean;

  })(SyntaxNode);

  nodes.Nil = (function(_super) {

    __extends(Nil, _super);

    Nil.name = 'Nil';

    function Nil(value) {
      this.value = value;
      Nil.__super__.constructor.apply(this, arguments);
    }

    return Nil;

  })(SyntaxNode);

  nodes.Slot = (function(_super) {

    __extends(Slot, _super);

    Slot.name = 'Slot';

    function Slot(_arg) {
      this.message = _arg[0], this.value = _arg[1];
      if (this.value instanceof nodes.Function) {
        this.value.args = this.message.args;
      }
      Slot.__super__.constructor.apply(this, arguments);
    }

    Slot.prototype.compile = function(in_obj) {
      var c_message, c_value;
      c_message = this.message.compile();
      c_value = this.value.compile();
      if (in_obj) {
        return "" + c_message + ": " + c_value;
      } else {
        return "var " + c_message + " = " + c_value + ";";
      }
    };

    return Slot;

  })(SyntaxNode);

  nodes.Object = (function(_super) {

    __extends(Object, _super);

    Object.name = 'Object';

    function Object(slots) {
      this.slots = slots;
      Object.__super__.constructor.apply(this, arguments);
    }

    Object.prototype.compile = function() {
      var c_slots, slot;
      c_slots = (function() {
        var _i, _len, _ref, _results;
        _ref = this.slots;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          slot = _ref[_i];
          _results.push(slot.compile(true));
        }
        return _results;
      }).call(this);
      if (c_slots.length) {
        return "TEXAS.Object.clone({ " + (c_slots.join(', ')) + " })";
      } else {
        return "TEXAS.Object.clone()";
      }
    };

    return Object;

  })(SyntaxNode);

  nodes.List = (function(_super) {

    __extends(List, _super);

    List.name = 'List';

    function List(list_items) {
      this.list_items = list_items;
      List.__super__.constructor.apply(this, arguments);
    }

    List.prototype.compile = function() {
      var c_items, item;
      c_items = (function() {
        var _i, _len, _ref, _results;
        _ref = this.list_items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.compile());
        }
        return _results;
      }).call(this);
      return "TEXAS.List.clone(" + (c_items.join(', ')) + ")";
    };

    return List;

  })(SyntaxNode);

  nodes.Message = (function(_super) {

    __extends(Message, _super);

    Message.name = 'Message';

    function Message(_arg) {
      var args, message_name;
      message_name = _arg[0], args = _arg[1];
      if (args == null) {
        args = [];
      }
      this.args = args;
      this.value = message_name.concat.apply(message_name, args);
      Message.__super__.constructor.apply(this, arguments);
    }

    Message.prototype.compile = function() {
      return this.value.compile();
    };

    Message.prototype.format_error = function() {
      return this.error("Message must consist of one Symbol and zero or more Arguments.");
    };

    return Message;

  })(SyntaxNode);

  nodes.MessageSend = (function(_super) {

    __extends(MessageSend, _super);

    MessageSend.name = 'MessageSend';

    function MessageSend(_arg) {
      var arg, args, js, m_args, message_name, _i, _len;
      this.base = _arg.base, message_name = _arg.message_name, args = _arg.args, js = _arg.js;
      if (args == null) {
        args = [];
      }
      if (js) {
        this.values = args;
        this.message = new nodes.Message([message_name]);
      } else {
        m_args = [];
        this.values = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          m_args.push(arg[0]);
          this.values.push(arg[1]);
        }
        this.message = new nodes.Message([message_name, m_args]);
      }
      MessageSend.__super__.constructor.apply(this, arguments);
    }

    MessageSend.prototype.compile = function() {
      var base, value, values;
      if (this.base) {
        base = "" + (this.base.compile()) + ".";
      } else {
        base = '';
      }
      values = (function() {
        var _i, _len, _ref, _results;
        _ref = this.values;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          _results.push(value.compile());
        }
        return _results;
      }).call(this);
      return "" + base + (this.message.compile()) + "(" + (values.join(', ')) + ")";
    };

    return MessageSend;

  })(SyntaxNode);

  nodes.Function = (function(_super) {

    __extends(Function, _super);

    Function.name = 'Function';

    function Function(statement_list) {
      this.statement_list = statement_list;
      Function.__super__.constructor.apply(this, arguments);
    }

    Function.prototype.compile = function() {
      var arg, c_args, c_statements, last, stmnt;
      c_args = (function() {
        var _i, _len, _ref, _results;
        _ref = this.args;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          arg = _ref[_i];
          _results.push(arg.compile(true));
        }
        return _results;
      }).call(this);
      c_statements = (function() {
        var _i, _len, _ref, _results;
        _ref = this.statement_list;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          stmnt = _ref[_i];
          _results.push(stmnt.compile());
        }
        return _results;
      }).call(this);
      last = c_statements.pop();
      last = "return " + last;
      c_statements.push(last);
      return "(function (" + (c_args.join(', ')) + ") {\n  " + (c_statements.join(';\n')) + ";\n})";
    };

    return Function;

  })(SyntaxNode);

}).call(this);
