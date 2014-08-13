var CLIUpdate = module.exports = {};
CLIUpdate.current = 0;
CLIUpdate.history = [];
CLIUpdate.navigation = function () {};
CLIUpdate.render = function (output, pushHistory, data) {
    if (pushHistory !== false) {
        CLIUpdate.history.push({
            content: output
          , data: data
        });
        CLIUpdate.current = CLIUpdate.history.length - 1;
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
