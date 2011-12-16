# clii

a simple command line interface toolkit

---

## Requires

* [Node.js](http://nodejs.org)
* [npm - Node Package Manager](http://npmjs.org)

## Dependencies

* [Mocha](http://visionmedia.github.com/mocha) _(tests only)_

## Install

via [github](http://github.com/ecarter/clii):

    $ git clone git@github.com:ecarter/clii.git
    $ cd clii
    $ npm install

## Test

    $ mocha

---

# Examples

## Creating a new CLI

### Create a new file named "my-cli" _(anywhere, just somewhere you can quickly shell/terminal into)_.

### Set permissions on the file so we can execute it:

In terminal:

    $ cd .                # directory where you created file
    $ chmod a+x my-cli    # sets executable permissions

### Open the file in your favorite editor and make the following additions:

First, add the node [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29) 
line and include `clii` in your script:

    #!/usr/bin/env node
    
    var cli = require('clii');

Give it a name:

    cli('your cli name')

Or + a version number:

    cli('my-cli v0.0.1')
    
    // name[space]vX.X.X

Add the `.run()` function to parse the arguments, and execute
a `main` callback:

In js:

    cli('my-cli v0.0.1').run()

In terminal run:

    $ ./my-cli
    
      Usage: my-cli

        -h, --help     this help menu
        -v, --version  show version number

Doesn't do a whole lot just yet but we've gotten a basic CLI tool
with `-h, --help` _(automatically added unless `.help(false)` is 
specified)_ and `-v, --version` _(added because of 
`.cli('my-cli v0.0.1')` is passed in the setup params)_.

Do something more interesting, pass a callback `function` to `.run()`

In js:

    cli('my-cli v0.0.1')
      .run( function () { 
        console.log( 'ಠ_ಠ programming is hard, really long and hard.' );
      })

In terminal:

    $ ./my-cli
    
    ಠ_ಠ programming is hard, really long and hard.

## Passing arguments

The `.run()` callback passes back some arguments, 
`options`, `parameters`, or in this case `opts` and
`params`.

Starting with parameters:


In js:

    cli('my-cli v0.0.1')
      .run( function (opts, params){
        console.log( "opts:", opts );
        console.log( "params:", params );
      })

In $:

    $ ./my-cli one two three
    
    opts: {}
    params: [ 'one', 'two', 'three' ]


## Adding Options

Let's make our example usable by with `.option()`

    cli('my-cli v0.0.1')
      .option('--my-option')
      .run( function (opts) {
        console.log('my option =', opts.myOption);
      })

Run it:

    $ ./my-cli --my-option
    
    my option = true

or if you wanted a false value:

    $ ./my-cli --no-my-option
    
    my option = false

### Option Properties

**Alias**

A single a-z A-Z character representing shortcut to a `option`.

    -a -b -c -D -F -G

Example:

    .option('-a, --my-option')
              ↑
            alias

**Option Name**

    .option('-a, --my-option')
                   ↑
                  name

**Parameters**

**Required < >**

    .option('-a, --my-option <param>')
                                ↑
                            required

**Optional [ ]**

    .option('-a, --my-option [param]')
                                ↑
                            optional

**Description**

    .option('-a, --my-option  this is my option')
                            ↑↑
                          2 spaces

Example with `optional`, `required`, and a `true|false` boolean options:

    cli('my cli')
      .option("-a, --one [arg1]  option with optional parameter")
      .option("-b, --two <arg2>  option required parameter")
      .option("--three  option with boolean parameter")
      .run( function(args) {
        console.log( 'one = ', args.one );
        console.log( 'two = ', args.two );
        console.log( 'three = ', args.three );
      })

---


#### Similar Projects

If `clii` doesn't fit your needs be sure to checkout:

* [node-optimist](https://github.com/substack/node-optimist)
* [commander.js](https://github.com/visionmedia/commander.js/)

---

**MIT License**

Copyright (C) 2011 by **Erin Carter** ( [hi@dnvsfn.com](mailto:hi@dnvsfn.com) )

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
