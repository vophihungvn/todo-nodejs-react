import { all, fork } from 'redux-saga/effects';

import ApiBuilder from './ApiBuider';
import ApiExecutor from './ApiExecutor';
// import ErrorHandler from './ErrorHandler'
// import RedirectHandler from './RedirectHandler'

export default function* sagas() {
  yield all([fork(ApiBuilder), fork(ApiExecutor)]);
}
