import React from 'react';
import './App.css';

import Header from './components/Header';
import PostList from './components/PostList';
import Post from './components/Post';
// import Comment from './components/Comment';

function App() {
  return (
    <div className="App">
      <Header />
      <PostList/>
    </div>
  );
}

export default App;
