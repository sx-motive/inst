import { useState, useEffect } from 'react';
import Post from './post';

import { db } from '../firebase';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';

export default function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });

    return () => unsub;
  }, []);
  return (
    <div className='timeline'>
      {posts.map(({ post, id }) => {
        return (
          <Post
            key={id}
            postID={id}
            user={post.user}
            content={post.content}
            caption={post.caption}
            likes={post.likes}
          />
        );
      })}
    </div>
  );
}
