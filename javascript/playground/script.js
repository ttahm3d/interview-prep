function* multiplyTest() {
  let result = yield "8 * 8 = ?";

  // alert(result);
}
const mul = multiplyTest();
const q = mul.next();

setTimeout(() => mul.next(64), 8000);
