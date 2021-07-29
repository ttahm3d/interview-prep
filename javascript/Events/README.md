# Events

> Event is represents something that happes in the application.

We can respond to the events in our desired way. When something occurs, the system fires an event and the event can be handled by the user using code.

## Adding Event Listeners

In Web applications, events are fired inside the browser window and are attached to an Item generally. Each event has a event handler (a JS function that executes in response to an event) that gets executed when a event is fired.

```JavaScript
const button = document.querySelector(".btn")

btn.addEventListener("click", () => {
	console.log("Btn has been clicked")
})

btn.onClick = function(){
	console.log("clicked")
}

```

A event can have multiple event handlers

## Removing event listeners

```JS
btn.removeEventListener("click,() => {})
```

## Other Event Concepts

### Event Object

Every event handler has access to the `event` object. It provides extra information about the event to the handler.

#### event.target

`event.target` - It will be a reference to the element where event occured.

#### Preventing Default Behavior

On form submission the page reloads. This is the default behaviour. To prevent the default behaviour of any event we can call

```JS
event.preventDefault();
```

#### Event bubbling and Capturing

Event bubbling and capturing mechanism determines which handlers run - When there are two handlers of same event type of the same element.

When a event is fired on an element, that has some parent elements, modern browsers run three different phases.

- **Capturing Phase** - The browser checks for event handler on the `<html>` element and runs it if it is there. Then next element in dom then next and so on.
- **Target Phase** - The browser checks for event handler on the `target` item. Runs it if it is there. If `bubbles` (a read only property on event object) is true then it propogates the event to its parent then parent to its parent until it reaches `<html>` element. if `bubbles` is false it does not propogate.
- **Bubbling Phase** - Exact opposite of Capturing phase. Checks for event handler at target and executes if it is there.

By default, all events are registered in Bubbling phase

#### event.stopPropogation()

This prevents event from bubbling.

#### Event Delegation

When we have large number of elements with same handlers, we can handle the event by Delegating the event handling to the parent of these elements
