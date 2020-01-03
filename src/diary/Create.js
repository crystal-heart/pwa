import React, {Fragment, useState } from 'react';
import ja from "../i18n/ja";

import Footer from '../common/Footer';
import Header from '../common/Header';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import BaseRequest from '../request/BaseRequest';
import Moment from 'react-moment';
import db from '../indexDB/InitDB';

function Create(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startSave, setStartSave] = useState('');
  const [statusCreate, setStatusCreate] = useState('');

  const user_id =  localStorage.getItem('user_id');
  const save = async () => {
    try {

      if (!title && !content) return;
      setStartSave(true);

      let response = await BaseRequest.post('story/create', { 'title': title, 'content': content });
 
      
      if (response.data) {
        
        props.history.push("/stories");
      }
      else if (response.problem== "NETWORK_ERROR") {
       let issetData =  await db.notes.filter(i => { return (i.user_id == parseInt(user_id) && i.title == title && i.content == content  ) }).toArray();
        console.log(issetData);
        
       if(issetData.length == 0) {

          let x = await db.notes.add({'user_id': parseInt(user_id) , 'title': title, 'content': content });

        }
        props.history.push("/stories");
      }
      else {
        setStartSave(false);
        setStatusCreate(ja.create_false);
      }

    } catch (error) {
     
    }

  }
  const date = new Date();
  return (
   <Fragment>
      <div className="container">
        <div className="form-group">
          <h2 className="form-group__heading"><Moment format="YYYY/M/DD">{date}</Moment></h2>
          <form className="form-group__form js-form-login" action="#">
            <input className="form__input" type="text" placeholder={ja.title} required onChange={e => setTitle(e.target.value)} />
            <textarea className="form__input" rows="12" cols="10" placeholder={ja.content} required onChange={e => setContent(e.target.value)}>
            </textarea>
            <button onClick={save} type="button" className="form__btn--submit js-login-button">{ja.save}</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(Create);
