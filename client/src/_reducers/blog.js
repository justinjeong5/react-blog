import {
  CREATE_BLOG_POST_REQUEST, CREATE_BLOG_POST_SUCCESS, CREATE_BLOG_POST_FAILURE,
  RESET_BLOG_POST,
  LOAD_BLOG_POSTS_REQUEST, LOAD_BLOG_POSTS_SUCCESS, LOAD_BLOG_POSTS_FAILURE,
  LOAD_BLOG_POST_REQUEST, LOAD_BLOG_POST_SUCCESS, LOAD_BLOG_POST_FAILURE,
} from '../_sagas/types'

const initialState = {
  createBlogPostLoading: false,
  createBlogPostDone: false,
  createBlogPostError: null,
  loadBlogPostsLoading: false,
  loadBlogPostsDone: false,
  loadBlogPostsError: null,
  loadBlogPostLoading: false,
  loadBlogPostDone: false,
  loadBlogPostError: null,

  currentBlogPost: null,
  blogPosts: [],
}

const blog = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BLOG_POST_REQUEST:
      return {
        ...state,
        createBlogPostLoading: true,
        createBlogPostDone: false,
        createBlogPostError: null,
      }
    case CREATE_BLOG_POST_SUCCESS:
      return {
        ...state,
        createBlogPostLoading: false,
        createBlogPostDone: true,
      }
    case CREATE_BLOG_POST_FAILURE:
      return {
        ...state,
        createBlogPostLoading: false,
        createBlogPostError: action.error
      }
    case RESET_BLOG_POST:
      return {
        ...state,
        createBlogPostLoading: false,
        createBlogPostDone: false,
        createBlogPostError: null,
      }
    case LOAD_BLOG_POSTS_REQUEST:
      return {
        ...state,
        loadBlogPostsLoading: true,
        loadBlogPostsDone: false,
        loadBlogPostsError: null,
      }
    case LOAD_BLOG_POSTS_SUCCESS:
      return {
        ...state,
        loadBlogPostsLoading: false,
        loadBlogPostsDone: true,
        blogPosts: [...state.blogPosts, ...action.payload.blogs],
      }
    case LOAD_BLOG_POSTS_FAILURE:
      return {
        ...state,
        loadBlogPostsLoading: false,
        loadBlogPostsError: action.error
      }
    case LOAD_BLOG_POST_REQUEST:
      return {
        ...state,
        loadBlogPostLoading: true,
        loadBlogPostDone: false,
        loadBlogPostError: null,
      }
    case LOAD_BLOG_POST_SUCCESS:
      return {
        ...state,
        loadBlogPostLoading: false,
        loadBlogPostDone: true,
        currentBlogPost: action.payload.blog,
      }
    case LOAD_BLOG_POST_FAILURE:
      return {
        ...state,
        loadBlogPostLoading: false,
        loadBlogPostError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default blog;