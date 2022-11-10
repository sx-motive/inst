import { useRecoilValue } from 'recoil';
import { signState, userState } from '../../reacoilStore';

import Login from './Login';
import Register from './Register';
import Account from './Account';
import NewPost from './NewPost';
import { LikeIcon } from '../icons';

export default function Sidebar() {
  const user = useRecoilValue(userState);
  const sign = useRecoilValue(signState);

  return (
    <div className='sidebar'>
      {(() => {
        if (user) {
          return (
            <>
              <Account />
              <NewPost />
            </>
          );
        } else if (sign == 'login') {
          return <Login />;
        } else if (sign == 'register') {
          return <Register />;
        }
      })()}
      <span className='author'>
        Development with <LikeIcon /> by{' '}
        <a href='https://github.com/sx-motive'>Denis Kunitsyn</a>
      </span>
    </div>
  );
}
