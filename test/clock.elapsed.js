const assert = require('assert');
const {Clock} = require('../src');

let clock = new Clock();
let count = 0;
clock.setTimeout(() => {
    count = 9;
}, 9);
clock.setTimeout(() => {
    count = 10;
}, 10);
let flag90 = clock.setTimeout(() => {
    count = 90;
}, 90);
clock.setTimeout(() => {
    count = 100;
}, 100);
clock.setTimeout(() => {
    count = 100;
}, 100);
clock.setTimeout(() => {
    count = 150;
}, 150);

assert.strictEqual(count, 0);
clock.setElapsed(9);
assert.strictEqual(count, 9);
clock.setElapsed(10);
assert.strictEqual(count, 10);
clock.clearTimeout(flag90);
clock.setElapsed(90);
assert.strictEqual(count, 10);
clock.setElapsed(100);
assert.strictEqual(count, 100);
clock.setElapsed(150);
assert.strictEqual(count, 150);
clock.setElapsed(200);
assert.strictEqual(count, 150);
