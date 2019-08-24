const assert = require('assert');
const {Clock} = require('../index');

const clock = new Clock().bind(global);

let count = -1;

setTimeout(() => {
    count = 0;
}, 0);

setTimeout(() => {
    count = 10;
}, 10);

setTimeout(() => {
    count = 30;
}, 30);

setTimeout(() => {
    count = 20;
}, 20);

setTimeout(() => {
    count = 100;
}, 100);

setTimeout(() => {
    count = 5;
}, 5);

const flag90 = setTimeout(() => {
    count = 90;
}, 90);

clock.tick(0);
assert.strictEqual(count, -1);

clock.setElapsed(9);
assert.strictEqual(count, 5);

clock.setElapsed(10);
assert.strictEqual(count, 10);

clearTimeout(flag90);
clock.setElapsed(90);
assert.strictEqual(count, 30);

clock.setElapsed(100);
assert.strictEqual(count, 100);

clock.setElapsed(150);
assert.strictEqual(count, 100);

clock.setElapsed(200);
assert.strictEqual(count, 100);
