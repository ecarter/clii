
var cli = require('../')();

describe('Clii.prototype.run()', function(){
  
  it('should execute run function', function(done){
    cli.run( function(){
      done();
    }, '-abc one two three');
  })
  
})