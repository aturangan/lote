import { combineReducers } from 'redux'; 
import ItemReducer from './reducer-items';

const reducers = combineReducers({
  items: ItemReducer, 
  //add other reducer properties as needed
});

export default reducers; 