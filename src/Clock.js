const {Type} = require('./Type');
const {Timeline} = require('./Timeline');

class Clock {
    constructor() {
        this.elapsed = 0;
        this.timeline = new Timeline();
    }

    _trigger() {
        for (let msg of this.timeline.todo(this.elapsed)) {
            msg.invoke();
        }
    }

    bind(host) {
        host.setTimeout = this.setTimeout.bind(this);
        host.clearTimeout = this.clearTimeout.bind(this);
        host.setInterval = this.setInterval.bind(this);
        host.clearInterval = this.clearInterval.bind(this);
        return this;
    }

    getElapsed() {
        return this.elapsed;
    }

    setElapsed(elapsed) {
        if (elapsed <= 0) {
            throw Error('elapsed must >= 0');
        }
        this.elapsed = elapsed;
        this._trigger();
    }

    tick(mills) {
        if (mills < 0) {
            throw Error('tick mills must >= 0');
        }
        this.elapsed += mills;
        this._trigger();
    }

    setTimeout(callback, delay) {
        delay = delay < 0 ? 0 : delay;
        const args = Array.prototype.slice.call(arguments, 2);
        return this.timeline.add(callback.bind(null, ...args), delay, Type.TIMEOUT, this.elapsed);
    }

    clearTimeout(id) {
        this.timeline.remove(id);
    }

    setInterval(callback, delay) {
        if (delay <= 0) {
            throw Error('delay must > 0');
        }
        const args = Array.prototype.slice.call(arguments, 2);
        return this.timeline.add(callback.bind(null, ...args), delay, Type.INTERVAL, this.elapsed);
    }

    clearInterval(id) {
        this.timeline.remove(id);
    }
}

exports.Clock = Clock;
