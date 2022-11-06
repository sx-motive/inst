import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { InstagramIcon } from './icons';

export default function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
      }
    });
  }, []);
  return (
    <header className='header'>
      <div className='container'>
        <div className='col logo'>
          <InstagramIcon />
        </div>

        <div className='col bar'>
          <div className='header_user'>
            <div className='header_user_pic'>
              <img src='' alt='' />
            </div>
            <span className='header_user_name'>{user.displayName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
