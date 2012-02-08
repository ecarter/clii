describe('Clii()', function(){
  
  var Clii = require('../');

  describe('Constructor', function(){

    function isClii ( instance, done ) {
      instance.should.be.instanceof(Clii);
      instance.should.respondTo('match');
      instance.should.respondTo('menu');
      instance.should.respondTo('option');
      instance.should.respondTo('parse');
      instance.should.respondTo('run');
      instance.should.respondTo('token');
      done();
    }

    describe('new Clii()', function(){
      it('should return new Clii instance', function(done){
        isClii( new Clii(), done );
      })
    })

    describe('Clii()', function(){
      it('should return new Clii instance', function(done){
        isClii( Clii(), done );
      })
    })

    describe('Clii.create()', function(){
      it('should return new Clii instance', function(done){
        isClii( Clii.create(), done );
      })
    })

  })
  
  
  describe('Properties', function(){
    
    describe('#name()', function(){
      it('should equal name from string setup', function(){
        Clii('my-cli v0.0.1').name().should.eql('my-cli');
      })
    })

    describe('#version()', function(){
      it('should equal version from string setup', function(){
        Clii('my-cli v0.0.1').version().should.eql('0.0.1');
      })
    })
    
  })
  
})