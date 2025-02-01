# Events

Event is a signal that something has happened. DOM nodes generate such events.

Eg: click, `contextmenu` - for rightclick

## Event Handlers

To react on these events, we have event handlers. This is the code in javascript in response to event.

1.  HTML attribute assignment - `on<event>`

```js
<form onsubmit="submissionHandler()">
```

2. DOM Property

```html
<input id="inputBtn" type="button" value="Click" />
<script>
  inputBtn.onclick = function () {
    alert("alert from dom");
  };
</script>
```

> NOTE: If we are assigning existing function it needs to be passed as `submissionHandler` not `submissionHandler()` while assigning

### Add event Handler

```js
domElement.addEventHandler(event, function, options)
```

- event - any event
- function - function to handle that event
- options
  - once - if true listener gets automatically removed
  - capture - true - runs in capturing phase
  - passive - if true, it will not call `preventDefault()`
    > NOTE: options true is same as capture true / false
    > `{capture: true}`

### Remove event Handler

Same function needs to be passed to removeEventHandler as it was passed in addEventHandler

## Event bubbling and capturing

### Bubbling

Consider the below code

```html
<div onclick="alert('The handler!')">
  <em
    >If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em
  >
</div>
```

if you clickon em / code the event runs

This happens because when event is triggered, the browser runs the event handler at the target, then the event handlers at the parent level

This called **Event Bubbling**

Event starts from target and goes all the way upto the root element.

> NOTE: Almost all events bubble. `focus()` does not bubble

You can explicitly stop bubbling by `event.stopPropogation()`

When there are multiple event handlers, use `event.stopImmediatePropogation()`

### Capturing

There are 3 phase

1. Capturing phase - event goes down to the element
2. Targeting phase - event reaches the element
3. Bubbling phase - event bubbles up from the element

To catch an event on the capturing phase, we need to set the handler capture option to true:

```js
elem.addEventListener(..., {capture: true})

// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

## Event Delagation

Event delegation is a process of delegating a event to a common ancestor instead of handling it individually for a large number of children

Consider a table and task of highlighting a row. This can be done in two ways

Adding a click listener to each of the `td` elements - This means that for every row there will be column number events and if the table size is very high we are looking at handling the same event at 10000 elements.

Via event delegation, the event can be delegated to a common ancestory and we can find the event target via `event.target`
