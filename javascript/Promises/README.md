# Promises

Promise is a Object that holds information about success or failure of an Asynchronous Task.

A Promise can have three states at a given point of time

- _pending_ - The Promise is neither fulfilled or rejected. It is in initial state
- _fulfilled_ - Promise was fulfilled. The asynchronos task was completed successfully
- _rejected_ - Promise was rejected. The asynchronos task failed to complete.

Promise can be fulfilled with _value_ or rejected with _error_. When this happens the `then` and `catch` block are executed respectively. These blocks are chained along with the promise. There is a `finally` block too which can be used to run any clean up tasks.

```JS
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

p.then((response) => console.log("success")).catch((error) =>
  console.log("failed")
);

```

Promise can have multiple `then` chained together. JS engine executes each `then` until it reaches the end if any `then` blocks don't handle the rejection of promise. So it is better approach to chain a `then` and `catch` together in a promise

```JS
// Promise chaining multiple then's


const p = new Promise((resolve, reject) => {})

// Pseudo code
p.then(handleSuccessA).then(handleSuccessB).catch(handleRejections)
```

Promises are stacked in one another. The innermost promise is the one that needs to be resolved first. It is the first promise in the chain.

```JS
(promise D, (promise C, (promise B, (promise A) ) ) )
// Promise B Returns value X, it will be replaced as below
(promise D, (promise C, (promise X) ) )
```

## Promise Methods

### .all()

`.all()` takes a iterable set of promises and returns a single promise that resolves to a array of the results of the input promises. **The returned promise resolves when all of the promises are resolved**.

```JS

const promise1 = Promise.resolve(3);
const promise2 = "Tahir";
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

const promise4 = Promise.reject("Rejected promise 4");

Promise.all([promise1, promise4])
  .then((values) => console.log(values))
  .catch((error) => console.log(error));


// Output
// Rejected Promise
// [3, "Tahir", 42]

```

If any of the promises are rejected it will be rejected.

### .allSettled()

`.allSettled()` takes iterable set of promises and returns a promise which when resolved returns the values of all the promises. Used when you want to know the status of each of the asynchronous tasks irrespective of rejection or being resolved.

```JS

const promise1 = Promise.reject(3);
const promise2 = "Tahir";
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});

Promise.allSettled([promise1, promise2, promise3]).then((values) => {
  values.forEach((value) => console.log(value.status));
});

// Output
// Rejected, Fulfilled , Fulfilled

```

### .any()

`.any()` takes a array of promises and returns a promise that resolves as soon as any of the promises resolve and returns its value.

```JS

const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// quick

```

If two or more promises resolve at the same time, it depends on the order in which they appear in code.

### .race()

`.race()` takes a set of promises and returns a Promise that resolves and rejects as soon as any of the promise is resolved or rejected

```JS

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"

```
