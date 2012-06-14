
TEXAS.String = TEXAS.Object.clone {
  clone: (s) -> TEXAS.Object.clone.call(TEXAS.String, value: s)
  clone_with_string_$colon_: (s) -> @clone "#{s}"
  _$plus__$plus_: (s) -> TEXAS.String.clone "#{this}#{s}"
  print: ->
    console.log "#{this}"
    this
    
  toString: -> @value
  valueOf: -> @value
}