# Hoisting

With the introduction of `let` and `const` in ES6, we can define the scope of variables.

## Issues with var

- var is function scoped i.e., it is still accessible out side the block in which it was declared

```js
if (true) {
  var a = "Something";
  console.log(a); // logs "Something"
}

console.log(a); // logs "Something"
```

Let's see another example

```js
function foobar() {
  var foo = "bar";
  console.log(foo); // logs "bar"
}

console.log(foo); // throws error: Reference error foo is not defined
```
