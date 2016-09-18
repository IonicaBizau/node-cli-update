"use strict";

const cliResize = require("cli-resize")
    , cliSize = require("cli-size")
    ;

class CliUpdate {

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
     * @return {Object} The CliUpdate object.
     */
    static render (output, pushHistory, data, emitChanged) {

        if (pushHistory !== false) {
            CliUpdate.history[++CliUpdate.current] = {
                content: output
              , data: data
            };
        }

        if (emitChanged !== false) {
            CliUpdate.changed(output);
        }

        if (!process.stdout.moveCursor) {
            console.log(output);
        } else {
            output += "\n";
            process.stdout.moveCursor(0, -CliUpdate.last.split("\n").length);
            process.stdout.write(output);
        }

        CliUpdate.last = output;
        return CliUpdate;
    }

    /**
     * back
     * Go to the previous output in the history.
     *
     * @name back
     * @function
     * @return {Object} The CliUpdate object.
     */
    static back () {
        var o = CliUpdate.history[--CliUpdate.current];
        if (!o) { return ++CliUpdate.current; }
        CliUpdate.navigation(o.data);
        CliUpdate.render(o.content, false);
        return CliUpdate;
    }

    /**
     * next
     * Go to the next output in the history.
     *
     * @name next
     * @function
     * @return {Object} The CliUpdate object.
     */
    static next () {
        var o = CliUpdate.history[++CliUpdate.current];
        if (!o) { return --CliUpdate.current; }
        CliUpdate.navigation(o.data);
        CliUpdate.render(o.content, false);
        return CliUpdate;
    }
}

// The current output index in history
CliUpdate.current = -1;

// Store history here
CliUpdate.history = [];

// Navigation and changed handlers
CliUpdate.navigation = function () {};
CliUpdate.changed = function () {};

// Last output
CliUpdate.last = "";

let setSize = size => {
    size = size || cliSize();
    CliUpdate.columns = size.columns;
    CliUpdate.rows = size.rows;
};

cliResize(setSize);
setSize();

module.exports = CliUpdate;
