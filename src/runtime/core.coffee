
@TEXAS = {}

@__js_root = global ? window

@log = console.log.bind console

@get = (props...) ->
  obj = @__js_root
  while obj and props.length
    obj = obj[props.shift()]
  obj

__toString = Object::toString 
type_of = (x) ->
  __toString.call(x).slice(8, -1).toLowerCase()