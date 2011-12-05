
/**
 * no dependencies
 */

var cli = module.exports;

cli.default_options = [{ 
  keys: "-h, --help",
  description: "this help menu",
  fn: function () { 
    return console.log( this.menu() ); 
  }
}];

cli.options = [];
  
cli.initialize = function ( fn, args ) {
  
  this.args = args || process.argv.splice(2) || [];
  
  this.fn = typeof fn === 'function' ? fn : function(){};
  
  for ( var i=0; i < this.default_options.length; i++ ) { 
    var opt = this.default_options[i];
    this.option(opt.keys, opt.description, opt.fn);
  }
  
  this.parseArgs();
  
  if ( !(this.args.length > 0) ) {
    this.doOption('help');
  }
  
};

cli.option = function ( keys, help, fn ) {
  
  var args
    , opt
    , tokens;
  
  args = []
  opt = {}
  tokens = keys.split(' ');
  
  // console.log('tokens:', tokens);
  
  for (var i=0; i < tokens.length; i++) {
    var token = tokens[i]
      , is_opt
      , name;
    
    is_opt = token.match(/^[\-?\-]/);
    name = token.replace(/\-|,/g, '');
    
    // console.log('token:', token, '| name:', name, '| is_opt:', is_opt);
    
    /*!
     * -o or --option
     */
    if ( is_opt ) {
      
      if ( name.length > 1 ) {
        prop = name;
      } else {
        key = name;
      }
      
    /*!
     * [arg] optional
     */
    } else if ( token.match(/^\[(.*)\]$/) ) {
      
      args.push( { name: name, required: false } );
      
    /*!
     * <arg> required
     */
    } else if ( token.match(/^<.*>$/) ) {
      
      args.push( { name: name, required: true } );
      
    }
    
  }
  
  opt.key = key;
  opt.prop = prop;
  opt.help = help;
  opt.fn = fn;
  opt.args = args;
  
  // console.log('opt:', '\n', opt);
  
  this.options.push(opt);
  
  return this;
};

cli.opt = cli.option;
cli.o = cli.option;

cli.main = function (fn) {
  this.initialize(fn);
  
  return this;
};

cli.menu = function () {

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

cli.name = function ( str ) {
  if (str) {
    this._name = str;
    return this;
  } else {
    return this._name;
  }
};

cli._name = '';

cli.doOption = function ( opt, args ) {
  var option = this.getOption( opt );
  
  if ( option ) {
    return option.fn.call( this, args, option );
  } else {
    return null;
  }
  
};

cli.getOption = function ( arg ) {
  var is_opt_arg = arg.match(/^[\-|\-\-]/) ? true : false // if argument starts with - or --
    , arg = is_opt_arg ? arg.replace(/-/g, '') : arg;
  
  for ( var i=0; i < this.options.length; i++ ) {
    var opt = this.options[i];
    if ( opt.key == arg || opt.prop == arg ) {
      return opt;
    }
  }
  return null;
};

cli.parseArgs = function (args) {
  
  var args = args || this.args
    , do_options = []
    , _ref;
  
  if ( this.verbose ) {
    console.log('\n', 'passed args:', args, '\n');
  }
  
  for ( var count=0, i=0; i < args.length; i++ ){ 
    var arg = args[i]
      , opt = this.getOption(arg);
    
    // if option add it to the list we'll execute at the end of the function
    if ( opt ) {
      do_options.push( { option: opt, args: [] } );
      count++;
    
    /*!
     * assume it's an option argument
     */
    } else {                  
      _ref = count - 1; // index before current
      index = _ref > 0 ? _ref : 0;
      
      /*!
       * if the argument before last exists, 
       * push the current token to it's args
       */
      if ( typeof do_options[index] !== 'undefined' ) {
        do_options[index].args.push( arg );
      }
    }
    
  }
  
  var props = {}; // the arguments that is passed to cli.main()
  
  for ( var d=0; d < do_options.length; d++ ) {
    var doing = do_options[d];
    
    // if the array is empty, assume the arg is a boolean
    props[ doing.option.prop ] = doing.args.length == 0 ? true : doing.args;
    
    // smoke'em if you got'em
    if ( typeof doing.option.fn === 'function' ) {
      doing.option.fn.call(this, doing.args);
    }
  }
  
  // pass props to cli.main() like we mentioned earlier
  if ( typeof this.fn === 'function' ) {
    this.fn.call(this, props);
  }
  
  return args;
};

cli.version = function ( vstr ) {
  if ( vstr ) {
    this._version = vstr;
    return this;
  } else {
    if ( !this._version ) this._version = '?.?.?';
    return this._version;
  }
}

cli._version = cli.version();
cli.v = cli.version;