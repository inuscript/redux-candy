# 🍭 redux-candy (HIGHLY EXPERIMENTAL)
*IMPORTANT:* This project maybe useful for development or toy but maybe not for produciton.

Generate redux [updeep](https://github.com/substantial/updeep) based reducer and actions.

## Example

```js
const initialState = {
  counter: 0
}
const reducer = createReducer(initialState)

// counter
const increment = createReducerAction('INCREMENT', 'counter', () => ( (i) => i + 1 ))
const decrement = createReducerAction('DECREMENT', 'counter', () => ( (i) => i - 1 ))

const Counter = ({dispatch, counter}) => {
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  )
}

const CounterContainer = connect(state => state)(Counter)
const store = createStore(reducer)
const App = () => (
  <Provider store={store}>
    <CounterContainer />
  </Provider>
)
```
# Usage

redux-sweet provide very stupid reducer that apply passed action.

```js
const initialState = {
  counter: 0
}
const reducer = createReducer(initialState)
```

And you must pass action that has update function

```js
// counter
const increment = createReducerAction('INCREMENT', 'counter', () => ( (i) => i + 1 ))
const decrement = createReducerAction('DECREMENT', 'counter', () => ( (i) => i - 1 ))

```

You can pass plain action like this.

```js
const increment = () => {
  type: 'INCREMENT',
  payload: {
    // [key]: updateFunction
    counter: () => ( (i) => i + 1 )
  }
}
```

If you want replace value

```js
const replaceValueAction = createReducerAction('INCREMENT', 'someValue')
// or
const replaceValueAction = (value) => {
  type: 'INCREMENT',
  payload: {
    // [key]: updateFunction
    someValue: (oldValue) => value
  }
}
```

You can mutate oldValue

```js
const listItemAppendAction = createReducerAction('INCREMENT', 'someList', (oldList) => [...oldList, value])
// or
const listItemAppendAction = (value) => {
  type: 'INCREMENT',
  payload: {
    // [key]: updateFunction
    someList: (oldList) => [...oldList, value]
  }
}
```


# API
## Reducer

### `createReducer(initialState: Object, [updateCondtion: Function])`

Generate updeep based rootReducer.
This reducer accept all action and return `updeep(action.payload, state)`.

If you want controll update condition, pass `updateCondtion`

```js
const updateCondition = ( action ) => {
  // update when pass SOME_ACTION
  return action.type === "SOME_ACTION"
}
```

## Action

### `createReducerAction(actionType: String, value: String, [updateFunction: Function])`

Helper for create action for redux-sweeet reducer.
