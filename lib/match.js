/**
 * Clii - match
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Exports */
module.exports = match;

/**
 * Match parsed argument tokens to available options.
 *
 * Examples:
 *
 *    // create a cli with 2 boolean options
 *    cli
 *      .option('-a, --one  first option')
 *      .option('-b, --two  second option')
 *
 *    // normally .run() does the following for you
 *    var options = cli.options
 *      , tokens = cli.parse('-a');
 *
 *    // get the match object
 *    cli.match(options, tokens);
 *
 * Example Cases:
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
 *      two: true,
 *      _unknowns: [ 'three' ]
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

function match ( options, parsed ) {

  var matched;
  
  matched = {};
  
  /**
   * Loop through parsed arguments sets
   */
  parsed.forEach( function(set) {
    
    var consumed;
    consumed = 0;
    
    /**
     * Loop through parsed tokens
     */
    
    set.args.forEach( function(arg,i) {
      
      var option;
      
      /**
       * Find option that has alias or name equal to `arg` minus prefix -|--
       */
      
      option = options.filter( function (opt) {
        var _arg;
        _arg = arg.replace(/^\-\-no\-|\-\-|\-/,'');
        if ( _arg === opt.name || _arg === opt.alias ) {
          return opt;
        }
      })[0]; // but only 1
      
      /**
       * When option is found
       */
       
      if ( option ) {
        
        // if option has passable parameters
        if ( option.params ) {
          
          var params;
          
          // make a copy of the params Array we need for option
          params = set.params.splice(option.params.length);
          
          // assign params to matched property
          matched[ option.name.toProp() ] = params;
          
        } else {
          
          // if option doesn't specify parameters, set true|false
          matched[ option.name.toProp() ] = !(/^\-\-no\-/.test(arg));
        }
        
      }
      
    }); // end set.args.forEach
    
  }); // end parsed.forEach
  
  return matched;
}

