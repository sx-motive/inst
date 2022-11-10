import { useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from './reacoilStore';

import Header from './components/header';
import Timeline from './components/timeline';
import Sidebar from './components/sidebar/Sidebar';

export default function App() {
  const setUser = useSetRecoilState(userState);
  const auth = getAuth();

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
    return () => sub();
  }, []);

  return (
    <>
      <Header />
      <div className='page'>
        <div className='container'>
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </>
  );
}
