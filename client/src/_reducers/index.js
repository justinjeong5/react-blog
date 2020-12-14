import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import blog from './blog'

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      const combineReducer = combineReducers({
        user,
        blog,
      })
      return combineReducer(state, action);
  }
};

export default rootReducer;