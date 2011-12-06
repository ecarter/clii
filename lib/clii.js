
/**
 * no dependencies
 */

var cli = {};

exports = module.exports = cli;

exports.DEFAULTS = DEFAULTS = {
  options: {
    help: { 
      str: "-h, --help  this help menu",
      fn: function () { 
        return console.log( this.menu() ); 
      }
    },
    version: {
      str: '-V, --version  show version number',
      fn: function() {
        return console.log( this.version() );
      }
    }
  },
  version_number: '?.?.?'
};

exports.options = [];

/**
 * .option() | .opt() | .o()
 * 
 * @param {String} option_str cli option string. `-o, --option | description`
 * @param {Object} opts optional parameters
 * @param {Function} fn option callback executed on fire
 */

exports.option = exports.opt = exports.o = function ( option_str, opts, fn ) {
  
  if ( !option_str ) {
    return;
  }
  
  var args
    , option_text // -o, --option [a|b] <c|d>
    , help_text   // the description
    , key
    , opt
    , option
    , prop
    , tokens;
  
  option = {};
  args = [];
  
  if ( typeof opts === 'function' && !fn ) {
    fn = opts;
  }
  
  opts = opts ? opts : {};
  fn = typeof fn === 'function' ? fn : function(){};
  
  if ( option_str.match(/  /) ) {
    var options = option_str.split('  ');
    option_text = options[0]
    help_text = options[1] 
  } else {
    option_text = option_str;
  }
  
  tokens = option_text.split(' ');
  
  for (var i=0; i < tokens.length; i++) {
    var token = tokens[i]
      , is_option
      , is_optional
      , is_required
      , parsed_name
      , option_arg;
    
    is_option = token.match(/^[\-?\-]/) ? true : false;
    is_optional = token.match(/^\[(.*)\]$/) ? true : false;
    is_required = token.match(/^<.*>$/) ? true : false;
    parsed_name = token.replace(/\-|,/g, '');
    
    // -o or --option
    if ( is_option ) {
      if ( parsed_name.length > 1 ) {
        prop = parsed_name;
      } else {
        key = parsed_name;
      }
      
    // [arg] = optional
    } else if ( is_optional ) {
      var option_arg_str
        , option_args;
      
      option_arg_str = token.replace('[','').replace(']','');
      
      if ( option_arg_str.indexOf('|') ) {
        option_args = option_arg_str.split('|');
      }
      
      option_arg = { name: parsed_name, required: false, possible: option_args };
      
    // <arg> = required
    } else if ( is_required ) {
      option_arg = { name: parsed_name, required: true };
      
    }
    
    if ( option_arg ) {
      args.push( option_arg );
    }
    
  }
  
  option.key = key;
  option.prop = prop;
  option.help = help_text;
  option.fn = fn;
  option.args = args;
  
  this.options.push( option );
  
  return this;
};

exports._help = true;

exports.main = exports.run = function ( fn, args ) {
  
  var parsed_args;
  
  this.args = args || process.argv.splice(2) || [];
  
  this.fn = typeof fn === 'function' ? fn : function(){};
  
  if ( ( this.args.length == 0 && this._help ) || this.args.indexOf('-h') == 0 ) {
    this.option( DEFAULTS.options.help.str, DEFAULTS.options.help.fn );
  }
  
  if ( this._version && this.args.indexOf('-V') === 0 ) {
    this.option( DEFAULTS.options.version.str, DEFAULTS.options.version.fn );
  }
  
  parsed_args = this.parse( this.args );
  
  if ( !(this.args.length > 0) ) {
    this.doOption('help');
  }
  
  if ( this.options.length > 0 ) {
    for (var i=0; i < parsed_args.options.length; i++) {
      var option = parsed_args.options[i];
      this.doOption( option.option.prop, option.args );
    };
  }
  
  // pass props to cli.main()
  if ( typeof this.fn === 'function' ) {
    this.fn.call(this, parsed_args.props, this.args);
  }
  
  return this;
};

