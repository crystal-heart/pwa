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
import Footer from './common/Footer';
import Header from './common/Header';
import BaseRequest from './request/BaseRequest';
import db from './indexDB/InitDB';


function App() {
  const store = createStore(reducers, {});
 
  const user_id = localStorage.getItem('user_id');

  MainScript('main.js');
  window.addEventListener('offline', () =>  {
    
    localStorage.setItem('isOffline',true)
  } );
  window.addEventListener('online', async () =>  {

    let list = await db.notes.filter(i => { return i.user_id == parseInt(user_id) }).toArray();

    BaseRequest.setHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

  setTimeout( async () => {

    let response = await BaseRequest.post('/synData',{data: JSON.stringify(list)});

    if (response.data.status === "ok") {
       db.notes.clear();
    }
  },100);


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
      <div className="page page--is-flex page--stretches">
      <Header />
        <PublicRoute path="/" component={Home} exact />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/stories" component={Diary} />
        <PrivateRoute path="/new-story" component={Create} />
        <PrivateRoute path="/story/:id/edit" component={Edit} />
        <PrivateRoute path="/story/:id" component={Detail} />
        <Footer />
</div>
      </Switch>
    </Router>

    </Provider>
  );
}

export default App;
