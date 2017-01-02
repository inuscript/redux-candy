import { createReducer, createReducerAction } from '../src'
import assert from 'assert'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

describe('createReducerAction', () => {
  it('resolve createReducerAction', () => {
    const actionCreator = createReducerAction('TODO', 'todos', (baseTodo, input) => {
      return [...baseTodo, input]
    })
    const action = actionCreator('baz')
    const actualState = emulateState({ todos: ['foo'] }, action)
    assert.deepEqual(actualState, {
      todos: ['foo', 'baz']
    })
  })
})
