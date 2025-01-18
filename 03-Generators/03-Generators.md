# Generators

Generators are special functions that return values one after other. They are used with iterators.
They are defined as below

```js
function* generate() {
  yield 1;
  yield 2;
}
```

Regular functions return a value
Generator functions return a generator object

## Generator object

Generator object has 3 things

1. next()
2. throw()
3. return()

next() is the main method of generator object. When it is called, it runs the function till a yield value is encountered.
It always returns an object with 2 properties

1. value - value being yeilded
2. done - true if it code is finished, else false

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
```

when generator.next() is called again, execution starts from where it was paused.

Generators are iterable....i.e., can be used in for..of loop

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for (let value of generator) {
  alert(value); // 1 and then 2
}
// it ignnores the last value as it is a return not yield
```

## Generators composition

Generators can be placed one inside another.

```js
/*
  Generate 0....9
  Generate A....Z
  Generate a....z
*/

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
}

let str = "";

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

## Yield

Yield is a two way binder - can return values from the function and can pass values to generator

Pass args to `next(arg)` to pass value to generator

```js
function* multiplyTest() {
  let result = yield "8 * 8 = ?";

  alert(result);
}
const mul = multiplyTest();
const q = mul.next(); // first call should be empty it pauses execution at the yeild

setTimeout(() => mul.next(64), 8000); // this can be immediate or timedout passing 64 as value
```

## Throw

To pass an error into a yield, we should call generator.throw(err). In that case, the err is thrown in the line with that yield.

```js
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert(
      "The execution does not reach here, because the exception is thrown above"
    );
  } catch (e) {
    alert(e); // shows the error
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error("The answer is not found in my database")); // (2)
```

The error, thrown into the generator at line (2) leads to an exception in line (1) with yield. In the example above, try..catch catches it and shows it.

If we don’t catch it, then just like any exception, it “falls out” the generator into the calling code.

## Return

`generator.return(value)` finishes the generator execution and return the given `value`.

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next(); // { value: 1, done: false }
g.return("foo"); // { value: "foo", done: true }
g.next(); // { value: undefined, done: true }
```

> If we again use generator.return() in a completed generator, it will return that value again
