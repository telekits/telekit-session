/**
 * The manager between of session and the storage
 *
 * @module session
 * @author Denis Maslennikov <mrdenniska@gmail.com> (nofach.com)
 * @license MIT
 */

/**
 * Methods
 * @private
 */
function getSession(context) {
    return `${context.user.id}@${context.user.first_name}`;
}

/**
 * Implementation
 * @public
 */
class Session {
    constructor(context, target) {
        this.context = context;
        this.target = target;
    }

    create() {
        return this.target.createSession(
            getSession(this.context),
            Date.now()
        );
    }

    delete() {
        return this.target.deleteSession(
            getSession(this.context)
        );
    }

    has() {
        return this.target.hasSession(
            getSession(this.context)
        );
    }

    getValue(name) {
        return this.target.getValue(
            getSession(this.context),
            name
        );
    }

    setValue(name, value) {
        return this.target.setValue(
            getSession(this.context),
            name,
            value
        );
    }

    deleteValue(name) {
        return this.target.unsetValue(
            getSession(this.context),
            name
        );
    }
}

/** Exports */
module.exports = Session;
