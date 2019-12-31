import React, { useState } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ja from "../i18n/ja";
import { withRouter } from 'react-router-dom';
import BaseRequest from '../request/BaseRequest';
import { useDispatch } from 'react-redux';

import {
  Link
} from "react-router-dom";
function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusLogin, setStatusLogin] = useState('');
  const [startLogin, setStartLogin] = useState(false);
  const dispatch = useDispatch();


  const login = async () => {
    try {
      setStartLogin(true);
    let response = await BaseRequest.post('auth/login', { 'email': email, 'password': password });
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token);
      localStorage.setItem('user_id', response.data.id);
      props.history.push("/stories");
      dispatch({ type: 'login_success', showmenu: true });
    }
    else {
      setStartLogin(false);
      setStatusLogin(ja.wrong_pass_and_user);
    }
    } catch (error) {
     

      setStartLogin(false);
      setStatusLogin('インターネットが繋がりません。');
    }

  }
  return (
    <div className="page page--is-flex page--stretches">
      <Header />
      <div className="container">
        <div className="form-group">
          <h2 className="form-group__heading">{ja.unlock_your_diary}</h2>
          <form className="form-group__form js-form-login" action="#">
            <input value="demo@vnext.com.vn" className="form__input" type="email" placeholder={ja.email} required onChange={e => { setEmail(e.target.value); setStatusLogin('') }} />
            <input value="123456" className="form__input" type="password" placeholder={ja.password} required onChange={e => { setPassword(e.target.value); setStatusLogin('') }} />
            <p style={{ 'color': 'red' }}>{statusLogin}</p>
            {!startLogin ?
              <button style={{'marginRight':'6px'}}  onClick={login} type="button" className="button--success button js-login-button">{ja.login}</button> :

              <button onClick={login} type="button" className="form__btn--submit button--loading"></button>
            }

            <Link className="form__btn--alternate" to="/register"> {ja.register}?</Link>
          </form>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default withRouter(Login);