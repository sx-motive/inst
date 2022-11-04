import { useState, useEffect } from 'react';
import Post from '../components/post';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
let defaultFirestore = getFirestore(app);

export default function Index() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const postsCol = collection(defaultFirestore, 'posts');
      const postSnapshot = await getDocs(postsCol);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));
      setPosts(postList);
      console.log(postList);
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
      </div>
    </section>
  );
}
