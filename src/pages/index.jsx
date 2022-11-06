import { useState, useEffect } from 'react';

import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Post from '../components/post';
import Sidebar from '../components/sidebar';

export default function Index() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('timestamp', 'desc'));
      const postSnapshot = await getDocs(q);

      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));

      setPosts(postList);
      console.log(posts);
    }
    getPosts();
  }, []);
  return (
    <section className='content'>
      <div className='container'>
        <div className='timeline'>
          {posts.map(({ post, id }) => {
            return (
              <Post
                key={id}
                username={post.username}
                userPic={post.userPic}
                content={post.content}
                caption={post.caption}
              />
            );
          })}
        </div>
        <Sidebar />
      </div>
    </section>
  );
}
