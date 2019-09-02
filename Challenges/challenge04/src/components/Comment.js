import React from 'react';

const Comment = ({ comment }) => (
  <div className="comment">
    <div className="avatar">
      <img className="photo" src={require('../assets/images/perfil.jpg')} />
    </div>
    <div className="containerComment">
      <strong className="nameComment">{comment.userName}</strong>
      <span className="textComment">{comment.userComment}</span>
    </div>
  </div>
);

export default Comment;