exports.menu = function () {

  var menu = [ 
    ["\n  Usage: ", cli.name(), " [options]\n"].join(''), 
  ];

  this.options.forEach( function (opt) { 

    var space = ''
      , i = 0
      , len = 10 - opt.prop.length;

    for (; i<len; i++) {
      space += ' ';
    }

    var text = [
      '    '
    ,  '-' + opt.key + ', '
    , '--' + opt.prop + space
    , '  ' + opt.help
    ];

    menu.push( text.join('') );

  });

  menu.push('');

  return menu.join('\n');
};

exports.name = function ( str ) {
  if (str) {
    this._name = str;
    return this;
  } else {
    return this._name;
  }
};

exports._name = '';

exports.doOption = function ( opt, args ) {
  var option = this.getOption( opt );
  
  if ( option ) {
    
    return option.fn.call( this, args, option );
  }
  
  return;
};


exports.arg = function ( arg ) {
  
  var aliases
    , is_option
    , is_alias
    , is_alias_list
    , is_keyword
    , parsed;
  
  parsed = {};
  
  parsed.arg = arg;
  
  /**
   * if it starts with `--`
   */
  parsed.is_option = parsed.arg.match(/^\-\-/) ? true : false;
  
  /**
   * if it's not an option and starts with `-`
   */
  parsed.is_alias = !parsed.is_option ? ( parsed.arg.match(/^\-/) ? true : false ) : false;
  
  /**
   * if it's an alias and more than 1 character
   */
  parsed.is_alias_list = parsed.is_alias && parsed.arg.replace('-','').length > 1;
  
  parsed.aliases = parsed.is_alias_list ? parsed.arg.replace('-','').split('') : null;
  
  /**
   * if it's not an option or argument
   */
  parsed.is_keyword = !parsed.is_option && !parsed.is_alias ? true : false;
  
  return parsed;
};


exports.getOption = function ( arg ) {
  
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
};

exports.props = {}; // the arguments that is passed to cli.main()

exports.parseArgs = exports.parse = function ( args ) {
  
  var args = args || this.args || []
    , parsed = {}
    , _ref;
  
  parsed.options = [];
  parsed.kwargs = [];
  parsed.props = {};
  parsed.unknowns = [];
  
  if ( this.verbose ) {
    console.log('\n', 'passed args:', args, '\n');
  }
  
  /**
   * loop through args 
   */
  for ( var count=0, i=0; i < args.length; i++ ){ 
    
    var token = args[i]                     // the token in question
      , arg = this.arg( token )             // token argument stats object
      , option = this.getOption( token );   // see if it's an option
    
    /**
     * when `option` add to available options
     */
     
    if ( option ) {
      
      parsed.options.push( { option: option, args: [] } );
      count++;
    
    /**
     * when list of aliases
     */
    
    } else if ( arg.is_alias_list ) {
      
      /**
       * loop through alias list
       */
      for (var a=0; a < arg.aliases.length; a++) {
        var alias = arg.aliases[a]
          , option;
        
        option = this.getOption( alias );
        
        /**
         * when the alias is a valid option, add to available options
         */
        if ( option ) {
          parsed.options.push( { option: option, args: [] } );
          count++;
        }
        
      };
    
    /**
     * when `keyword`
     */
    
    } else if ( arg.is_keyword ) {
      
      parsed.kwargs.push( token );
      
    } else {
      
      parsed.unknowns.push( token );
      
    }
    
  } // done looping through tokens
  
  for ( var d=0; d < parsed.options.length; d++ ) {
    var doing = parsed.options[d];
    
    // if the array is empty, assume the arg is a boolean
    parsed.props[ doing.option.prop ] = doing.args.length == 0 ? true : doing.args;
    
  }
  
  return parsed;
};

exports.version = exports.v = function ( vstr ) {
  if ( vstr ) {
    this._version = vstr;
    return this;
  } else {
    if ( !this._version ) {
      this._version = DEFAULTS.version_number;
    } else if ( this._version != DEFAULTS.version_number ) {
      var version_option = DEFAULTS.options.version;
      
      this.option( version_option.keys, version_option.description, version_option.fn );
    }
    return this._version;
  }
}

exports._version = exports.version();

