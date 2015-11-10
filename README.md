# cli-update [![Support this project][donate-now]][paypal-donations]

A library to update stdout output.

## Installation

```sh
$ npm i cli-update
```

## Example

```js
// Dependencies
var CliUpdate = require("cli-update")
  , CliBox = require("cli-box")
  , Couleurs = require("couleurs")()
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

    return hour + " : " + min + " : " + sec;
}

// Render time in a fancy format
setInterval(function () {
    Figlet(getDateTime(), function(err, data) {
        data = data.split("\n").map(function (c) { return Couleurs.bg(c, "#c0392b") + "\u001b[45m"; }).join("\n");
        CliUpdate.render(
            CliBox({
                fullscreen: true
              , marks: {}
            }, data).split("\n").map(function (c) {
                return Couleurs.bg(c, "#2980b9");
            }).join("\n")
        );
    });
}, 1000);
```

## Documentation

### `render(output, pushHistory, data, emitChanged)`
Render the current output.

#### Params
- **String** `output`: The output that should be printed in stdout.
- **Boolean** `pushHistory`: Push or not push the output in history (default: true).
- **Object** `data`:
- **Boolean** `emitChanged`: Call or not call the changed handler (deafult: true).

#### Return
- **Object** The CLIUpdate object.

### `back()`
Go to the previous output in the history.

#### Return
- **Object** The CLIUpdate object.

### `next()`
Go to the next output in the history.

#### Return
- **Object** The CLIUpdate object.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`artstack-downloader`](https://github.com/IonicaBizau/artstack-downloader)

 - [`ascii-github`](https://npmjs.com/package/ascii-github)

 - [`cli-frames`](https://github.com/IonicaBizau/node-cli-frames)

 - [`cli-github`](https://github.com/IonicaBizau/cli-github)

 - [`cli-snow`](https://github.com/IonicaBizau/cli-snow)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2014

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md