import './Card.css';

import React from 'react';

function Card({title, description, imgUrl, author, upvotes, handleDelete, id}) {
  return (
    <div className='card-container'>
          <img className='img' src={imgUrl} alt="Card" />
        <div className="card-details">
          <h3>Title: {title}</h3>
          <h4>Description: {description}</h4>
          <p>{author}</p>
          <button onClick={() => handleIncrementUpvote(id)}>Upvote: {upvotes}</button>
          <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
    </div>
  );}

export default Card;