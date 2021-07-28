// let temp = "hi";
// function display() {
//   console.log(temp);
//   if (true) {
//     let temp = "bye";
//   }
// }
// display();

// // function test() {}

// // var test1 = function () {};

// // var test2 = () => {};

// // let x = 20,
// //   y = 10;

// // let result = add(x, y);
// // console.log(result);

// // var add = function (x, y) {
// //   return x + y;
// // };

// // console.log("3" + 3);

// // '10'-'4'-'3'-2+5+true

// class Person {
//   constructor(name, age) {
//     (this.name = name), (this.age = age);
//   }

//   greeting() {
//     console.log(`${this.name}`);
//   }
// }

// // Teacher.prototype = Object.create(Person.prototype)

// class Teacher extends Person {
//   constructor(name, age, subject) {
//     super();
//     this.subject = subject;
//   }
// }

// const teacher = new Teacher("abc", "24", "xyz");
// teacher.greeting();

// function test() {
//   console.log(this);
// }

// function test1(name, age) {
//   (this.name = name),
//     (this.age = age),
//     (this.a = () => {
//       console.log(this);
//     });
//   a();
// }

// test();

// test1();

var arr = [10, 1, 21, 13];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log("Index: " + i + ", element: " + arr[i - 1]);
  });
}

function mulAndSum(number) {
  let a = [];
  let remainder = 0;
  while (number > 0) {
    remainder = number % 10;
    number = Math.floor(number / 10);
    a.push(remainder);
  }

  let sum = 0,
    prod = 1;
  for (let i = 0; i < a.length; i++) {
    sum = sum + a[i];
    prod = prod * a[i];
  }
  console.log(prod - sum);
}

mulAndSum(234);
