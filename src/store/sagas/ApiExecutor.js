import { all, call, put, takeEvery } from 'redux-saga/effects';

export const types = {
  API_CALL_EXECUTE: 'API_CALL_EXECUTE',
};

const injectPayloadToAction = payload => actions => (
  actions.map(action => ({
    ...action,
    payload: {
      ...action.payload,
      ...payload
    }
  }))
)

export function* handleApiCall(action) {
  const { payload } = action;
  const { request, successActions, failureActions } = payload;
  try {
    const responsse = yield call(fetch, request);
    const data = yield responsse.json()
    if (responsse.ok) {
      yield all(
        injectPayloadToAction(data)(successActions)
        .map(action => put(action))
      )
    } else {
      throw new Error()
    }
  } catch (error) {
    yield all(
      injectPayloadToAction({})(successActions)
      .map(action => put(action))
    )
  }
}

export default function* saga() {
  yield takeEvery(types.API_CALL_EXECUTE, handleApiCall);
}
