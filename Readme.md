# clii

a simple command line interface toolkit

---

## Install

via [github](http://github.com/ecarter/clii):

    $ git clone git@github.com:ecarter/clii.git
    $ cd clii
    $ npm install

## Test

    $ npm test

---

## Examples

### Creating a new CLI

_For this example we'll name our file `mycli`_

First, add the node [shebang](http://en.wikipedia.org/wiki/Shebang_%28Unix%29) 
line and include `clii` in your script:

    #!/usr/bin/env node
    
    var cli = require('clii');

Giving your CLI a name:

    cli('your cli name')

The `.run()` method will initialze your CLI:

    cli('my cli').run()

Now in terminal run:

    $ ./mycli

This won't do anything just yet because we haven't defined
a `run function`, which is just a callback executed once `clii`
initializes your interface.

To make your cli actually do something just pass a `function` to `.run()`

    cli('your cli name')
      .run( function () { 
        console.log( this.name() );
      })

Now, running cli should result in:

    $ ./mycli
      
      my cli name


### Adding Options

Let's make our example usable by giving it some **options** with `.option()`.

    cli('my cli')
      .option('--myopt')
      .run( function (args) {
        console.log('myopt = ', args.myopt);
      })

Run it:

    $ ./mycli

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
