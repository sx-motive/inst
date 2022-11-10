import React, { useState } from 'react';

import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { openState, signState, userState } from '../../reacoilStore';

import { handleInput } from '../../utlls/handleInput';

import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const setSign = useSetRecoilState(signState);
  const setOpen = useResetRecoilState(openState);
  const setUser = useSetRecoilState(userState);

  const [signIn, setSignIn] = useState({ email: '', password: '' });

  const setUserData = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUser(userSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  const submitSignIn = async () => {
    signInWithEmailAndPassword(auth, signIn.email, signIn.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        setOpen();
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(
          errorMessage == 'Firebase: Error (auth/user-not-found).'
            ? 'Sorry, but user does not exist!'
            : errorMessage
        );
      });
  };
  return (
    <div className='sidebar_item'>
      <span className='sign_title'>Login</span>
      <input
        type='text'
        placeholder='email'
        name='email'
        value={signIn.email}
        onChange={(e) => handleInput(e, signIn, setSignIn)}
      />
      <input
        type='text'
        placeholder='password'
        name='password'
        value={signIn.password}
        onChange={(e) => handleInput(e, signIn, setSignIn)}
      />
      <button className='btn' onClick={submitSignIn}>
        Sign In
      </button>
      <span className='sign_or'>
        Don't have an account yet?{' '}
        <span className='sign_or_link' onClick={() => setSign('register')}>
          Register now!
        </span>
      </span>
    </div>
  );
}
