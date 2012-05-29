/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"texas":3,"statement_list":4,"EOF":5,"statement":6,"slot_set":7,"expression":8,"object":9,"{":10,"}":11,"slot_set_list":12,"message_def":13,"lambda":14,"[":15,"]":16,"symbol":17,"=":18,"<-":19,"argument_list":20,"message_send":21,"(":22,"message_param_list":23,")":24,"message_param":25,"argument":26,"list":27,",":28,"expression_list":29,"simple_expression":30,"string":31,"number":32,"boolean":33,"nil":34,"regex":35,"IDENTIFIER":36,"ARGUMENT_ID":37,"TRUE":38,"FALSE":39,"NIL":40,"STRING":41,"REGEX":42,"FLAGS":43,"NUMBER":44,"NUMBER_BASE":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"{",11:"}",15:"[",16:"]",18:"=",19:"<-",22:"(",24:")",28:",",36:"IDENTIFIER",37:"ARGUMENT_ID",38:"TRUE",39:"FALSE",40:"NIL",41:"STRING",42:"REGEX",43:"FLAGS",44:"NUMBER",45:"NUMBER_BASE"},
productions_: [0,[3,2],[3,1],[4,1],[4,2],[6,1],[6,1],[9,2],[9,3],[12,1],[12,2],[7,2],[14,2],[14,3],[13,2],[13,2],[13,3],[13,3],[21,3],[23,1],[23,2],[25,1],[25,1],[27,3],[27,3],[29,1],[29,3],[8,1],[8,1],[30,1],[30,1],[30,1],[30,1],[30,1],[30,1],[30,1],[30,1],[30,1],[17,1],[20,1],[20,2],[26,1],[33,1],[33,1],[34,1],[31,1],[35,2],[32,1],[32,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: return []; 
break;
case 3: this.$ = [$$[$0]]; 
break;
case 4: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 7: this.$ = new TSNODES.Object([], yy); 
break;
case 8: this.$ = new TSNODES.Object($$[$0-1], yy); 
break;
case 9: this.$ = [$$[$0]]; 
break;
case 10: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 11: this.$ = new TSNODES.Slot([$$[$0-1], $$[$0]], yy); 
break;
case 12: this.$ = new TSNODES.Function([], yy); 
break;
case 13: this.$ = new TSNODES.Function($$[$0-1], yy); 
break;
case 14: this.$ = new TSNODES.Message([$$[$0-1], null, true], yy); 
break;
case 15: this.$ = new TSNODES.Message([$$[$0-1], null, false], yy); 
break;
case 16: this.$ = new TSNODES.Message([$$[$0-2], $$[$0-1], true], yy); 
break;
case 17: this.$ = new TSNODES.Message([$$[$0-2], $$[$0-1], false], yy); 
break;
case 18: this.$ = new TSNODES.MessageSend($$[$0-1], yy); 
break;
case 19: this.$ = [$$[$0]]; 
break;
case 20: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 23: this.$ = new TSNODES.List([], yy); 
break;
case 24: this.$ = new TSNODES.List(expression_list, yy); 
break;
case 25: this.$ = [$$[$0]]; 
break;
case 26: this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 38: this.$ = new TSNODES.Symbol($$[$0], yy); 
break;
case 39: this.$ = [$$[$0]]; 
break;
case 40: this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 41: this.$ = new TSNODES.Argument($$[$0], yy); 
break;
case 42: this.$ = new TSNODES.Boolean(true, yy); 
break;
case 43: this.$ = new TSNODES.Boolean(false, yy); 
break;
case 44: this.$ = new TSNODES.Nil(null, yy); 
break;
case 45: this.$ = new TSNODES.String($$[$0], yy); 
break;
case 46: this.$ = new TSNODES.Regex([$$[$0-1], $$[$0].substr(1)], yy); 
break;
case 47: this.$ = new TSNODES.Number(+$$[$0], yy); 
break;
case 48: this.$ = new TSNODES.Fixnum($$[$0].split('#'), yy); 
break;
}
},
table: [{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:16,10:[1,28],13:7,14:18,15:[1,29],17:10,21:9,22:[1,19],27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{1:[3]},{5:[1,30],6:31,7:5,8:6,9:16,10:[1,28],13:7,14:18,15:[1,29],17:10,21:9,22:[1,19],27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{1:[2,2]},{5:[2,3],10:[2,3],15:[2,3],16:[2,3],22:[2,3],36:[2,3],38:[2,3],39:[2,3],40:[2,3],41:[2,3],42:[2,3],44:[2,3],45:[2,3]},{5:[2,5],10:[2,5],15:[2,5],16:[2,5],22:[2,5],36:[2,5],38:[2,5],39:[2,5],40:[2,5],41:[2,5],42:[2,5],44:[2,5],45:[2,5]},{5:[2,6],10:[2,6],15:[2,6],16:[2,6],22:[2,6],36:[2,6],38:[2,6],39:[2,6],40:[2,6],41:[2,6],42:[2,6],44:[2,6],45:[2,6]},{8:32,9:16,10:[1,28],14:18,15:[1,29],17:33,21:9,22:[1,19],27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{5:[2,27],10:[2,27],11:[2,27],15:[2,27],16:[2,27],22:[2,27],24:[2,27],28:[2,27],36:[2,27],37:[2,27],38:[2,27],39:[2,27],40:[2,27],41:[2,27],42:[2,27],44:[2,27],45:[2,27]},{5:[2,28],10:[2,28],11:[2,28],15:[2,28],16:[2,28],22:[2,28],24:[2,28],28:[2,28],36:[2,28],37:[2,28],38:[2,28],39:[2,28],40:[2,28],41:[2,28],42:[2,28],44:[2,28],45:[2,28]},{5:[2,33],10:[2,33],11:[2,33],15:[2,33],16:[2,33],18:[1,34],19:[1,35],20:36,22:[2,33],26:37,28:[2,33],36:[2,33],37:[1,38],38:[2,33],39:[2,33],40:[2,33],41:[2,33],42:[2,33],44:[2,33],45:[2,33]},{5:[2,29],10:[2,29],11:[2,29],15:[2,29],16:[2,29],22:[2,29],24:[2,29],28:[2,29],36:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29],41:[2,29],42:[2,29],44:[2,29],45:[2,29]},{5:[2,30],10:[2,30],11:[2,30],15:[2,30],16:[2,30],22:[2,30],24:[2,30],28:[2,30],36:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30],41:[2,30],42:[2,30],44:[2,30],45:[2,30]},{5:[2,31],10:[2,31],11:[2,31],15:[2,31],16:[2,31],22:[2,31],24:[2,31],28:[2,31],36:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31],41:[2,31],42:[2,31],44:[2,31],45:[2,31]},{5:[2,32],10:[2,32],11:[2,32],15:[2,32],16:[2,32],22:[2,32],24:[2,32],28:[2,32],36:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32],41:[2,32],42:[2,32],44:[2,32],45:[2,32]},{5:[2,34],10:[2,34],11:[2,34],15:[2,34],16:[2,34],22:[2,34],24:[2,34],28:[2,34],36:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34],41:[2,34],42:[2,34],44:[2,34],45:[2,34]},{5:[2,35],10:[2,35],11:[2,35],15:[2,35],16:[2,35],22:[2,35],24:[2,35],28:[2,35],36:[2,35],37:[2,35],38:[2,35],39:[2,35],40:[2,35],41:[2,35],42:[2,35],44:[2,35],45:[2,35]},{5:[2,36],10:[2,36],11:[2,36],15:[2,36],16:[2,36],22:[2,36],24:[2,36],28:[2,36],36:[2,36],37:[2,36],38:[2,36],39:[2,36],40:[2,36],41:[2,36],42:[2,36],44:[2,36],45:[2,36]},{5:[2,37],10:[2,37],11:[2,37],15:[2,37],16:[2,37],22:[2,37],24:[2,37],28:[2,37],36:[2,37],37:[2,37],38:[2,37],39:[2,37],40:[2,37],41:[2,37],42:[2,37],44:[2,37],45:[2,37]},{8:41,9:16,10:[1,28],14:18,15:[1,29],17:33,21:9,22:[1,19],23:39,25:40,26:42,27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],37:[1,38],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{5:[2,38],10:[2,38],11:[2,38],15:[2,38],16:[2,38],18:[2,38],19:[2,38],22:[2,38],24:[2,38],28:[2,38],36:[2,38],37:[2,38],38:[2,38],39:[2,38],40:[2,38],41:[2,38],42:[2,38],44:[2,38],45:[2,38]},{5:[2,45],10:[2,45],11:[2,45],15:[2,45],16:[2,45],22:[2,45],24:[2,45],28:[2,45],36:[2,45],37:[2,45],38:[2,45],39:[2,45],40:[2,45],41:[2,45],42:[2,45],44:[2,45],45:[2,45]},{5:[2,47],10:[2,47],11:[2,47],15:[2,47],16:[2,47],22:[2,47],24:[2,47],28:[2,47],36:[2,47],37:[2,47],38:[2,47],39:[2,47],40:[2,47],41:[2,47],42:[2,47],44:[2,47],45:[2,47]},{5:[2,48],10:[2,48],11:[2,48],15:[2,48],16:[2,48],22:[2,48],24:[2,48],28:[2,48],36:[2,48],37:[2,48],38:[2,48],39:[2,48],40:[2,48],41:[2,48],42:[2,48],44:[2,48],45:[2,48]},{5:[2,42],10:[2,42],11:[2,42],15:[2,42],16:[2,42],22:[2,42],24:[2,42],28:[2,42],36:[2,42],37:[2,42],38:[2,42],39:[2,42],40:[2,42],41:[2,42],42:[2,42],44:[2,42],45:[2,42]},{5:[2,43],10:[2,43],11:[2,43],15:[2,43],16:[2,43],22:[2,43],24:[2,43],28:[2,43],36:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],42:[2,43],44:[2,43],45:[2,43]},{5:[2,44],10:[2,44],11:[2,44],15:[2,44],16:[2,44],22:[2,44],24:[2,44],28:[2,44],36:[2,44],37:[2,44],38:[2,44],39:[2,44],40:[2,44],41:[2,44],42:[2,44],44:[2,44],45:[2,44]},{43:[1,43]},{7:48,8:49,9:16,10:[1,28],11:[1,44],12:45,13:7,14:18,15:[1,29],17:10,21:9,22:[1,19],27:17,28:[1,46],29:47,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{4:51,6:4,7:5,8:6,9:16,10:[1,28],13:7,14:18,15:[1,29],16:[1,50],17:10,21:9,22:[1,19],27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{1:[2,1]},{5:[2,4],10:[2,4],15:[2,4],16:[2,4],22:[2,4],36:[2,4],38:[2,4],39:[2,4],40:[2,4],41:[2,4],42:[2,4],44:[2,4],45:[2,4]},{5:[2,11],10:[2,11],11:[2,11],15:[2,11],16:[2,11],22:[2,11],36:[2,11],38:[2,11],39:[2,11],40:[2,11],41:[2,11],42:[2,11],44:[2,11],45:[2,11]},{5:[2,33],10:[2,33],11:[2,33],15:[2,33],16:[2,33],22:[2,33],24:[2,33],28:[2,33],36:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],41:[2,33],42:[2,33],44:[2,33],45:[2,33]},{10:[2,14],15:[2,14],22:[2,14],36:[2,14],38:[2,14],39:[2,14],40:[2,14],41:[2,14],42:[2,14],44:[2,14],45:[2,14]},{10:[2,15],15:[2,15],22:[2,15],36:[2,15],38:[2,15],39:[2,15],40:[2,15],41:[2,15],42:[2,15],44:[2,15],45:[2,15]},{18:[1,52],19:[1,53],26:54,37:[1,38]},{18:[2,39],19:[2,39],37:[2,39]},{10:[2,41],15:[2,41],18:[2,41],19:[2,41],22:[2,41],24:[2,41],36:[2,41],37:[2,41],38:[2,41],39:[2,41],40:[2,41],41:[2,41],42:[2,41],44:[2,41],45:[2,41]},{8:41,9:16,10:[1,28],14:18,15:[1,29],17:33,21:9,22:[1,19],24:[1,55],25:56,26:42,27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],37:[1,38],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{10:[2,19],15:[2,19],22:[2,19],24:[2,19],36:[2,19],37:[2,19],38:[2,19],39:[2,19],40:[2,19],41:[2,19],42:[2,19],44:[2,19],45:[2,19]},{10:[2,21],15:[2,21],22:[2,21],24:[2,21],36:[2,21],37:[2,21],38:[2,21],39:[2,21],40:[2,21],41:[2,21],42:[2,21],44:[2,21],45:[2,21]},{10:[2,22],15:[2,22],22:[2,22],24:[2,22],36:[2,22],37:[2,22],38:[2,22],39:[2,22],40:[2,22],41:[2,22],42:[2,22],44:[2,22],45:[2,22]},{5:[2,46],10:[2,46],11:[2,46],15:[2,46],16:[2,46],22:[2,46],24:[2,46],28:[2,46],36:[2,46],37:[2,46],38:[2,46],39:[2,46],40:[2,46],41:[2,46],42:[2,46],44:[2,46],45:[2,46]},{5:[2,7],10:[2,7],11:[2,7],15:[2,7],16:[2,7],22:[2,7],24:[2,7],28:[2,7],36:[2,7],37:[2,7],38:[2,7],39:[2,7],40:[2,7],41:[2,7],42:[2,7],44:[2,7],45:[2,7]},{7:58,11:[1,57],13:7,17:59,36:[1,20]},{11:[1,60]},{11:[1,61],28:[1,62]},{11:[2,9],36:[2,9]},{11:[2,25],28:[2,25]},{5:[2,12],10:[2,12],11:[2,12],15:[2,12],16:[2,12],22:[2,12],24:[2,12],28:[2,12],36:[2,12],37:[2,12],38:[2,12],39:[2,12],40:[2,12],41:[2,12],42:[2,12],44:[2,12],45:[2,12]},{6:31,7:5,8:6,9:16,10:[1,28],13:7,14:18,15:[1,29],16:[1,63],17:10,21:9,22:[1,19],27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{10:[2,16],15:[2,16],22:[2,16],36:[2,16],38:[2,16],39:[2,16],40:[2,16],41:[2,16],42:[2,16],44:[2,16],45:[2,16]},{10:[2,17],15:[2,17],22:[2,17],36:[2,17],38:[2,17],39:[2,17],40:[2,17],41:[2,17],42:[2,17],44:[2,17],45:[2,17]},{18:[2,40],19:[2,40],37:[2,40]},{5:[2,18],10:[2,18],11:[2,18],15:[2,18],16:[2,18],22:[2,18],24:[2,18],28:[2,18],36:[2,18],37:[2,18],38:[2,18],39:[2,18],40:[2,18],41:[2,18],42:[2,18],44:[2,18],45:[2,18]},{10:[2,20],15:[2,20],22:[2,20],24:[2,20],36:[2,20],37:[2,20],38:[2,20],39:[2,20],40:[2,20],41:[2,20],42:[2,20],44:[2,20],45:[2,20]},{5:[2,8],10:[2,8],11:[2,8],15:[2,8],16:[2,8],22:[2,8],24:[2,8],28:[2,8],36:[2,8],37:[2,8],38:[2,8],39:[2,8],40:[2,8],41:[2,8],42:[2,8],44:[2,8],45:[2,8]},{11:[2,10],36:[2,10]},{18:[1,34],19:[1,35],20:36,26:37,37:[1,38]},{5:[2,23],10:[2,23],11:[2,23],15:[2,23],16:[2,23],22:[2,23],24:[2,23],28:[2,23],36:[2,23],37:[2,23],38:[2,23],39:[2,23],40:[2,23],41:[2,23],42:[2,23],44:[2,23],45:[2,23]},{5:[2,24],10:[2,24],11:[2,24],15:[2,24],16:[2,24],22:[2,24],24:[2,24],28:[2,24],36:[2,24],37:[2,24],38:[2,24],39:[2,24],40:[2,24],41:[2,24],42:[2,24],44:[2,24],45:[2,24]},{8:64,9:16,10:[1,28],14:18,15:[1,29],17:33,21:9,22:[1,19],27:17,30:8,31:11,32:12,33:13,34:14,35:15,36:[1,20],38:[1,24],39:[1,25],40:[1,26],41:[1,21],42:[1,27],44:[1,22],45:[1,23]},{5:[2,13],10:[2,13],11:[2,13],15:[2,13],16:[2,13],22:[2,13],24:[2,13],28:[2,13],36:[2,13],37:[2,13],38:[2,13],39:[2,13],40:[2,13],41:[2,13],42:[2,13],44:[2,13],45:[2,13]},{11:[2,26],28:[2,26]}],
defaultActions: {3:[2,2],30:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};

  //var nodes;
  //setTimeout(function () {
  //  nodes = texas_script.compiler.nodes;
  //}, 0);
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this._input = this.match.slice(n) + this._input;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip comment */
break;
case 1:/* skip whitespace */
break;
case 2: this.begin('string'); this.string_buffer = ""; 
break;
case 3: this.popState(); yy_.yytext = this.string_buffer; return 41; 
break;
case 4: this.string_buffer = yy_.yytext; 
break;
case 5: this.begin('regex'); 
break;
case 6: this.popState(); return 43; 
break;
case 7: return 42; 
break;
case 8:return 45
break;
case 9:return 44
break;
case 10:return 40
break;
case 11:return 38
break;
case 12:return 39
break;
case 13:return 10
break;
case 14:return 11
break;
case 15:return 15
break;
case 16:return 16
break;
case 17:return 22
break;
case 18:return 24
break;
case 19:return 18
break;
case 20:return 19
break;
case 21:return 28
break;
case 22:return 37 //'
break;
case 23:return 36 //'
break;
case 24:return 5
break;
case 25:return 'INVALID'
break;
}
};
lexer.rules = [/^;;.*/,/^\s+/,/^"/,/^"/,/^(\\"|[^"])*/,/^\//,/^\/[a-zA-Z]*/,/^(\\\/|[^\/])*/,/^[0-9]{1,2}#-?[a-zA-Z0-9]+\b/,/^-?[0-9]+(\.[0-9]+)?\b/,/^nil\b/,/^(true|yes)/,/^(false|no)/,/^\{/,/^\}/,/^\[/,/^\]/,/^\(/,/^\)/,/^=/,/^<-/,/^,/,/^[\w@#\.!\$%\^&\*\-\+='"\?\|\/\\<>]+:/,/^[\w@#\.!\$%\^&\*\-\+='"\?\|\/\\<>]+\b/,/^$/,/^./];
lexer.conditions = {"string":{"rules":[3,4],"inclusive":false},"regex":{"rules":[6,7],"inclusive":false},"INITIAL":{"rules":[0,1,2,5,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}