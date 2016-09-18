## Documentation

You can see below the API reference of this module.

### `render(output, pushHistory, data, emitChanged)`
Render the current output.

#### Params
- **String** `output`: The output that should be printed in stdout.
- **Boolean** `pushHistory`: Push or not push the output in history (default: true).
- **Object** `data`:
- **Boolean** `emitChanged`: Call or not call the changed handler (deafult: true).

#### Return
- **Object** The CliUpdate object.

### `back()`
Go to the previous output in the history.

#### Return
- **Object** The CliUpdate object.

### `next()`
Go to the next output in the history.

#### Return
- **Object** The CliUpdate object.

