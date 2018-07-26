# Calculator React

## Calculator Style
Use Grid via CSS

## Calculator Helper
A JS class to handle every change in main Calculator

## How do I do?
First, I setup a gui for my calculator by using GRID, using [this] (https://medium.com/@ethanryan/lets-make-a-javascript-calculator-a81186cb912f). Nice gui but complicated algorithm.
Then, search the web for something simplier and found [this] (https://github.com/drminnaar/react-calculator-standard) and clone it right away. As I want it simple, I don't use history he made.
However, as deeper I get these error
* Function onDigit use `event.target.value` which get `value` from HTML tag itself. If user get naughty, they can change it via inspector, and that may make `BUTTON7` print `FUCKOFF` on screen.
* In Calculator Helper
  * Don't check `0`, if nothing there, and user press `BUTTON0` consecutively, screen may print `00000000...`
  * Function `add` `subtract` check `currentValue` and WILL NOT LET user *change users' mind*

So, to re-customize for my purpose
* For onDigit, I bind data when the function invoke
* For Calculator Helper
  * Check `0` when `currentValue` empty in onDigit
  * When check `currentValue` empty
    * check if last element of `stack` exist, if yes - it means that last element is an operator, just have to pop it out and push the right one in; if no - return, nothing happen
* I want to see full expression and equals sign when I press `BUTTON=`, because of that, I used `history` in code to store my `expression` append with `=${currentValue}`. To show it out, I must change `getExpression` a little bit, check if its `arguments[0]` satisfies my param

That's quite done, but well, not that fast, there's still some problem
* When press `BUTTON0`, as it stop `onDigit` function immediately, then `getValue` will get `currentValue`, which is empty in my construtor
  * I fixed it by check if `currentValue` empty or not and return 0 or itself. 
  * If I pressed operator button (`+ - * /`) then `0` display. Not funny now 
    * change `currentValue` after each operation to operator
    * inDigit check if `currentValue` is operator, and overwrite it with `digit` param
    * change `currentValue` in `_check`
As the last element of `stack` is always one of four operator, and the same as `currentValue` -> no need `_check`. Also, as `_check` deprecated, must check length of `currentValue` as `-1` has operator `-` but still a number
* Apply DRY to merge all `operation` to one
* Problem: Start with operator and equals, end with operator and equals -> expression null but stack still
  * `getExpression` should not have `arguments[0]` or this problem may occur
* Problem: `getExpression` won't show value when user inputing
  * append `currentValue` when neccessary when `stack.join('')`
* For floating point number, I limit atmost 4 digits behind dot
  * use `parseFloat()` and `toFixed()` for limit