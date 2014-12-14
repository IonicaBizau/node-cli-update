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
            new CliBox({fullscreen: true, marks: {}}, data).toString().split("\n").map(function (c) {
                return c.bg("#2980b9");
            }).join("\n")
        );
    });
}, 1000);
