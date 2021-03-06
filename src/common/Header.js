import React,{useState,useEffect} from 'react';
import ja from "../i18n/ja";
// import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Link
} from "react-router-dom";
const Header = (props) => {
  const [offlineState , setOfflineState] = useState(false);
  const [countEvnet  , setCountEvnet] = useState(0);
  useEffect(() => {

    window.addEventListener('offline', () =>  {
     setTimeout( () => {
      if(countEvnet === 0) {
        alert('インターネットが繋がりませんから、オフラインのモードに変換します。');
        setCountEvnet(1);
      }
     })
     
      setOfflineState(true);
     
    } );
    window.addEventListener('online', () =>  {
      setCountEvnet(0);
      setOfflineState(false);
     
    } );

    return () => {

    };
  }, []);
  const token = localStorage.getItem('access_token');
  // const showMenu = useSelector(state => state.showmenu);
  const logout = () => {
    if(!offlineState) {
      console.log(offlineState);
      localStorage.setItem('access_token', '');
      localStorage.setItem('user_id', '');
      props.history.push("/");
    } else {
      alert('オフラインの時にログアウトできません。');
    }
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__brand">
          <Link className="link" to="/">
            {ja.app_name}
          </Link>
        </div>
        {!token &&
          <nav className="nav">
            <a href="#" className="nav__open-menu js-open-menu"></a>
            <ul className="list nav__list js-nav-list">
              <li className="list__item">
                <a href="#" className="nav__close-menu js-close-menu"></a>
              </li>
              <li className="list__item">
                <Link to="/login" className="button--success button">
                  {ja.login} </Link>
              </li>
              <li className="list__item">
                <a href="#" className="nav__close-menu js-close-menu"></a>
              </li>
            </ul>
          </nav>
        }

        {token &&

          <nav className="nav">
            <a href="#" className="nav__open-menu js-open-menu"></a>
            <ul className="list nav__list js-nav-list">
              <li className="list__item">
                <a href="#" className="nav__close-menu js-close-menu"></a>
              </li>
              <li className="list__item">
                <Link to="/new-story" className=" button--success button">
                 {ja.new_story}
                </Link>
              </li>
              <li className="list__item">
                <Link to="/stories" className="button--success button">
                    {ja.my_stories}
               </Link>
              </li>
     
              <li className="list__item">
                <a href="#" className="button--success button" onClick={logout}>
                {ja.logout}
                 </a>
              </li>
            </ul>
          </nav>
        }
      </div>
    </header>
  );
}

export default withRouter(Header);
