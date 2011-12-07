
/**
 * clii.run()
 */

module.exports = function ( fn, args ) {

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
   this.runOption('help');
 }

 if ( this.options.length > 0 ) {
   for (var i=0; i < parsed_args.options.length; i++) {
     var option = parsed_args.options[i];
     this.runOption( option.option.prop, option.args );
   };
 }

 // pass props to cli.main()
 if ( typeof this.fn === 'function' ) {
   this.fn.call(this, parsed_args.props, this.args);
 }

 return this;
}