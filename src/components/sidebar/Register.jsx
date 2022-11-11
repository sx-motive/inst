import { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { openState, signState, userState } from '../../reacoilStore';
import { handleInput } from '../../utlls/handleInput';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export default function Register() {
  const setSign = useSetRecoilState(signState);
  const setUser = useSetRecoilState(userState);
  const setOpen = useResetRecoilState(openState);
  const [signUp, setSignUp] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submitSignUp = async () => {
    const userCredit = await createUserWithEmailAndPassword(
      auth,
      signUp.email,
      signUp.password
    );

    const user = userCredit.user;
    await updateProfile(user, {
      displayName: signUp.username,
    });

    setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: null,
    });

    const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {});

    setUser(user);
    setOpen();
  };

  return (
    <div className='sidebar_item'>
      <span className='sign_title'>Create an account</span>
      <input
        type='text'
        placeholder='username'
        name='username'
        value={signUp.username}
        onChange={(e) => handleInput(e, signUp, setSignUp)}
      />
      <input
        type='text'
        placeholder='email'
        name='email'
        value={signUp.email}
        onChange={(e) => handleInput(e, signUp, setSignUp)}
      />
      <input
        type='password'
        placeholder='password'
        name='password'
        value={signUp.password}
        onChange={(e) => handleInput(e, signUp, setSignUp)}
      />
      <button className='btn' onClick={submitSignUp}>
        Sign Up
      </button>
      <span className='sign_or'>
        Already have an account?{' '}
        <span className='sign_or_link' onClick={() => setSign('login')}>
          Let's login!
        </span>
      </span>
    </div>
  );
}
