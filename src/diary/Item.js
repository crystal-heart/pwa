

import React from 'react';
import ja from "../i18n/ja";
import  {Link} from "react-router-dom";
import Moment from 'react-moment';

const Item = (props) => {
    const data = props.data;
    return (
        <figure className="story-list__item">
            <div className="item__holder"></div>
            <div className="item__date">
    <span className="date__span date__day">
            <Moment format="YYYY/M/DD">
            {data.created_at}
            </Moment>
        </span>
            </div>
            <figcaption className="item__caption">
    <h3 className="caption__text caption__title">{data.title}</h3>
    <p className="caption__text">{data.content}</p>
            </figcaption>
            <div className="item__overlay">{ja.read_story}</div>
            <Link className="link item__link" to={"/story/"+ data.id}></Link>
        </figure>

    );
}

export default Item;


