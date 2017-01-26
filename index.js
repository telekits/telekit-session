/**
 * A user session for telekit
 *
 * @module telekit-session
 * @author Denis Maslennikov <mrdenniska@gmail.com> (nofach.com)
 * @license MIT
 */

/** Dependencies */
const Session = require('./lib/session.js');
const Memory = require('./lib/memory.js');

/**
 * Implementation
 * @public
 */
function proxy(context, target) {
    let session = new Session(context, target);

    return new Proxy({
        create: Function,
        delete: Function,
        has: Function,
    }, {
        get: function(_, name) {
            if (name == 'create') return () => session.create();
            if (name == 'delete') return () => session.delete();
            if (name == 'has') return () => session.has();
            return session.getValue(name);
        },

        set: function(_, name, value) {
            if (name == 'create') return;
            if (name == 'delete') return;
            if (name == 'has') return;
            return session.setValue(name, value);
        },

        deleteProperty: function(_, name) {
            if (name == 'create') return;
            if (name == 'delete') return;
            if (name == 'has') return;
            return session.deleteValue(name);
        },
    });
}

function telekit_session(options) {
    /** Options is undefined */
    if (!options) {
        return (kit) => {
            kit.context.session = proxy(kit.context, new Memory());
        };
    }

    /** Options is telekit */
    if (options && options.context && options.api) {
        options.context.session = proxy(options.context, new Memory());
        return false;
    }

    /** Options is an function middleware for telekit-session */
    return (kit) => {
        kit.context.session = proxy(kit.context, new options);
    }
};

/** Exports */
module.exports = telekit_session;
