Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue || this[0];

  for (let i = 0; i < this.length; i++) {
    if (initialValue === undefined) {
      accumulator = this[i];
      initialValue = this[i];
    } else accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const arr = [1, 2, 3, 4, 5];
arr.myReduce((acc, curr) => acc + curr, 0);

// debounce handler
function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

// throttle handler
function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, delay);
  };
}
