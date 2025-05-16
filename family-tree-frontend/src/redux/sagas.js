import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as types from './types';
import { setMembers } from './actions';

const API = 'http://localhost:5000/api/members';

function* fetchMembersSaga() {
  const res = yield call(() => axios.get(API));
  yield put(setMembers(res.data));
}

function* addMemberSaga(action) {
  yield call(() => axios.post(API, action.payload));
  yield call(fetchMembersSaga);
}

function* updateMemberSaga(action) {
  yield call(() => axios.put(`${API}/${action.payload.id}`, action.payload));
  yield call(fetchMembersSaga);
}

function* deleteMemberSaga(action) {
  yield call(() => axios.delete(`${API}/${action.payload}`));
  yield call(fetchMembersSaga);
}

export default function* rootSaga() {
  yield takeLatest(types.FETCH_MEMBERS, fetchMembersSaga);
  yield takeLatest(types.ADD_MEMBER, addMemberSaga);
  yield takeLatest(types.UPDATE_MEMBER, updateMemberSaga);
  yield takeLatest(types.DELETE_MEMBER, deleteMemberSaga);
}
