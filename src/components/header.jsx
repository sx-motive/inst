import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, openState } from '../reacoilStore';
import { InstagramIcon } from './icons';

import Sidebar from './sidebar/Sidebar';

export default function Header() {
  const [open, setOpen] = useRecoilState(openState);
  const user = useRecoilValue(userState);
  return (
    <header className='header'>
      <div className='container'>
        <div className='header_logo'>
          <InstagramIcon />
        </div>

        <div
          className='header_user'
          onClick={() =>
            setOpen((prev) => (prev == false ? (prev = true) : (prev = false)))
          }
        >
          <span className='header_user_name'>
            {user ? (
              `Hi, ${user.displayName}`
            ) : (
              <span className='header_user_mobile_signin'>Sign In</span>
            )}{' '}
          </span>
          <div className='header_user_pic'>
            <img
              src={user?.photoURL ? user.photoURL : '/user-ph.png'}
              alt={user?.displayName}
            />
          </div>
        </div>
      </div>
      <div className={`menu ${open ? 'opened' : ''}`}>
        <Sidebar />
      </div>
    </header>
  );
}
