function* exampleGenerator() {
  yield 1;
  yield 2;
}

const gen = exampleGenerator();
console.log(gen.next());
