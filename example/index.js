// Dependencies
var CliUpdate = require("../lib")
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
