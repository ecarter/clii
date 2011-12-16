
var cli = require('../')({help:false});

var options = [
  {
    alias: 'a'
  , name: 'a'
  , type: 'option'
  },
  {
    alias: 'b'
  , name: 'option-name-b'
  , type: 'option'
  },
  {
    alias: 'c'
  , name: 'option-name-c'
  , type: 'option'
  , params: [{ required: false, name: 'option' }]
  },
  {
    alias: 'd'
  , name: 'option-name-d'
  , type: 'option'
  , params: [{
      required: false,
      options: [ 'opt1', 'opt2', 'opt3' ]
    }]
  },
  {
    alias: 'e'
  , name: 'option-name-e'
  , type: 'option'
  , params: [{
      required: true
    , options: [ 'req1', 'req2', 'req3' ]
    }]
  },
  {
    type: 'keyword'
  , name: 'keyword-name'
  },
  {
    type: 'keyword'
  , name: 'keyword-name'
  , params: [ { required: false, name: 'optional' } ]
  }
];

describe('Clii.prototype.option()', function(){
  
  it('should equal alias', function(){
    cli.option('-a')
      .options[0].should.eql(options[0]);
  })
  
  it('should equal alias + named option', function(){
    cli.option('-b, --option-name-b')
      .options[1].should.eql(options[1])
  })
  
  it('should equal alias + named option + optional parameter', function(){
    cli.option('-c, --option-name-c [option]')
      .options[2].should.eql(options[2])
  })
  
  it('should equal alias + named option + optional choice parameter', function(){
    cli.option('-d, --option-name-d [opt1|opt2|opt3]')
      .options[3].should.eql(options[3])
  })
  
  it('should equal alias + named option + optional choice parameter', function(){
    cli.option('-e, --option-name-e <req1|req2|req3>')
      .options[4].should.eql(options[4])
  })
  
  it('should equal keyword option', function(){
    cli.option('keyword-name')
      .options[5].should.eql(options[5])
  })
  
  it('should equal keyword option + optional parameter', function(){
    cli.option('keyword-name [optional]')
      .options[6].should.eql(options[6])
  })
  
})