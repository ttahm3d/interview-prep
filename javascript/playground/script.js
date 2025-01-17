class Students {
  _numberOfStudents = 0;

  set numberOfStudents(count) {
    if (count < 0) {
      count = 0;
    }
    this._numberOfStudents = count;
  }

  get numberOfStudents() {
    return this._numberOfStudents;
  }
}
// create the coffee machine
let coffeeMachine = new Students(100);

// add water
coffeeMachine.numberOfStudents = -10; // _waterAmount will become 0, not -10

console.log(coffeeMachine._numberOfStudents); // 0
