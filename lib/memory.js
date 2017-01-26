/**
 * This module is middleware that represents an in-memory storage for telekit-session
 *
 * @module memory
 * @author Denis Maslennikov <mrdenniska@gmail.com> (nofach.com)
 * @license MIT
 */

/** Implementation */
class Memory {
    constructor() {
        this.manager = new Map();
    }

    createSession(id, created) {
        this.manager.set(id, {
            created: created,
            store: {},
            key: id,
        });

        return true;
    }

    deleteSession(id) {
        return this.manager.delete(id);
    }

    hasSession(id) {
        return this.manager.has(id);
    }

    getValue(id, key) {
        if (this.hasSession(id)) {
            return this.manager.get(id).store[key];
        }

        return null;
    }

    setValue(id, key, value) {
        if (this.hasSession(id)) {
            this.manager.get(id).store[key] = value;
            return true;
        }

        return false;
    }

    unsetValue(id, key) {
        if (this.hasSession(id)) {
            delete this.manager.get(id).store[key];
            return true;
        }

        return false;
    }
}

/** Exports */
module.exports = Memory;
