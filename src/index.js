import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { startGetUser } from './actions/userActions';
import { getCategoryDetails } from './actions/categoryActions';
import { getBudgetDetails } from './actions/budgetActions';


const store=configureStore()

store.dispatch(startGetUser())
// store.dispatch(getCategoryDetails())
// store.dispatch(getBudgetDetails())

console.log(store.getState());

store.subscribe(()=>{
  console.log('state updated',store.getState());
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  
  <BrowserRouter>
    <App />
  </BrowserRouter>
    
  </Provider>
);

reportWebVitals();
