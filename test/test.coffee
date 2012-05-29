
code = texas_script.parser.parse """
animal = {
  eat food: = [food]
  sleep = ["sleeping"]
}
"""
console.log "code:", code

compiled = texas_script.compiler.compile code
console.log "compiled:", compiled

eval compiled

console.log animal