
# cli-update

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/cli-update.svg)](https://www.npmjs.com/package/cli-update) [![Downloads](https://img.shields.io/npm/dt/cli-update.svg)](https://www.npmjs.com/package/cli-update)

> A library to update stdout output.

## :cloud: Installation

```sh
$ npm i --save cli-update
```


## :clipboard: Example



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

## :memo: Documentation


### `render(output, pushHistory, data, emitChanged)`
Render the current output.

#### Params
- **String** `output`: The output that should be printed in stdout.
- **Boolean** `pushHistory`: Push or not push the output in history (default: true).
- **Object** `data`:
- **Boolean** `emitChanged`: Call or not call the changed handler (deafult: true).

#### Return
- **Object** The CliUpdate object.

### `back()`
Go to the previous output in the history.

#### Return
- **Object** The CliUpdate object.

### `next()`
Go to the next output in the history.

#### Return
- **Object** The CliUpdate object.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`3abn`](https://github.com/IonicaBizau/3abn#readme)—A 3ABN radio client in the terminal.
 - [`artstack-downloader`](https://github.com/IonicaBizau/artstack-downloader)—Download artworks from your following users.
 - [`ascii-github`](https://npmjs.com/package/ascii-github)—GitHub CLI Client
 - [`cli-confeti`](https://github.com/IonicaBizau/cli-confeti#readme)—Confeti in your terminal.
 - [`cli-confetti`](https://github.com/IonicaBizau/cli-confetti#readme)—Confetti in your terminal.
 - [`cli-frames`](https://github.com/IonicaBizau/node-cli-frames)—Create CLI animations using text frames.
 - [`cli-github`](https://github.com/IonicaBizau/cli-github)—A fancy GitHub client for command line.
 - [`cli-snow`](https://github.com/IonicaBizau/cli-snow)—Snow, snow, snow! Let it snow, in terminal!
 - [`nuvi`](https://github.com/IonicaBizau/nuvi#readme)—Happy birthday, Nuvi!

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
