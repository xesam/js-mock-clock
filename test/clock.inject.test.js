const assert = require('assert');
const {Clock} = require('../src/clock');

let clock = new Clock();
clock.inject();
let count = 0;
setTimeout(() => {
    count = 150;
}, 150);
setTimeout(() => {
    count = 10;
}, 10);
setTimeout(() => {
    count = 100;
}, 100);
setTimeout(() => {
    count = 100;
}, 100);
setTimeout(() => {
    count = 9;
}, 9);
let flag90 = setTimeout(() => {
    count = 90;
}, 90);

clock.tick(0);
assert.strictEqual(count, 0);
clock.setElapsed(9);
assert.strictEqual(count, 9);
clock.setElapsed(10);
assert.strictEqual(count, 10);
clearTimeout(flag90);
clock.setElapsed(90);
assert.strictEqual(count, 10);
clock.setElapsed(100);
assert.strictEqual(count, 100);
clock.setElapsed(150);
assert.strictEqual(count, 150);
clock.setElapsed(200);
assert.strictEqual(count, 150);
