/**
 * Clii - menu
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/**
 * Generates menu from list of options.
 *
 * Examples:
 *
 * Basic two option cli:
 *
 *    cli()
 *      .option('-a, --one  the 1st option')
 *      .option('-b, --two  the 2nd option')
 *
 * Running `$ ./example` results in:
 *
 *    Usage: 
 *
 *      -a, --one   the 1st option
 *      -b, --two   the 2nd option
 *
 *
 * @param {Array} options Array of `Option` instances
 * @returns formatted menu string
 */

module.exports = function ( options ) {
  
  var lines   // result Array
    , len     // collection of option prefix lengths
    , max     // max length of option prefix
    , menu;   // options menu
  
  lines = [];
  len = [];
  
  options = options || this.options || []; // arguments / self / empty
  
  menu = options.map( function ( opt ) {
    
    var output
      , params
      , usage;
    
    output = {};
    usage = '';
    
    if ( opt.alias ) {
      usage += '-' + opt.alias;
    }
    
    if ( /option/.test(opt.type) && opt.name ) {
      if ( opt.alias ) usage += ', ';
      usage += '--' + opt.name;
    }
    
    if ( opt.params ) {
      params = opt.params.map( function (param) {
        var name;
        name = param.name || param.options.join('|');
        return param.required === true 
                ? '<' + name + '>' 
                : '[' + name + ']';
      });
      usage += ' ' + params.join(' ');
    }
    
    output.text = usage;
    len.push( output.text.length );
    if ( opt.description ) output.description = opt.description;
    
    return output;
  });
  
  max = Math.max.apply( Math, len );
  
  lines.push('');
  lines.push('  Usage: ' + ( this._name || '' ) );
  lines.push('');
  
  menu.forEach( function(line) {
    var output, space;
    output = '    ' + line.text;
    space = Array( (max - line.text.length) + 3 ).join(' ');
    if ( line.description ) output += space + line.description;
    lines.push(output)
  });
  
  lines.push('');
  
  return lines.join('\n');
}