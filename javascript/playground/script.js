class Vehicle {
  constructor(wheels, power) {
    this.wheels = wheels;
    this.power = power;
  }

  // setter
  set wheels(wheels) {
    this._wheels = wheels;
  }

  get wheels() {
    return this._wheels;
  }
}

function VehicleFactory(wheels, power) {
  this.wheels = wheels;
  this.power = power;
}

VehicleFactory.prototype.printWheels = function () {
  console.log("Wheels: " + this.wheels);
};

const v1 = new Vehicle(4, 200);
const v2 = new VehicleFactory(6, 200);

v2.printWheels();
console.log(v1.wheels);
