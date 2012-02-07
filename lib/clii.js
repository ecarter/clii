/**
 * Clii
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Exports */
// exports = module.exports = Clii;
exports = module.exports = Clii;
exports.Clii = Clii; // Expose Clii for tests


/**
 * Initializes Clii instance.
 *
 * Examples:
 *
 * New instance on require
 *
 *    var cli = require('clii')(); // note the ()
 *
 * Require then create:
 
 *    var Clii = require('clii');
 *    var cli = new Clii();
 *
 * Require and initialize:
 *
 *    var cli = require('clii');
 *
 *    cli().run();
 *
 * @param {Object} `setup` object
 * @return {Object} new Clii instance
 */

function Clii ( config ) {
  
  // Make sure we're using a Clii instance
  if ( false === ( this instanceof Clii ) ) {
    return new Clii( config );
  }
  
  // Set name/version
  if ( typeof config === 'string' ) {
    var str = String(config);
    config = {};
    
    // TODO: Better regex for checking version string
    if ( /(.*)\sv(.*)/.exec( str ) ) {
      config.name = RegExp.$1;
      config.version = RegExp.$2;
    } else {
      config.name = str;
    }
  }
  
  
  // Initialize with configuration Object
  if ( config instanceof Object ) {
    this.setup( config );
  }  
  
  // Set defaults
  if ( typeof this._name === 'undefined' ) {
    this._name = null;
  }
  if ( typeof this._version === 'undefined' ) {
    this._version = null;
  }
  if ( typeof this._help === 'undefined' ) {
    this._help = true;
  }
  if ( typeof this._errors === 'undefined' ) {
    this._errors = true;
  }
  if ( typeof this.options === 'undefined' ) {
    this.options = [];
  }
  var help = this.get('help');
  if ( help === null && this._help === true ) {
    this.option('-h, --help  this help menu');
  }
  var version = this.get('version');
  if ( version === null && this._version !== null ) {
    this.option('-v, --version  show version number');
  }
  
  return this;
}

/**
 * Clii prototypes
 */

Clii.prototype.menu = require('./menu');
Clii.prototype.option = require('./option');
Clii.prototype.run = require('./run');

/**
 * Gets `Option` from Clii instance.
 *
 *
 */

Clii.prototype.get = function ( str ) {
  var option, key;
  
  key = str.replace(/\-/g,'');
  
  
  if ( this.options.length > 0 ) {
    option = this.options.map( function(opt) {
          if ( key === (opt.alias || opt.name) ) {
            return opt;
          }
        })[0];
  }
  return option || null;
};

/**
 * Removes `Option` from Clii instance.
 *
 * TODO: examples,docs???
 */

Clii.prototype.remove = function ( str ) {
  var found, options;
  
  found = this.get(str);
  options = this.options;
  
  if ( found ) {
    this.options.forEach( function(opt,i) {
      if ( opt === option ) {
        options.splice(i,1);
      }
    })
  }
  return this;
};

/**
 * Sets Clii properties from configuration Object
 *
 * Examples:
 *
 *    var cli = require('clii')();
 *
 *    cli.setup({
 *      name: 'my-cli',
 *      version: '0.0.1',
 *      help: false
 *    })
 *
 * @param {Object} props configuration Object
 */

Clii.prototype.setup = function ( props ) {
  var propName;
  
  for ( var prop in props ) {
    
    // add _ prefix to the following
    propName = ~[ 'help', 'name', 'version' ].indexOf( prop )
                ? '_' + prop : prop;
    
    this[propName] = props[prop];
  }
  return this;
};

Clii.prototype.help = function ( val ) {
  
  if ( val ) {
    this._help = val;
  }
  return this;
};

Clii.prototype.name = function ( val ) {
  if ( val ) {
    this._name = val;
    return this;
  } else {
    return this._name;
  }
};

Clii.prototype.version = function ( val ) {
  if ( val ) {
    this._version = val;
    return this;
  } else {
    return this._version;
  }
};

/**
 * Clii public
 */
 
Clii.parse = require('./parse');
Clii.match = require('./match');
Clii.token = require('./token');
