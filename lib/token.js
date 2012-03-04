/**
 * Clii - token
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
var toProp = require('./util').propertyName;

/**
 * Parses `str` and returns token object.
 *
 * Token Types:
 *
 * - `-a`                       alias
 * - `-abc`                     alias list
 * - `--option`                 option = true
 * - `--no-option`              option = false
 * - `[option1|option2]`        optional list
 * - `<required1|required2>`    required list
 * - ``                         empty string
 * - `keyword`                  everything else
 *
 * Returned Object Properties:
 * 
 *    {
 *      token: '-a',          // string passed to token()
 *      type: 'option',       // token type
 *      name: 'option-name',  // name (no leading --)
 *      prop: 'optionName',   // formatted variable name
 *      names: []             // alias-list, optional-list, required-list
 *    }
 *
 * Examples:
 *
 * __Alias__
 *
 *    '-a'
 *
 * returns
 *
 *    { token: '-a',
 *      type: 'alias',
 *      name: 'a',
 *      prop: 'a' }
 *
 * __Alias List__
 *
 *    -abc
 *
 * returns
 *
 *    { token: '-abc',
 *      type: 'alias-list',
 *      aliases: [ 'a', 'b', 'c' ] }
 *
 * __Named Option__
 *
 *    --option-name
 *
 * returns
 *
 *    { token: '--option-name',
 *      type: 'option',
 *      name: 'option-name',
 *      prop: 'optionName' }
 *
 * __Named Option (`false` boolean)__
 *
 *    --no-option-name
 *
 * returns
 *
 *    { token: '--no-option-name',
 *      type: 'option-false',
 *      name: 'option-name',
 *      prop: 'option' }
 *
 * __Optional List__
 *
 *    [option1|option2|option3]
 *
 * returns
 *
 *    { token: '[option1|option2|option3]',
 *      type: 'optional-list',
 *      name: 'option1 option2 option3',
 *      prop: 'optional1Option2Option3',
 *      options: [ 'option1', 'option2', 'option3' ] }
 *
 * __Required List__
 *
 *    <req1|req2|req3>
 *
 * returns
 *
 *    { token: '<req1|req2|req3>',
 *      type: 'required-list',
 *      name: 'req1 req3 req3',
 *      prop: 'req1Req2Req3',
 *      options: [ 'req1', 'req2', 'req1' ] }
 *
 * __Keyword__
 * 
 *    pancakes
 *
 * returns
 *
 *    { type: 'keyword',
 *      name: 'pancakes',
 *      prop: 'pancakes' }
 *
 *
 * @param {String} str
 * @return {Object} parsed `token` object
 */

module.exports = function token ( str ) {

  var token;

  token = {};

  token.token = str;

  /**
   * Token Name
   */

  token.name = str.replace(/\-\-no/,'')       // --no
                  .replace(/^[\-]?[\-]/,'')   // --
                  .replace(/^\[|\]/g,'')      // []
                  .replace(/^\<|\>/g,'')      // <>
                  .replace(/\,$/,'');         // ,

  /**
   * Token Property Name
   */

  token.prop = toProp( token.name );

  /**
   * Determine Type
   */

  // --no-option
  if ( /^\-\-?no\-/.test(str) ) {
    token.type = 'option-false';
  }

  // --option
  else if ( /^\-\-(?!no)/.test(str) ) {
    token.type = 'option';
  }

  // -a
  else if ( /^\-[a-zA-Z]{1}(,|$)/.test(str) ) {
    token.type = 'alias';
  }

  // -ab
  else if ( /^\-\w{2,}$/.test(str) ) {
    token.type = 'alias-list';
    token.aliases = token.name.split('');
  }

  // nothing
  else if ( /^$/.test(str) ) {
    token.type = 'empty';
  }

  // <required>
  else if ( /^\<.*\>$/.test(str) ) {
    token.type = 'required';

    // <list|of|required|arguments>
    if ( ~str.indexOf('|') ) {
      token.type += '-list';
      token.name = str.replace(/\<|\>/g,'').replace(/\|/g,' ');
      token.options = str.replace(/\<|\>/g,'').split(/\|/);
    }
  }

  // [optional]
  else if ( /^\[.*\]$/.test(str) ) {
    token.type = 'optional';

    // [list|of|optional|arguments]
    if ( ~str.indexOf('|') ) {
      token.type += '-list';
      token.name = str.replace(/\[|\]/g,'').replace(/\|/g,' ');
      token.options = str.replace(/\[|\]/g,'').split(/\|/);
    }
  }

  if ( !token.type ) {
    token.type = 'keyword';
  }

  return token;
};

