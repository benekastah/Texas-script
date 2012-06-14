
code = texas_script.parser.parse """
animal <= {
  eat food: <= [(("Animal ate " ++ food) print)]
  sleep <= [("Animal sleeping" print)]
}

snake <= (animal clone with-properties:{
  eat food: <= [(("Snake ate " ++ food) print)]
  slither <= [("Snake slithering" print)]
})

(snake eat food:"mouse")
(snake sleep)
(snake slither)

snake
"""
console.log "code:", code

compiled = texas_script.compiler.compile code
console.log "compiled:", compiled

result = eval compiled
console.log "result:", result