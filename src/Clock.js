const {TYPE, BaseClock} = require('./BaseClock');

class Clock extends BaseClock {
    constructor() {
        super();
        this.elapsed = 0;
        this.timeline = [];
        this.id = 1;
    }

    _trigger() {
        let todo = this.timeline.filter(ele => {
            return ele.time <= this.elapsed;
        });
        this.timeline = this.timeline.filter(ele => {
            return ele.time > this.elapsed;
        });
        todo.forEach(ele => {
            ele.handle();
            if (ele.type === TYPE.INTERVAL) {
                ele.time += ele.interval;
                this.addHandler(ele);
            }
        });
    }

    bind(host) {
        host.setTimeout = (...args) => {
            return this.setTimeout(...args);
        };
        host.clearTimeout = (...args) => {
            return this.clearTimeout(...args);
        };
        host.setInterval = (...args) => {
            return this.setInterval(...args);
        };
        host.clearInterval = (...args) => {
            return this.clearInterval(...args);
        };
        return this;
    }

    addHandler(handler) {
        this.timeline.push(handler);
        this.timeline.sort((a, b) => {
            return a.time > b.time ? 1 : -1;
        });
    }

    removeHandler(id) {
        this.timeline = this.timeline.filter(ele => {
            return ele.id !== id;
        });
    }

    getElapsed() {
        return this.elapsed;
    }

    setElapsed(elapsed) {
        this.elapsed = elapsed < 0 ? 0 : elapsed;
        this._trigger();
    }

    tick(mills) {
        if (mills < 1) {
            return;
        }
        this.elapsed += mills;
        this._trigger();
    }

    setTimeout(listener, mills) {
        mills = mills < 0 ? 0 : mills;
        this.id++;
        let handler = {
            id: this.id,
            type: TYPE.TIMEOUT,
            time: this.elapsed + mills,
            handle: listener
        };
        this.addHandler(handler);
        return this.id;
    }

    clearTimeout(id) {
        this.removeHandler(id);
    }

    setInterval(listener, interval) {
        if (interval <= 0) {
            throw Error('mills must > 0');
        }
        this.id++;
        let handler = {
            id: this.id,
            type: TYPE.INTERVAL,
            time: this.elapsed + interval,
            interval: interval,
            handle: listener
        };
        this.addHandler(handler);
        return this.id;
    }

    clearInterval(id) {
        this.removeHandler(id);
    }
}

exports.Clock = Clock;
