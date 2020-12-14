import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {
  CREATE_BLOG_POST_REQUEST, CREATE_BLOG_POST_SUCCESS, CREATE_BLOG_POST_FAILURE,
} from './types'

function createPostAPI(data) {
  return axios.post('/api/blog/createPost', data)
}

function* createPost(action) {
  try {
    const result = yield call(createPostAPI, action.payload);
    yield put({
      type: CREATE_BLOG_POST_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: CREATE_BLOG_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchCreatePost() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createPost)
}

export default function* userSaga() {
  yield all([
    fork(watchCreatePost),
  ])
}