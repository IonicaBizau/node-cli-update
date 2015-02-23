// Dependencies
var AnsiParser = require("ansi-parser")
  , Ul = require("ul")
  ;

// Constructor
function CLIUpdate(options) {}

// The current output index in history
CLIUpdate.prototype.current = -1;

// Store history here
CLIUpdate.prototype.history = [];

// Navigation and changed handlers
CLIUpdate.prototype.navigation = function () {};
CLIUpdate.prototype.changed = function () {};

// Last output
CLIUpdate.prototype.last = "";

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
CLIUpdate.prototype.render = function (output, pushHistory, data, emitChanged) {

    var self = this
      , parsed = AnsiParser.parse(output)
      , y = -this.last.split("\n").length
      , cParsed = null
      , cLast = null
      ;

    if (pushHistory !== false) {
        this.history[++this.current] = {
            content: output
          , data: data
        };
    }

    if (emitChanged !== false) {
        this.changed(output);
    }

    if (!process.stdout.moveCursor) {
        console.log(output);
    } else {
        output += "\n";
        for (; i < parsed.length; ++i) {
            cParsed = parsed[i];
            cLast = this.last[i] || cParsed;
            if (cParsed.content !== cLast.content || cParsed.style !== cLast.style) {

            }
        }

        parsed.forEach(function (c) {
            console.log(c);
        });
        process.stdout.moveCursor(0, y);
        process.stdout.write(output);
    }

    this.last = Ul.clone(parsed);
    return this;
};

/**
 * back
 * Go to the previous output in the history.
 *
 * @name back
 * @function
 * @return {Object} The CLIUpdate object.
 */
CLIUpdate.prototype.back = function () {
    var o = this.history[--this.current];
    if (!o) { return ++this.current; }
    this.navigation(o.data);
    this.render(o.content, false);
    return this;
};

/**
 * next
 * Go to the next output in the history.
 *
 * @name next
 * @function
 * @return {Object} The CLIUpdate object.
 */
CLIUpdate.prototype.next = function () {
    var o = this.history[++this.current];
    if (!o) { return --this.current; }
    this.navigation(o.data);
    this.render(o.content, false);
    return this;
};

module.exports = new CLIUpdate();
