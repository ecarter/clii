describe('util.propertyName()', function(){
  
  var propertyName = require('../lib/util').propertyName;
  
  it('should convert "option-name" to "optionName"', function(){
    propertyName('option-name').should.eql('optionName')
  })
  
  it('should convert "yes|no|maybe" to "yesNoMaybe"', function(){
    propertyName('yes|no|maybe').should.eql('yesNoMaybe')
  })
  
  it('should convert "Anything YOU-WANT!!!" to "anythingYouWant"', function(){
    propertyName('Anything YOU-WANT!!!').should.eql('anythingYouWant')
  })
  
})