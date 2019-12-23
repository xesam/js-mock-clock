const assert = require('assert');
const {Clock} = require('../index');

const clock = new Clock().bind(global);
let counts = [];

setTimeout(() => {
    counts.push(10);
}, 10);

const flag90 = setTimeout(() => {
    counts.push(90);
}, 90);

setTimeout(() => {
    counts.push(100);
}, 100);

setTimeout(() => {
    counts.push(100);
}, 100);

assert.deepEqual(counts, []);

clock.tick(10);
assert.deepEqual(counts, [10]);

clearTimeout(flag90);
clock.tick(90);
assert.deepEqual(counts, [10, 100, 100]);

clock.tick(100);
assert.deepEqual(counts, [10, 100, 100]);

clock.tick(100);
assert.deepEqual(counts, [10, 100, 100]);

clock.tick(150);
assert.deepEqual(counts, [10, 100, 100]);
