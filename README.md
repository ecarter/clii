# Clii

> A simple command line interface utility.

## Requires

* [Node.js](http://nodejs.org)
* [NPM - Node Package Manager](http://npmjs.org)

## Dependencies

> _None._

## Install

via [github](http://github.com/ecarter/clii):

    $ git clone https://github.com/ecarter/clii.git
    $ cd clii && npm install
    $ npm link    # optional 

## Test

Testing done with [Mocha](http://visionmedia.github.com/mocha)

    $ npm test

<a id="getting-started"></a>
## Getting Started

Create a empty script file and set permissions so it is executable in a terminal / shell client:

    $ touch mytool        # create empty file
    $ chmod +x mytool     # sets executable permissions

Open the script file in your editor of choice and include the Node.js [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29) line and require `clii` in your script.

    #!/usr/bin/env node
    var cli = require('clii');

Define the Clii instance and give it a name.

    var mytool = cli('mytool');

Appending a version number follows a `name[space]vX.X.X` pattern.

    var mytool = cli('mytool v0.0.1')
    
Add the `.run()` method to tell Clii to parse shell arguments passed to the script.

Script:

    cli('mytool v0.0.1').run()

Terminal:

    $ ./mytool
      Usage: mytool
        -h, --help     this help menu
        -v, --version  show version number

`help` and `version` options are added by default and easily removed.

Script:

    cli('mytool v0.0.1')
      .help(false)          # disable usage menu option
      .version(false)       # disable version option
      .run()

Terminal:

    $ ./mytool
    $

`.run()` excepts a callback, which is executed once Clii parses the script arguments.

Script:

    cli('mytool v0.0.1')
      .run( function () { 
        console.log( 'ಠ_ಠ programming is hard, really long and hard.' );
      })

Terminal:

    $ ./mytool
    ಠ_ಠ programming is hard, really long and hard.

## Options & Arguments

The `.run()` callback is given two arguments, `options` and `args`.

Script:

    cli('mytool v0.0.1')
      .run( function ( options, args ) {
        console.log( "options: " + options );
        console.log( "args: " + args );
      })

Terminal:

    $ ./mytool one two three
    options: {}
    args: [ 'one', 'two', 'three' ]

`options` argument is a `Object` literal containing property names for defined options. For example `--my-option` would be returned as `options.myOption` with a value of `true`. Values are assigned when options are matched from the arguments passed to the script via the shell.

`args` is an `Array` of all arguments that were **not** required by one of the `options`.

## Options

`.option()` accepts a specially formatted `String` or a `Object` literal. String should be formatted `-a, --name  description`. 

Option properties:

* [alias](#option-alias) `-` proceeded by any single alphanumeric character followed by `, ` comma space
* [name](#option-name) `--option-name` Case does not matter however only `-` can be used as a word separator. 
* [params](#option-params) `[optional]` or `<required>` parameters
* [description](#option-description) two or more spaces followed by the option usage text

### Creating a new `Option`
 
Example `String` option setup

    .option('-a, --my-option  My awesome option')

Example `Object` option setup

    .option({ 
      alias: 'a', 
      name: 'my-option', 
      description: 'My awesome option'
    })

Option names that use a dash `-` are converted to camel case when returned to the `.run()` callback's `options` argument.

Script:

    cli('mytool v0.0.1')
      .option('--my-option')
      .run( function ( options ) {
        console.log( 'my option = ' + options.myOption );
      })

Terminal:

    $ ./mytool --my-option
    my option = true

## Option Properties

<a id="option-alias"></a>
### Alias 

An `alias`, more commonly known as a flag, can be single a-z | A-Z character prefixed with `-`.

Specifying an alias in the `option` setup string:

    .option('-a')
              ↑
            alias

As a `option` setup object:
  
    .option({ alias: 'a' })

<a id="option-name"></a>
### Name

  Setup `String`:

    .option('-a, --my-option')
                   ↑       ↑
                      name

  Setup `Object`:

    .option({ alias: 'a', name: 'my-option' })

Name options can prefix with `--no` to equal `false`

    $ ./mytool --no-my-option
    my option = false

<a id="option-param"></a>
### Parameters

**Required  < >**

    .option('-a, --my-option <param>')
                             ↑     ↑
                             required

**Optional  [ ]**

    .option('-a, --my-option [param]')
                             ↑     ↑
                             optional

#### Parameter Lists

Lists come into play when you need to specify an option has several values to choose from.
  
Use the `|` pipe symbol to separate the options:
  
Required:
  
    .option('-a, --my-option <one|two|three>')
                             ↑             ↑
                              required list

Optional:

    .option('-a, --my-option [one|two|three]')
                             ↑             ↑
                              optional list

<a id="option-description"></a>
### Description

    .option('-a, --my-option  this is my option')
                            ↑↑                ↑
                         2 spaces + description

## Licensing

> MIT License
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

_Copyright (C) 2012 Erin Carter <hi@dnvsfn.com> ( <http://github.com/ecarter> )_
