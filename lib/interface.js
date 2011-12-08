
/**
 * requires
 */

module.exports = Interface;

function Interface () {

   var cli_
     , arg1;

   arg1 = arguments[0];

   /**
    * Creating a new cli()
    * 
    * 
    * Example `mycli` file:
    * 
    *        var cli = require('clii');
    *
    *        cli('my-cli').run();
    *
    * Then in the terminal run:
    * 
    *        $ mycli -h
    * 
    * Which should result in:
    * 
    *        Usage: my-cli [options]
    *
    *          -h, --help        this help menu
    *
    */
   if ( false === (this instanceof Interface) ) {
     if ( arguments.length === 1 ) {
       if ( typeof arg1 === 'string' ) {
         return new Interface( { name: arg1 } );

       } else if ( typeof arg1 === 'object' ){
         cli_ = new Interface( arg1 );
         return cli_;
       }
     } 
     return new Interface();
   }

   cli_ = this;
   
   cli_.options = cli_.options || [];
   // cli_._version = cli_._version !== '' ? this.version() : '';
   
   if ( typeof arg1 === 'object' ) {
     for ( var prop in arg1 ) {
       if ( cli_.prop !== null && typeof cli_[prop] === 'function' ) {
         cli_[prop]( arg1[prop] );
       }
     }
   }

   return cli_;
};
