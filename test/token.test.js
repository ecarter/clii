
var cli = require('../').Clii;

describe('Clii.token()', function(){
  
  it('should return alias', function(){
    cli.token('-a').should.eql({
      type: 'alias'
    , name: 'a'
    , prop: 'a'
    , token: '-a'
    })
  })
  
  it('should return alias trailing comma -a,', function(){
    cli.token('-a,').should.eql({
      type: 'alias'
    , name: 'a'
    , prop: 'a'
    , token: '-a,'
    })
  })
  
  it('should return alias-list', function(){
    cli.token('-ab').should.eql({
      type: 'alias-list'
    , name: 'ab'
    , prop: 'ab'
    , token: '-ab'
    , aliases: [ 'a', 'b' ]
    })
  })
  
  it('should return option', function(){
    cli.token('--option-name').should.eql({
      type: 'option'
    , name: 'option-name'
    , prop: 'optionName'
    , token: '--option-name'
    })
  })
  
  it('should return option-false', function(){
    cli.token('--no-option-name').should.eql({
      type: 'option-false'
    , name: 'option-name'
    , prop: 'optionName'
    , token: '--no-option-name'
    })
  })
  
  it('should return optional', function(){
    cli.token('[optional-arg]').should.eql({
      type: 'optional'
    , name: 'optional-arg'
    , prop: 'optionalArg'
    , token: '[optional-arg]'
    })
  })
  
  it('should return optional-list', function(){
    cli.token('[yes|no]').should.eql({
      type: 'optional-list'
    , name: 'yes no'
    , options: [ 'yes', 'no' ]
    , prop: 'yesNo'
    , token: '[yes|no]'
    })
  })
  
  it('should return required', function(){
    cli.token('<required-arg>').should.eql({
      type: 'required'
    , name: 'required-arg'
    , prop: 'requiredArg'
    , token: '<required-arg>'
    })
  })
  
  it('should return required-list', function(){
    cli.token('<yes|no>').should.eql({
      type: 'required-list'
    , name: 'yes no'
    , options: [ 'yes', 'no' ]
    , prop: 'yesNo'
    , token: '<yes|no>'
    })
  })
  
  it('should return keyword', function(){
    cli.token('pancakes').should.eql({
      type: 'keyword'
    , name: 'pancakes'
    , prop: 'pancakes'
    , token: 'pancakes'
    })
  })
  
  it('should return empty', function(){
    cli.token('').type.should.eql('empty');
  })
  
})