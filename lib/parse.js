
/**
 * clii.parse()
 * 
 * Examples:
 * 
 *        cli.parse("-abc Aa Bb Cc");
 * 
 *        cli.parse( ['-abc', 'Aa', 'Bb', 'Cc' ] );
 * 
 * 
 * @param {String|Array} args list of arguments to be parsed
 * 
 */

module.exports = function ( args ) {

  var tokens, parsed;
  
  /**
   * setup return object
   */
  parsed = {};
  parsed.matched = [];
  parsed.kwargs = [];
  parsed.props = {};
  parsed.unknowns = [];
  
  /**
   * convert String argument to Array
   */
  if ( typeof args === 'string' ) {
    tokens = args.split(/\s/);
  }
  
  /**
   * validate argument is Array
   * 
   * TODO: throw error or save for later?
   */
  if ( !(args instanceof Array) ) {
    throw Error('Unsupported type, requires instance of String | Array');
  } else {
    tokens = args;
  }
  
  /**
   * loop through args 
   */
  for ( var count=0, i=0; i < tokens.length; i++ ){ 

    var token = tokens[i]                    // the token in question
      , arg = this.arg( token )              // token argument stats object
      , option = this.getOption( token );    // see if it's an option

   /**
    * when `option` add to available options
    */

    if ( option ) {
      parsed.matched.push( { option: option, args: [] } );
      count++;

   /**
    * when list of aliases
    */

    } else if ( arg.is_alias_list ) {

     /**
      * loop through alias list
      */
      for (var a=0; a < arg.aliases.length; a++) {
        var alias = arg.aliases[a]
          , option = this.getOption(alias);
          
       /**
        * when the alias is a valid option, add to available options
        */
        if ( option ) {
          parsed.matched.push( { option: option, params: [] } );
          count++;
        }
     };

   /**
    * add to keyword arguments
    */
    } else if ( arg.is_keyword ) {
      parsed.kwargs.push( token );
    
    // TODO: what is parsed.unknowns really for?
    } else {
      parsed.unknowns.push( token );
    }

  } // done looping through tokens
  
  var used=0; // count the tokens we've assigned
  for ( var d=0; d < parsed.matched.length; d++ ) {
    var doing = parsed.matched[d]
      , assigned;
    
    // if the array is empty, assume the arg is a boolean
    
    if (doing.option.args.length > 0) {
      assigned = parsed.kwargs[used];
      used++;
    } else {
      assigned = true;
    }
    
    parsed.props[doing.option.prop] = assigned;
  }
  
  return parsed;
}