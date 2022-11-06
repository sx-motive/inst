import React from 'react';

export default function Post({ username, userPic, content, caption }) {
  return (
    <div className='post'>
      <div className='post_header'>
        <div className='author'>
          <div className='author_pic'>
            <img src={userPic} />
          </div>
          {username}
        </div>
      </div>
      <div className='post_content'>
        <img src={content} alt='awwwards' />
      </div>
      <div className='post_footer'>
        <span className='post_description'>
          <span className='post_footer_user'>{username}: </span>
          {caption}
        </span>
      </div>
    </div>
  );
}
