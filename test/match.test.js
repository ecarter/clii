describe('#match()', function(){
  
  var Clii = require('../');
  
  it('should respond to Clii.match()', function(){
    Clii().should.respondTo('match');
  })
  
  it('should match option', function(done){
    Clii()
      .option('-a, --one')
      .run(function (opts, args) {
        opts.should.eql({ one: true });
        args.should.eql([]);
        done();
      }, '-a');
  })
  
  it('should match option with parameter', function(done){
    Clii()
      .option('-a, --one [param]')
      .run(function (opts, args) {
        opts.should.eql({ one: 'test-value' });
        args.should.eql(['test-value']);
        done();
      }, '-a test-value');
  })
  
})

// TODO: actual tests

