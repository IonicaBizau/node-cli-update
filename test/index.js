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

var cliColumns = process.stdout.columns;
// Compensate for bug #4
if (/^win(32|64)$/.test(require('os').platform())) {
  cliColumns -= 1;
}

// 3 = 1 (top border) + 1 (bottom border) + 1 (bottom padding)
var cliRows = process.stdout.rows - 3;

setInterval(function () {
    Figlet(getDateTime(), function(err, data) {
        data = data.split("\n").map(function (c) { return c.bg("#c0392b") + "\u001b[45m"; }).join("\n");
        CliUpdate.render(
            new CliBox(cliColumns + "x" + cliRows, data).toString().split("\n").map(function (c) {
                return c.bg("#2980b9");
            }).join("\n")
        );
    });
}, 1000);
