/**
 * Clii - match
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
var toProp = require('./util').propertyName;

/**
 * Matches parsed argument tokens to Array of `Option` instances.
 *
 * Examples:
 *
 *  Create a cli with 2 boolean options
 *
 *      .option('-a, --one  first option')
 *      .option('-b, --two  second option')
 *
 *  Get the match object
 *
 *    cli.match(cli.options, cli.parse('-abc one two three'));
 *
 * Examples:
 *
 * `-a` | `--one`
 *
 *    { one: true }
 *
 * `-ab` | `--one --two`
 *
 *    { one: true, two: true }
 *
 * `-ab three` | `--one --two three`
 *
 *    {
 *      one: true,
 *      two: true
 *    }
 *
 *    // since -a, -b are not required, the third argument is considered unknown.
 *
 * Make `-a` consume the optional parameter:
 * 
 *    cli.option('-a, --one [optional-param]  the first option')
 *
 * Now if we pass `--one --two three` we get the expected result of
 *
 *    {
 *      one: 'three',
 *      two: true
 *    }
 *
 * Argument Validation:
 *
 *    cli.option('-c, --three <req1|req2|req3>  a required option')
 *
 * --three req4
 *
 *    { _errors: [ '-c, --three  requires: req1 | req | req3' ] }
 *    // _errors returned with _ prefix to avoid conflicts
 *
 * Parameter consumption:
 *
 *    cli
 *      .option('-a, --option1 <required-param> [optional-param]')
 *      .option('-b, --option2 [optional-param]')
 *
 * -ab param1 param2 param3 | --option1 param1 param2 --option2 param3
 *
 *    { option1: ['param1','param2'], option2: 'param3' }
 *    // option parameters > 1 = return Array
 *    // option parameters == 1 = return String
 *
 * Required / Optional variations:
 *
 *    cli
 *      .option('-a, --option1 <required-param> [optional-param]')
 *      .option('-b, --option2 <required-param> [optional-param]')
 *
 * -ab param1 param2 | --option1 param1 --option2 param2
 *
 *    { option1: ['param1'], option2: ['param2'] }
 *    // both options returned as Array
 *
 * -ab param1 param2 param3 | --option1 param1 param2 --option2 param3
 *
 *    { option1: ['param1','param2'], option2: ['param3'] }
 *
 * @param {Array} options array of Option instances
 * @param {Array} tokens array of token strings
 */

module.exports = function match ( options, parsed ) {

  var consumed    // Used parameter count for each argument set
    , matched     // Return Object
    , option      // Matched Option
    , params      // Option Params
    , property;   // Option Property Name
  
  matched = {};
  
  /**
   * Loop through parsed arguments sets
   */
  parsed.forEach( function(set) {
    
    consumed = 0; // Reset consumed
    
    /**
     * Loop through parsed tokens
     */
    set.args.forEach( function(arg,i) {
      
      /**
       * Find option that has alias or name equal to `arg` minus prefix -|--
       */
      option = options.filter( function (opt) {
        var _arg;
        _arg = arg.replace(/^\-\-no\-|\-\-|\-/,'');
        if ( _arg === opt.name || _arg === opt.alias ) {
          return opt;
        }
      })[0]; // TODO: a better way to make sure single result is returned?
      
      /**
       * When option is found
       */
      if ( option ) {
        
        property = toProp( option.name );
        
        // if option has passable parameters
        if ( option.params ) {
          
          // make a copy of the params Array we need for option
          params = set.params.slice(consumed, consumed + option.params.length);
          
          // updated how many parameters have been consumed
          consumed += option.params.length;
          
          // assign params to matched property
          matched[property] = option.params.length > 1
                            ? params                    // Multi Params (Array)
                            : params.join('');          // Single Param (String)
          
        } else {
          
          // if option doesn't specify parameters: set boolean true|false
          matched[property] = !(/^\-\-no\-/.test(arg));
        }
        
      }
      
    });
  });
  
  return matched;
};

