array_fns = [
  "pop", "push", "reverse", "shift", "sort", "splice", "unshift",
  "concat", "join", "slice", "indexOf", "lastIndexOf",
  "filter", ["forEach", "each"], "every", "map", "some", "reduce", "reduceRight"
]

TEXAS.List = TEXAS.Object.clone {
  clone: (items...) ->
    @_$super_.clone.call this, {
      storage: items
    }
    
  clone_with_items_$colon_: ->
    @clone arguments...
}

Array_proto = Array::
for fname in array_fns
  if (type_of fname) is "array"
    js_name = fname[0]
    tx_name = fname[1]
  else
    js_name = fname
    tx_name = fname.replace /([A-Z])/g, (x) -> "_#{x.toLowerCase()}"
  do ->
    method = Array_proto[js_name]
    TEXAS.List[tx_name] = -> method.apply @storage, arguments