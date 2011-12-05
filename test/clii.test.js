var cli = require('../lib/clii');

var test_args
  , test_parse_args
  , test_menu
  , test_option
  , test_version;

test_args = [ 'arg1', 'arg2', 'arg3' ];
test_parse_args = [ '--test' ];
test_menu = "\n  Usage:  [options]\n\n    -t, --test        this is a test option\n";
test_option = {
  key: 't',
  prop: 'test',
  help: 'this is a test option',
  fn: function (args) {
    console.log('args:',args);
    return done();
  },
  args: [] 
};
test_version = '1.2.3';

function equalsTestOption (opt, done) {
  opt.key.should.eql( test_option.key );
  opt.prop.should.eql( test_option.prop );
  opt.help.should.eql( test_option.help );
  opt.fn.should.eql( test_option.fn );
  opt.args.should.eql( test_option.args );
  done();
}

function checkTestArgs (args, done) {
  args.should.have.length(3);
  args[0].should.eql( test_args[0] );
  args[1].should.eql( test_args[1] );
  args[2].should.eql( test_args[2] );
  done();
}

describe('clii', function(){
  
  before(function(done){
    var keys = '-' + test_option.key + ', --' + test_option.prop;
    cli.option( keys, test_option.help, test_option.fn);
    done();
  })
  
  describe('#option()', function(){
    it('should equal the test option', function(done){
      cli.options.should.have.length(1);
      equalsTestOption( cli.options[0], done );
    })
  })
  
  describe('#getOption()', function(){
    it('should return the test option', function(done){
      var opt = cli.getOption('test');
      equalsTestOption( opt, done );
    })
  })
  
  describe('#doOption()', function(){
    it('should fire option callback', function(done){
      var opt = cli.getOption('test');
      opt.fn = function(args){
        checkTestArgs(args, done);
      };
      cli.doOption( 'test', test_args );
    })
  })
  
  describe('#menu()', function(){
    it('should return menu string', function(done){
      var menu = cli.menu();
      menu.should.eql( test_menu );
      done();
    })
  })
  
  describe('#name()', function(){
    it('should return the cli name', function(done){
      cli.name().should.eql('');
      cli.name('test-cli');
      cli.name().should.eql('test-cli');
      done();
    })
  })
  
  /*!
   * TODO: the following srsly a 1/2 ass test
   */
  describe('#parseArgs()', function(){
    it('should parse the args', function(done){
      var args = cli.parseArgs( test_args );
      checkTestArgs( args, done );
    })
  })
  
  describe('#version()', function(){
    it('should return the version', function(done){
      cli.version().should.eql( '?.?.?' );
      cli.version( test_version );
      cli.version().should.eql( test_version );
      done();
    })
  })
  
})