import React from 'react';
import ja from "../i18n/ja"; 
import remind_icon from '../assets/img/remind-icon.svg';
import lock_icon from '../assets/img/lock-icon.svg';
import heart_solid from '../assets/img/heart-solid.svg';
import Footer from '../common/Footer';
import Header from '../common/Header';
import  {Link} from "react-router-dom";

function Home() {
  return (
    <div className="page page--is-flex page--stretches">
   <Header />
    <section className="hero hero--home">
        <div className="container">
            <h1 className="hero__title">{ja.sologan}</h1>
            <p className="hero__text">
            {ja.sub_sologan}
            </p>
            <div>
                <Link to="/register" className="button button--success">
                {ja.get_started}
          </Link>
            </div>
        </div>
    </section>
    <section>
        <h1 className="feature-list__title">
         {ja.features}
        </h1>
        <div className="container">
            <div className="feature-list">
                <div className="feature-list__item">
                    <img src={remind_icon} alt="remind-icon" className="item__image"/>
                    <h2 className="item__title">    {ja.reminders} </h2>
                    <p className="item__desc">
                        {ja.reminders_title}
                    </p>
                </div>
                <div className="feature-list__item">
                    <img src={lock_icon} alt="hashtag-icon" className="item__image" />
                    <h2 className="item__title">   {ja.privacy} </h2>
                    <p className="item__desc">
                        {ja.privacy_title}
                    </p>
                </div>
                <div className="feature-list__item">
                    <img src={heart_solid} alt="fav-icon" className="item__image"/>
                    <h2 className="item__title">  {ja.favorites} </h2>
                    <p className="item__desc">
                        {ja.favorites_title}
                    </p>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
</div>
  );
}

export default Home;
