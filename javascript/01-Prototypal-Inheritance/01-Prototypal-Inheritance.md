# Prototypal Inheritance

## TLDR

### Summary

- In JavaScript, all objects have a hidden `[[Prototype]]` property that’s either another object or null.
- We can use `obj.__proto__` to access it (a historical getter/setter, there are other ways, to be covered soon).
- The object referenced by `[[Prototype]]` is called a “prototype”.
- If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.
- Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).
- If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.
- The for..in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.

## Prototype

In javascript every object has a hidden property `[[Prototype]]` that is null references another object. This other object is called as **prototype**.

> NOTE:
> `[[Prototype]]` is name of the property and the value it refernces is the Prototype. The property is hidden and to set its value we can use `__proto__`

### What is happening?

When we refer any property inside the object, it checks if the object has the property or it searches `__proto__`. If it finds then it returns the value else it searches the other Prototypes `__proto__`

```JS
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal; // (*)

// we can find both properties in rabbit now:
alert( rabbit.eats ); // true (**)
alert( rabbit.jumps ); // true

/*
  * - here we are setting rabbit's prototype to be animal

  ** - When execution reaches here, it checks whether the propert `eats` is inside the object, when it does not find it it searches the prototype

*/
```

### Limitations

1. References cannot go in circles. JS will throw an error
2. The value of `__proto__` can either be an object or `null`.

> [!DANGER] > `__proto__` and `[[Prototype]]` are not same. `__proto__` is a getter and setter for Prototype where as the `[[Prototype]]` is the hidden property

No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.

`Object.keys` only returns own keys

```JS
alert(Object.keys(rabbit)); // jumps
```

`for..in` loops over both own and inherited keys

```JS
for(let prop in rabbit) alert(prop); // jumps, then eats
```

## F.Prototypes

Objects can be created using `new` keyword. When done so, it sets the `[[Prototype]]` of the object to be the Class or Function.

```JS
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true

/*
Setting Rabbit.prototype = animal literally states the following: “When a new Rabbit is created, assign its [[Prototype]] to animal”.
*/
```

If the prototype is changed, it will affect only newly created objects. Old ones remain as is.

The "prototype" property only has such a special effect when set on a constructor function, and invoked with new.

By default every function has a prototype which has a constructor method which points to the function itself

```JS
function Rabbit()

Rabbit.prototype.constructor === Rabbit // true
```

## "prototype" property

`Object.prototype` is widely used in javascript. All build-in the constructor functions use it

Consider the below code

```JS
const obj = {}
alert(obj) // [ object Object ]
```

The notaion `obj = {}` is same as `new Object()`.

The `[ object Object ]`is coming from obj's Prototype `Object` which defines all the other methods along with `toString()`.

```JS
let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true
```

Likewise there are other constructors that are used when we create new variables Array, Date, Function, String etc.

If there are two methods with the same name in prototype chain, the closest method is used

```JS
const arr = [1,2,3]
arr.toString() // this resolves to the Array.prototype definition as it is closer in the chain
```

### For primitives

Strings, Number and Boolean and primitive data types. Wrapper objects are created temporarily and then they disappear using their respective constructors.

We can add new methods to the existing prototype as below

```JS
String.prototype.returnFirstLetter = function() {
  return this[0]
}
```

This method gets added to the prototype and is accessible on all the strings.
