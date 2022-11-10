import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

import { LikeIcon } from './icons';

export default function Post({ user, content, caption, postID, likes }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(db, 'users', user);
      const docUser = await getDoc(userRef);
      if (docUser.exists()) {
        setUserData(docUser.data());
      } else {
        console.log('No such document!');
      }
    };
    getUser();
  }, []);

  const likePost = async () => {
    const user = auth.currentUser;
    const postRef = doc(db, 'posts', postID);
    const post = await getDoc(postRef);
    const likesArr = post.data().likes;

    if (user !== null && likesArr.includes(user.uid) !== true) {
      let newArrOfUsers = [];
      newArrOfUsers = [...likesArr, user.uid];
      await updateDoc(postRef, {
        likes: newArrOfUsers,
      });
    } else {
      let filteredArray = likesArr.filter((e) => e !== user.uid);

      await updateDoc(postRef, {
        likes: filteredArray,
      });
    }
  };

  return (
    <div className='post'>
      <div className='post_header'>
        <div className='author'>
          <div className='author_pic'>
            <img src={userData.photoURL ? userData.photoURL : '/user-ph.png'} />
          </div>
          {userData.displayName}
        </div>
      </div>

      <div className='post_content'>
        <img src={content} alt='awwwards' />
      </div>

      <div className='post_footer'>
        <div className='post_icons'>
          <span className='icon' onClick={likePost}>
            <LikeIcon />
            <span className='likes_num'>{likes.length} likes</span>
          </span>
        </div>
        <span className='post_description'>
          <span className='post_footer_user'>{userData.displayName}: </span>
          {caption}
        </span>
      </div>
    </div>
  );
}
