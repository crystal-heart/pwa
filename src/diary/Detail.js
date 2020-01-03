import React, {Fragment, useState, useEffect } from 'react';
import ja from "../i18n/ja";

import Footer from '../common/Footer';
import Header from '../common/Header';
import { withRouter } from 'react-router-dom';
import BaseRequest from '../request/BaseRequest';
import Moment from 'react-moment';
import db from '../indexDB/InitDB';

function Detail(props) {
    const [item, setItem] = useState('');
    const [modalOpen, setModalOpen] = useState('none');
  
 
    
   const id = props.match.params.id;
   
    const openModal = () => {
        setModalOpen('block');
    }

    const closeModal = () => {
        setModalOpen('none');
    }

    const loadData = async () => {
      try {
        BaseRequest.setHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        let response = await BaseRequest.get('story/show/' + id);
        if (response.data.note)
            setItem(response.data.note);
      } catch (error) {
        setItem(await db.notes.get(parseInt(id)));
       
      }
    }

    useEffect(() => {
        loadData();
        return () => {
        };
    }, []);

    const gotToEdit = () => {

        props.history.push("/story/"+id+"/edit");
    }

    const deleteData = async () => {
        let delete_success = false;
       try {
        BaseRequest.setHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        let response = await BaseRequest.get('story/delete/' + id);
        if (response.data.satus === 'ok')
                 delete_success = true;

        
       } catch (error) {
        await db.notes.delete(parseInt(id));
        props.history.push("/stories");
       }
       if(delete_success)
          props.history.push("/stories");
    }
    return (
        <Fragment>
            <div className="modal js-modal" style={{display:modalOpen }}>
                <div className="modal__body">
                     <p className="modal__text">{ja.confirm_delete}</p>

                    <button onClick={deleteData} style={{marginRight: '10px',width: '120px'}} type="button" className="button modal__cancel-btn js-cancel-modal">{ja.delete}</button>
                    <button  onClick={closeModal}  style={{width: '120px'}} type="button" className="button button--success js-confirm-modal">{ja.cancel} </button>
                </div>
            </div>
      
            <div className="story">
                <p className="story__date"> <Moment format="YYYY/M/DD">
                {item.created_at}
            </Moment></p>
                <p className="story__title js-story-title" >{item.title}</p>
                <div className="story__content js-story-content" >
                    {item.content}
                </div>
                <div className="story__toolbar">
                    <div className="story__fav-icon">
                       
                    </div>
                    <div className="toolbar__buttons">
                        <button  onClick={gotToEdit} type="button" className="button button--success toolbar__edit-btn js-edit-story">{ja.edit}</button>
                        <button onClick={openModal} type="button" className="button toolbar__delete-btn js-delete-story">{ja.delete}</button>
                    </div>
                </div>
            </div>
            </Fragment>
    );
}

export default withRouter(Detail);
