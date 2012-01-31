# Clii

A <u>command line interface</u> style argument parser

for [Node.js](http://nodejs.org) and the browser.


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


# Creating a new CLI

### Create a new file named "my-cli" _(anywhere, just somewhere you can quickly shell/terminal into)_.

First, set permissions on the file so we can execute it.

In terminal:

    $ cd .                # directory where you created file
    $ chmod a+x my-cli    # sets executable permissions

### Open the file in your favorite editor and make the following additions:

Add the node [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29) 
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

### Do something more interesting, pass a callback `function` to `.run()`

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

There are two primary ways of defining options, either with a 
`option` setup __string__ or __object__. The following examples 
will show how to use both.

In js:

    cli('my-cli v0.0.1')
      .run( function (opts, params){
        console.log( "opts:", opts );
        console.log( "params:", params );
      })

In terminal:

    $ ./my-cli one two three
    
    opts: {}
    params: [ 'one', 'two', 'three' ]


## Adding Options

Let's make the example more useful by adding some
options with the `.option()` method.



    cli('my-cli v0.0.1')
      .option('--my-option')
      .run( function (opts) {
        console.log('my option =', opts.myOption);
      })

Pass `--my-option` and run it:

    $ ./my-cli --my-option
    
    my option = true

or for `false` prefix with `--no-`:

    $ ./my-cli --no-my-option
    
    my option = false

## Option Properties

### Alias:

An alias can be single a-z|A-Z character prefixed with `-` that
provide a convenience shortcut to an `option`. _eg. `-a -b -A -B`_

Specifying an alias in the `option` setup string:

    .option('-a')
              ↑
            alias

As a `option` setup object:
  
    .option({ alias: 'a' })

### Name:
  
  Setup `String`:

    .option('-a, --my-option')
                   ↑       ↑
                      name

  Setup `Object`:

    .option({ alias: 'a', name: 'my-option' })

### Parameters:

**Required  < >**

    .option('-a, --my-option <param>')
                             ↑     ↑
                             required

**Optional  [ ]**

    .option('-a, --my-option [param]')
                             ↑     ↑
                             optional

**Parameter Lists**

  Lists come into play when you need to specify an 
  option has several values to choose from.
  
  Use the `|` pipe symbol to separate the options:
  
  Required:
  
    .option('-a, --my-option <one|two|three>')
                             ↑             ↑
                              required list

  Optional:

    .option('-a, --my-option [one|two|three]')
                             ↑             ↑
                              optional list

### Description

    .option('-a, --my-option  this is my option')
                            ↑↑                ↑
                         2 spaces + description

## Option Types

Any argument without parameters specific with < > or [ ] 
is considered a boolean argument.

Boolean options actually come back with three possible values 
being `true`, `false`, or `undefined`.

* `true` when `-a` or `--my-option` is passed
* `false` when `-no-a` or `--no-my-option` is passed
* `undefined` when none of the previous are passed

Update `my-cli` with following:

    cli('my-cli v0.0.1')
      .option('-a, --my-option  this is my option')
      .run( function (opts, params){
        // when true
        if ( opts.myOption === true ) {
          console.log('has option!');
        // when false
        } else if ( opts.myOption === false ) {
          console.log('no option.');
        // when everthing else, like undefined
        } else {
          console.log('option is', opts.myOption);
        }
      })


---


### Inspired By:

[Clii](http://github.com/ecarter/clii)'s API is heavily influenced by [TJ Holowaychuk
](https://github.com/visionmedia/)'s awesome utility [commander.js](https://github.com/visionmedia/commander.js/). 

While Clii solves many of the same problems it handles all of them in experimental and
openly "non-commercial" manor. If you're looking for a more battle hardened solution,
I fully suggest _(and personally use)_ [commander.js](https://github.com/visionmedia/commander.js/).


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
