var CLIUpdate = module.exports = {};
CLIUpdate.current = 0;
CLIUpdate.history = [];
CLIUpdate.render = function (output, pushHistory) {
    if (pushHistory !== false) {
        CLIUpdate.history.push(output);
        CLIUpdate.current = CLIUpdate.history.length - 1;
    }
    console.log(output);
};

CLIUpdate.back = function () {
    var o = CLIUpdate.history[--CLIUpdate.current];
    //console.log("------------", CLIUpdate.current, CLIUpdate.history.length);
    if (!o) { return ++CLIUpdate.current; }
    CLIUpdate.render(o, true);
};

CLIUpdate.next = function () {
    var o = CLIUpdate.history[++CLIUpdate.current];
    if (!o) { return --CLIUpdate.current; }
    CLIUpdate.render(o, true);
};
