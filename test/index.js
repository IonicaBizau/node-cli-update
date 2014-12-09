var CliUpdate = require("../index")
  , CliBox = require("cli-box")
  , c = require("couleurs")(true)
  ;

for (var i = 0; i <= 0; ++i) {
    CliUpdate.render((new CliBox("30x15", "Nr. ".fg(255, 0, 0) + i).toString()));
}
