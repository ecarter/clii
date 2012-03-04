describe('#parse()', function(){
  
  var Clii = require('../');
  
  it('should respond to Clii.parse()', function(){
    Clii().should.respondTo('parse');
  })
  
  describe('Arguments as String', function(){

    it('should parse -a', function(){
      Clii().parse('-a').should.eql([{
        flags: [ '-a' ],
        args: []
      }])
    })

    it('should parse --option-name', function(){
      Clii().parse('--option-name').should.eql([{
        flags: [ '--option-name' ],
        args: []
      }])
    })

    it('should parse -abc one two three', function(){
      Clii().parse('-abc one two three').should.eql([{
        flags: [ '-a', '-b', '-c' ]
      , args: [ 'one', 'two', 'three' ]
      }])
    })

    it('should parse -AB one two -CD three four', function(){
      Clii().parse('-AB one two -CD three four').should.eql([
        {
          flags: [ '-A', '-B' ]
        , args: [ 'one', 'two' ]
        },
        {
          flags: [ '-C', '-D' ]
        , args: [ 'three', 'four' ]
        }
      ])
    })

    it('should parse -AB one two three four -CD five six', function(){
      Clii().parse('-AB one two three four -CD five six').should.eql([
        {
          flags: [ '-A', '-B' ]
        , args: [ 'one', 'two', 'three', 'four' ]
        },
        {
          flags: [ '-C', '-D' ]
        , args: [ 'five', 'six' ]
        }
      ])
    })

    it('should parse --option1 param1 --option2 param2 param3 --option3 param4 param5 parma6', function(){
      Clii().parse('--option1 param1 --option2 param2 param3 --option3 param4 param5 param6').should.eql([
        {
          flags: [ '--option1' ]
        , args: [ 'param1' ]
        },
        {
          flags: [ '--option2' ]
        , args: [ 'param2', 'param3' ]
        },
        {
          flags: [ '--option3' ]
        , args: [ 'param4', 'param5', 'param6' ]
        }
      ])
    })

    it('should parse `-abcdef one "two three" four five six`', function(){
      Clii().parse('-abcdef one "two three" four five six')
        .should.eql([
          {
            flags: [ '-a', '-b', '-c', '-d', '-e', '-f' ]
          , args: [ 'one', '"two three"', 'four', 'five', 'six' ]
          }
        ])
    })
  
  })
  
  describe('Arguments as Array', function(){
  
    it('parse Array of arguments', function(){
      Clii().parse(
        [ '-abcdef', 'one', 'two three', 'four', 'five six', 'seven', 'eight nine', 'ten' ]
      )
      .should.eql([{
        flags: [ '-a','-b','-c','-d','-e','-f' ]
      , args: [ 'one', 'two three', 'four', 'five six', 'seven', 'eight nine', 'ten' ]
      }])
    })

  })

})
