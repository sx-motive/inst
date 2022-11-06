import React, { useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { handleInput } from '../utlls/handleInput';
import CreatePost from './createPost';

export default function Sidebar() {
  const [userPic, setUserPic] = useState(null);
  const [user, setUser] = useState(null);
  const [signSwitcher, setSignSwitcher] = useState(null);
  const [signIn, setSignIn] = useState({ email: '', password: '' });
  const [signUp, setSignUp] = useState({
    username: '',
    email: '',
    password: '',
  });
  const auth = getAuth();

  /////
  // WE ACTUALLY CAN USE REDUX I JUST FORGOT USER.USER
  /////

  const submitSignUp = () => {
    createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
      .then((userCredential) => {
        const authUser = userCredential.user;
        updateProfile(authUser, {
          displayName: signUp.username,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const submitSignIn = () => {
    signInWithEmailAndPassword(auth, signIn.email, signIn.password)
      .then((userData) => {
        localStorage.setItem('user', JSON.stringify(userData.user));
        setSignSwitcher('signedIn');
        setUser(userData.user);
        console.log('Signed In');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setSignSwitcher('login');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignSwitcher('signedIn');
        setUser(user);
      } else {
        setSignSwitcher('login');
      }
    });
  }, [user]);

  return (
    <div className='sidebar'>
      {(() => {
        if (signSwitcher == 'signedIn') {
          return (
            <div className='sidebar_item'>
              <div className='sidebar_user_pic'>
                <img
                  src={user.avatar ? user.avater : '/public/user-ph.png'}
                  alt={user.displayName}
                />
              </div>

              <span className='sign_title'>@{user.displayName}</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          );
        } else if (signSwitcher == 'login') {
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
                <span
                  className='sign_or_link'
                  onClick={() => setSignSwitcher('register')}
                >
                  Register now!
                </span>
              </span>
            </div>
          );
        } else if (signSwitcher == 'register') {
          return (
            <div className='sidebar_item'>
              <span className='sign_title'>Register</span>
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
                type='text'
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
                <span
                  className='sign_or_link'
                  onClick={() => setSignSwitcher('login')}
                >
                  Let's login!
                </span>
              </span>
            </div>
          );
        }
      })()}
      {signSwitcher == 'signedIn' ? (
        <CreatePost username={user.displayName} />
      ) : (
        ''
      )}
    </div>
  );
}
