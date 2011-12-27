
var Clii = require('../');

describe('Clii.prototype.run()', function(){
  
  it('should execute run function', function(done){
    (new Clii()).run(function(){
      done();
    });
  })
  
  it('should return options boolean values', function(done){
    (new Clii())
      .option('-a, --option1')
      .option('-b, --option2')
      .run(function(opts,args){
        opts.should.eql({ option1: true, option2: true });
        args.should.eql([ 'one', 'two' ])
        done();
      }, '-a one -b two')
  })
  
  it('should return options with argument', function(done){
    (new Clii())
      .option('-a, --option1 <arg1>')
      .option('-b, --option2 <arg2>')
      .run(function(opts,args){
        opts.should.eql({ option1: 'one', option2: 'two' });
        args.should.eql(['one','two'])
        done();
      }, '-a one -b two')
  })
  
  it('should return options with argument', function(done){
    (new Clii())
      .option('-a, --option1 <arg1>')
      .option('-b, --option2 <arg2>')
      .run(function(opts,args){
        opts.should.eql({ option1: 'one', option2: 'two' });
        args.should.eql(['one','two'])
        done();
      }, '-ab one two')
  })
  
  it('should return options with argument', function(done){
    (new Clii())
      .option('-a, --option1 <arg1>')
      .option('-b, --option2 <arg2>')
      .option('-c, --option3 <arg3>')
      .option('-d, --option4 <arg4>')
      .run(function(opts,args){
        opts.should.eql({ option1: 'one', option2: 'two', option3: 'three', option4: 'four' });
        args.should.eql(['one','two','three','four']);
        done();
      }, '-ab one two -cd three four')
  })
  
  it('should return options with argument', function(done){
    (new Clii())
      .option('-a, --option1 <arg1> [arg2]')
      .option('-b, --option2 <arg3> [arg4]')
      .run(function(opts,args){
        opts.should.eql({ option1: ['one','two'], option2: ['three','four'] });
        args.should.eql(['one','two','three','four']);
        done();
      }, '-a one two -b three four')
  })
  
})