const assert = require('assert');
const {Clock} = require('../index');

const clock = new Clock();
let count = 0;

clock.setTimeout(() => {
    count = 150;
}, 150);

clock.setTimeout(() => {
    count = 10;
}, 10);

clock.setTimeout(() => {
    count = 100;
}, 100);

clock.setTimeout(() => {
    count = 100;
}, 100);

clock.setTimeout(() => {
    count = 9;
}, 9);

const flag90 = clock.setTimeout(() => {
    count = 90;
}, 90);

assert.strictEqual(count, 0);

clock.tick(9);
assert.strictEqual(count, 9);

clock.tick(10);
assert.strictEqual(count, 10);

clearTimeout(flag90);
clock.tick(90);
assert.strictEqual(count, 100);

clock.tick(100);
assert.strictEqual(count, 150);

clock.tick(100);
assert.strictEqual(count, 150);

clock.tick(150);
assert.strictEqual(count, 150);
