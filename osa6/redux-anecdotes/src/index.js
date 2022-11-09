import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
/*
import { createAnectodte } from './reducers/anecdoteReducer'
import { createNotification } from './reducers/notificationReducer'

store.subscribe(() => console.log(store.getState()))
store.dispatch(createAnectodte('IMPORTANT'))
store.dispatch(createNotification('combineReducers forms one reducer from many simple reducers'))
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
