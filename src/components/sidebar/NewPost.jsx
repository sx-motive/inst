import { useState, useEffect } from 'react';
import { handleInput } from '../../utlls/handleInput';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { openState, userState } from '../../reacoilStore';

export default function NewPost() {
  const user = useRecoilValue(userState);
  const setOpen = useResetRecoilState(openState);
  const [progress, setProgress] = useState(0);
  const [post, setPost] = useState({
    description: '',
    media: null,
  });

  const submitUpload = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${post.media.name}`);

    const uploadTask = uploadBytesResumable(storageRef, post.media);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          console.log('File uploaded!');
          const docRef = addDoc(collection(db, 'posts'), {
            timestamp: serverTimestamp(),
            caption: post.description,
            content: URL,
            user: user.uid,
            likes: [],
          });
          setPost({ description: '', media: null });
          setProgress(0);
          setOpen();
        });
      }
    );
  };
  return (
    <div className='create_post sidebar_item'>
      <span className='sign_title'>Create a new post</span>

      <label className='castom_input'>
        <input
          type='file'
          name='media'
          onChange={(e) => handleInput(e, post, setPost)}
        />

        <span className='castom_input_placeholder'>
          {post.media ? post.media.name : 'Choose the file...'}
          <progress value={progress} max='100' />
        </span>
      </label>
      <input
        type='text'
        placeholder='description'
        name='description'
        value={post.description}
        onChange={(e) => handleInput(e, post, setPost)}
      />

      <button onClick={submitUpload}>Publish post</button>
    </div>
  );
}
