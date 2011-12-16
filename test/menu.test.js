var Clii = require('../');

var output = "\n  Usage: \n\n    -a, --one\n";

var cli = Clii({ help: false });

describe('Clii.prototype.menu()', function(){
  
  describe('Options', function(){
    it('should return menu with 1 option', function (){
      cli.option('-a, --one').menu().should.eql(output);
    })

    it('should return menu with 2 options', function (){
      output += "    -b, --two\n";
      cli.option('-b, --two').menu().should.eql(output);
    })

    it('should return menu with 3 options', function (){
      output += "    -c, --three <required-param>\n";
      cli.option('-c, --three <required-param>').menu().should.eql(output);
    })

    it('should return menu with 4 options', function (){
      output += "    --four <required-param> [optinal-param]\n";
      cli.option('--four <required-param> [optinal-param]').menu().should.eql(output);
    })

    it('should return menu with 5 options', function (){
      output += "    --boolean-option\n";
      cli.option('--boolean-option').menu().should.eql(output);
    })
  })
  
  describe('Built-in', function(){
    
    it('should auto-add -h, --help to menu', function(){
      Clii('test-cli').help(true).menu()
        .should.eql( '\n  Usage: test-cli\n\n' +
        '    -h, --help  this help menu\n' );
    })
    
    it('should auto-add -v, --version to menu', function(){
      Clii('test-cli v0.0.0').version('0.0.0').help(true).menu()
        .should.eql( '\n  Usage: test-cli\n\n' +
        '    -h, --help     this help menu\n' +
        '    -v, --version  show version number\n' );
    })
    
  })
  
})