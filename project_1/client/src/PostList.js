import React, {useState, useEffect} from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    const res = await axios.get('http://dev.test/posts').catch(err=>err);
    if (res.status == 200) {
      setPosts(res.data);
    }
  }

  useEffect(()=> {
    fetchPosts()
  }, [])

  const renderedPosts = Object.values(posts).map(post=> {
    return (
    <div
      className='card'
      style={{width: '40%', marginBottom: '20px'}}
      key={post.id}
    >
      <div className='card-body'>
        <h3>{post.title}</h3>
        <CommentList comments={post.comments}/>
        <CommentCreate postId={post.id}/>

      </div>
    </div>)
  })

  return (
    <div className='d-flex flex-row flew-wrap justify-content-between'>{renderedPosts}</div>
  )
}
