# Todo

* combined arguments support: 
  
        $ clii -drc
        $ clii -dv
  
* named arguments: 
  
        $ clii watch
        $ clii files ./

* docs
* **examples**
* npm publish

### $ ./examples/basic -h

* prevent `undefined` help when passing `-h`

        Usage: basic [options]
        
          -a, --one         the first option
          -b, --two         the second option
          -c, --three       the third option
          -undefined, --four        the fourth option
          -undefined, --five        undefined
          -h, --help        this help menu

## Tests

* <del>#option()</del>
* <del>#getOption()</del>
* <del>#doOption()</del>
* <del>#menu()</del>
* <del>#name()</del>
* <del>#parseArgs()</del>
* <del>#version()</del>
* #main()
* generally deeper testing, args stuff is iffy at best.