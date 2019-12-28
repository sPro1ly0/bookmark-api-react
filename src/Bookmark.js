import React from 'react';
import Rating from './Rating';

function Bookmark(props) {
  
    return (
        <div className="bookmark">
            <div className="bookmark__row">
                <div className="bookmark_title">
                    <a
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer">   
                        {props.title}
                    </a>
                </div>
                <Rating value={props.rating} />
            </div>
            <div className="bookmark__description">
                {props.description}
            </div>
        </div>
        
    );
}

export default Bookmark;