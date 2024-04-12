import { combineReducers } from 'redux';
import propertiesReducer from './propertiesReducer';
// import postsReducer from './postsReducer';

const rootReducer = combineReducers({
  properties: propertiesReducer,
//   posts: postsReducer,
  // Add more reducers as needed
});

export default rootReducer;
