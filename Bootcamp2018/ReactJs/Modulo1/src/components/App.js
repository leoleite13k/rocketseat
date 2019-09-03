import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';

export default class App extends Component {
  state = {
    posts: [
      {
        id_post: 1,
        name: 'Leonardo Leite',
        avatar: 'avatar1.png',
        time: '2019-04-26 00:10:00',
        describe: 'Meu nome é Leonardo Leite hahahha!',
      },
      {
        id_post: 2,
        name: 'Marciano Fagundes',
        avatar: 'avatar2.png',
        time: '2019-04-26 00:30:00',
        describe: 'Isso é muito relevante meu caro Watson!',
      },
    ],
  };

  render() {
    return (
      <div>
        {this.state.posts.map(post => (
          <div className="posts">
            <Header />
            <article key={post.id_post}>
              <strong>{post.name}</strong>
              <p>{post.describe}</p>
            </article>
          </div>
        ))}
      </div>
    );
  }
}
