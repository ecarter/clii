/**
 * Clii - run
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
var match = require('./match')
  , parse = require('./parse');

/** Exports */
module.exports = run;

/**
 * Parses arguments, finds `Option` matches, fires `run` callback.
 *
 * Examples:
 *
 *    #!/usr/bin/env node
 *    var cli = require('clii');
 *
 *    // does nothing
 *    cli.run() 
 *
 *    // prints "hi!"
 *    cli.run( function () {
 *      console.log('hi!');
 *    })
 *
 * @param {Function} onRun callback Function
 * @param {String|Array} args arguments to be parsed/matched, default=process.argv.splice(2)
 */

function run ( onRun, args ) {
  
  var parsed
    , optionFlags;
  
  if ( typeof args !== 'undefined' ) {
    parsed = parse( args );
  } else {
    // TODO: better solution defaulting to process.argv is needed here.
    // eg. steals args in mocha or another program executing the script
    parsed = parse( process.argv.splice(2) );
  }
  
  // do match() stuff
  matched = match( this.options, parsed );
  
  // get passed option flags
  optionFlags = parsed.map( function(set) {
      var arg;
      arg = set.args.map( function(a) {
        if ( typeof a !== 'undefined' ) {
          return a;
        }
      });
      if ( arg ) return arg;
    }).reduce( function(a,b) {
      return a.concat(b);
    });
  
  // TODO: ^ revise prior map() to prevent the follow hack
  if ( optionFlags.length ) {
    if ( optionFlags[0] === '' ) optionFlags = [];
  }
  
  // console.log('optionFlags.length',optionFlags.length);
  // console.log(optionFlags);
  
  // show help
  if ( ~optionFlags.indexOf('-h') || optionFlags.length === 0 ) {
    console.log( this.menu( this.options ) );
  }
  
  if ( onRun instanceof Function ) {
    return onRun.call( this, matched, parsed );
  }
  
}
