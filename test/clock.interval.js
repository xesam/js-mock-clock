const assert = require('assert');
const {Clock} = require('../src');

let clock = new Clock();
let count = 0;
clock.setInterval(() => {
    count += 1;
}, 1);
clock.setInterval(() => {
    count += 1;
}, 2);
clock.setInterval(() => {
    count += 1;
}, 3);

clock.tick(0);
assert.strictEqual(count, 0);
clock.tick(1);
assert.strictEqual(count, 1);
clock.tick(1);
assert.strictEqual(count, 3);
clock.tick(1);
assert.strictEqual(count, 5);
clock.tick(1);
assert.strictEqual(count, 7);
clock.tick(1);
assert.strictEqual(count, 8);
clock.tick(1);
assert.strictEqual(count, 11);
