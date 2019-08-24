# js mock clock

Test app depends on setTimeout/clearTimeout

# usage

## type 1：replace host[window | global] setTimeout/clearTimeout

```javascript

const {Clock} = require('js-mock-clock');

const clock = new Clock().bind();

let count = 0;
setTimeout(() => {
    count = 150;
}, 150);

clock.setElapsed(90);
assert.strictEqual(count, 0);

clock.setElapsed(150);
assert.strictEqual(count, 150);

```

## type 2：use clock object

```javascript
const {Clock} = require('js-mock-clock');

let clock = new Clock();

let count = 0;
clock.setTimeout(() => {
    count = 9;
}, 9);

clock.setElapsed(1);
assert.strictEqual(count, 0);

clock.setElapsed(9);
assert.strictEqual(count, 9);

```