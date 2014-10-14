var StdoutHook = require("stdout-hook");
var CLIUpdate = module.exports = {};

StdoutHook.start(function () {
    // TODO
    // CLIUpdate.
});


CLIUpdate.current = -1;
CLIUpdate.history = [];
CLIUpdate.navigation = function () {};
CLIUpdate.changed = function () {};
CLIUpdate._latest = {
    content: ""
  , data: null
};
CLIUpdate._lines = 0;

CLIUpdate.render = function (output, pushHistory, data, emitChanged) {

    var stdout = process.stdout;
    if (pushHistory !== false) {
        CLIUpdate.history[++CLIUpdate.current] = {
            content: output
          , data: data
        };
    }

    if (emitChanged !== false) {
        CLIUpdate.changed(output);
    }

    var curContent = CLIUpdate._latest.content
      , curContentLines = curContent.split("\n")
      , newLines = output.split("\n")
      ;


    // "h
    //  e
    //  l
    //  l
    //  o!".split("\n") => ["h", "e", "l", "l", "o!"]

    for (var y = 0; y < newLines.length; ++y) {
        var cLine = newLines[y];
        for (var x = 0; x < cLine.length; ++x) {
            var cChar = cLine[x]
              , oChar = (curContentLines[y] || "")[x]
              ;

            if (cChar !== oChar) {
                stdout.write("\033[" + (y + 2) + ";" + (x + 1) + "f\033");
                stdout.write(cChar);
            }
        }
    }

    CLIUpdate._latest.content = output;
    CLIUpdate._latest.data = data;
    stdout.write("\033[" + (newLines.length + 2) + ";" + 0 + "f");
    stdout.write("\n");
};

CLIUpdate.back = function () {
    var o = CLIUpdate.history[--CLIUpdate.current];
    if (!o) { return ++CLIUpdate.current; }
    CLIUpdate.navigation(o.data);
    CLIUpdate.render(o.content, false);
};

CLIUpdate.next = function () {
    var o = CLIUpdate.history[++CLIUpdate.current];
    if (!o) { return --CLIUpdate.current; }
    CLIUpdate.navigation(o.data);
    CLIUpdate.render(o.content, false);
};
