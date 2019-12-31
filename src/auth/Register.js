import React,{useState} from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ja from "../i18n/ja"; 

import {
    Link
  } from "react-router-dom";
  import { withRouter } from 'react-router-dom';
  import BaseRequest from '../request/BaseRequest';

function Register(props){
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
 
  const register = async () => {
    try {
      let response = await BaseRequest.post('auth/register', { 'email': email, 'password': password});
 
    if(response.data) {
      alert(ja.register_success);
      props.history.push("/login");
    
    } else {
      alert(ja.register_fails);
    }
    } catch (error) {
      alert('インターネットが繋がりません。');
    }
  }
  return (
    <div className="page page--is-flex page--stretches">
    <Header />
    <div className="container">
      <div className="form-group">
        <h2 className="form-group__heading">{ja.create_an_account}</h2>
        <form className="form-group__form js-form-login" action="#">
          <input className="form__input" type="email" placeholder={ja.email} required  onChange={(e) =>setEmail(e.target.value) }/>
          <input className="form__input" type="password" placeholder={ja.password} required  onChange={(e) =>setPassword(e.target.value) } />
          <input className="form__input" type="password" placeholder={ja.confirm_password} required  onChange={(e) =>setConfirmPassword(e.target.value) }/>
          <button onClick={register} type="button" className="form__btn--submit js-login-button">{ja.register}</button>
          <Link className="form__btn--alternate" to="/login">{ja.login}?</Link>
        </form>
      </div>
    </div>
    
    <Footer />
    </div>


  );
}

export default withRouter(Register);