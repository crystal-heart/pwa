import React, { useState, useEffect } from 'react';
import ja from "../i18n/ja";

import Footer from '../common/Footer';
import Header from '../common/Header';
import { withRouter } from 'react-router-dom';
import BaseRequest from '../request/BaseRequest';
import Moment from 'react-moment';
import db from '../indexDB/InitDB';

function Edit(props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [item, setItem] = useState('');
    const [startSave, setStartSave] = useState('');
    const [statusCreate, setStatusCreate] = useState('');
    const id = props.match.params.id;
    const user_id =  localStorage.getItem('user_id');
    const loadData = async () => {

            try {
                
            BaseRequest.setHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
            let response = await BaseRequest.get('story/show/' + id);
            if (response.data.note) {
                setItem(response.data.note);
                setTitle(response.data.note.title);
                setContent(response.data.note.content);
            }
            } catch (error) {
              let item =  await db.notes.get(parseInt(id));

                setItem(item); 
                setTitle(item.title);
                setContent(item.content);
            }
          

    }

    const save = async () => {

        if (!title && !content) return;

        try {
            setStartSave(true);

            let response = await BaseRequest.post('story/update', { 'id': item.id, 'title': title, 'content': content });
    
            if (response.data) {
    
                props.history.push("/stories");
            }
            else {
                setStartSave(false);
                await db.notes.get(parseInt(id));

                db.notes.update(item.id, {'title': title ,'content': content ,'user_id' : parseInt(user_id)}).then(function (updated) {
                    if (updated)
                    props.history.push("/stories");
                    else
                    setStartSave(false);
                  });
            }
        } catch (error) {
           
        }

    }
    useEffect(() => {
        loadData();
        return () => {
        };
    }, []);

    return (
        <div className="page page--is-flex page--stretches">
            <Header />
            <div className="container">
                <div className="form-group">
                    <h2 className="form-group__heading"><Moment format="YYYY/M/DD">{item.created_at}</Moment></h2>
                    <form className="form-group__form js-form-login" action="#">
                        <input defaultValue={title || ''} className="form__input" type="text" placeholder={ja.title} required onChange={e => setTitle(e.target.value)} />
                        <textarea defaultValue={content || ''} className="form__input" rows="12" cols="10" placeholder={ja.content} required onChange={e => setContent(e.target.value)}>
                        </textarea>
                        <button onClick={save} type="button" className="form__btn--submit js-login-button">{ja.save}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default withRouter(Edit);
