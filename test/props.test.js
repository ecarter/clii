var cli = require('../');


describe('Clii - properties', function(){
  
  describe('name/version', function(){
    
    it('should return name/version from Clii(\'name version\')', function(){
      var mycli = cli('my-cli v0.0.1');
      mycli._name.should.eql('my-cli');
      mycli._version.should.eql('0.0.1');
    })
    
    it('should return name equal to test-cli-name', function(){
      cli('test-cli-name')._name.should.eql('test-cli-name');
    })
    
  })
  
})