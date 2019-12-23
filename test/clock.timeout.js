const assert = require('assert');
const {Clock} = require('../index');

const clock = new Clock();
let counts = [];

clock.setTimeout(() => {
    counts.push(10);
    clock.clearTimeout(flag90);
}, 10);

const flag90 = clock.setTimeout(() => {
    counts.push(90);
}, 90);

assert.deepEqual(counts, []);

clock.setElapsed(10);
assert.deepEqual(counts, [10]);

clock.setElapsed(90);
assert.deepEqual(counts, [10]);

const clock_2 = new Clock();
let counts_2 = [];

clock_2.setTimeout(() => {
    counts_2.push(10);
}, 10);

const flag90_2 = clock_2.setTimeout(() => {
    counts_2.push(90);
}, 90);

assert.deepEqual(counts_2, []);

clock_2.setElapsed(10);
assert.deepEqual(counts_2, [10]);

clock_2.setElapsed(90);
assert.deepEqual(counts_2, [10, 90]);
