/**
 * Clii - util
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/**
 * Converts `str` to a camelCasePropertyName.
 *
 * Examples:
 *
 *    propertyName('option-name')
 *    // optionName
 *
 *    propertyName('yes|no|maybe')
 *    // yesNoMaybe
 *
 *    propertyName('Just some RANDOM string')
 *    // justSomeRandomString
 *
 * @param {String} str
 * @param {String} splitAt characters to split `str`
 * @api private
 */

exports.propertyName = function ( str ) {
  str = str || this;
  return String( str.toLowerCase() )
    .replace(/(\-|\,|\||\?|\!|\.|\'|\")/g,' ')  // TODO: this needs review
    .replace(/ \w{0,}/g,
      function ( word ) {
        var w = word.split('');
        return word.charAt(1).toUpperCase() + w.splice(2).join('');
      })
    .replace(/\s/g,'');
}