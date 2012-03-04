/**
 * Clii
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Exports */
exports = module.exports = Clii;

/**
 * Initializes Clii instance.
 *
 * Examples:
 *
 *    // require
 *    var Clii = require('clii');
 *    
 *    // define using new constructor
 *    var mycli = new Clii();
 *
 *    // not required
 *    var mycli = Clii();
 *
 *    // headless
 *    Clii()
 *      .run()
 *
 * @param {Object} `setup` object
 * @return {Object} new Clii instance
 */

function Clii ( setup ) {
  return this instanceof Clii ? this : Clii.create( setup );
}

Clii.create = require('./create');

Clii.prototype.match = require('./match');
Clii.prototype.menu = require('./menu');
Clii.prototype.option = require('./option');
Clii.prototype.parse = require('./parse');
Clii.prototype.run = require('./run');
Clii.prototype.token = require('./token');

/**
 * Gets `Option` instance from Clii.prototype.options
 */

// TODO: needs test, examples, docs
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
 * Removes `Option` instance from Clii.prototype.options
 */

// TODO: see previous to-do item
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
 *    var Clii = require('clii');
 *
 *    Clii().setup({
 *      name: 'my-cli',
 *      version: '0.0.1',
 *      help: false
 *    })
 *
 * @param {Object} props configuration Object
 */

Clii.prototype.setup = function ( config ) {
  
  if ( !(config instanceof Object) ) {
    return new Error ('#setup() requires `config` {Object}');
  }
  
  for ( var property in config ) {
    this[ '_' + property ] = config[ property ];
  }
  
  return this;
};

Clii.prototype.help = function ( val ) {
  if ( val ) {
    this._help = val;
    return this;
  } else {
    return this._help;
  }
};

Clii.prototype.name = function ( val ) {
  if ( val ) {
    this._name = val;
    return this;
  } else {
    return this._name;
  }
};

Clii.prototype.usage = function () {
  return this.menu();
};

Clii.prototype.version = function ( val ) {
  if ( val ) {
    this._version = val;
    return this;
  } else {
    return this._version;
  }
};

