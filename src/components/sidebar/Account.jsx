import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState, signState } from '../../reacoilStore';

import {
  updateProfile,
  onAuthStateChanged,
  signOut,
  getAuth,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Account() {
  const setSign = useSetRecoilState(signState);
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setSign('login');
        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const submitUpload = (e) => {
    const image = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `users/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          console.log('File available at', URL);

          const userRef = doc(db, 'users', user.uid);
          updateDoc(userRef, {
            userPic: URL,
          });

          onAuthStateChanged(auth, (user) => {
            if (user) {
              updateProfile(user, {
                photoURL: URL,
              });
              setUser(user);
            } else {
              console.log('Hey User is signout');
            }
          });
        });
      }
    );
  };

  return (
    <div className='sidebar_item'>
      <label className='castom_input'>
        <div className='sidebar_user_pic'>
          <input type='file' onChange={(e) => submitUpload(e)} />
          <img
            src={user.photoURL ? user.photoURL : '/user-ph.png'}
            alt={user.displayName}
          />
        </div>
      </label>
      <span className='sign_title'>@{user?.displayName}</span>
      <button onClick={() => handleSignOut()}>Sign Out</button>
    </div>
  );
}
