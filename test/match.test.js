
var cli = require('../').Clii;

describe('Clii.match()', function(){
  
  it('should respond to Clii.match()', function(){
    cli.should.respondTo('match');
  })
  
})