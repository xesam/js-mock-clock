const TYPE = {
    TIMEOUT: 0,
    INTERVAL: 1
};

class BaseClock {
    setTimeout(listener, mills) {
    }

    clearTimeout(id) {
    }

    setInterval(listener, interval) {
    }

    clearInterval(id) {
    }
}

exports.TYPE = TYPE;
exports.BaseClock = BaseClock;
