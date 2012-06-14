_clone = Object.create ? (o) ->
  Noop = ->
  Noop:: = o
  new Noop()

_merge = (objs...) ->
  objs.reverse()
  base = objs.pop()
  for obj in objs
    if not obj? then continue
    for own prop, value of obj
      base[prop] = value
  base

TEXAS.Object = {
  clone: (o) ->
    new_o = _clone this
    new_o._$super_ = this
    _merge new_o, o
        
  clone_with_properties_$colon_: (o) ->
    @clone o
        
  merge: (objs...) -> _merge _clone(TEXAS.Object), objs...
  
  each: (fn, ownOnly = true) ->
    if ownOnly
      for own prop, value of this
        fn prop, value
    else
      for prop, value of this
        fn prop, value
}