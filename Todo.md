# Todo

## General:

* docs
* more examples _(always)_
* publish to npm

---

### Named Options: 

    $ clii watch
    $ clii files ./

---

## Tests

### Testing Over STDIO

Basically all the tests are via the API, which
doesn't really account for how a CLI is being 
used in terminal/shell/matrix, whatever... f-u.

### Option-less Name Parameters

    $ ./mycli p1 p2 p3 p4

pseudo code for the that:
    
    // doing this
    callback.apply(this, [ /** params **/ ] )
    
    // so you can do
    function onRun (p1, p2, p3, p4) { // << this
      console.log( argurments );
    }
    cli.run( onRun ); 

---

## API

### clii.js

* ln48: Better regex for checking version string
* ln124: examples,docs???
* ln205: remove extended String native

### match.js

* ln159: where is --no-option (boolean false options) ???

### option.js

* ln38: setup object validation?

### parse.js

* ln77: pass Array to parse() y/n?
* ln98: Resolve the following hack: split the lines, if the current 
  line is -- or - assume it's the beginning of a line 
  containing alias|option push current+next to token_strings.
  Basically, this is a shit solution.
* ln105: out of index

### run.js

* ln42: better solution defaulting to process.argv is needed here.
  eg. steals args in mocha or another program executing the script
* ln63: ^ revise prior map() to prevent the follow hack

### util.js

* ln29: regex needs review