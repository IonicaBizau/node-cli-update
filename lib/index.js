// Constructor
var CLIUpdate = module.exports = {};

// The current output index in history
CLIUpdate.current = -1;

// Store history here
CLIUpdate.history = [];

// Navigation and changed handlers
CLIUpdate.navigation = function () {};
CLIUpdate.changed = function () {};

// Last output
CLIUpdate.last = "";

/**
 * render
 * Render the current output.
 *
 * @name render
 * @function
 * @param {String} output The output that should be printed in stdout.
 * @param {Boolean} pushHistory Push or not push the output in history (default: true).
 * @param {Object} data
 * @param {Boolean} emitChanged Call or not call the changed handler (deafult: true).
 * @return {Object} The CLIUpdate object.
 */
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
    return CLIUpdate;
};

/**
 * back
 * Go to the previous output in the history.
 *
 * @name back
 * @function
 * @return {Object} The CLIUpdate object.
 */
CLIUpdate.back = function () {
    var o = CLIUpdate.history[--CLIUpdate.current];
    if (!o) { return ++CLIUpdate.current; }
    CLIUpdate.navigation(o.data);
    CLIUpdate.render(o.content, false);
    return CLIUpdate;
};

/**
 * next
 * Go to the next output in the history.
 *
 * @name next
 * @function
 * @return {Object} The CLIUpdate object.
 */
CLIUpdate.next = function () {
    var o = CLIUpdate.history[++CLIUpdate.current];
    if (!o) { return --CLIUpdate.current; }
    CLIUpdate.navigation(o.data);
    CLIUpdate.render(o.content, false);
    return CLIUpdate;
};
