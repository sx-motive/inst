import { useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './reacoilStore';

import Header from './components/header';
import Timeline from './components/timeline';
import Sidebar from './components/sidebar/Sidebar';

export default function App() {
  const setUser = useSetRecoilState(userState);
  const userRec = useRecoilValue(userState);
  const auth = getAuth();

  const setUserData = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUser(userSnap.data());
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
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
