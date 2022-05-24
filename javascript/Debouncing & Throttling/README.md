# Debouncing and Throttling

These are the ways in which user can limit the rate of invocation of a function

Consider a search bar which shows list of products in the current app for the given search string

**Debouncing** = In Debouncing, we fire the event only if the time difference between the previous event and this event is more than a certain threshold

**Throttling** - controlling or calling the function at a regular intervals.

```JSX

const debounce = function(callback, delay) {
  let timer;
  return function() {
    let context = this
    clearTimer(timer)
    timer = setTimeout(() => {
      callback.apply(context, arguments)
    }, delay)
  }
}

```

```JSX
const throttle = function(callback, limit) {
  let context = this
  let flag = true
  return function() {
    if(flag) {
      callback.apply(context, arguments)
      flag = false
      setTimeout(() => {
        flag = true
      }, limit)
    }

  }
}

const throttle = (fn, limit) => {
  let context = this
  let flag = true
  return function () {
    if (flag) {
      fn.apply(context, arguments)
      flag = false
        setTimeout(() => {
        flag = true
      }, limit)
    }
  }
}

```
