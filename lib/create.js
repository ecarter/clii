/**
 * Clii - create
 * Copyright (C) 2012 Erin Carter <hi@dnvsfn.com> (http://github.com/ecarter)
 * MIT Licensed
 */

/**
 * Creates a new Clii instance.
 *
 * @param {Object} setup Clii configuration properties
 * @return {Object} new Clii instance
 */

module.exports = function ( setup ) {
  
  var instance;
  
  setup = setup || {};
  
  // if ( !(setup instanceof Object) ) {
  //   return new Error ('#create() requires `setup` {Object}');
  // }
  
  // New constructor
  instance = new this();
  
  // Defaults
  instance._name = null;
  instance._version = null;
  instance._help = true;
  instance._errors = true;
  instance.options = [];
  
  // Set name/version
  if ( typeof setup === 'string' ) {
    var str = String(setup);
    setup = {};
    
    // TODO: Better regex for checking version string
    if ( /(.*)\sv(.*)/.exec( str ) ) {
      setup.name = RegExp.$1;
      setup.version = RegExp.$2;
    } else {
      setup.name = str;
    }
  }
  
  if ( setup.help !== false ) {
    instance.option('-h, --help  this help menu');
  }
  if ( setup.version ) {
    instance.option('-v, --version  show version number');
  }
  
  // Set Properties
  return instance.setup( setup );
};

