
var Clii = require('../');

describe('Clii() Constructor', function(){
  
  var testCli;
  
  before(function(){
    testCli = { _name: 'test-cli',
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
  })
  
  describe('new Clii()', function(){
    it('should return new Clii instance', function(){
      (new Clii()).options.should.eql([testCli.options[0]]);
    })
  })
  
  describe('Clii()', function(){
    it('should return new Clii instance', function(){
      Clii().options.should.eql([testCli.options[0]]);
    })
  })
  
  describe('Clii( setup )', function(){
    it('should return new Clii instance with setup properties', function(){
      Clii({
        name: 'test-cli',
        version: '0.0.0'
      }).should.eql(testCli);
    })
  })
  
})

describe('#name()', function(){
  it('should equal my-cli', function(){
    Clii('my-cli v0.0.1').name().should.eql('my-cli');
  })
})

describe('#version()', function(){
  it('should equal 0.0.1', function(){
    Clii('my-cli v0.0.1').version().should.eql('0.0.1');
  })
})