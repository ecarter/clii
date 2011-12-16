/**
 * Clii - parse
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
var token = require('./token');

/** Exports */
module.exports = parse;

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

function parse ( args ) {
  
  if ( typeof args === 'undefined' ) {
    return new Error ( 'parse() requires argument String' );
  }
  
  // TODO: original purpose of this is... ?
  if ( args instanceof Array ) {
    args = args.join(' ');
  }
  
  var parsed          // returned Array of arg / params
    , token_strings   // seperated strings
    , lines;          // split `args` at -|--
  
  parsed = [];                        // parsed array of token sets
  lines = args.split(/\s(\-?\-)/g);   // break string at - | --
  token_strings = [];                 // line collection
  
  /**
   * Parse option lines
   */
  
  for ( var i=0; i < lines.length; i++ ) {
    
    var line = lines[i];
    
    // TODO: resolve the following hack
    // split the lines, if the current line is -- or -
    // assume it's the beginning of a line containing alias|option
    // push current+next to token_strings
    
    if ( line === '--' || line === '-' ) {
      token_strings.push( line + lines[i+1] );  // TODO: out of index
      lines = lines.splice(i);                  // remove next element since we used it
    
    } else {
      token_strings.push( line );
    }
  }
  
  /**
   * Parse lines into tokens
   */
  
  tokens = token_strings.map( function(str) {
    
    var tokenized;
    
    tokenized = str.split(/\s/g).map( function (s) {
      return token(s);
    });
    
    return tokenized;
  });
  
  /**
   * Package everything into a usable return object
   */
  
  tokens.forEach( function(items){
    
    var args, params;
    
    args = [];
    params = [];
    
    items.forEach( function(item) {
      if ( item.type === 'alias-list' ) {
        args = item.aliases.map( function(a){ return '-' + a; });
      } else if ( item.type === 'keyword' ) {
        params.push( item.token );
      } else {
        args.push( item.token );
      }
    });
    
    parsed.push( { args: args, params: params } );
  });
  
  return parsed;
}

