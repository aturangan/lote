import { combineReducers } from 'redux'; 
import ItemReducer from './reducer-items';
import ActiveItemReducer from './reducer-active-item';

const reducers = combineReducers({
  items: ItemReducer,
  activeItem: ActiveItemReducer
});

export default reducers; 