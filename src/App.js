import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './assets/css/style.css';
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Diary from './diary/Diary';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './ reducers';
import MainScript from './hooks/MainScript';
import Create from './diary/Create';
import Edit from './diary/Edit';
import Detail from './diary/Detail';


function App() {
  const store = createStore(reducers, {});
 

  MainScript('main.js');
  window.addEventListener('offline', () =>   localStorage.setItem('isOffline',true) );
  window.addEventListener('online', () =>  {
   
  });

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("access_token")
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  
  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem("access_token")
        ?  <Redirect to='/stories' />
        : <Component {...props} />
    )} />
  )
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <PublicRoute path="/" component={Home} exact />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/stories" component={Diary} />
        <PrivateRoute path="/new-story" component={Create} />
        <PrivateRoute path="/story/:id/edit" component={Edit} />
        <PrivateRoute path="/story/:id" component={Detail} />
      
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
