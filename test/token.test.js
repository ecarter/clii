describe('#token()', function(){
  
  var Clii = require('../');
  
  it('should return alias', function(){
    Clii.token('-a').should.eql({
      type: 'alias'
    , name: 'a'
    , prop: 'a'
    , token: '-a'
    })
  })
  
  it('should return alias trailing comma -a,', function(){
    Clii.token('-a,').should.eql({
      type: 'alias'
    , name: 'a'
    , prop: 'a'
    , token: '-a,'
    })
  })
  
  it('should return alias-list', function(){
    Clii.token('-ab').should.eql({
      type: 'alias-list'
    , name: 'ab'
    , prop: 'ab'
    , token: '-ab'
    , aliases: [ 'a', 'b' ]
    })
  })
  
  it('should return option', function(){
    Clii.token('--option-name').should.eql({
      type: 'option'
    , name: 'option-name'
    , prop: 'optionName'
    , token: '--option-name'
    })
  })
  
  it('should return option-false', function(){
    Clii.token('--no-option-name').should.eql({
      type: 'option-false'
    , name: 'option-name'
    , prop: 'optionName'
    , token: '--no-option-name'
    })
  })
  
  it('should return optional', function(){
    Clii.token('[optional-arg]').should.eql({
      type: 'optional'
    , name: 'optional-arg'
    , prop: 'optionalArg'
    , token: '[optional-arg]'
    })
  })
  
  it('should return optional-list', function(){
    Clii.token('[yes|no]').should.eql({
      type: 'optional-list'
    , name: 'yes no'
    , options: [ 'yes', 'no' ]
    , prop: 'yesNo'
    , token: '[yes|no]'
    })
  })
  
  it('should return required', function(){
    Clii.token('<required-arg>').should.eql({
      type: 'required'
    , name: 'required-arg'
    , prop: 'requiredArg'
    , token: '<required-arg>'
    })
  })
  
  it('should return required-list', function(){
    Clii.token('<yes|no>').should.eql({
      type: 'required-list'
    , name: 'yes no'
    , options: [ 'yes', 'no' ]
    , prop: 'yesNo'
    , token: '<yes|no>'
    })
  })
  
  it('should return keyword', function(){
    Clii.token('pancakes').should.eql({
      type: 'keyword'
    , name: 'pancakes'
    , prop: 'pancakes'
    , token: 'pancakes'
    })
  })
  
  it('should return empty', function(){
    Clii.token('').type.should.eql('empty');
  })
  
})