# TO-DO

---

## lib / create.js

* __[line 39](.//lib/create.js#L39) Better regex for checking version string:__  ```  ```


---

## lib / match.js

* __[line 127](.//lib/match.js#L127) a better way to make sure single result is returned?:__  ```     })[0];```


---

## lib / option.js

* __[line 38](.//lib/option.js#L38) setup object validation?:__  ```   props = setup;```

* __[line 154](.//lib/option.js#L154) name?:__  ```     , tok = token( arg );```


---

## lib / parse.js

* __[line 74](.//lib/parse.js#L74) pass Array to parse() y/n?__ 
* __[line 95](.//lib/parse.js#L95) Resolve the following hack::__  ```  ```

* __[line 102](.//lib/parse.js#L102) out of index:__  ```     token_strings.push( line + lines[i+1] ); ```


---

## lib / run.js

* __[line 42](.//lib/run.js#L42) better solution defaulting to process.argv is needed here.:__  ```  ```

* __[line 70](.//lib/run.js#L70) ^ revise prior map() to prevent the follow hack__ 
* __[line 76](.//lib/run.js#L76) there should be an option to enable/disable__ 

---

## lib / util.js

* __[line 28](.//lib/util.js#L28) regex needs review:__  ```   .replace(/(\-|\,|\||\?|\!|\.|\'|\")/g,' ') ```


