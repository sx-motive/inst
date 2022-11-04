import React from 'react';

import { InstagramIcon } from './icons';

export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className='col logo'>
          <InstagramIcon />
        </div>

        <div className='col bar'></div>
      </div>
    </header>
  );
}
