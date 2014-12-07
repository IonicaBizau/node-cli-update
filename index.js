var CLIUpdate = module.exports = {};

CLIUpdate.current = -1;
CLIUpdate.history = [];
CLIUpdate.navigation = function () {};
CLIUpdate.changed = function () {};

CLIUpdate.last = "";

CLIUpdate.render = function (output, pushHistory, data, emitChanged) {

    if (pushHistory !== false) {
        CLIUpdate.history[++CLIUpdate.current] = {
            content: output
          , data: data
        };
    }

    if (emitChanged !== false) {
        CLIUpdate.changed(output);
    }

    if (!process.stdout.moveCursor) {
        console.log(output);
    } else {
        output += "\n";
        process.stdout.moveCursor(0, -CLIUpdate.last.split("\n").length);
        process.stdout.write(output);
    }

    CLIUpdate.last = output;
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
