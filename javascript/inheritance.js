function Person(name, age) {
  (this.name = name), (this.age = age);
}

Person.prototype.greeting = function () {
  return `Hello ${this.name}`;
};

function Teacher(name, age, subject) {
  Person.call(this, name, age);
  this.subject = subject;
}

console.log("before" + Teacher.prototype); // Prototype should have greeting method and should point to Person object. But it does not. It just contains a reference to its own constructor

Teacher.prototype = Object.create(Person.prototype);

console.log("after" + Teacher.prototype);

console.log(Teacher.prototype.constructor);

Object.defineProperty(Teacher.prototype, "constructor", {
  value: Teacher,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true,
});

console.log(Teacher.prototype.constructor);

const tahir = new Teacher("Tahir", "24", "Maths");
