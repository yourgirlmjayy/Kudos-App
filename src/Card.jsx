import './Card.css';

import React from 'react';

function Card({title, description, imgUrl, author, upvotes}) {
  return (
    <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL3JtNTk3ZGVzaWduLWMtZ2lmdC0wMDMuanBn.jpg" alt="Card" />
        <button>Upvote: {upvotes}</button>
        <button>Delete</button>
    </div>
  );}

export default Card;