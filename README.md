# js mock clock

Test app depends on setTimeout/clearTimeout

# usage

## type 1： use clock object

```javascript

const {Clock} = require('js-mock-clock');
const assert = require('assert');

const clock = new Clock();
let counts = [];

clock.setTimeout(() => {
    counts.push(10);
}, 10);

const flag90 = clock.setTimeout(() => {
    counts.push(90);
}, 90);

clock.setTimeout(() => {
    counts.push(100);
}, 100);

clock.setTimeout(() => {
    counts.push(100);
}, 100);

assert.deepEqual(counts, []);

clock.setElapsed(10);
assert.deepEqual(counts, [10]);

clock.clearTimeout(flag90);
clock.setElapsed(90);
assert.deepEqual(counts, [10]);

clock.setElapsed(100);
assert.deepEqual(counts, [10, 100, 100]);

clock.setElapsed(100);
assert.deepEqual(counts, [10, 100, 100]);

clock.setElapsed(150);
assert.deepEqual(counts, [10, 100, 100]);

```

## type 2：replace host[window | global] setTimeout/clearTimeout

```javascript
const {Clock} = require('js-mock-clock');
const assert = require('assert');

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

```