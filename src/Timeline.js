const {Type} = require('./Type');

class Message {
    constructor(timeline, id, callback, delay, type) {
        this.timeline = timeline;
        this.id = id;
        this.callback = callback;
        this.delay = delay;
        this.type = type;
        this.count = 0;
    }

    setElapsed(elapsed) {
        this.time = elapsed + this.delay;
    }

    invoke() {
        this.callback();
        this.count++;
        if (this.type === Type.INTERVAL) {
            this.timeline.addMessage(this, this.time);
        }
    }
}

class Timeline {
    constructor() {
        this.id = 1;
        this.messages = [];
    }

    addMessage(msg, elapsed) {
        msg.setElapsed(elapsed);
        this.messages.push(msg);
        this.messages.sort((a, b) => {
            return a.time > b.time ? 1 : -1;
        });
        return this.id;
    }

    add(callback, delay, type, elapsed) {
        this.id++;
        const message = new Message(this, this.id, callback, delay, type);
        return this.addMessage(message, elapsed);
    }

    remove(id) {
        this.messages = this.messages.filter(ele => {
            return ele.id !== id;
        });
    }

    * todo(time) {
        while (this.messages.length) {
            if (this.messages[0].time <= time) {
                yield this.messages.shift();
            } else {
                return;
            }
        }
    }
}


exports.Timeline = Timeline;