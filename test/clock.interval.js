const assert = require('assert');
const {Clock} = require('../index');

const clock = new Clock();
let counts = [];

const flag1 = clock.setInterval(() => {
    counts.push(1);
}, 1);

clock.setInterval(() => {
    counts.push(2);
}, 2);

clock.setInterval(() => {
    counts.push(3);
}, 3);

clock.tick(0);
assert.deepEqual(counts, []);

clock.tick(1);
assert.deepEqual(counts, [1]);//1

clock.tick(1);
assert.deepEqual(counts, [1, 2, 1]);//2,1

clock.tick(1);
assert.deepEqual(counts, [1, 2, 1, 3, 1]);//3,1

clock.tick(1);
assert.deepEqual(counts, [1, 2, 1, 3, 1, 2, 1]);//2,1

clock.tick(1);
assert.deepEqual(counts, [1, 2, 1, 3, 1, 2, 1, 1]);//1

clock.tick(1);
assert.deepEqual(counts, [1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1]);//3,2,1

clock.clearInterval(flag1);

clock.tick(1);
assert.deepEqual(counts, [1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1]);//none