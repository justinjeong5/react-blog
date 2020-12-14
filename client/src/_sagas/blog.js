import { all, fork, put, call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

import {
  CREATE_BLOG_POST_REQUEST, CREATE_BLOG_POST_SUCCESS, CREATE_BLOG_POST_FAILURE,
  LOAD_BLOG_POSTS_REQUEST, LOAD_BLOG_POSTS_SUCCESS, LOAD_BLOG_POSTS_FAILURE,
  LOAD_BLOG_POST_REQUEST, LOAD_BLOG_POST_SUCCESS, LOAD_BLOG_POST_FAILURE,
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

function loadPostsAPI(data) {
  return axios.get('/api/blog/blogs', data)
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.payload);
    yield put({
      type: LOAD_BLOG_POSTS_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_BLOG_POSTS_FAILURE,
      error: error.response.data,
    })
  }
}

function loadPostAPI(data) {
  return axios.get(`/api/blog/blog/${data}`)
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put({
      type: LOAD_BLOG_POST_SUCCESS,
      payload: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_BLOG_POST_FAILURE,
      error: error.response.data,
    })
  }
}

function* watchCreatePost() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createPost)
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_BLOG_POSTS_REQUEST, loadPosts)
}

function* watchLoadPost() {
  yield takeLatest(LOAD_BLOG_POST_REQUEST, loadPost)
}


export default function* userSaga() {
  yield all([
    fork(watchCreatePost),
    fork(watchLoadPosts),
    fork(watchLoadPost),
  ])
}