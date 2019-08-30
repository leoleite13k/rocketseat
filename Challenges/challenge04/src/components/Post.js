import React from 'react';

import avatar from '../assets/images/perfil.jpg';

const Post = () => (
  <div className="post">
    <div className="desc">
      <image className="avatar" src={avatar} />
      <div className="detail">
        <strong>Julio Alcantra</strong>
        <span className="date">04 Jun 2019</span>
      </div>
    </div>
    <div className="message">
      <span>Pessoal, alguem sabe se a Rocketseat esta contratando ?</span>
    </div>
  </div>
);

export default Post;
