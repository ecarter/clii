

module.exports.isArg = function ( arg ) {
  
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
   * if it's an alias and more than 1 character: -AaBbCc
   */
  parsed.is_alias_list = parsed.is_alias && parsed.arg.replace('-','').length > 1;
  
  parsed.aliases = parsed.is_alias_list ? parsed.arg.replace('-','').split('') : null;
  
  /**
   * if it's not an option or argument
   */
  parsed.is_keyword = !parsed.is_option && !parsed.is_alias ? true : false;
  
  return parsed;
};