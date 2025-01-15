const animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

const r1 = new Rabbit("1");
console.log("r1", r1);
console.log(r1.__proto__);
Rabbit.prototype = animal;

const r2 = new Rabbit("2");
console.log("r2", r2);
console.log(r2.__proto__);
