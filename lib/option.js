/**
 * Clii - option
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
var token = require('./token');

/**
 * Creates `Option` and appends it to `Clii.prototype.options`.
 *
 * Examples:
 *
 *    // with a setup string
 *    cli.option('-a, --arg');
 *
 *    // or setup object
 *    cli.option({
 *      alias: 'a',
 *      name: 'arg'
 *    })
 *
 * @param {String|Object} setup String|Object
 * @return {Object} Clii instance for chaining
 */

module.exports = function option ( setup, on ) {
  
  var props     // properties assigned to Option
    , option;   // new Option instance
    
  if ( typeof setup === 'string' ) {
    props = parseOptionSetupString( setup );
  }
  
  if ( setup instanceof Object ) {
    props = setup; // TODO: setup object validation?
  }
  
  option = new Option( props );
  
  this.options.push( option );
  
  return this; // for chaining
};

/**
 * Creates a new instance of `Option`.
 *
 * @param {Object} properties Option properties
 * @return {Object} new Option instance
 */

function Option ( properties ) {
  for ( var prop in properties ) {
    this[prop] = properties[prop];
  }
}

/**
 * Converts `str` to `Option` Object properties.
 *
 * This function is used for the cli.option('setup string') method.
 *
 * Examples:
 *
 * Alias
 *
 *    .option('-a')
 *              ^
 *
 * Named Option
 *
 *    .option('-a, --option-name')
 *                   ^
 *
 * Required Parameters < >
 *
 *    .option('-a, --option-name <required-param>')
 *                                ^
 *
 * Optional Parameters [ ]
 *
 *    .option('-a, --option-name <required-param> [optional-param]')
 *                                                 ^
 *
 *    { type: 'option',
 *      alias: 'a',
 *      name: 'option-name',
 *      prop: 'optionName',
 *      params: [
 *        { name: 'requiredParam', required: true },
 *        { name: 'optionalParam', required: false }
 *      ] }
 *
 * Description:
 *
 *    .option('-a, --option-name <requiredParam> [optionalParam]  the description text')
 *                                                              ^^
 *                                                           2 spaces
 *
 *    { type: 'option',
 *      alias: 'a',
 *      name: 'option-name',
 *      prop: 'optionName',
 *      description: 'the description text',
 *      params: [
 *        { name: 'requiredParam', required: true },
 *        { name: 'optionalParam', required: false }
 *      ] }
 *    
 * Required Option List
 *
 *    .option('--option-name <option1|option2|option3>')
 *
 *    { type: 'option',
 *      name: 'option-name',
 *      prop: 'optionName',
 *      params: [ {
 *        required: true,
 *        options: [ 'option1', 'option2', 'option3' ] }
 *      ] }
 *
 *
 * Keyword with Optional Argument:
 *
 *    .option('keyword-name [arg1] [arg2]')
 *
 *    { type: 'keyword',
 *      name: 'option-name',
 *      prop: 'optionName',
 *      params: [
 *        { name: 'arg1', required: false },
 *        { name: 'arg2', required: false }
 *      ] }
 *    
 * @param {String} str option string
 * @return {Object} Object properties object
 */

function parseOptionSetupString ( str ) {
  
  var tokens      // array of split str
    , props       // tokenized args
    , properties; // return object
    
  tokens = str.split(/\s/);
  props = [];
  properties = {};
  
  for ( var i=0; i < tokens.length; i++ ) {
    var arg = tokens[i]
      , tok = token( arg ); // TODO: name?
      
    // collect parsed token
    props.push( tok );
    
    // assign alias
    if ( !properties.alias && tok.type === 'alias' ) {
      properties.alias = tok.name;
    }
    
    // assign name
    if ( !properties.name && tok.type !== 'alias' ) {
      properties.name = tok.name;
    }
    
    // assign type
    if ( !properties.type ) {
      // option
      if ( /option|require|alias/.test( tok.type ) ) {
        properties.type = 'option';
      // keyword
      } else if ( tok.type === 'keyword' ){
        properties.type = 'keyword';
      }
    }
    
    // assign params
    if ( /required|optional/.test(tok.type) ) {
      
      if ( !properties.params ) {
        properties.params = [];
      }
      
      var option = {
        required: /required/.test(tok.type)
      };
      
      // assign arg options
      if ( tok.options ) {
        option.options = tok.options;
      // or just a name
      } else {
        option.name = tok.name;
      }
      
      properties.params.push( option );
    }
    
    // join the remainder to make the description
    if ( tok.type === 'empty' ) {
      properties.description = tokens.splice(i+1).join(' ');
    }
  }
  
  // check name
  if ( !properties.name ) {
    // pull the first token with .alias
    properties.name = props.map(function(a){ return a.name; })[0];
  }
  
  // check type
  if ( !properties.type ) {
    if ( properties.alias ) {
      properties.type = 'option';
    }
  }
  
  return properties;
};