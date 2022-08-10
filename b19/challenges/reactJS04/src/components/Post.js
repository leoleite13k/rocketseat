import React from 'react';
import Comment from './Comment';

const Post = ({ data: { owner, comments } }) => (
  <div className="post">
    <div className="desc">
      <div className="avatar">
        <img className="photo" src={require('../assets/images/perfil.jpg')} />
      </div>
      <div className="detail">
        <strong>{owner.name}</strong>
        <span className="date">{owner.date}</span>
      </div>
    </div>
    <div className="message">
      <span>{owner.post}</span>
    </div>
    {comments.map((item, index) => <Comment key={String(item + index)} comment={item} />)}
  </div>
);

export default Post;
