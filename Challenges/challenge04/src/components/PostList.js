import React from 'react';
import Post from './Post';
import { data } from '../assets/mock/timeline.json';

const PostList = () => (
  <div className="posts">
    {data.map((item, index) => <Post key={String(item + index)} data={item} />)}
  </div>
);

export default PostList;
