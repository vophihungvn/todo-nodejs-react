import { handleActions } from 'redux-actions';
import {
  actionCreators as apiActionCreators,
  types as apiTypes,
} from '../sagas/ApiBuider';

const defaultState = {
  todos: [],
  filterState: 'All',
};

const types = {
  GET_TODOS: 'GET_TODOS',
  GET_TODOS_SUCCESS: 'GET_TODOS_SUCCESS',
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
};

const typesMapping = {
  [types.GET_TODOS]: apiTypes.API_CALL,
  [types.GET_TODOS_SUCCESS]: 'GET_TODOS_SUCCESS',
  [types.ADD_TODO]: apiTypes.API_CALL,
};

export const actionCreator = {
  [types.GET_TODOS]: (successActions = [], failureActions = []) => ({
    type: typesMapping.GET_TODOS,
    payload: {
      request: {
        url: '/todo'
      },
      successActions,
      failureActions
    }
  }),
  [types.ADD_TODO]: (todo, successActions = [], failureActions = []) => ({
    type: typesMapping.ADD_TODO,
    payload: {
      request: {
        url: '/todo',
        method: 'post',
        body: JSON.stringify(todo)
      },
      successActions,
      failureActions
    },
  }),
  [types.GET_TODOS_SUCCESS]: () => ({
    type: types.GET_TODOS_SUCCESS
  })
};

const getTodosSuccessActions = [
  actionCreator[types.GET_TODOS_SUCCESS]()
]

const addTodoSuccessActions = [
  actionCreator[types.GET_TODOS](getTodosSuccessActions)
]

export const actions = {
  getTodos: dispatch => () => dispatch(actionCreator[types.GET_TODOS](getTodosSuccessActions)),
  addTodo: dispatch => todo => dispatch(actionCreator[types.ADD_TODO](todo, addTodoSuccessActions)),
};

export default handleActions(
  {
    [typesMapping.GET_TODOS_SUCCESS]: (state, action) => ({
      ...state,
      todos: action.payload.data,
    }),
    [types.ADD_TODO]: (state, action) => ({
      ...state,
      todos: [...state.todos, action.payload.todo],
    }),
  },
  defaultState
);
