import './Card.css';

import React from 'react';

function Card({title, description, imgUrl, author, upvotes}) {
  return (
    <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={imgUrl} alt="Card" />
        <p>{author}</p>
        <button>Upvote: {upvotes}</button>
        <button>Delete</button>
    </div>
  );}

export default Card;