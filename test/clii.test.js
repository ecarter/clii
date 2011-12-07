var cli = require('../lib/clii')();

var test_args
  , test_parse_args
  , test_menu
  , test_option
  , test_version;

test_args = [ '-abc', '--test', '--unknown-option', 'kwarg1', 'kwarg2', 'kwarg3' ];

test_menu = [
  "\n  Usage:  [options]\n\n"
, "    -t, --test        this is a test option\n"
// , "    -h, --help        this help menu\n"
].join('');

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

test_parsed = {
  "options": [
    {
      "option": {
        "key": "t",
        "prop": "test",
        "help": "this is a test option",
        "args": []
      },
      "args": []
    }
  ],
  "kwargs": [ "kwarg1", "kwarg2", "kwarg3" ],
  "props": { "test": true },
  "unknowns": [ "--unknown-option" ]
};

test_version = '1.2.3';

/**
 * checks against test_option
 */

function equalsTestOption (opt, done) {
  // console.log('equalsTestOption():',opt);
  opt.key.should.eql( test_option.key );
  opt.prop.should.eql( test_option.prop );
  opt.help.should.eql( test_option.help );
  opt.fn.should.be.a( 'function' );
  opt.args.should.eql( test_option.args );
  done();
}

/**
 * checks against test_args
 */
function checkTestArgs (args, done) {
  // args.should.have.length(3);
  // args[0].should.eql( test_args[0] );
  // args[1].should.eql( test_args[1] );
  // args[2].should.eql( test_args[2] );
  done();
}

/**
 * test suite
 */

describe('clii', function(){
  
  before(function(done){
    var option_str = '-' + test_option.key + ', --' + test_option.prop + '  ' + test_option.help;
    cli.option( option_str, test_option.fn);
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
  
  describe('#runOption()', function(){
    it('should fire option callback', function(done){
      var opt = cli.getOption('test');
      opt.fn = function(args){
        checkTestArgs(args, done);
      };
      cli.runOption( 'test', test_args );
    })
  })
  
  /* TODO: come back to this 
  describe('#main()', function(){
    it('should execute main function with args', function(done){
      cli.run( function (props, args) {
        console.log('calling main()');
        console.log('main() - props:', props);
        console.log('main() - args:', args);
        done();
      }, test_args );
    })
  })
  */
  
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
  describe('#parse()', function(){
    it('should parse the args', function(done){
      var args
        , testopt;
      
      args = cli.parse( test_args );
      args.options.should.have.length(1);
      args.kwargs[0].should.equal( test_parsed.kwargs[0] );
      args.kwargs[1].should.equal( test_parsed.kwargs[1] );
      args.kwargs[2].should.equal( test_parsed.kwargs[2] );
      args.props.test.should.equal( test_parsed.props.test );
      args.unknowns[0].should.equal( test_parsed.unknowns[0] );
      
      testopt = args.options[0].option;
      equalsTestOption(testopt, done);
    })
  })
  
  describe('#version()', function(){
    it('should return the version', function(done){
      
      // make sure DEFAULTS.options.version hasn't been added without being invoked by cli.version() first
      require('assert').equal( cli.getOption('version'), null );
      
      // make sure version equals DEFAULTS.version_number
      cli.version().should.eql('?.?.?');
      
      // set the version number
      cli.version( test_version );
      
      // check to make sure version number changed
      cli.version().should.eql( test_version );
      
      // wrap it up
      done();
    })
  })
  
})