
/**
 * clii.menu()
 */

module.exports = function () {

 var menu = [ 
   ["\n  Usage: ", this.name(), " [options]\n"].join(''), 
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
}