var CLIUpdate = module.exports = {};
CLIUpdate.current = -1;
CLIUpdate.history = [];
CLIUpdate.navigation = function () {};
CLIUpdate.changed = function () {};
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
    console.log(output);
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
