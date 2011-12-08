
/**
 * clii.run()
 *
 * Main function for `clii` instance
 * 
 * Examples:
 * 
 *        cli.run();
 * 
 *        cli.run( function (args) {
 *          console.log('args:', args);
 *        });
 * 
 * 
 * @param {Function} runFunc the main function executed
 * @param {String|Array} args optional args list if you 
 * want to override `process.argv`
 * 
 */

module.exports = function ( runFunc, args ) {

  var parsed;    // parsed arguments object
      
    
  /**
   * assign args from passed argument / proccess.argv
   * 
   * TODO: process.argv behaves odd here (in mocha tests)
   */
  this.args = args || process.argv.splice(2) || [];
  
  /**
   * assign .main() to passed `runFunc` or anon function
   */
  this.main = typeof runFunc === 'function' ? runFunc : function(){};
  
  /**
   * parse `args`
   */
  parsed = this.parse(this.args);
  
  if ( parsed.matched.length > 0 ) {
    for (var i=0; i < parsed.matched.length; i++) {
      var match = parsed.matched[i];
      this.runOption(match.option, match.params);
    };
  
  // show the usage menu if no options are found
  } else {
    console.log( this.menu() );
  }
  
  // pass props to cli.main()
  if ( typeof this.main === 'function' ) {
    this.main.call(this, parsed.props, this.args);
  }

 return this;
}