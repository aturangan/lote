import 'babel-polyfill'; 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore } from 'redux';
import reducers from './reducers'; 
import App from './components/App'; 

const store = createStore(reducers); 

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>, 
  document.getElementById('root')
);


// import { render } from 'react-dom';  
// import type { Store } from './types'; 
// const store: Store = createStore(
// 	reducers, 
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ); 

//ReactDOM.render(<h1>Hello World from React</h1>, document.getElementById('root'));

