describe('.parse()', function(){
  
  var Clii = require('../');
  
  it('should respond to Clii.parse()', function(){
    Clii.should.respondTo('parse');
  })

  it('should return parsed -a', function(){
    Clii.parse('-a').should.eql([{
      args: [ '-a' ],
      params: []
    }])
  })

  it('should return parsed --option-name', function(){
    Clii.parse('--option-name').should.eql([{
      args: [ '--option-name' ],
      params: []
    }])
  })

  it('should return parsed -abc one two three', function(){
    Clii.parse('-abc one two three').should.eql([{
      args: [ '-a', '-b', '-c' ]
    , params: [ 'one', 'two', 'three' ]
    }])
  })

  it('should return parsed -AB one two -CD three four', function(){
    Clii.parse('-AB one two -CD three four').should.eql([
      {
        args: [ '-A', '-B' ]
      , params: [ 'one', 'two' ]
      },
      {
        args: [ '-C', '-D' ]
      , params: [ 'three', 'four' ]
      }
    ])
  })

  it('should return parsed -AB one two three four -CD five six', function(){
    Clii.parse('-AB one two three four -CD five six').should.eql([
      {
        args: [ '-A', '-B' ]
      , params: [ 'one', 'two', 'three', 'four' ]
      },
      {
        args: [ '-C', '-D' ]
      , params: [ 'five', 'six' ]
      }
    ])
  })

  it('should return parsed --option1 param1 --option2 param2 param3 --option3 param4 param5 parma6', function(){
    Clii.parse('--option1 param1 --option2 param2 param3 --option3 param4 param5 param6').should.eql(
      [
        {
          args: [ '--option1' ]
        , params: [ 'param1' ]
        },
        {
          args: [ '--option2' ]
        , params: [ 'param2', 'param3' ]
        },
        {
          args: [ '--option3' ]
        , params: [ 'param4', 'param5', 'param6' ]
        }
      ]
    )
  })

})