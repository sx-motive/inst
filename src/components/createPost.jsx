import { useState, useEffect } from 'react';
import { handleInput } from '../utlls/handleInput';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CreatePost({ username }) {
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
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
          console.log('File available at', URL);
          const docRef = addDoc(collection(db, 'posts'), {
            timestamp: serverTimestamp(),
            caption: post.description,
            content: URL,
            username: username,
          });
          setPost({ description: '', media: null });
        });
      }
    );
  };
  return (
    <div className='create_post sidebar_item'>
      <span className='sign_title'>Create a new post</span>
      <input
        type='file'
        name='media'
        onChange={(e) => handleInput(e, post, setPost)}
      />
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
