/**
 * Clii - run
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
// var match = require('./match')
//   , parse = require('./parse');

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

module.exports = function run ( onRun, args ) {
  
  var parsed    // Parsed arguments
    , params    // Array of non-option args passed
    , options;  // Array of -o, --option
  
  var self = self || this;
  
  if ( typeof args !== 'undefined' ) {
    parsed = self.parse( args );
  } else {
    // TODO: better solution defaulting to process.argv is needed here.
    // eg. steals args in mocha or another program executing the script
    parsed = self.parse( process.argv.splice(2) );
  }
  
  // do match() stuff
  matched = self.match( this.options, parsed );
  
  // get passed option flags
  options = parsed.map( function(set) {
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
  
  // get array of params
  params = parsed.map( function(a) {
    return a.params;
  }).reduce( function(a,b) {
    return a.concat(b);
  })
  
  // TODO: ^ revise prior map() to prevent the follow hack
  if ( options.length ) {
    if ( options[0] === '' ) options = [];
  }
  
  // show help
  // TODO: there should be an option to enable/disable 
  // showing of the help menu when params.length > 0
  if ( (~options.indexOf('-h') || options.length === 0) 
    && !(params.length > 0) ) {
    console.log( this.menu( this.options ) );
  }
  
  if ( onRun instanceof Function ) {
    return onRun.call( this, matched, params );
  }
  
};
