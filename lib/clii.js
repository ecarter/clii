
/**
 * clii()
 */

var cli = module.exports = require('./interface');

cli.DEFAULTS = DEFAULTS = {
  options: {
    help: { 
      str: "-h, --help  this help menu",
      fn: function () { 
        return console.log( this.menu() ); 
      }
    },
    version: {
      str: '-v, --version  show version number',
      fn: function() {
        return console.log( this.version() );
      }
    }
  },
  version_number: '?.?.?'
};

cli.prototype = {
  
  _help: true,
  _name: '',
  _version: '',
  
  options: [],
  props: {},
  
  arg: require('./util').isArg,
  
  option: require('./option'),
  
  getOption: function ( arg ) {

    var parsed_arg;

    parsed_arg = this.arg( arg );

    for ( var i=0; i < this.options.length; i++ ) {
      var opt = this.options[i]
        , _arg
        , _key
        , _prop;

      _arg = arg.replace(/\-/g,'');
      _key = opt.key ? opt.key.replace(/\-/g,'') : '';
      _prop = opt.prop ? opt.prop.replace(/\-/g,'') : '';

      if ( _key == _arg || _prop == _arg ) {
        return opt;
      }
    }
    return null;
  },
  
  runOption: function ( opt, args ) {
    
    if ( opt ) {
      return opt.fn.call( this, args, opt );
    }

    return; // TODO: rly?
  },
  
  run: require('./run'),
  
  menu: require('./menu'),
  
  name: function ( str ) {
    if (str) {
      this._name = str;
      return this;
    } else {
      return this._name;
    }
    return this;
  },
  
  parse: require('./parse'),
  
  version: function ( vstr ) {
    
    if ( vstr ) {
      this._version = vstr;
      return this;
    } else {
      if ( !this._version ) {
        this._version = cli.DEFAULTS.version_number;
      } else if ( this._version != cli.DEFAULTS.version_number ) {
        var version_option = cli.DEFAULTS.options.version;

        this.option( version_option.keys, version_option.description, version_option.fn );
      }
      return this._version;
    }
  }
  
};


/**
 * TODO: Aliases
 */
 
cli.prototype.opt = cli.prototype.o = cli.prototype.option;
cli.prototype.version = cli.prototype.v = cli.prototype.version;