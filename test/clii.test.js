
var cli = require('../')
  , Clii = require('../').Clii;

var testCli = { _name: 'test-cli',
  _version: '0.0.0',
  _help: true,
  _errors: true,
  options: [
  { 
    alias: 'h'
  , type: 'option'
  , name: 'help'
  , description: 'this help menu'
  },
  {
    alias: 'v'
  , type: 'option'
  , name: 'version'
  , description: 'show version number'
  } ]
};

describe('new Clii()', function(){
  
  it('should return new Clii using: new Clii()', function(){
    var test = new Clii();
    test.options.should.eql([testCli.options[0]]);
  })
  
  it('should return new Clii using: cli()', function(){
    var test = cli();
    test.options.should.eql([testCli.options[0]]);
  })
  
  it('should return new Clii using: Clii({config})', function(){
    
    var test = cli({
      name: 'test-cli',
      version: '0.0.0'
    });
    
    test.should.eql(testCli);
  })
  // 
})