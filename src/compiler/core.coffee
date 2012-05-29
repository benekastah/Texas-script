root = global ? window

texas_script =
  parser: parser
  compiler:
    compile: (nodes) ->
      c_nodes = for node in nodes then node.compile()
      c_nodes.join ';\n'
      
    nodes: {}
    
root.TSNODES = texas_script.compiler.nodes
if module?.exports
  module.exports = texas_script
else
  root.texas_script = texas_script

__toString = Object::toString 
type_of = (x) ->
  __toString.call(x).slice(8, -1).toLowerCase()