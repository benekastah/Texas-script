// Generated by CoffeeScript 1.3.1
(function() {
  var Array_proto, array_fns, fname, js_name, tx_name, type_of, __toString, _clone, _fn, _i, _len, _merge, _ref,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  this.TEXAS = {};

  this.__js_root = typeof global !== "undefined" && global !== null ? global : window;

  this.log = console.log.bind(console);

  this.get = function() {
    var obj, props;
    props = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    obj = this.__js_root;
    while (obj && props.length) {
      obj = obj[props.shift()];
    }
    return obj;
  };

  __toString = Object.prototype.toString;

  type_of = function(x) {
    return __toString.call(x).slice(8, -1).toLowerCase();
  };

  _clone = (_ref = Object.create) != null ? _ref : function(o) {
    var Noop;
    Noop = function() {};
    Noop.prototype = o;
    return new Noop();
  };

  _merge = function() {
    var base, obj, objs, prop, value, _i, _len;
    objs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    objs.reverse();
    base = objs.pop();
    for (_i = 0, _len = objs.length; _i < _len; _i++) {
      obj = objs[_i];
      if (!(obj != null)) {
        continue;
      }
      for (prop in obj) {
        if (!__hasProp.call(obj, prop)) continue;
        value = obj[prop];
        base[prop] = value;
      }
    }
    return base;
  };

  TEXAS.Object = {
    clone: function(o) {
      var new_o;
      new_o = _clone(this);
      new_o._$super_ = this;
      return _merge(new_o, o);
    },
    clone_with_properties_$colon_: function(o) {
      return this.clone(o);
    },
    merge: function() {
      var objs;
      objs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _merge.apply(null, [_clone(TEXAS.Object)].concat(__slice.call(objs)));
    },
    each: function(fn, ownOnly) {
      var prop, value, _results, _results1;
      if (ownOnly == null) {
        ownOnly = true;
      }
      if (ownOnly) {
        _results = [];
        for (prop in this) {
          if (!__hasProp.call(this, prop)) continue;
          value = this[prop];
          _results.push(fn(prop, value));
        }
        return _results;
      } else {
        _results1 = [];
        for (prop in this) {
          value = this[prop];
          _results1.push(fn(prop, value));
        }
        return _results1;
      }
    }
  };

  array_fns = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "indexOf", "lastIndexOf", "filter", ["forEach", "each"], "every", "map", "some", "reduce", "reduceRight"];

  TEXAS.List = TEXAS.Object.clone({
    clone: function() {
      var items;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._$super_.clone.call(this, {
        storage: items
      });
    },
    clone_with_items_$colon_: function() {
      return this.clone.apply(this, arguments);
    }
  });

  Array_proto = Array.prototype;

  _fn = function() {
    var method;
    method = Array_proto[js_name];
    return TEXAS.List[tx_name] = function() {
      return method.apply(this.storage, arguments);
    };
  };
  for (_i = 0, _len = array_fns.length; _i < _len; _i++) {
    fname = array_fns[_i];
    if ((type_of(fname)) === "array") {
      js_name = fname[0];
      tx_name = fname[1];
    } else {
      js_name = fname;
      tx_name = fname.replace(/([A-Z])/g, function(x) {
        return "_" + (x.toLowerCase());
      });
    }
    _fn();
  }

  TEXAS.String = TEXAS.Object.clone({
    clone: function(s) {
      return TEXAS.Object.clone.call(TEXAS.String, {
        value: s
      });
    },
    clone_with_string_$colon_: function(s) {
      return this.clone("" + s);
    },
    _$plus__$plus_: function(s) {
      return TEXAS.String.clone("" + this + s);
    },
    print: function() {
      console.log("" + this);
      return this;
    },
    toString: function() {
      return this.value;
    },
    valueOf: function() {
      return this.value;
    }
  });

}).call(this);
