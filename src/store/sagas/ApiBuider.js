import { put, select, takeEvery } from 'redux-saga/effects';
import selector from '../selector';

export const BASE_URL = 'http://localhost:3030/api';

export const types = {
  API_CALL_EXECUTE: 'API_CALL_EXECUTE',
  API_CALL: 'API_CALL',
};

export const actionCreators = {
  [types.API_CALL_EXECUTE]: payload => ({
    type: types.API_CALL_EXECUTE,
    payload,
  }),
};

export const getDefaultRequest = session => {
  const headers = new Headers();
  const bearerAuthorization = `Bearer ${session}`;
  headers.set('Authorization', bearerAuthorization);
  headers.set('Content-Type', 'application/json');

  return {
    url: BASE_URL,
    headers
  };
};

export const mergeRequests = (base, specific) => {
  const completeURL = `${base.url}${specific.url}`;
  const completeRequestParameters = mergeRequestParameters(base, specific);
  return new Request(completeURL, completeRequestParameters);
};

export const hasHeaders = request => request.hasOwnProperty('headers');

export const mergeRequestParameters = (baseRequest, customRequest) => {
  let newRequest = Object.assign({}, baseRequest, customRequest);

  if (!hasHeaders(customRequest)) return newRequest; // If newRequest doesn't have headers key no need to merge headers

  for (let entry of baseRequest.headers.entries()) {
    let [key, value] = entry;
    if (newRequest.headers.get(key) === null)
      newRequest.headers.set(key, value);
  }
  return newRequest;
};

export function* buildRequest(action) {
  const { payload } = action;
  if (Object.keys(payload).length === 0 && payload.constructor === Object)
    throw new TypeError('The request is empty');

  const { successActions, failureActions, request } = payload;
  const sessionId = '' // yield select(selector.getUserSession);
  const defaultRequest = getDefaultRequest(sessionId);
  const completeRequest = mergeRequests(defaultRequest, request);
  const nextPayload = {
    request: completeRequest,
    successActions,
    failureActions,
  };

  yield put(actionCreators[types.API_CALL_EXECUTE](nextPayload));
}

export default function* saga() {
  yield takeEvery(types.API_CALL, buildRequest);
}
