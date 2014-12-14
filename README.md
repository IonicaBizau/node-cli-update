CLI Update
==========
A library to update stdout output.

# Installation

```sh
$ npm install cli-update
```

# Example

```js
// Dependencies
var CliUpdate = require("../index")
  , CliBox = require("cli-box")
  , c = require("couleurs")(true)
  , Figlet = require("figlet")
  ;

// http://stackoverflow.com/a/16426519/1420197
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return hour + " : " + min + " : " + sec;
}

// Render time in a fancy format
setInterval(function () {
    Figlet(getDateTime(), function(err, data) {
        data = data.split("\n").map(function (c) { return c.bg("#c0392b") + "\u001b[45m"; }).join("\n");
        CliUpdate.render(
            new CliBox(process.stdout.columns + "x" + (process.stdout.rows - 3), data).toString().split("\n").map(function (c) {
                return c.bg("#2980b9");
            }).join("\n")
        );
    });
}, 1000);
````


# Documentation
## `render(output, pushHistory, data, emitChanged)`
Render the current output.

### Params
- **String** `output`: The output that should be printed in stdout.
- **Boolean** `pushHistory`: Push or not push the output in history (default: true).
- **Object** `data`:
- **Boolean** `emitChanged`: Call or not call the changed handler (deafult: true).

### Return
- **Object** The CLIUpdate object.

## `back()`
Go to the previous output in the history.

### Return
- **Object** The CLIUpdate object.

## `next()`
Go to the next output in the history.

### Return
- **Object** The CLIUpdate object.

# How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

# Changelog

## `1.0.0`
 - Initial stable release.

## `0.0.x`
 - Prereleases.

# License
See the [LICENSE](./LICENSE) file.
