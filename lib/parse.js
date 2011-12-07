
/**
 * clii.parse()
 */

module.exports = function ( args ) {

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
}