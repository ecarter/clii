
/**
 * requires
 */

var cli = require('../')
  , isArg = require('./util').isArg;

/**
 * clii.option()
 * 
 * aliases: .opt() | .o()
 * 
 * @param {String} option_str cli option string. `-o, --option | description`
 * @param {Object} opts optional parameters
 * @param {Function} fn option callback executed on fire
 */

var option = module.exports = function ( option_str, opts, fn ) {
  
  if ( !option_str ) {
    return; // TODO: how about an error instead?
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
  
  if ( option_str.match(/  /) ) { // TODO: match(/  /) could be much better
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
