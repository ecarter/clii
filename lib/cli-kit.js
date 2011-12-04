
/**
 * no dependencies
 */

var cli = module.exports;

cli.default_options = [
  [ "h", "help", "this help menu", function () { return console.log( this.menu() ); }]
];

cli.options = [];
  
cli.initialize = function (fn) {
  
  this.fn = typeof fn === 'function' ? fn : function(){};
  
  for ( var i=0; i < this.default_options.length; i++ ) { 
    var opt = this.default_options[i];
    this.option(opt[0], opt[1], opt[2], opt[3]);
  }
  
  this.args = process.argv.splice(2);
  
  if ( !(this.args.length > 0) ) {
    this.doOption('help');
  } else {
    this.parseArgs();
  }
  
};

cli.option = function ( key, prop, help, fn) {
  
  var option = { key: key, prop: prop, help: help, fn: fn };
  
  this.options.push(option);
  
  return this;
};
  
cli.main = function (fn) {
  this.initialize(fn);
  
  return this;
};

cli.menu = function () {

  var menu = [ "", "  Usage: watch [options]", "" ];

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

cli.doOption = function ( opt, args ) {
  var option = this.getOption( opt );
  
  if ( option ) {
    return option.fn.call( this, args);
  } else {
    return null;
  }
  
};

cli.getOption = function ( arg ) {
  var is_opt_arg = arg.match(/^[\-|\-\-]/) ? true : false
    , arg = is_opt_arg ? arg.replace(/-/g, '') : arg; // if argument starts with - or --
  
  for ( var i=0; i < this.options.length; i++ ) {
    var opt = this.options[i];
    
    if ( opt.key === arg || opt.prop === arg ) {
      return opt;
    }
    
  }
  
  return null;
};

cli.parseArgs = function () {
  
  var args = this.args
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
    
    // assume it's an option argument
    } else {                  
      _ref = count - 1; // index before current
      index = _ref > 0 ? _ref : 0;
      
      if ( typeof do_options[index] !== 'undefined' ) {
        do_options[index].args.push( arg );
      }
    }
    
  }
  
  var props = {}; // the arguments that is passed to cli.main()
  
  for ( var d=0; d < do_options.length; d++ ) {
    var doing = do_options[d];
    
    // if the array is empty, assume it's a boolean
    props[ doing.option.prop ] = doing.args.length == 0 ? true : doing.args;
    
    // smoke'em if you got'em
    if ( typeof doing.option.fn === 'function' ) {
      doing.option.fn.call(this, doing.args);
    }
  }
  
  // pass props to cli.main() like we mentioned earlier
  this.fn.call(this, props);
  
};