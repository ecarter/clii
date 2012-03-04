/**
 * Clii - parse
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/**
 * Parses cli arguments.
 *
 * Examples:
 *
 * Pass a String
 *
 *    .parse('-abc one two three')
 *
 * Both return:
 *
 *    [
 *      { args: [ 'a', 'b', 'c' ],
 *        params: [ 'one', 'two', 'three' ] }
 *    ]
 * 
 * Multiple alias combinations allowed:
 *
 *    .parse('-AB one two -CD three four')
 *
 *    // expanded: -A -B one two -C -D three four
 *
 * How arguments are parsed:
 * 
 * Each -a (alias) and --option acts as a break point for accepting params.
 *
 *    -AB one two -CD three four
 *                ^
 *            break here
 *
 * Resulting in:
 *
 *    [
 *      { args: [ 'A', 'B' ],
 *        params: [ 'one', 'two' ] },
 *      { args: [ 'C', 'D' ],
 *        params: [ 'three', 'four' ] },
 *    ]
 *
 * However
 *
 *    -AB one two three four -CD five six
 *                           ^
 *                         break
 *
 * Results in:
 *
 *    [
 *      { args: [ 'A', 'B' ],
 *        params: [ 'one', 'two', 'three', 'four' ] },
 *      { args: [ 'C', 'D' ],
 *        params: [ 'five', 'six' ] }
 *    ]
 *
 * @param {String} args arguments String
 * @return {Array} array of parsed `token` objects
 */

module.exports = function parse ( args ) {
  
  var parsed          // returned Array of arg / params
    , tokens
    , self
    ;

  if ( typeof args === 'undefined' ) {
    return new Error ( 'parse() requires argument String' );
  }
  
  if ( typeof args === 'string' ) {
    // TODO: ugly but works, regexp needs love
    args = args.match( /\-\-\w+?\w\-+\w+|\-\-\w+|\-\w+|\w+|"[^"]+"/g );
  }
  
  parsed = [];   // parsed array of token sets
  tokens = [];   // line collection
  self = self || this;
  
  // Tokenize list of arguments
  args.forEach( function ( arg ) {
    tokens.push( self.token( arg ) );
  });
  
  var flags
    , args
    , last
    , line
    ;
  
  line = { flags: [], args: [] };
  parsed.push( line );
  
  var flagTypes = [ 'alias', 'alias-list', 'option' ];

  tokens.forEach( function ( token, index ) {
    
    if ( last ) {
      if ( !!~flagTypes.indexOf( token.type ) 
          && !~flagTypes.indexOf( tokens[ index - 1 ].type )
         ) {
        parsed.push ( { flags: [], args: [] } );
        line = parsed[ parsed.length - 1 ];
      }
    }   
    
    switch ( token.type ) {
      case 'alias-list':
        line.flags = line.flags.concat(
          token.aliases.map( function ( alias ) {
            return '-' + alias; 
          })
        );
        break;
      case 'alias':
      case 'option':
        line.flags.push( token.token );
        break;
      default:
        line.args.push( token.token );
        break;
    }
    
    last = line; 
  });
  
  this.parsed = parsed;
  
  return parsed;
};

