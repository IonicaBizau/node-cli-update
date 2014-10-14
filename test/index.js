var CliUpdate = require("../index")
  , CliBox = require("cli-box")
  , c = require("couleurs")
  ;

for (var i = 0; i <= 0; ++i) {
    CliUpdate.render((new CliBox("30x15", "Nr. ".rgb(255, 0, 0) + i).toString()));
}
