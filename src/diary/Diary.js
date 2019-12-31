import React, { useState, useEffect } from 'react';
import ja from "../i18n/ja";

import Footer from '../common/Footer';
import Header from '../common/Header';
import { Link } from "react-router-dom";
import BaseRequest from '../request/BaseRequest';
import Item from './Item';
import db from '../indexDB/InitDB';
import Moment from 'react-moment';
import '../assets/css/cloud.css';
function Diary() {
  const [list, setList] = useState([]);

  const user_id = localStorage.getItem('user_id');


  async function loadDataToIndexDB(list) {

    await db.notes.bulkPut(list);

  }
  const loadData = async () => {
    try {
      BaseRequest.setHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      let response = await BaseRequest.get('/stories');
      if (response.data.list) {
        setList(response.data.list);
        loadDataToIndexDB(response.data.list);
        return;
      }
    } catch (error) {

      let list = await db.notes.filter(i => { return i.user_id == parseInt(user_id) }).toArray();
      setList(list);
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

      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❆
        </div>
        <div className="snowflake">
        ❄
        </div>
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❆
        </div>
        <div className="snowflake">
        ❄
        </div>
        <div className="snowflake">
        ❅
        </div>
        <div className="snowflake">
        ❆
        </div>
        <div className="snowflake">
        ❄
        </div>
      </div>
      <h1 className="story-list__title">
        {ja.my_stories}
      </h1>
      <div className="container story-list">

        {
          list.length ?
            list.map((item) =>
              <Item key={item.id} data={item} />
            ) : ''

        }
        {
          !list.length ?
            <figure className="story-list__item">
              <div className="item__holder"></div>
              <div className="item__date">
                <span className="date__span date__day">
                  <Moment format="YYYY/M/DD">
                    {new Date()}
                  </Moment>
                </span>
              </div>
              <figcaption className="item__caption">
                <h3 className="caption__text caption__title">あなたはまだ日記を作成していません。</h3>

              </figcaption>
              <div className="item__overlay">すぐ作成しましょう！</div>
              <Link className="link item__link" to={"/new-story"}></Link>
            </figure> : ''
        }

      </div>

      <Footer />
    </div>
  );
}

export default Diary;
