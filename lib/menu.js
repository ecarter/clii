
/**
 * clii.menu()
 */

module.exports = function () {

  var menu
    , _lens
    , opts
    , option_text
    , max_length
    , space_min
    ;
  
  _lens = [];
  opts = this.options;
  option_text = [];
  space_min = 16;
  
  menu= [ 
    ["\n  Usage: ", this.name(), " [options]\n"].join('')
  ];
  
  function fill (str, len) {
    while (str.length < len) {
      str += ' ';
    }
    return str;
  }
  
  opts.forEach( function (opt) {
    
    var _pre = [] // the prefix text  -a, --one <arg> [arg]
      , opt_text;
    
    if ( opt.key ) {
      _pre.push( '-' + opt.key );
    }
    
    if ( opt.prop ) {
      if ( opt.key ) {
        _pre.push(', ');
      }
      _pre.push( '--' + opt.prop );
    }
    
    if ( opt.args.length > 0 ) {
      
      for ( var a=0; a < opt.args.length; a++ ) {
        var arg = opt.args[a];
        
        _pre.push( ' ' + arg.name );
      }
    }
    
    opt_text = _pre.join('');
    
    _lens.push( opt_text.length );
    
    option_text.push( { text: opt_text, help: opt.help } );
  });
  
  max_length = Math.max.apply( Math, _lens ) + 2;
  
  if ( max_length < space_min ) {
    max_length = space_min;
  }
  
  for ( var i=0; i < option_text.length; i++ ) {
    
    var option
      , text;
    
    option = option_text[i];
    span = 0;
    
    if ( option.help ) {
      text = fill( option.text, max_length );
      text += option.help;
    } else {
      text = option.text;
    }
    
    menu.push( '    ' + text );
  }
  
  menu.push('');

  return menu.join('\n');
}