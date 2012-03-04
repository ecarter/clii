describe('#match()', function(){
  
  var Clii = require('../');
  
  it('should respond to Clii.match()', function(){
    Clii().should.respondTo('match');
  })
  
  it('should match option', function(done){
    Clii()
      .option('-a, --one')
      .run(function (options, args) {
        options.should.eql({ one: true });
        args.should.eql([]);
        done();
      }, '-a');
  })
  
  it('should match option with parameter', function(done){
    Clii()
      .option('-a, --one [param]')
      .run(function (opts, args) {
        opts.should.eql({ one: 'value' });
        args.should.eql(['value']);
        done();
      }, '-a value');
  })
  
})

// TODO: actual tests

