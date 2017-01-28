# telekit-session
A user session for [Telekit](https://github.com/telekits/telekit)


## Install
npm:
```
$ npm install telekit telekit-session --save
```

yarn:
```
$ yarn add telekit telekit-session
```


## Documentation
> Coming soon...


## Examples

```js
const telekit = require('telekit');

/** Middleware */
const $session = require('telekit-session');
const $cmd = require('telekit-cmd');

telekit(config)
    .use([$cmd, $session])
    .on('update', (context) => {
        /** if currently a user doesn't have of the session */
        if (!context.session.has()) {
            context.session.create();
            context.session.store = {};
        }
    })
    .on('/clear', (context) => {
        /** Clean the store */
        context.session.store = {};
        context.chat.sendMessage({
            text: `Your store is clean!`,
        });
    })
    .on('/get', (context) => {
        /** Get variable name from the command-line */
        let cmd = context.command.text.split(' ');

        /** Get value of variable from the store */
        let value = context.session.store[cmd[1]];

        /** If variable is not defined */
        if (!value) {
            return context.chat.sendMessage({
                text: `*${cmd[1]}* is not defined!`,
                parse_mode: 'markdown',
            });
        }

        /** Send value of variable from the store to the chat */
        context.chat.sendMessage({
            text: `${cmd[1]} = ${value}`,
        });
    })
    .on('/set', (context) => {
        /** Get variable name and value from command-line */
        let cmd = context.command.text.split(' ');

        /** Put this into the store */
        context.session.store[cmd[1]] = cmd[2];
        return context.chat.sendMessage({
            text: `Ok.`,
        });
    });
```


## LICENSE
[MIT](./LICENSE "The MIT License")
